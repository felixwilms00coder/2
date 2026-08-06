import { randomUUID } from "node:crypto";
import { robinhoodConfig } from "../config.js";
import {
  AccountSummary,
  BrokerClient,
  OrderRequest,
  PlacedOrder,
  Position,
  Quote,
} from "../types.js";

/**
 * Robinhood — EXPERIMENTAL, UNOFFICIAL.
 *
 * Robinhood has never published a public trading API for third-party
 * developers, in the US, EU or UK. This client talks to the same private
 * endpoints the Robinhood mobile app uses, reverse-engineered by the
 * open-source community (the shape here matches the widely used
 * robin_stocks library). Using it:
 *
 *  - Breaks Robinhood's Terms of Service. There is no legitimate
 *    integration path here, unlike IBKR's Client Portal API or Saxo's
 *    OpenAPI, both of which are officially documented and supported.
 *  - Can break without warning. Private endpoints change whenever
 *    Robinhood updates its app, with no deprecation notice and no versioned
 *    contract to rely on.
 *  - Risks the account it's connected to. Automated access from an
 *    unrecognised client is exactly the pattern brokerages' fraud/abuse
 *    systems flag; Robinhood has restricted or closed accounts for this
 *    before.
 *  - Requires deliberate opt-in. This client refuses to run unless
 *    ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API=true is set, on top of your
 *    actual credentials, so it is never enabled by accident.
 *
 * Login mirrors Robinhood's OAuth2 password grant plus its device/MFA
 * verification step. Robinhood's exact login flow has changed multiple
 * times over the years (SMS challenge, device-verification workflow, app
 * approval) — the flow below covers the classic mfa_code case. If
 * Robinhood has since introduced a different challenge type on your
 * account, this will need updating; that instability is the whole reason
 * this file carries the warning above rather than a "beta" label.
 */

const BASE = "https://api.robinhood.com";
// Robinhood's own web/mobile client id, used by essentially every
// open-source Robinhood integration since there is no per-developer
// registration process to get your own.
const CLIENT_ID = "c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS";

type Session = { accessToken: string; expiresAt: number };
let session: Session | null = null;
const deviceToken = randomUUID();

function requireAcknowledged(): void {
  if (!robinhoodConfig().unofficialApiAcknowledged) {
    throw new Error(
      "Robinhood is disabled: set ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API=true to confirm you understand this uses an unofficial, ToS-violating API before it will run.",
    );
  }
}

