import { LogEntry, Rule } from "./types";

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

/** Moves a date forward to the next weekday if it lands on a weekend. */
function skipWeekend(d: Date): Date {
  const day = d.getDay();
  if (day === 6) return addDays(d, 2);
  if (day === 0) return addDays(d, 1);
  return d;
}

/**
 * The next moment a rule should fire, given when it last ran.
 * Markets are closed at weekends, so dates roll forward to the next weekday.
 */
export function nextRunDate(rule: Rule, from: Date = new Date()): Date {
  const today = startOfDay(from);
  const last = rule.lastRunISO ? startOfDay(new Date(rule.lastRunISO)) : null;

  if (rule.frequency === "weekly" || rule.frequency === "biweekly") {
    const step = rule.frequency === "weekly" ? 7 : 14;
    if (last) return skipWeekend(addDays(last, step));

    // First run: the coming occurrence of the chosen weekday.
    const target = Math.min(5, Math.max(1, rule.weekday));
    let d = today;
    for (let i = 0; i < 7; i++) {
      if (d.getDay() === target) break;
      d = addDays(d, 1);
    }
    return skipWeekend(d);
  }

  // Monthly. If the chosen day has already passed this month and the rule
  // has not run yet, it is due now — otherwise opening the page a day late
  // would silently skip a whole month.
  const day = Math.min(28, Math.max(1, rule.dayOfMonth));
  if (!last) {
    return skipWeekend(new Date(today.getFullYear(), today.getMonth(), day));
  }
  const next = new Date(last.getFullYear(), last.getMonth() + 1, day);
  return skipWeekend(next);
}

export function isDue(rule: Rule, now: Date = new Date()): boolean {
  if (!rule.enabled) return false;
  return nextRunDate(rule, now) <= startOfDay(now);
}

/** Amount already committed for a rule in the calendar month of `now`. */
export function spentThisMonth(
  ruleId: string,
  log: LogEntry[],
  now: Date = new Date(),
): number {
  return log
    .filter((e) => {
      if (e.ruleId !== ruleId) return false;
      if (e.status !== "filled" && e.status !== "simulated") return false;
      const d = new Date(e.atISO);
      return (
        d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);
}

export type GuardrailResult = { ok: true } | { ok: false; reason: string };

/** The user's own limits, checked before anything is sent. */
export function checkGuardrails(
  rule: Rule,
  log: LogEntry[],
  now: Date = new Date(),
): GuardrailResult {
  if (rule.amount <= 0) {
    return { ok: false, reason: "Amount is 0." };
  }
  if (rule.amount > rule.maxPerOrder) {
    return {
      ok: false,
      reason: `Amount ${rule.amount} is above your per-order limit of ${rule.maxPerOrder}.`,
    };
  }
  const spent = spentThisMonth(rule.id, log, now);
  if (spent + rule.amount > rule.maxPerMonth) {
    return {
      ok: false,
      reason: `Monthly limit reached: already ${spent} of ${rule.maxPerMonth} used this month.`,
    };
  }
  return { ok: true };
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
