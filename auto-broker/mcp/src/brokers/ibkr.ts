import { Agent } from "undici";
import { ibkrConfig } from "../config.js";
import {
  AccountSummary,
  BrokerClient,
  OrderRequest,
  PlacedOrder,
  Position,
  Quote,
} from "../types.js";

/**
 * Interactive Brokers via the Client Portal Web API.
 *
 * This talks to IBKR's own "Client Portal Gateway", a small Java process you
 * download from IBKR and run yourself on localhost. You log into it in a
 * browser (https://localhost:5000) with your own IBKR credentials and 2FA;
 * from then on it holds the session and this client just calls it. There is
 * no Auto Broker server anywhere in this path, and no token is ever stored by
 * this code — the gateway owns the session, not us.
 *
 * IBKR_MODE defaults to "paper". Point IBKR_MODE=live only once you have
 * validated behaviour against a paper account, per docs/automatisering.md's
 * recommended order of operations.
 */

// The gateway only ever listens on loopback and mints its own self-signed
// certificate on first run — there is no network hop to trust here besides
// the local machine, so we skip verifying that cert rather than asking
// every user to import it into their trust store.
const localGatewayAgent = new Agent({ connect: { rejectUnauthorized: false } });

async function call<T>(pathname: string, init?: RequestInit): Promise<T> {
  const { gatewayUrl } = ibkrConfig();
  const res = await fetch(`${gatewayUrl}${pathname}`, {
    ...init,
    dispatcher: localGatewayAgent,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  } as RequestInit & { dispatcher: Agent });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `IBKR gateway responded ${res.status}. ${body.slice(0, 200)}`.trim(),
    );
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}

let cachedAccountId: string | null = null;

async function resolveAccountId(): Promise<string> {
  const { accountId } = ibkrConfig();
  if (accountId) return accountId;
  if (cachedAccountId) return cachedAccountId;
  const data = await call<{ accounts?: string[] }>("/iserver/accounts");
  const first = data.accounts?.[0];
  if (!first) {
    throw new Error(
      "IBKR gateway returned no accounts. Log in at https://localhost:5000 first.",
    );
  }
  cachedAccountId = first;
  return first;
}

async function findConid(symbol: string): Promise<{ conid: number; assetType: string }> {
  const results = await call<Array<{ conid: number; secType?: string }>>(
    `/iserver/secdef/search?symbol=${encodeURIComponent(symbol)}`,
  );
  const first = results[0];
  if (!first) throw new Error(`IBKR found no instrument for "${symbol}".`);
  return { conid: first.conid, assetType: first.secType ?? "STK" };
}

async function snapshotPrice(conid: number): Promise<number> {
  // IBKR's snapshot endpoint primes a market data subscription on the first
  // call and often only returns a usable price from the second call on.
  for (let attempt = 0; attempt < 3; attempt++) {
    const data = await call<Array<Record<string, string>>>(
      `/iserver/marketdata/snapshot?conids=${conid}&fields=31`,
    );
    const raw = data[0]?.["31"];
    if (raw) {
      const price = Number(String(raw).replace(/^[A-Za-z]/, ""));
      if (Number.isFinite(price) && price > 0) return price;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("IBKR did not return a usable price for this instrument.");
}

export function createIbkrClient(): BrokerClient {
  return {
    id: "ibkr",
    label: "Interactive Brokers (Client Portal API)",
    isLive: () => ibkrConfig().mode === "live",
    riskNotice:
      "Needs IBKR's Client Portal Gateway running locally, logged in with your own credentials at https://localhost:5000. IBKR_MODE=live sends real orders; validate against IBKR_MODE=paper (the default) first. Amounts are treated as the account's own currency (USD by default) — IBKR does not do EUR conversion for you here.",
    isConfigured: () => true,

    async connectionSummary() {
      try {
        const status = await call<{ authenticated?: boolean }>(
          "/iserver/auth/status",
        );
        if (!status.authenticated) {
          return "Gateway is running but not logged in — open https://localhost:5000 and log in.";
        }
        return ibkrConfig().mode === "live"
          ? "Connected to your LIVE IBKR account via the Client Portal Gateway. Orders cost real money."
          : "Connected to your IBKR paper account via the Client Portal Gateway. No real money.";
      } catch {
        return `Client Portal Gateway not reachable at ${ibkrConfig().gatewayUrl}. Start it and log in at https://localhost:5000 first.`;
      }
    },

    async getAccount(): Promise<AccountSummary> {
      const accountId = await resolveAccountId();
      const summary = await call<
        Record<string, { amount?: number; currency?: string } | undefined>
      >(`/portfolio/${accountId}/summary`);
      return {
        accountId,
        currency:
          summary.totalcashvalue?.currency ??
          summary.netliquidation?.currency ??
          "USD",
        cash: summary.totalcashvalue?.amount,
        totalValue: summary.netliquidation?.amount,
      };
    },

    async getPositions(): Promise<Position[]> {
      const accountId = await resolveAccountId();
      const positions = await call<
        Array<{
          contractDesc?: string;
          ticker?: string;
          position: number;
          avgCost?: number;
          currency?: string;
        }>
      >(`/portfolio/${accountId}/positions/0`);
      return positions.map((p) => ({
        symbol: p.ticker ?? p.contractDesc ?? "?",
        quantity: p.position,
        averagePrice: p.avgCost,
        currency: p.currency ?? "USD",
      }));
    },

    async getQuote(req): Promise<Quote> {
      const { conid } = req.instrumentId
        ? { conid: Number(req.instrumentId) }
        : await findConid(req.symbol);
      const price = await snapshotPrice(conid);
      return { price, currency: "USD" };
    },

    async placeOrder(req: OrderRequest): Promise<PlacedOrder> {
      const accountId = await resolveAccountId();
      const { conid } = req.instrumentId
        ? { conid: Number(req.instrumentId) }
        : await findConid(req.symbol);
      const price = await snapshotPrice(conid);
      const quantity = Math.floor(req.amountEur / price);
      if (quantity < 1) {
        throw new Error(
          `Amount ${req.amountEur} is too small for a single unit at price ${price}.`,
        );
      }

      let response = await call<Array<{ order_id?: string; id?: string }>>(
        `/iserver/account/${accountId}/orders`,
        {
          method: "POST",
          body: JSON.stringify({
            orders: [
              {
                conid,
                orderType: "MKT",
                side: req.side === "sell" ? "SELL" : "BUY",
                quantity,
                tif: "DAY",
              },
            ],
          }),
        },
      );

      // IBKR frequently answers a market order with a risk-warning "question"
      // (e.g. price-cap or order-value confirmation) that must be replied to
      // before the order reaches the exchange. Auto-answering it here is safe
      // because the human already confirmed via confirm_order — this is
      // IBKR's own internal dialog, not an extra human gate.
      let guard = 0;
      while (Array.isArray(response) && response[0]?.id && guard < 5) {
        const replyId = response[0].id;
        response = await call<Array<{ order_id?: string; id?: string }>>(
          `/iserver/reply/${replyId}`,
          { method: "POST", body: JSON.stringify({ confirmed: true }) },
        );
        guard++;
      }

      const orderId = response[0]?.order_id;
      if (!orderId) {
        throw new Error("IBKR did not return an order id — check the gateway logs.");
      }
      return { brokerOrderId: orderId, price, quantity };
    },

    async cancelOrder(brokerOrderId: string): Promise<void> {
      const accountId = await resolveAccountId();
      await call(`/iserver/account/${accountId}/order/${brokerOrderId}`, {
        method: "DELETE",
      });
    },
  };
}
