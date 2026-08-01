export type PlanInput = {
  /** One-off amount invested at the start, in euro. */
  start: number;
  /** Amount invested at the end of every month, in euro. */
  maandelijks: number;
  /** Investment horizon in years. */
  jaren: number;
  /** Expected gross annual return, as a percentage (e.g. 6 for 6%). */
  rendement: number;
  /** Ongoing charges of the fund/ETF, as a percentage per year. */
  kosten: number;
  /** Fixed transaction fee per periodic purchase, in euro. */
  transactiekost: number;
};

export type PlanYear = {
  jaar: number;
  ingelegd: number;
  waarde: number;
  /** Value if the same money had sat in a 0%-return account. */
  zonderRendement: number;
};

export type PlanResult = {
  ingelegd: number;
  eindwaarde: number;
  rendementBedrag: number;
  /** What the ongoing charges and transaction fees cost you over the horizon. */
  kostenBedrag: number;
  perJaar: PlanYear[];
};

/**
 * Compounds monthly, applying the ongoing charge to the portfolio and the
 * transaction fee to each periodic purchase. Deliberately simplified: it
 * ignores tax (TOB, roerende voorheffing) and assumes a constant return,
 * which real markets never deliver.
 */
export function simulatePlan(input: PlanInput): PlanResult {
  const months = Math.max(0, Math.round(input.jaren * 12));
  const netAnnual = (input.rendement - input.kosten) / 100;
  const monthlyRate = Math.pow(1 + netAnnual, 1 / 12) - 1;

  // Same schedule with no growth and no costs, to isolate the return.
  const grossAnnual = input.rendement / 100;
  const grossMonthlyRate = Math.pow(1 + grossAnnual, 1 / 12) - 1;

  let value = input.start;
  let valueNoCosts = input.start;
  let contributed = input.start;

  const perJaar: PlanYear[] = [
    {
      jaar: 0,
      ingelegd: contributed,
      waarde: value,
      zonderRendement: contributed,
    },
  ];

  for (let m = 1; m <= months; m++) {
    value *= 1 + monthlyRate;
    valueNoCosts *= 1 + grossMonthlyRate;

    const invested = Math.max(0, input.maandelijks - input.transactiekost);
    value += invested;
    valueNoCosts += input.maandelijks;
    contributed += input.maandelijks;

    if (m % 12 === 0) {
      perJaar.push({
        jaar: m / 12,
        ingelegd: contributed,
        waarde: value,
        zonderRendement: contributed,
      });
    }
  }

  return {
    ingelegd: contributed,
    eindwaarde: value,
    rendementBedrag: value - contributed,
    kostenBedrag: valueNoCosts - value,
    perJaar,
  };
}