async function login(): Promise<string> {
  requireAcknowledged();
  if (session && session.expiresAt > Date.now()) return session.accessToken;

  const { username, password, mfaCode } = robinhoodConfig();
  if (!username || !password) {
    throw new Error("ROBINHOOD_USERNAME / ROBINHOOD_PASSWORD are not set.");
  }

  const res = await fetch(`${BASE}/oauth2/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "password",
      username,
      password,
      client_id: CLIENT_ID,
      expires_in: 86400,
      scope: "internal",
      device_token: deviceToken,
      ...(mfaCode ? { mfa_code: mfaCode } : {}),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    mfa_required?: boolean;
    mfa_type?: string;
    detail?: string;
  };

  if (!res.ok || !data.access_token) {
    if (data.mfa_required) {
      throw new Error(
        `Robinhood requires an MFA code (${data.mfa_type ?? "unknown type"}). Set ROBINHOOD_MFA_CODE and try again.`,
      );
    }
    throw new Error(
      `Robinhood login failed (${res.status}). ${data.detail ?? "Check credentials; the login flow may also have changed since this client was written."}`.trim(),
    );
  }

  session = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 - 30_000,
  };
  return session.accessToken;
}

async function call<T>(pathname: string, init?: RequestInit): Promise<T> {
  const token = await login();
  const res = await fetch(`${BASE}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Robinhood responded ${res.status}. ${body.slice(0, 200)}`.trim(),
    );
  }
  return (await res.json()) as T;
}

let cachedAccountUrl: string | null = null;
let cachedAccountNumber: string | null = null;

async function resolveAccount(): Promise<{ url: string; number: string }> {
  if (cachedAccountUrl && cachedAccountNumber) {
    return { url: cachedAccountUrl, number: cachedAccountNumber };
  }
  const data = await call<{
    results: Array<{ url: string; account_number: string }>;
  }>("/accounts/");
  const first = data.results?.[0];
  if (!first) throw new Error("No Robinhood account found for this login.");
  cachedAccountUrl = first.url;
  cachedAccountNumber = first.account_number;
  return { url: first.url, number: first.account_number };
}

async function instrumentUrlForSymbol(symbol: string): Promise<string> {
  const data = await call<{
    results: Array<{ url: string; symbol: string }>;
  }>(`/instruments/?symbol=${encodeURIComponent(symbol.toUpperCase())}`);
  const first = data.results?.[0];
  if (!first) throw new Error(`Robinhood found no instrument for "${symbol}".`);
  return first.url;
}

async function fetchQuote(symbol: string): Promise<Quote> {
  const data = await call<{ last_trade_price?: string }>(
    `/quotes/${encodeURIComponent(symbol.toUpperCase())}/`,
  );
  const price = Number(data.last_trade_price);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Robinhood returned no usable price.");
  }
  return { price, currency: "USD" };
}

export function createRobinhoodClient(): BrokerClient {
  return {
    id: "robinhood",
    label: "Robinhood (unofficial, EXPERIMENTAL)",
    isLive: () => true,
    riskNotice:
      "Unofficial, reverse-engineered API. Violates Robinhood's Terms of Service, can break without notice, and risks the account it's connected to. There is no paper/simulation mode — every order here is real. Requires ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API=true in addition to credentials.",
    isConfigured: () =>
      robinhoodConfig().unofficialApiAcknowledged &&
      Boolean(robinhoodConfig().username && robinhoodConfig().password),

    async connectionSummary() {
      if (!robinhoodConfig().unofficialApiAcknowledged) {
        return "Disabled: set ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API=true to enable this unofficial integration.";
      }
      if (!robinhoodConfig().username || !robinhoodConfig().password) {
        return "Not connected: ROBINHOOD_USERNAME / ROBINHOOD_PASSWORD are not set.";
      }
      try {
        await login();
        return "Connected via Robinhood's unofficial API. Every order here is real — there is no simulation mode.";
      } catch (err) {
        return `Not connected: ${err instanceof Error ? err.message : String(err)}`;
      }
    },

    async getAccount(): Promise<AccountSummary> {
      const account = await resolveAccount();
      const data = await call<{
        buying_power?: string;
        portfolio_cash?: string;
      }>(`${new URL(account.url).pathname}`);
      return {
        accountId: account.number,
        currency: "USD",
        cash: data.portfolio_cash ? Number(data.portfolio_cash) : undefined,
        totalValue: data.buying_power ? Number(data.buying_power) : undefined,
      };
    },

    async getPositions(): Promise<Position[]> {
      const data = await call<{
        results: Array<{
          instrument: string;
          quantity: string;
          average_buy_price: string;
        }>;
      }>("/positions/?nonzero=true");

      const positions: Position[] = [];
      for (const p of data.results ?? []) {
        const instrument = await call<{ symbol?: string }>(
          new URL(p.instrument).pathname,
        );
        positions.push({
          symbol: instrument.symbol ?? "?",
          quantity: Number(p.quantity),
          averagePrice: Number(p.average_buy_price),
          currency: "USD",
        });
      }
      return positions;
    },

    async getQuote(req): Promise<Quote> {
      return fetchQuote(req.symbol);
    },

    async placeOrder(req: OrderRequest): Promise<PlacedOrder> {
      const account = await resolveAccount();
      const instrumentUrl = await instrumentUrlForSymbol(req.symbol);
      const quote = await fetchQuote(req.symbol);
      const quantity = Math.floor(req.amountEur / quote.price);
      if (quantity < 1) {
        throw new Error(
          `Amount ${req.amountEur} is too small for one share at price ${quote.price}.`,
        );
      }

      const order = await call<{ id?: string }>("/orders/", {
        method: "POST",
        body: JSON.stringify({
          account: account.url,
          instrument: instrumentUrl,
          symbol: req.symbol.toUpperCase(),
          type: "market",
          time_in_force: "gfd",
          trigger: "immediate",
          quantity,
          side: req.side === "sell" ? "sell" : "buy",
          ref_id: randomUUID(),
        }),
      });

      if (!order.id) {
        throw new Error("Robinhood did not return an order id.");
      }
      return { brokerOrderId: order.id, price: quote.price, quantity };
    },

    async cancelOrder(brokerOrderId: string): Promise<void> {
      await call(`/orders/${brokerOrderId}/cancel/`, { method: "POST" });
    },
  };
}
