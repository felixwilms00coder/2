import { FilingSnapshot, Holding, PilotFiling } from "./types";

/**
 * Fetches a Pilot's most recently filed Form 13F-HR holdings straight from
 * SEC EDGAR — the official, free, public source. No API key, no scraping of
 * a third-party site, no data Auto Broker curates or edits.
 *
 * SEC's fair-access policy requires a descriptive User-Agent identifying who
 * is making the requests (https://www.sec.gov/os/webmaster-faq#developers).
 * Set SEC_EDGAR_CONTACT_EMAIL so SEC can reach you if these requests ever
 * need attention; without it, requests still go out but with a generic
 * identifier SEC may rate-limit more aggressively.
 */

function userAgent(): string {
  // HTTP header values must be ByteString (Latin-1) - no em dashes or other
  // non-ASCII characters here, or fetch() throws before the request is sent.
  const contact = process.env.SEC_EDGAR_CONTACT_EMAIL;
  return contact
    ? `AutoBroker Pilots feature (${contact})`
    : "AutoBroker Pilots feature (contact not configured, set SEC_EDGAR_CONTACT_EMAIL)";
}

async function secFetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": userAgent(), Accept: "application/json" },
    // 13F data changes quarterly; six hours keeps this fresh without
    // hammering SEC's servers on every page view.
    next: { revalidate: 21_600 },
  });
  if (!res.ok) {
    throw new Error(`SEC EDGAR responded ${res.status} for ${url}`);
  }
  return (await res.json()) as T;
}

async function secFetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": userAgent() },
    next: { revalidate: 21_600 },
  });
  if (!res.ok) {
    throw new Error(`SEC EDGAR responded ${res.status} for ${url}`);
  }
  return res.text();
}

type SubmissionsResponse = {
  filings?: {
    recent?: {
      form?: string[];
      filingDate?: string[];
      accessionNumber?: string[];
    };
  };
};

type FilingSummary = { accessionNumber: string; filingDate: string };

/** Newest-first list of up to `limit` 13F-HR filings from SEC's recent-submissions window. */
async function listThirteenFFilings(
  cik: string,
  limit: number,
): Promise<FilingSummary[]> {
  const data = await secFetchJson<SubmissionsResponse>(
    `https://data.sec.gov/submissions/CIK${cik}.json`,
  );
  const recent = data.filings?.recent;
  const forms = recent?.form ?? [];
  const out: FilingSummary[] = [];
  for (let i = 0; i < forms.length && out.length < limit; i++) {
    const accessionNumber = recent?.accessionNumber?.[i];
    const filingDate = recent?.filingDate?.[i];
    if (forms[i] === "13F-HR" && accessionNumber && filingDate) {
      out.push({ accessionNumber, filingDate });
    }
  }
  if (out.length === 0) {
    throw new Error("No 13F-HR filing found in the recent SEC submissions.");
  }
  return out;
}

type FilingIndex = {
  directory?: { item?: { name: string }[] };
};

async function findInfoTableFile(
  cikNoLeadingZeros: string,
  accessionNoDashes: string,
): Promise<string> {
  const index = await secFetchJson<FilingIndex>(
    `https://www.sec.gov/Archives/edgar/data/${cikNoLeadingZeros}/${accessionNoDashes}/index.json`,
  );
  const items = index.directory?.item ?? [];
  const infoTable = items.find((i) => /infotable/i.test(i.name));
  if (!infoTable) {
    throw new Error("No infoTable file found in this 13F filing.");
  }
  return infoTable.name;
}

function extractTag(block: string, tag: string): string | undefined {
  // Filers occasionally namespace-prefix elements (e.g. <ns1:nameOfIssuer>),
  // so the prefix is optional here rather than assumed away.
  const match = block.match(
    new RegExp(`<(?:\\w+:)?${tag}[^>]*>([^<]*)<\\/(?:\\w+:)?${tag}>`, "i"),
  );
  return match?.[1]?.trim();
}

function parseInfoTable(xml: string): Holding[] {
  const blocks = xml.match(/<(?:\w+:)?infoTable[^>]*>[\s\S]*?<\/(?:\w+:)?infoTable>/gi) ?? [];
  const holdings = blocks.map((block): Holding => {
    const valueRaw = extractTag(block, "value");
    const sharesRaw = extractTag(block, "sshPrnamt");
    return {
      issuer: extractTag(block, "nameOfIssuer") ?? "Unknown",
      cusip: extractTag(block, "cusip") ?? "",
      // 13F values are reported in thousands of USD.
      valueUsd: valueRaw ? Number(valueRaw) * 1000 : 0,
      shares: sharesRaw ? Number(sharesRaw) : 0,
    };
  });
  return holdings
    .filter((h) => h.valueUsd > 0)
    .sort((a, b) => b.valueUsd - a.valueUsd);
}

async function fetchHoldingsForFiling(
  cik: string,
  accessionNumber: string,
): Promise<Holding[]> {
  const cikNoLeadingZeros = String(Number(cik));
  const accessionNoDashes = accessionNumber.replace(/-/g, "");
  const fileName = await findInfoTableFile(cikNoLeadingZeros, accessionNoDashes);
  const xml = await secFetchText(
    `https://www.sec.gov/Archives/edgar/data/${cikNoLeadingZeros}/${accessionNoDashes}/${fileName}`,
  );
  return parseInfoTable(xml);
}

export async function fetchLatestFiling(cik: string): Promise<PilotFiling> {
  const [latest] = await listThirteenFFilings(cik, 1);
  const holdings = await fetchHoldingsForFiling(cik, latest.accessionNumber);
  return { filingDate: latest.filingDate, accessionNumber: latest.accessionNumber, holdings };
}

/**
 * Up to `quarters` most recent 13F-HR filings, newest first, each with its
 * holdings and total reported value — enough to chart a trend and diff
 * consecutive quarters. Fetched in parallel: each filing is 2 requests
 * (the filing index, then the info table XML), so 6 quarters is ~12
 * requests total rather than 12 sequential round trips.
 */
export async function fetchPilotHistory(
  cik: string,
  quarters = 6,
): Promise<FilingSnapshot[]> {
  const filings = await listThirteenFFilings(cik, quarters);
  const snapshots = await Promise.all(
    filings.map(async (f): Promise<FilingSnapshot> => {
      const holdings = await fetchHoldingsForFiling(cik, f.accessionNumber);
      const totalValueUsd = holdings.reduce((sum, h) => sum + h.valueUsd, 0);
      return {
        filingDate: f.filingDate,
        accessionNumber: f.accessionNumber,
        holdings,
        totalValueUsd,
      };
    }),
  );
  return snapshots;
}

export function filingIndexUrl(cik: string, accessionNumber: string): string {
  const cikNoLeadingZeros = String(Number(cik));
  const accessionNoDashes = accessionNumber.replace(/-/g, "");
  return `https://www.sec.gov/Archives/edgar/data/${cikNoLeadingZeros}/${accessionNoDashes}/${accessionNumber}-index.htm`;
}
