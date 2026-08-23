import type { StockTwitsTrendingResponse, TrendingTicker } from "./types.js";

export const TRENDING_SYMBOLS_URL =
  "https://api.stocktwits.com/api/2/trending/symbols.json";

/**
 * Turns a raw StockTwits trending-symbols response into our TrendingTicker
 * shape. Kept separate from fetchTrendingTickers() so it can be unit tested
 * without a network call.
 */
export function parseTrendingResponse(
  data: StockTwitsTrendingResponse,
): TrendingTicker[] {
  if (!Array.isArray(data.symbols)) {
    throw new Error("Unexpected response shape: missing symbols array");
  }

  return data.symbols.map((s) => ({
    symbol: s.symbol,
    title: s.title ?? "",
    watchlistCount: s.watchlist_count ?? 0,
    exchange: s.exchange ?? null,
  }));
}

export async function fetchTrendingTickers(
  fetchImpl: typeof fetch = fetch,
): Promise<TrendingTicker[]> {
  const res = await fetchImpl(TRENDING_SYMBOLS_URL, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(
      `StockTwits request failed: ${res.status} ${res.statusText}`,
    );
  }

  const data = (await res.json()) as StockTwitsTrendingResponse;
  return parseTrendingResponse(data);
}
