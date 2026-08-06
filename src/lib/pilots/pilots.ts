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
      "Investeringsmaatschappij van Warren Buffett. Meldt elk kwartaal zijn Amerikaanse aandelenposities aan de SEC via formulier 13F.",
  },
  {
    slug: "scion-asset-management",
    name: "Scion Asset Management",
    manager: "Michael Burry",
    cik: "0001649339",
    description:
      'Hedgefonds van Michael Burry, bekend van "The Big Short".',
    note: "Burry kondigde in november 2025 aan Scion Asset Management te sluiten. Wat je hieronder ziet is het laatst ingediende 13F-rapport — mogelijk geen actieve portefeuille meer.",
  },
  {
    slug: "pershing-square",
    name: "Pershing Square Capital Management",
    manager: "Bill Ackman",
    cik: "0001336528",
    description: "Activistisch hedgefonds van Bill Ackman.",
  },
];

export function getPilot(slug: string): Pilot | undefined {
  return pilots.find((p) => p.slug === slug);
}
