export function monthsToReachGoal(
  doel: number,
  huidig: number,
  maandelijks: number,
): number | null {
  const remaining = doel - huidig;
  if (remaining <= 0) return 0;
  if (maandelijks <= 0) return null;
  return Math.ceil(remaining / maandelijks);
}

export function requiredMonthlyAmount(
  doel: number,
  huidig: number,
  maanden: number,
): number {
  const remaining = Math.max(0, doel - huidig);
  if (maanden <= 0) return remaining;
  return remaining / maanden;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}
