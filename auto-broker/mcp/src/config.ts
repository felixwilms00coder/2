import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Everything broker-related lives locally: credentials come from this
 * process's own environment, and the only thing written to disk is the
 * order audit log (never a token or password). Default location is outside
 * the repo entirely so nothing can end up committed by accident.
 */
const HOME = process.env.AUTOBROKER_MCP_HOME
  ? path.resolve(process.env.AUTOBROKER_MCP_HOME)
  : path.join(os.homedir(), ".auto-broker-mcp");

export function mcpHome(): string {
  fs.mkdirSync(HOME, { recursive: true, mode: 0o700 });
  return HOME;
}

export const guardrails = {
  get maxPerOrderEur(): number {
    return Number(process.env.AUTOBROKER_MAX_PER_ORDER_EUR ?? 250);
  },
  get maxPerMonthEur(): number {
    return Number(process.env.AUTOBROKER_MAX_PER_MONTH_EUR ?? 1000);
  },
};

export type IbkrMode = "paper" | "live";

export function ibkrConfig() {
  return {
    // The IBKR Client Portal Gateway you run locally always listens on
    // localhost regardless of paper vs. live — which account it talks to
    // depends on which credentials you logged the gateway in with.
    gatewayUrl: process.env.IBKR_GATEWAY_URL ?? "https://localhost:5000/v1/api",
    mode: (process.env.IBKR_MODE as IbkrMode | undefined) ?? "paper",
    accountId: process.env.IBKR_ACCOUNT_ID ?? null,
  };
}
