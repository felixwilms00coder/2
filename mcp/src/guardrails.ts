import { readAuditLog } from "./audit-log.js";
import { guardrails as limits } from "./config.js";
import { OrderRequest } from "./types.js";

export type GuardrailResult = { ok: true } | { ok: false; reason: string };

function spentThisMonth(brokerId: string): number {
  const now = new Date();
  return readAuditLog()
    .filter((e) => e.brokerId === brokerId && e.status === "filled")
    .filter((e) => {
      const d = new Date(e.atISO);
      return (
        d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      );
    })
    .reduce((sum, e) => sum + e.amountEur, 0);
}

/**
 * The same shape of guardrail the web agent (src/lib/agent/schedule.ts)
 * enforces: hard per-order and per-month euro ceilings, checked against the
 * local audit log so nothing needs to be trusted from the caller.
 */
export function checkGuardrails(req: OrderRequest, brokerId: string): GuardrailResult {
  if (!(req.amountEur > 0)) {
    return { ok: false, reason: "Amount must be greater than 0." };
  }
  if (req.amountEur > limits.maxPerOrderEur) {
    return {
      ok: false,
      reason: `Amount ${req.amountEur} EUR exceeds the per-order limit of ${limits.maxPerOrderEur} EUR (set FINEDU_MAX_PER_ORDER_EUR to change it).`,
    };
  }
  const spent = spentThisMonth(brokerId);
  if (spent + req.amountEur > limits.maxPerMonthEur) {
    return {
      ok: false,
      reason: `Monthly limit reached: already ${spent} EUR of ${limits.maxPerMonthEur} EUR used this month on "${brokerId}" (set FINEDU_MAX_PER_MONTH_EUR to change it).`,
    };
  }
  return { ok: true };
}
