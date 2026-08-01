import { BrokerAdapter, OrderRequest, PlacedOrder, Quote } from "../types";

/**
 * Saxo Bank OpenAPI adapter.
 *
 * ⚠️  NOT VERIFIED AGAINST THE LIVE API.
 * This is written to Saxo's documented OpenAPI shape but has never been run
 * against a real Saxo endpoint in this project. Before trusting it with any
 * money, run it against Saxo's simulation environment first and check the
 * request/response shapes against their current reference documentation.
 *
 * Design constraints that keep the user in charge:
 *  - The token belongs to the user, obtained from their own Saxo developer
 *    application. FinEdu never issues, stores or sees it server-side.
 *  - Calls go straight from the user's browser to Saxo. There is no FinEdu
 *    backend in the order path.
 *  - The token is kept in sessionStorage, so it disappears when the tab
 *    closes rather than lingering on disk.
 */

const SIM_BASE = "https://gateway.saxobank.com/sim/openapi";
const LIVE_BASE = "https://gateway.saxobank.com/openapi";

const TOKEN_KEY = "finedu:saxo:token";
const ACCOUNT_KEY = "finedu:saxo:accountkey";
const MODE_KEY = "finedu:saxo:mode";

export type SaxoMode = "sim" | "live";

function session(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function saxoStoreToken(
  token: string,
  mode: SaxoMode,
  accountKey?: string,
) {
  const s = session();
  if (!s) return;
  s.setItem(TOKEN_KEY, token);
  s.setItem(MODE_KEY, mode);
  if (accountKey) s.setItem(ACCOUNT_KEY, accountKey);
}

export function saxoClearToken() {
  const s = session();
  if (!s) return;
  s.removeItem(TOKEN_KEY);
  s.removeItem(ACCOUNT_KEY);
  s.removeItem(MODE_KEY);
}

function token(): string | null {
  return session()?.getItem(TOKEN_KEY) ?? null;
}

function mode(): SaxoMode {
  return (session()?.getItem(MODE_KEY) as SaxoMode) ?? "sim";
}

function base(): string {
  return mode() === "live" ? LIVE_BASE : SIM_BASE;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const t = token();
  if (!t) throw new Error("Niet verbonden met Saxo.");

  const res = await fetch(`${base()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${t}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Saxo antwoordde met ${res.status}. ${body.slice(0, 200)}`.trim(),
    );
  }
  return (await res.json()) as T;
}

/** Fetches the user's account key, needed on every order. */
export async function saxoFetchAccountKey(): Promise<string> {
  const data = await call<{ Data: { AccountKey: string }[] }>(
    "/port/v1/accounts/me",
  );
  const key = data.Data?.[0]?.AccountKey;
  if (!key) throw new Error("Geen rekening gevonden op dit Saxo-account.");
  const s = session();
  if (s) s.setItem(ACCOUNT_KEY, key);
  return key;
}

export function createSaxoBroker(): BrokerAdapter {
  return {
    id: "saxo",
    label: "Saxo (eigen koppeling)",
    get isLive() {
      return mode() === "live";
    },
    isConnected: () => token() !== null,
    connectionSummary: () => {
      if (!token()) return "Niet verbonden.";
      return mode() === "live"
        ? "Verbonden met je LIVE Saxo-omgeving. Orders kosten echt geld."
        : "Verbonden met Saxo's simulatie-omgeving. Geen echt geld.";
    },

    async getQuote(req: OrderRequest): Promise<Quote> {
      if (!req.uic) {
        throw new Error(
          "Geen Uic ingevuld. Saxo identificeert instrumenten met een numeriek Uic; zoek het op in je Saxo-account.",
        );
      }
      const data = await call<{
        Data: {
          Quote?: { Ask?: number; Mid?: number; Bid?: number };
          AssetType?: string;
        }[];
      }>(
        `/trade/v1/infoprices?Uic=${encodeURIComponent(req.uic)}&AssetType=${encodeURIComponent(
          req.assetType,
        )}&FieldGroups=Quote`,
      );
      const q = data.Data?.[0]?.Quote;
      const price = q?.Ask ?? q?.Mid ?? q?.Bid;
      if (!price) throw new Error("Saxo gaf geen bruikbare koers terug.");
      return { price, currency: "EUR" };
    },

    async placeOrder(req: OrderRequest): Promise<PlacedOrder> {
      if (!req.uic) throw new Error("Geen Uic ingevuld.");

      const accountKey =
        session()?.getItem(ACCOUNT_KEY) ?? (await saxoFetchAccountKey());

      // Saxo orders are expressed in units, so convert the euro amount.
      const quote = await this.getQuote(req);
      const quantity = Math.floor(req.amountEur / quote.price);
      if (quantity < 1) {
        throw new Error(
          `Bedrag van ${req.amountEur} € is te klein voor één eenheid (koers ${quote.price} €).`,
        );
      }

      const result = await call<{ OrderId: string }>("/trade/v2/orders", {
        method: "POST",
        body: JSON.stringify({
          AccountKey: accountKey,
          Uic: Number(req.uic),
          AssetType: req.assetType,
          BuySell: "Buy",
          OrderType: "Market",
          Amount: quantity,
          ManualOrder: true,
          OrderDuration: { DurationType: "DayOrder" },
        }),
      });

      return {
        brokerRef: result.OrderId,
        price: quote.price,
        quantity,
      };
    },
  };
}
