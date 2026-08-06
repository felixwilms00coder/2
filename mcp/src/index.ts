#!/usr/bin/env node
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { appendAuditLog, readAuditLog } from "./audit-log.js";
import { getBroker, listBrokers } from "./brokers/index.js";
import { checkGuardrails } from "./guardrails.js";
import { createPending, takePending } from "./pending-orders.js";
import { isArmed, setArmed } from "./runtime.js";
import { OrderRequest } from "./types.js";

/**
 * Self-managed MCP server for your own broker accounts.
 *
 * This process runs on your own machine, using only your own credentials
 * (passed in via environment variables — see mcp/README.md). There is no
 * FinEdu server anywhere in this path: it is the same "software, not a
 * service" posture as the web app's own /agent feature
 * (src/lib/agent/brokers), just reachable from an MCP client instead of a
 * browser. See docs/automatisering.md for why that architecture matters.
 *
 * Safety model:
 *  - Nothing is ever sent on the first call. preview_order always runs
 *    first and only returns a quote + a short-lived preview id.
 *  - confirm_order is a second, separate tool call required to actually
 *    place anything — the human (or the MCP client's own tool-approval
 *    prompt) is the gate between the two.
 *  - The server starts disarmed on every launch. confirm_order refuses to
 *    run until set_armed(true) has been called in the current session.
 *  - Every order — previewed, filled, rejected or failed — is appended to
 *    a local, append-only audit log (~/.finedu-broker-mcp by default).
 */

const server = new McpServer({ name: "finedu-broker-mcp", version: "0.1.0" });

function ok(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

function fail(message: string) {
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true,
  };
}

server.registerTool(
  "list_brokers",
  {
    title: "List brokers",
    description:
      "Lists the broker connections this server knows about (IBKR, Saxo, Robinhood), whether each is configured, and its current connection status.",
  },
  async () => {
    const brokers = await Promise.all(
      listBrokers().map(async (b) => ({
        id: b.id,
        label: b.label,
        live: b.isLive(),
        configured: b.isConfigured(),
        connection: await b.connectionSummary(),
        riskNotice: b.riskNotice,
      })),
    );
    return ok({ armed: isArmed(), brokers });
  },
);

server.registerTool(
  "get_status",
  {
    title: "Get status",
    description: "Returns whether the master 'armed' switch is on. When disarmed, confirm_order always refuses.",
  },
  async () => ok({ armed: isArmed() }),
);

server.registerTool(
  "set_armed",
  {
    title: "Arm or disarm order confirmation",
    description:
      "Master switch for this session. Must be explicitly set to true before confirm_order will send anything. Resets to false whenever this server restarts.",
    inputSchema: { armed: z.boolean() },
  },
  async ({ armed }) => {
    setArmed(armed);
    return ok({
      armed: isArmed(),
      note: armed
        ? "Armed. confirm_order can now send real (or paper/sim) orders."
        : "Disarmed. confirm_order will refuse until set_armed(true) is called again.",
    });
  },
);

server.registerTool(
  "get_account",
  {
    title: "Get account summary",
    description: "Fetches account id, currency, cash and total value for one broker.",
    inputSchema: { brokerId: z.enum(["ibkr", "saxo", "robinhood"]) },
  },
  async ({ brokerId }) => {
    try {
      return ok(await getBroker(brokerId).getAccount());
    } catch (err) {
      return fail(describe(err));
    }
  },
);

server.registerTool(
  "get_positions",
  {
    title: "Get positions",
    description: "Fetches current open positions for one broker.",
    inputSchema: { brokerId: z.enum(["ibkr", "saxo", "robinhood"]) },
  },
  async ({ brokerId }) => {
    try {
      return ok(await getBroker(brokerId).getPositions());
    } catch (err) {
      return fail(describe(err));
    }
  },
);

const quoteShape = {
  brokerId: z.enum(["ibkr", "saxo", "robinhood"]),
  symbol: z.string().min(1),
  instrumentId: z
    .string()
    .optional()
    .describe("Saxo Uic or IBKR conid, if you already know it."),
  assetType: z.string().optional(),
};

server.registerTool(
  "get_quote",
  {
    title: "Get quote",
    description: "Fetches a live price for one instrument at one broker.",
    inputSchema: quoteShape,
  },
  async (req) => {
    try {
      return ok(await getBroker(req.brokerId).getQuote(req));
    } catch (err) {
      return fail(describe(err));
    }
  },
);

const orderShape = {
  ...quoteShape,
  amountEur: z.number().positive(),
  side: z.enum(["buy", "sell"]).default("buy"),
};

