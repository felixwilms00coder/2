import { FilingSnapshot, PositionChange } from "./types";

/**
 * Compares two consecutive 13F-HR filings by share count (not dollar value —
 * value moves with price alone, share count only moves when the filer
 * actually traded) and buckets every position into one of five categories.
 * Pure and informational: this only describes what changed between two
 * public filings, it doesn't rank or recommend anything.
 */
export function diffFilings(
  current: FilingSnapshot,
  previous: FilingSnapshot | undefined,
): PositionChange[] {
  if (!previous) return [];

  const currentTotal = current.totalValueUsd || 1;
  const previousTotal = previous.totalValueUsd || 1;
  const previousByCusip = new Map(previous.holdings.map((h) => [h.cusip, h]));
  const seen = new Set<string>();
  const changes: PositionChange[] = [];

  for (const h of current.holdings) {
    seen.add(h.cusip);
    const prev = previousByCusip.get(h.cusip);
    const currentPct = (h.valueUsd / currentTotal) * 100;
    if (!prev) {
      changes.push({
        issuer: h.issuer,
        cusip: h.cusip,
        category: "new",
        previousPct: 0,
        currentPct,
      });
      continue;
    }
    const previousPct = (prev.valueUsd / previousTotal) * 100;
    changes.push({
      issuer: h.issuer,
      cusip: h.cusip,
      category:
        h.shares > prev.shares
          ? "increased"
          : h.shares < prev.shares
            ? "decreased"
            : "unchanged",
      previousPct,
      currentPct,
    });
  }

  for (const [cusip, h] of previousByCusip) {
    if (seen.has(cusip)) continue;
    changes.push({
      issuer: h.issuer,
      cusip,
      category: "closed",
      previousPct: (h.valueUsd / previousTotal) * 100,
      currentPct: 0,
    });
  }

  const order: Record<PositionChange["category"], number> = {
    new: 0,
    increased: 1,
    unchanged: 2,
    decreased: 3,
    closed: 4,
  };
  return changes.sort(
    (a, b) => order[a.category] - order[b.category] || b.currentPct - a.currentPct,
  );
}
