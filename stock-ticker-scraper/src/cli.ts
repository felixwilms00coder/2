import { fetchTrendingTickers } from "./stocktwits.js";

function parseArgs(argv: string[]) {
  let limit = 30;
  let json = false;

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
    }
  }

  return { limit, json };
}

async function main() {
  const { limit, json } = parseArgs(process.argv.slice(2));
  const tickers = (await fetchTrendingTickers()).slice(0, limit);

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
