import { Pilot } from "./types";

// CIKs verified against SEC EDGAR filing history directly (not guessed):
// each links to real 13F-HR filings under that exact CIK.
export const pilots: Pilot[] = [
  {
    slug: "berkshire-hathaway",
    name: "Berkshire Hathaway",
    manager: "Warren Buffett",
    cik: "0001067983",
    description:
      "Warren Buffett's investment company. Reports its US equity positions to the SEC every quarter via Form 13F.",
  },
  {
    slug: "scion-asset-management",
    name: "Scion Asset Management",
    manager: "Michael Burry",
    cik: "0001649339",
    description: 'Michael Burry\'s hedge fund, known from "The Big Short".',
    note: "Burry announced he was closing Scion Asset Management in November 2025. What you see below is the last filed 13F report — not necessarily an active portfolio.",
  },
  {
    slug: "pershing-square",
    name: "Pershing Square Capital Management",
    manager: "Bill Ackman",
    cik: "0001336528",
    description: "Bill Ackman's activist hedge fund.",
  },
];

export function getPilot(slug: string): Pilot | undefined {
  return pilots.find((p) => p.slug === slug);
}
