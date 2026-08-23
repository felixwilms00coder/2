# stock-ticker-scraper

Fetches currently trending stock tickers.

## Why not X.com

X.com's Terms of Service prohibit scraping or automating data collection
outside their official API — driving a browser or hitting internal endpoints
to pull cashtag trends would violate that. The only ToS-compliant path is the
official X API (`GET /2/tweets/search/recent` with a `$TICKER` query), which
requires a paid developer account and bearer token that this project does not
have configured.

Instead, this fetches from
[StockTwits'](https://stocktwits.com) public trending-symbols endpoint
(`api.stocktwits.com/api/2/trending/symbols.json`), which is the same kind of
data — tickers currently trending in social/retail discussion — served
through a documented, public, unauthenticated API. Swapping in the X API
later just means adding a new fetcher next to `src/stocktwits.ts` and a
bearer token via an environment variable; `src/types.ts`'s `TrendingTicker`
shape is already source-agnostic.

## Usage

```bash
npm install
npm run build
npm start                  # human-readable table, top 30
npm start -- --json        # JSON array
npm start -- --limit 10    # top 10 only
```

## Development

```bash
npm run build && npm test
```

`test/stocktwits.test.ts` covers response parsing without a network call.
There is no live-network test in this repo — verify the actual HTTP fetch
works in an environment with unrestricted outbound access; it was written but
not run against the live API here.
