import { BrokerAdapter, OrderRequest, PlacedOrder, Quote } from "../types";

/**
 * Interactive Brokers via the Client Portal Web API — run entirely from the
 * browser against the user's own, locally-running IBKR Client Portal
 * Gateway (the same Java process IBKR ships for this API). There is no
 * FinEdu backend in this path: every call goes straight from this tab to
 * https://localhost:5000, exactly like the Saxo adapter goes straight to
 * Saxo.
 *
 * Setup the user has to do once, outside this app:
 *  1. Download and run IBKR's Client Portal Gateway.
 *  2. Open https://localhost:5000 in a browser tab and log in there with
 *     their own IBKR credentials — that tab (or this one, doesn't matter)
 *     holds the actual session; this adapter never sees an IBKR password.
 *  3. Since the gateway's certificate is self-signed, the browser will warn
 *     about it once; accepting that warning is IBKR's own standard setup
 *     step for this API, not something specific to FinEdu.
 *
 * ⚠️ Same caveat as Saxo: written to IBKR's documented Client Portal Web
 * API shape, but validate against a **paper** account before ever trusting
 * it with a live one. The gateway's own account choice (paper vs live)
 * comes entirely from which credentials were used to log in — there is no
 * separate "sim/live" toggle here the way Saxo has SAXO_MODE.
 */

const GATEWAY_KEY = "finedu:ibkr:gatewayurl";
const DEFAULT_GATEWAY = "https://localhost:5000/v1/api";

function session(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function ibkrStoreGatewayUrl(url: string) {
  const s = session();
  if (!s) return;
  s.setItem(GATEWAY_KEY, url);
  cachedAccountId = null; // a different gateway may serve a different account
}

export function ibkrClearGatewayUrl() {
  session()?.removeItem(GATEWAY_KEY);
  cachedAccountId = null;
}

export function ibkrGatewayUrl(): string {
  return session()?.getItem(GATEWAY_KEY) || DEFAULT_GATEWAY;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${ibkrGatewayUrl()}${path}`, {
    ...init,
    // The gateway authenticates via a session cookie set when the user logs
    // in at https://localhost:5000 — the request needs it included.
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `IBKR gateway antwoordde met ${res.status}. ${body.slice(0, 200)}`.trim(),
    );
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}

let cachedAccountId: string | null = null;

async function resolveAccountId(): Promise<string> {
  if (cachedAccountId) return cachedAccountId;
  const data = await call<{ accounts?: string[] }>("/iserver/accounts");
  const first = data.accounts?.[0];
  if (!first) {
    throw new Error(
      "Geen rekeningen gevonden. Log eerst in op https://localhost:5000.",
    );
  }
  cachedAccountId = first;
  return first;
}

/**
 * IBKR paper accounts conventionally get an id starting with "DU", live
 * accounts with "U" followed by digits. This is a best-effort read of that
 * convention for the warning banner, not a guarantee — the gateway does not
 * expose an explicit "this is a paper account" flag. Verify in IBKR's own
 * account management if this matters to you.
 */
function looksLikePaperAccountId(accountId: string): boolean {
  return accountId.toUpperCase().startsWith("DU");
}

async function findConid(symbol: string): Promise<number> {
  const results = await call<Array<{ conid: number }>>(
    `/iserver/secdef/search?symbol=${encodeURIComponent(symbol)}`,
  );
  const first = results[0];
  if (!first) throw new Error(`IBKR vond geen instrument voor "${symbol}".`);
  return first.conid;
}

async function snapshotPrice(conid: number): Promise<number> {
  // The snapshot endpoint primes a market data subscription on the first
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
  throw new Error("IBKR gaf geen bruikbare koers terug voor dit instrument.");
}

// Module-level rather than per-instance: there is one IBKR connection per
// tab, and ibkrCheckConnection() (called from the connection UI) needs to
// update the same flag the broker's isLive getter reads.
let knownLive = false;

/** Live check used by the connection UI — updates knownLive as a side effect. */
export async function ibkrCheckConnection(): Promise<string> {
  try {
    const status = await call<{ authenticated?: boolean }>("/iserver/auth/status");
    if (!status.authenticated) {
      return "Gateway bereikbaar, maar nog niet ingelogd. Open https://localhost:5000 en log in.";
    }
    const accountId = await resolveAccountId();
    knownLive = !looksLikePaperAccountId(accountId);
    return knownLive
      ? `Verbonden. Rekening ${accountId} ziet er NIET uit als een paper-account — dubbelcheck dit zelf voor je iets uitvoert.`
      : `Verbonden. Rekening ${accountId} ziet eruit als een paper-account.`;
  } catch (err) {
    return `Niet bereikbaar op ${ibkrGatewayUrl()}: ${err instanceof Error ? err.message : String(err)}`;
  }
}

export function createIbkrBroker(): BrokerAdapter {
  return {
    id: "ibkr",
    label: "Interactive Brokers (eigen koppeling)",
    get isLive() {
      return knownLive;
    },
    isConnected: () => true, // checked live via ibkrCheckConnection(); no local token to test

    connectionSummary: () => {
      // Synchronous per the BrokerAdapter interface, so this reports the
      // last known state from ibkrCheckConnection()/placeOrder(); those
      // always re-check auth live and fail clearly if the session expired.
      return knownLive
        ? "Verbonden met de IBKR Client Portal Gateway — rekening ziet er niet uit als een paper-account. Orders kosten mogelijk echt geld."
        : "Verbonden met de IBKR Client Portal Gateway (of nog niet gecontroleerd). Log in op https://localhost:5000 als orders mislukken.";
    },

    async getQuote(req: OrderRequest): Promise<Quote> {
      const conid = req.uic ? Number(req.uic) : await findConid(req.symbol);
      const price = await snapshotPrice(conid);
      return { price, currency: "USD" };
    },

    async placeOrder(req: OrderRequest): Promise<PlacedOrder> {
      const accountId = await resolveAccountId();
      knownLive = !looksLikePaperAccountId(accountId);

      const conid = req.uic ? Number(req.uic) : await findConid(req.symbol);
      const price = await snapshotPrice(conid);
      const quantity = Math.floor(req.amountEur / price);
      if (quantity < 1) {
        throw new Error(
          `Bedrag van ${req.amountEur} is te klein voor één eenheid (koers ${price}).`,
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
                side: "BUY",
                quantity,
                tif: "DAY",
              },
            ],
          }),
        },
      );

      // IBKR often answers a market order with a risk-warning "question"
      // that must be replied to before it reaches the exchange. Confirming
      // it here is safe because the user already confirmed via FinEdu's own
      // confirm-before-send step (autoConfirm / the "Versturen" button in
      // agent-dashboard.tsx) before this function was ever called — this is
      // IBKR's own internal dialog, not a second human gate.
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
        throw new Error("IBKR gaf geen order-id terug — controleer de gateway.");
      }
      return { brokerRef: orderId, price, quantity };
    },
  };
}
