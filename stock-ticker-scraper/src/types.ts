export interface TrendingTicker {
  symbol: string;
  title: string;
  watchlistCount: number;
  exchange: string | null;
}

/**
 * Shape of the relevant fields from StockTwits' public
 * GET /api/2/trending/symbols.json response. StockTwits returns more
 * fields than this; only what we use is declared.
 */
export interface StockTwitsTrendingResponse {
  response?: {
    status?: number;
  };
  symbols?: Array<{
    symbol: string;
    title?: string;
    watchlist_count?: number;
    exchange?: string | null;
  }>;
}
