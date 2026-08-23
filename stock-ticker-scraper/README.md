# stock-ticker-scraper

Fetches currently trending stock tickers.

## Why not X.com

X.com's Terms of Service prohibit scraping or automating data collection
outside their official API — driving a browser or hitting internal endpoints
to pull cashtag trends would violate that. The only ToS-compliant path is the
official X API (`GET /2/tweets/search/recent` with a `$TICKER` query), which
requires a paid developer account and bearer token that this project does not
have configured.

Instead, this project has two working sources for the same kind of data
— tickers currently trending in social/retail discussion:

- **StockTwits** (`src/stocktwits.ts`) — a public, unauthenticated
  trending-symbols endpoint. StockTwits pre-aggregates this for you.
- **Reddit** (`src/reddit.ts`) — Reddit's official API *is* free for
  moderate/non-commercial use (unlike X's), via a registered "script" app.
  Unlike StockTwits there's no pre-built "trending" endpoint, so this pulls
  hot posts from r/wallstreetbets, r/stocks and r/StockMarket and counts
  `$TICKER`-style cashtag mentions itself. Bare uppercase words (`DD`,
  `YOLO`, `ALL`) are deliberately *not* treated as tickers — too many false
  positives — so only explicit `$`-prefixed mentions count.

Swapping in the X API later just means adding a new fetcher next to these
two and a bearer token via an environment variable; `src/types.ts`'s
`TrendingTicker` shape is already source-agnostic.

### Reddit credentials

Create a free script app at
[reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) ("create app" →
type "script"), then set:

```bash
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
REDDIT_USER_AGENT=stock-ticker-scraper/0.1 by <your-reddit-username>
```

## Usage

```bash
npm install
npm run build
npm start                          # StockTwits, human-readable table, top 30
npm start -- --source reddit       # Reddit cashtag counts instead
npm start -- --json                # JSON array
npm start -- --limit 10            # top 10 only
```

## Development

```bash
npm run build && npm test
```

`test/stocktwits.test.ts` and `test/reddit.test.ts` cover response
parsing/cashtag extraction without a network call. There is no live-network
test in this repo — verify the actual HTTP fetches work in an environment
with unrestricted outbound access; they were written but not run against the
live APIs here.
