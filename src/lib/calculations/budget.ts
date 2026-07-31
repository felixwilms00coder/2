export type BudgetSplit = {
  noden: number;
  wensen: number;
  sparen: number;
};

export function calculateBudgetSplit(nettoInkomen: number): BudgetSplit {
  const income = Math.max(0, nettoInkomen);
  return {
    noden: income * 0.5,
    wensen: income * 0.3,
    sparen: income * 0.2,
  };
}
