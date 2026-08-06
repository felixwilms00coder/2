/**
 * "Pilots" are publicly known investors whose US equity positions are
 * disclosed by law (SEC Form 13F). This is read-only, informational display
 * of public data — Auto Broker ranks nothing, recommends nothing, and there
 * is no brokerage connection or execution anywhere in this feature. See the
 * README for why that distinction matters.
 */
export type Pilot = {
  slug: string;
  name: string;
  manager: string;
  /** 10-digit, zero-padded SEC CIK for the 13F filer entity. */
  cik: string;
  description: string;
  /** Extra context shown when something about the filer needs flagging. */
  note?: string;
};

export type Holding = {
  issuer: string;
  cusip: string;
  valueUsd: number;
  shares: number;
};

export type PilotFiling = {
  filingDate: string;
  accessionNumber: string;
  holdings: Holding[];
};
