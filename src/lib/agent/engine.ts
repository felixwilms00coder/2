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
    return entry(rule, broker, "geweigerd", {
      detail: "De agent staat op pauze.",
    });
  }
  if (!broker.isConnected()) {
    return entry(rule, broker, "geweigerd", {
      detail: "Geen verbinding met de gekozen broker.",
    });
  }
  if (!force && !isDue(rule, new Date())) {
    return entry(rule, broker, "geweigerd", {
      detail: "Nog niet aan de beurt volgens je eigen schema.",
    });
  }

  const guard = checkGuardrails(rule, state.log, new Date());
  if (!guard.ok) {
    return entry(rule, broker, "geweigerd", { detail: guard.reason });
  }

  if (!rule.autoConfirm) {
    return entry(rule, broker, "wacht", {
      detail: "Wacht op jouw bevestiging voor deze order verstuurd wordt.",
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
    });
    return entry(rule, broker, broker.isLive ? "uitgevoerd" : "gesimuleerd", {
      price: placed.price,
      quantity: placed.quantity,
      brokerRef: placed.brokerRef,
    });
  } catch (err) {
    return entry(rule, broker, "mislukt", {
      detail: err instanceof Error ? err.message : "Onbekende fout.",
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

    if (result.status === "uitgevoerd" || result.status === "gesimuleerd") {
      ranRuleIds.push(rule.id);
    }
  }

  return { entries, ranRuleIds };
}

export function exportLogCsv(log: LogEntry[]): string {
  const header = [
    "tijdstip",
    "regel",
    "symbool",
    "bedrag_eur",
    "status",
    "broker",
    "koers",
    "aantal",
    "broker_referentie",
    "detail",
  ].join(";");

  const rows = log.map((e) =>
    [
      e.atISO,
      e.ruleName,
      e.symbol,
      e.amount.toFixed(2).replace(".", ","),
      e.status,
      e.brokerId,
      e.price !== undefined ? e.price.toFixed(4).replace(".", ",") : "",
      e.quantity !== undefined ? e.quantity.toFixed(4).replace(".", ",") : "",
      e.brokerRef ?? "",
      (e.detail ?? "").replace(/[;\n]/g, " "),
    ].join(";"),
  );

  return [header, ...rows].join("\n");
}
