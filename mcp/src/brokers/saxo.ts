import { saxoConfig } from "../config.js";
import {
  AccountSummary,
  BrokerClient,
  OrderRequest,
  PlacedOrder,
  Position,
  Quote,
} from "../types.js";

/**
 * Saxo Bank OpenAPI client — the Node/MCP counterpart of
 * src/lib/agent/brokers/saxo.ts, which runs the same protocol from the
 * browser for the web app's own /agent feature.
 *
 * ⚠️  NOT VERIFIED AGAINST THE LIVE API — same caveat as the browser
 * version: written to Saxo's documented OpenAPI shape, but validate against
 * their SIM environment before ever pointing SAXO_MODE at "live".
 *
 * The access token is your own, from your own Saxo developer application,
 * passed in via the SAXO_TOKEN environment variable by whatever launches
 * this process (e.g. your MCP client's server config) — it is never stored
 * to disk by this code.
 */

const SIM_BASE = "https://gateway.saxobank.com/sim/openapi";
const LIVE_BASE = "https://gateway.saxobank.com/openapi";

function base(): string {
  return saxoConfig().mode === "live" ? LIVE_BASE : SIM_BASE;
}

async function call<T>(pathname: string, init?: RequestInit): Promise<T> {
  const { token } = saxoConfig();
  if (!token) throw new Error("SAXO_TOKEN is not set.");

  const res = await fetch(`${base()}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Saxo responded ${res.status}. ${body.slice(0, 200)}`.trim());
  }
  return (await res.json()) as T;
}

let cachedAccountKey: string | null = null;

async function resolveAccountKey(): Promise<string> {
  const { accountKey } = saxoConfig();
  if (accountKey) return accountKey;
  if (cachedAccountKey) return cachedAccountKey;
  const data = await call<{ Data: { AccountKey: string }[] }>(
    "/port/v1/accounts/me",
  );
  const key = data.Data?.[0]?.AccountKey;
  if (!key) throw new Error("No account found on this Saxo token.");
  cachedAccountKey = key;
  return key;
}

async function fetchQuote(req: {
  symbol: string;
  instrumentId?: string;
  assetType?: string;
}): Promise<Quote> {
  if (!req.instrumentId) {
    throw new Error(
      "No Uic given. Saxo identifies instruments by a numeric Uic — look it up in your Saxo account and pass it as instrumentId.",
    );
  }
  const data = await call<{
    Data: { Quote?: { Ask?: number; Mid?: number; Bid?: number } }[];
  }>(
    `/trade/v1/infoprices?Uic=${encodeURIComponent(req.instrumentId)}&AssetType=${encodeURIComponent(
      req.assetType ?? "Stock",
    )}&FieldGroups=Quote`,
  );
  const q = data.Data?.[0]?.Quote;
  const price = q?.Ask ?? q?.Mid ?? q?.Bid;
  if (!price) throw new Error("Saxo returned no usable price.");
  return { price, currency: "EUR" };
}

export function createSaxoClient(): BrokerClient {
  return {
    id: "saxo",
    label: "Saxo Bank (OpenAPI)",
    isLive: () => saxoConfig().mode === "live",
    riskNotice:
      "Token is your own, from your own Saxo developer application. SAXO_MODE=live sends real orders; validate against SAXO_MODE=sim (the default) first. The Saxo adapter has never been run against Saxo's live API in this project.",
    isConfigured: () => saxoConfig().token !== null,

    async connectionSummary() {
      if (!saxoConfig().token) return "Not connected: SAXO_TOKEN is not set.";
      return saxoConfig().mode === "live"
        ? "Connected to your LIVE Saxo environment. Orders cost real money."
        : "Connected to Saxo's simulation environment. No real money.";
    },

    async getAccount(): Promise<AccountSummary> {
      const accountKey = await resolveAccountKey();
      const balances = await call<{
        CashBalance?: number;
        TotalValue?: number;
        Currency?: string;
      }>(`/port/v1/balances?AccountKey=${encodeURIComponent(accountKey)}`);
      return {
        accountId: accountKey,
        currency: balances.Currency ?? "EUR",
        cash: balances.CashBalance,
        totalValue: balances.TotalValue,
      };
    },

    async getPositions(): Promise<Position[]> {
      const accountKey = await resolveAccountKey();
      const data = await call<{
        Data: Array<{
          PositionBase?: {
            Uic?: number;
            Amount?: number;
            OpenPrice?: number;
            Currency?: string;
          };
          DisplayAndFormat?: { Symbol?: string };
        }>;
      }>(`/port/v1/positions?AccountKey=${encodeURIComponent(accountKey)}`);
      return data.Data.map((p) => ({
        symbol: p.DisplayAndFormat?.Symbol ?? String(p.PositionBase?.Uic ?? "?"),
        quantity: p.PositionBase?.Amount ?? 0,
        averagePrice: p.PositionBase?.OpenPrice,
        currency: p.PositionBase?.Currency ?? "EUR",
      }));
    },

    getQuote: fetchQuote,

    async placeOrder(req: OrderRequest): Promise<PlacedOrder> {
      if (!req.instrumentId) {
        throw new Error("No Uic given — pass it as instrumentId for Saxo orders.");
      }
      const accountKey = await resolveAccountKey();
      const quote = await fetchQuote(req);
      const quantity = Math.floor(req.amountEur / quote.price);
      if (quantity < 1) {
        throw new Error(
          `Amount ${req.amountEur} EUR is too small for one unit at price ${quote.price} EUR.`,
        );
      }

      const result = await call<{ OrderId: string }>("/trade/v2/orders", {
        method: "POST",
        body: JSON.stringify({
          AccountKey: accountKey,
          Uic: Number(req.instrumentId),
          AssetType: req.assetType ?? "Stock",
          BuySell: req.side === "sell" ? "Sell" : "Buy",
          OrderType: "Market",
          Amount: quantity,
          ManualOrder: true,
          OrderDuration: { DurationType: "DayOrder" },
        }),
      });

      return { brokerOrderId: result.OrderId, price: quote.price, quantity };
    },

    async cancelOrder(brokerOrderId: string): Promise<void> {
      const accountKey = await resolveAccountKey();
      await call(
        `/trade/v2/orders/${brokerOrderId}?AccountKey=${encodeURIComponent(accountKey)}`,
        { method: "DELETE" },
      );
    },
  };
}
