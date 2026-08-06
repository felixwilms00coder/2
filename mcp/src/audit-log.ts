import fs from "node:fs";
import path from "node:path";
import { mcpHome } from "./config.js";

export type AuditStatus = "previewed" | "filled" | "rejected" | "failed" | "cancelled";

export type AuditEntry = {
  id: string;
  atISO: string;
  brokerId: string;
  symbol: string;
  amountEur: number;
  status: AuditStatus;
  detail?: string;
  price?: number;
  quantity?: number;
  brokerOrderId?: string;
};

function logFile(): string {
  return path.join(mcpHome(), "orders.log.jsonl");
}

/** Append-only, local, never leaves this machine. */
export function appendAuditLog(entry: AuditEntry): void {
  fs.appendFileSync(logFile(), JSON.stringify(entry) + "\n", { mode: 0o600 });
}

export function readAuditLog(): AuditEntry[] {
  try {
    const raw = fs.readFileSync(logFile(), "utf8");
    return raw
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line) as AuditEntry);
  } catch {
    return [];
  }
}