server.registerTool(
  "preview_order",
  {
    title: "Preview an order (step 1 of 2 — sends nothing)",
    description:
      "Looks up a live quote and the resulting quantity for an order, checks it against your per-order/per-month euro guardrails, and returns a short-lived preview id. This never places an order — call confirm_order with the returned previewId to actually send it.",
    inputSchema: orderShape,
  },
  async (req) => {
    try {
      const broker = getBroker(req.brokerId);
      if (!broker.isConfigured()) {
        return fail(`${broker.label} is not configured: ${await broker.connectionSummary()}`);
      }
      const orderReq: OrderRequest = req;
      const guard = checkGuardrails(orderReq, req.brokerId);
      const quote = await broker.getQuote(req);
      const quantity = Math.floor(req.amountEur / quote.price);

      appendAuditLog({
        id: randomUUID(),
        atISO: new Date().toISOString(),
        brokerId: req.brokerId,
        symbol: req.symbol,
        amountEur: req.amountEur,
        status: "previewed",
        price: quote.price,
        quantity,
      });

      if (!guard.ok) {
        return ok({ blocked: true, reason: guard.reason, quote, quantity });
      }
      if (quantity < 1) {
        return ok({
          blocked: true,
          reason: `Amount ${req.amountEur} is too small for one unit at price ${quote.price}.`,
          quote,
        });
      }

      const pending = createPending(req.brokerId, orderReq, quote.price, quantity);
      return ok({
        previewId: pending.id,
        brokerId: req.brokerId,
        broker: broker.label,
        live: broker.isLive(),
        symbol: req.symbol,
        side: req.side,
        amountEur: req.amountEur,
        price: quote.price,
        quantity,
        expiresAt: new Date(pending.expiresAt).toISOString(),
        next: "Call confirm_order with this previewId to actually send it. It expires in 5 minutes.",
      });
    } catch (err) {
      return fail(describe(err));
    }
  },
);

server.registerTool(
  "confirm_order",
  {
    title: "Confirm a previewed order (step 2 of 2 — sends it)",
    description:
      "Actually places the order behind a previewId returned by preview_order. Refuses if the server is disarmed (call set_armed first), the preview expired, or guardrails no longer pass.",
    inputSchema: { previewId: z.string().min(1) },
  },
  async ({ previewId }) => {
    if (!isArmed()) {
      return fail(
        "Refused: this server is disarmed. Call set_armed with armed=true first, then confirm_order again.",
      );
    }

    const pending = takePending(previewId);
    if (pending === null) {
      return fail("Unknown or already-used previewId. Call preview_order again.");
    }
    if ("expired" in pending) {
      return fail("This preview expired (previews last 5 minutes). Call preview_order again for a fresh price.");
    }

    const broker = getBroker(pending.brokerId);
    const guard = checkGuardrails(pending.request, pending.brokerId);
    if (!guard.ok) {
      appendAuditLog({
        id: randomUUID(),
        atISO: new Date().toISOString(),
        brokerId: pending.brokerId,
        symbol: pending.request.symbol,
        amountEur: pending.request.amountEur,
        status: "rejected",
        detail: guard.reason,
      });
      return fail(`Refused by guardrails: ${guard.reason}`);
    }

    try {
      const placed = await broker.placeOrder(pending.request);
      appendAuditLog({
        id: randomUUID(),
        atISO: new Date().toISOString(),
        brokerId: pending.brokerId,
        symbol: pending.request.symbol,
        amountEur: pending.request.amountEur,
        status: "filled",
        price: placed.price,
        quantity: placed.quantity,
        brokerOrderId: placed.brokerOrderId,
      });
      return ok({
        placed: true,
        broker: broker.label,
        live: broker.isLive(),
        brokerOrderId: placed.brokerOrderId,
        price: placed.price,
        quantity: placed.quantity,
      });
    } catch (err) {
      const detail = describe(err);
      appendAuditLog({
        id: randomUUID(),
        atISO: new Date().toISOString(),
        brokerId: pending.brokerId,
        symbol: pending.request.symbol,
        amountEur: pending.request.amountEur,
        status: "failed",
        detail,
      });
      return fail(`Order failed at the broker: ${detail}`);
    }
  },
);

server.registerTool(
  "cancel_order",
  {
    title: "Cancel an open order",
    description: "Cancels a previously placed order by the broker's own order id (not a previewId).",
    inputSchema: {
      brokerId: z.enum(["ibkr", "saxo", "robinhood"]),
      brokerOrderId: z.string().min(1),
    },
  },
  async ({ brokerId, brokerOrderId }) => {
    try {
      const broker = getBroker(brokerId);
      if (!broker.cancelOrder) {
        return fail(`${broker.label} does not support cancelling orders here.`);
      }
      await broker.cancelOrder(brokerOrderId);
      appendAuditLog({
        id: randomUUID(),
        atISO: new Date().toISOString(),
        brokerId,
        symbol: "",
        amountEur: 0,
        status: "cancelled",
        brokerOrderId,
      });
      return ok({ cancelled: true, brokerId, brokerOrderId });
    } catch (err) {
      return fail(describe(err));
    }
  },
);

server.registerTool(
  "get_order_history",
  {
    title: "Get local order history",
    description: "Returns this machine's local audit log of previewed, filled, rejected, failed and cancelled orders.",
    inputSchema: { brokerId: z.enum(["ibkr", "saxo", "robinhood"]).optional() },
  },
  async ({ brokerId }) => {
    const log = readAuditLog();
    return ok(brokerId ? log.filter((e) => e.brokerId === brokerId) : log);
  },
);

function describe(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

const transport = new StdioServerTransport();
await server.connect(transport);
