import type { TrendingTicker } from "./types.js";

export const DEFAULT_SUBREDDITS = ["wallstreetbets", "stocks", "StockMarket"];

const TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const API_BASE = "https://oauth.reddit.com";

// Cashtag-style mentions ($AAPL) are the only reliable signal — bare
// uppercase words are far too noisy (acronyms, WSB slang like DD/YOLO,
// tickers that double as common words like "ALL" or "IT").
const CASHTAG_PATTERN = /\$([A-Za-z]{1,5})\b/g;

export interface RedditCredentials {
  clientId: string;
  clientSecret: string;
  userAgent: string;
}

export function credentialsFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): RedditCredentials {
  const clientId = env.REDDIT_CLIENT_ID;
  const clientSecret = env.REDDIT_CLIENT_SECRET;
  const userAgent = env.REDDIT_USER_AGENT;

  if (!clientId || !clientSecret || !userAgent) {
    throw new Error(
      "Missing Reddit credentials: set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET " +
        "and REDDIT_USER_AGENT (see README for how to create a Reddit script app).",
    );
  }

  return { clientId, clientSecret, userAgent };
}

interface RedditPost {
  data?: {
    title?: string;
    selftext?: string;
  };
}

interface RedditListing {
  data?: {
    children?: RedditPost[];
  };
}

/**
 * Extracts cashtag mentions ($TICKER) from a batch of post texts and
 * returns them as TrendingTicker-shaped entries sorted by mention count.
 * Pure/synchronous so it can be unit tested without a network call.
 */
export function countCashtagMentions(texts: string[]): TrendingTicker[] {
  const counts = new Map<string, number>();

  for (const text of texts) {
    for (const match of text.matchAll(CASHTAG_PATTERN)) {
      const symbol = match[1].toUpperCase();
      counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([symbol, watchlistCount]) => ({
      symbol,
      title: "",
      watchlistCount,
      exchange: null,
    }));
}

async function getAccessToken(
  creds: RedditCredentials,
  fetchImpl: typeof fetch,
): Promise<string> {
  const res = await fetchImpl(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString(
          "base64",
        ),
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": creds.userAgent,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(
      `Reddit token request failed: ${res.status} ${res.statusText}`,
    );
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Reddit token response missing access_token");
  }
  return data.access_token;
}

async function fetchSubredditTexts(
  subreddit: string,
  token: string,
  creds: RedditCredentials,
  fetchImpl: typeof fetch,
): Promise<string[]> {
  const res = await fetchImpl(
    `${API_BASE}/r/${subreddit}/hot.json?limit=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": creds.userAgent,
      },
    },
  );

  if (!res.ok) {
    throw new Error(
      `Reddit request for r/${subreddit} failed: ${res.status} ${res.statusText}`,
    );
  }

  const listing = (await res.json()) as RedditListing;
  const children = listing.data?.children ?? [];
  return children.map(
    (c) => `${c.data?.title ?? ""} ${c.data?.selftext ?? ""}`,
  );
}

export async function fetchTrendingTickersFromReddit(
  subreddits: string[] = DEFAULT_SUBREDDITS,
  creds: RedditCredentials = credentialsFromEnv(),
  fetchImpl: typeof fetch = fetch,
): Promise<TrendingTicker[]> {
  const token = await getAccessToken(creds, fetchImpl);
  const texts: string[] = [];

  for (const subreddit of subreddits) {
    texts.push(...(await fetchSubredditTexts(subreddit, token, creds, fetchImpl)));
  }

  return countCashtagMentions(texts);
}
