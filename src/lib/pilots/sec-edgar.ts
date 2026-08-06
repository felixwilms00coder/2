import { Holding, PilotFiling } from "./types";

/**
 * Fetches a Pilot's most recently filed Form 13F-HR holdings straight from
 * SEC EDGAR — the official, free, public source. No API key, no scraping of
 * a third-party site, no data FinEdu curates or edits.
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
    ? `FinEdu Pilots feature (${contact})`
    : "FinEdu Pilots feature (contact not configured, set SEC_EDGAR_CONTACT_EMAIL)";
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

async function latestThirteenF(
  cik: string,
): Promise<{ accessionNumber: string; filingDate: string }> {
  const data = await secFetchJson<SubmissionsResponse>(
    `https://data.sec.gov/submissions/CIK${cik}.json`,
  );
  const recent = data.filings?.recent;
  const forms = recent?.form ?? [];
  const idx = forms.findIndex((f) => f === "13F-HR");
  if (idx === -1 || !recent?.accessionNumber?.[idx] || !recent?.filingDate?.[idx]) {
    throw new Error("Geen 13F-HR-melding gevonden in de recente SEC-indieningen.");
  }
  return {
    accessionNumber: recent.accessionNumber[idx],
    filingDate: recent.filingDate[idx],
  };
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
    throw new Error("Geen infoTable-bestand gevonden in deze 13F-indiening.");
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
      issuer: extractTag(block, "nameOfIssuer") ?? "Onbekend",
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

export async function fetchLatestFiling(cik: string): Promise<PilotFiling> {
  const { accessionNumber, filingDate } = await latestThirteenF(cik);
  const cikNoLeadingZeros = String(Number(cik));
  const accessionNoDashes = accessionNumber.replace(/-/g, "");
  const fileName = await findInfoTableFile(cikNoLeadingZeros, accessionNoDashes);
  const xml = await secFetchText(
    `https://www.sec.gov/Archives/edgar/data/${cikNoLeadingZeros}/${accessionNoDashes}/${fileName}`,
  );
  return { filingDate, accessionNumber, holdings: parseInfoTable(xml) };
}

export function filingIndexUrl(cik: string, accessionNumber: string): string {
  const cikNoLeadingZeros = String(Number(cik));
  const accessionNoDashes = accessionNumber.replace(/-/g, "");
  return `https://www.sec.gov/Archives/edgar/data/${cikNoLeadingZeros}/${accessionNoDashes}/${accessionNumber}-index.htm`;
}
