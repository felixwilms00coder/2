import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTrendingResponse } from "../src/stocktwits.js";

test("parseTrendingResponse maps StockTwits fields to TrendingTicker", () => {
  const result = parseTrendingResponse({
    response: { status: 200 },
    symbols: [
      {
        symbol: "AAPL",
        title: "Apple Inc.",
        watchlist_count: 1_500_000,
        exchange: "NASDAQ",
      },
      {
        symbol: "GME",
        watchlist_count: 900_000,
      },
    ],
  });

  assert.deepEqual(result, [
    {
      symbol: "AAPL",
      title: "Apple Inc.",
      watchlistCount: 1_500_000,
      exchange: "NASDAQ",
    },
    {
      symbol: "GME",
      title: "",
      watchlistCount: 900_000,
      exchange: null,
    },
  ]);
});

test("parseTrendingResponse rejects a response without a symbols array", () => {
  assert.throws(() => parseTrendingResponse({}), /missing symbols array/);
});
