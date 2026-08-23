import { fetchTrendingTickers } from "./stocktwits.js";
import { fetchTrendingTickersFromReddit } from "./reddit.js";

type Source = "stocktwits" | "reddit";

function parseArgs(argv: string[]) {
  let limit = 30;
  let json = false;
  let source: Source = "stocktwits";

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--json") {
      json = true;
    } else if (arg === "--limit") {
      const value = Number(argv[++i]);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error("--limit expects a positive number");
      }
      limit = value;
    } else if (arg === "--source") {
      const value = argv[++i];
      if (value !== "stocktwits" && value !== "reddit") {
        throw new Error('--source must be "stocktwits" or "reddit"');
      }
      source = value;
    }
  }

  return { limit, json, source };
}

async function main() {
  const { limit, json, source } = parseArgs(process.argv.slice(2));
  const tickers = (
    await (source === "reddit"
      ? fetchTrendingTickersFromReddit()
      : fetchTrendingTickers())
  ).slice(0, limit);

  if (json) {
    console.log(JSON.stringify(tickers, null, 2));
    return;
  }

  const symbolWidth = Math.max(6, ...tickers.map((t) => t.symbol.length));
  for (const t of tickers) {
    console.log(
      `${t.symbol.padEnd(symbolWidth)}  ${t.watchlistCount
        .toString()
        .padStart(8)}  ${t.title}`,
    );
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
