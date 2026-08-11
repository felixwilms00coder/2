import { checkGuardrails, isDue } from "./schedule";
import { newId } from "./store";
import {
  AgentState,
  BrokerAdapter,
  LogEntry,
  Rule,
} from "./types";

export type RunOutcome = {
  entries: LogEntry[];
  /** Rules that ran successfully, so their lastRunISO can be advanced. */
  ranRuleIds: string[];
};

function entry(
  rule: Rule,
  broker: BrokerAdapter,
  status: LogEntry["status"],
  extra: Partial<LogEntry> = {},
): LogEntry {
  return {
    id: newId(),
    atISO: new Date().toISOString(),
    ruleId: rule.id,
    ruleName: rule.name,
    symbol: rule.symbol,
    amount: rule.amount,
    brokerId: broker.id,
    status,
    ...extra,
  };
}

/**
 * Executes a single rule. Every refusal is logged with a reason, so the
 * user can always see why the agent did or did not act.
 */
export async function runRule(
  rule: Rule,
  state: AgentState,
  broker: BrokerAdapter,
  { force = false }: { force?: boolean } = {},
): Promise<LogEntry> {
  if (!state.settings.armed) {
    return entry(rule, broker, "refused", {
      detail: "The agent is paused.",
    });
  }
  if (!broker.isConnected()) {
    return entry(rule, broker, "refused", {
      detail: "Not connected to the chosen broker.",
    });
  }
  if (!force && !isDue(rule, new Date())) {
    return entry(rule, broker, "refused", {
      detail: "Not due yet according to its own schedule.",
    });
  }

  const guard = checkGuardrails(rule, state.log, new Date());
  if (!guard.ok) {
    return entry(rule, broker, "refused", { detail: guard.reason });
  }

  if (!rule.autoConfirm) {
    return entry(rule, broker, "pending", {
      detail: "Waiting for your confirmation before this order is sent.",
    });
  }

  return sendOrder(rule, broker);
}

/** Actually places the order. Used by auto-runs and by manual confirmation. */
export async function sendOrder(
  rule: Rule,
  broker: BrokerAdapter,
): Promise<LogEntry> {
  try {
    const placed = await broker.placeOrder({
      symbol: rule.symbol,
      uic: rule.uic,
      assetType: rule.assetType,
      amountEur: rule.amount,
      orderType: rule.orderType,
      limitPrice: rule.limitPrice,
    });
    return entry(rule, broker, broker.isLive ? "filled" : "simulated", {
      price: placed.price,
      quantity: placed.quantity,
      brokerRef: placed.brokerRef,
    });
  } catch (err) {
    return entry(rule, broker, "failed", {
      detail: err instanceof Error ? err.message : "Unknown error.",
    });
  }
}

/** Evaluates every enabled rule and returns what happened. */
export async function runDueRules(
  state: AgentState,
  broker: BrokerAdapter,
): Promise<RunOutcome> {
  const entries: LogEntry[] = [];
  const ranRuleIds: string[] = [];

  // Rules are evaluated against a log that grows as we go, so a monthly
  // limit spanning several rules is respected within a single run.
  let workingState = state;

  for (const rule of state.rules) {
    if (!rule.enabled) continue;
    if (!isDue(rule, new Date())) continue;

    const result = await runRule(rule, workingState, broker);
    entries.push(result);
    workingState = { ...workingState, log: [result, ...workingState.log] };

    if (result.status === "filled" || result.status === "simulated") {
      ranRuleIds.push(rule.id);
    }
  }

  return { entries, ranRuleIds };
}

export function exportLogCsv(log: LogEntry[]): string {
  const header = [
    "timestamp",
    "rule",
    "symbol",
    "amount",
    "status",
    "broker",
    "price",
    "quantity",
    "broker_ref",
    "detail",
  ].join(";");

  const rows = log.map((e) =>
    [
      e.atISO,
      e.ruleName,
      e.symbol,
      e.amount.toFixed(2),
      e.status,
      e.brokerId,
      e.price !== undefined ? e.price.toFixed(4) : "",
      e.quantity !== undefined ? e.quantity.toFixed(4) : "",
      e.brokerRef ?? "",
      (e.detail ?? "").replace(/[;\n]/g, " "),
    ].join(";"),
  );

  return [header, ...rows].join("\n");
}
