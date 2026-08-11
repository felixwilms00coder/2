"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  Download,
  Pause,
  Play,
  Plug,
  Power,
  Trash2,
  X,
} from "lucide-react";
import { useAgent, brokers } from "./use-agent";
import { RuleForm } from "./rule-form";
import { exportLogCsv, runDueRules, runRule, sendOrder } from "@/lib/agent/engine";
import { formatDate, nextRunDate, spentThisMonth } from "@/lib/agent/schedule";
import { LogEntry, Rule } from "@/lib/agent/types";
import {
  ibkrCheckConnection,
  ibkrClearGatewayUrl,
  ibkrGatewayUrl,
  ibkrStoreGatewayUrl,
} from "@/lib/agent/brokers/ibkr";

function money(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

const statusStyle: Record<LogEntry["status"], string> = {
  filled: "bg-accent text-accent-contrast",
  simulated: "bg-accent-soft text-accent",
  pending: "bg-warning-light text-warning",
  refused: "bg-surface-muted text-muted",
  failed: "bg-warning-light text-warning",
};

export function AgentDashboard() {
  const {
    ready,
    state,
    broker,
    addRule,
    updateRule,
    removeRule,
    addLog,
    markRan,
    setArmed,
    setBrokerId,
    clearLog,
    removeLogEntry,
  } = useAgent();

  const [busy, setBusy] = useState(false);
  const [gatewayUrl, setGatewayUrl] = useState(ibkrGatewayUrl());
  const [ibkrMsg, setIbkrMsg] = useState<string | null>(null);
  const [ibkrBusy, setIbkrBusy] = useState(false);

  if (!ready) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8">
        <p className="text-muted">Loading your agent…</p>
      </div>
    );
  }

  const pending = state.log.filter((e) => e.status === "pending");

  async function runNow() {
    setBusy(true);
    try {
      const outcome = await runDueRules(state, broker);
      if (outcome.entries.length === 0) {
        addLog([
          {
            id: `${Date.now()}`,
            atISO: new Date().toISOString(),
            ruleId: "-",
            ruleName: "Check",
            symbol: "-",
            amount: 0,
            status: "refused",
            brokerId: broker.id,
            detail: "No rule was scheduled for today.",
          },
        ]);
      } else {
        addLog(outcome.entries);
        markRan(outcome.ranRuleIds);
      }
    } finally {
      setBusy(false);
    }
  }

  async function runOne(rule: Rule) {
    setBusy(true);
    try {
      const entry = await runRule(rule, state, broker, { force: true });
      addLog([entry]);
      if (entry.status === "filled" || entry.status === "simulated") {
        markRan([rule.id]);
      }
    } finally {
      setBusy(false);
    }
  }

  async function confirmPending(entry: LogEntry) {
    const rule = state.rules.find((r) => r.id === entry.ruleId);
    if (!rule) return;
    setBusy(true);
    try {
      const result = await sendOrder(rule, broker);
      addLog([result]);
      if (result.status === "filled" || result.status === "simulated") {
        markRan([rule.id]);
      }
      // The pending entry is resolved, so it no longer needs an answer.
      removeLogEntry(entry.id);
    } finally {
      setBusy(false);
    }
  }

  function saveGatewayUrl(url: string) {
    ibkrStoreGatewayUrl(url);
    setGatewayUrl(url);
  }

  async function checkIbkr() {
    setIbkrBusy(true);
    try {
      const msg = await ibkrCheckConnection();
      setIbkrMsg(msg);
    } finally {
      setIbkrBusy(false);
    }
  }

  function downloadLog() {
    const blob = new Blob([exportLogCsv(state.log)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "autobroker-agent-log.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* Status bar */}
      <div
        className={`rounded-3xl border-2 p-5 ${
          state.settings.armed && broker.isLive
            ? "border-warning bg-warning-light"
            : state.settings.armed
              ? "border-accent bg-accent-soft"
              : "border-border bg-surface"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Power
              className={`mt-0.5 h-6 w-6 shrink-0 ${
                state.settings.armed ? "text-accent" : "text-muted"
              }`}
              aria-hidden="true"
            />
            <div>
              <p className="font-display font-bold text-foreground">
                {state.settings.armed
                  ? broker.isLive
                    ? "Active — real orders"
                    : "Active — simulation"
                  : "Paused"}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {broker.connectionSummary()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setArmed(!state.settings.armed)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
              state.settings.armed
                ? "border border-border bg-surface text-foreground hover:border-warning hover:text-warning"
                : "bg-accent text-accent-contrast hover:bg-accent-strong"
            }`}
          >
            {state.settings.armed ? (
              <>
                <Pause className="h-4 w-4" aria-hidden="true" />
                Pause everything
              </>
            ) : (
              <>
                <Play className="h-4 w-4" aria-hidden="true" />
                Activate agent
              </>
            )}
          </button>
        </div>

        {state.settings.armed && broker.isLive && (
          <p className="mt-4 flex gap-2.5 rounded-2xl bg-surface p-3.5 text-sm text-foreground/90">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-warning"
              aria-hidden="true"
            />
            Your agent is armed against a live account. Every rule that runs
            is a real purchase in your name.
          </p>
        )}
      </div>

      {/* Broker connection */}
      <section
        aria-labelledby="connection"
        className="rounded-3xl border border-border bg-surface p-6"
      >
        <h2
          id="connection"
          className="flex items-center gap-2 font-display text-lg font-bold text-foreground"
        >
          <Plug className="h-5 w-5 text-accent" aria-hidden="true" />
          Connection
        </h2>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-foreground">
            Where should your orders be sent?
          </legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {brokers.map((b) => (
              <label
                key={b.id}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${
                  state.settings.brokerId === b.id
                    ? "border-accent border-2 bg-accent-soft"
                    : "border-border hover:border-accent"
                }`}
              >
                <input
                  type="radio"
                  name="broker"
                  checked={state.settings.brokerId === b.id}
                  onChange={() => setBrokerId(b.id)}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                <span className="text-sm font-semibold text-foreground">
                  {b.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {state.settings.brokerId === "ibkr" && (
          <div className="mt-5 rounded-2xl border border-dashed border-warning/50 bg-warning-light p-4">
            <p className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                aria-hidden="true"
              />
              <span>
                <span className="font-bold">
                  This connection goes straight to your own IBKR Client
                  Portal Gateway.
                </span>{" "}
                Download and start that gateway yourself, log in at{" "}
                <a
                  href="https://localhost:5000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  https://localhost:5000
                </a>{" "}
                with your own IBKR account, and accept the browser&apos;s
                certificate warning once — that&apos;s part of this API, not Auto
                Broker. This page then talks straight to that gateway;
                there&apos;s no Auto Broker server in that path. Start with a
                paper account until you&apos;re sure.
              </span>
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="ibkr-gateway"
                  className="text-sm font-semibold text-foreground"
                >
                  Your gateway address
                </label>
                <input
                  id="ibkr-gateway"
                  value={gatewayUrl}
                  onChange={(e) => saveGatewayUrl(e.target.value)}
                  placeholder="https://localhost:5000/v1/api"
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-mono text-sm text-foreground focus:border-accent"
                />
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={checkIbkr}
                  disabled={ibkrBusy}
                  className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-45"
                >
                  Check connection
                </button>
                <button
                  type="button"
                  onClick={() => {
                    ibkrClearGatewayUrl();
                    setGatewayUrl(ibkrGatewayUrl());
                    setIbkrMsg("Address reset to default.");
                  }}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
                >
                  Reset
                </button>
              </div>
            </div>

            <p aria-live="polite" className="mt-2 text-sm font-semibold text-foreground">
              {ibkrMsg}
            </p>
          </div>
        )}
      </section>

      {/* Pending confirmations */}
      {pending.length > 0 && (
        <section
          aria-labelledby="confirm"
          className="rounded-3xl border-2 border-accent bg-accent-soft p-6"
        >
          <h2
            id="confirm"
            className="font-display text-lg font-bold text-foreground"
          >
            Waiting for your confirmation ({pending.length})
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pending.map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-4"
              >
                <span className="text-sm">
                  <span className="font-bold text-foreground">
                    {money(e.amount)} {e.symbol}
                  </span>
                  <span className="ml-2 text-muted">{e.ruleName}</span>
                </span>
                <span className="flex gap-2">
                  <button
                    onClick={() => confirmPending(e)}
                    disabled={busy}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-45"
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Send
                  </button>
                  <button
                    onClick={() => removeLogEntry(e.id)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-muted transition-colors hover:text-warning"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Skip
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Rules */}
      <section aria-labelledby="rules">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="rules"
            className="font-display text-xl font-extrabold text-foreground"
          >
            Your rules
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={runNow}
              disabled={busy || state.rules.length === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-45"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Check now
            </button>
          </div>
        </div>

        {state.rules.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-sm text-muted">
            You have no rules yet. Create one: you choose the instrument, the
            amount and the cadence.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {state.rules.map((rule) => {
              const spent = spentThisMonth(rule.id, state.log);
              return (
                <li
                  key={rule.id}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display font-bold text-foreground">
                        {rule.name}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {money(rule.amount)} in {rule.symbol} ·{" "}
                        {rule.frequency} · next{" "}
                        {formatDate(nextRunDate(rule))}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {money(spent)} of max {money(rule.maxPerMonth)} used this
                        month
                        {" · "}
                        {rule.autoConfirm
                          ? "sends without confirmation"
                          : "asks for confirmation first"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() =>
                          updateRule(rule.id, { enabled: !rule.enabled })
                        }
                        aria-pressed={rule.enabled}
                        className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors ${
                          rule.enabled
                            ? "bg-accent-soft text-accent"
                            : "border border-border text-muted"
                        }`}
                      >
                        {rule.enabled ? "On" : "Off"}
                      </button>
                      <button
                        onClick={() => runOne(rule)}
                        disabled={busy}
                        className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-45"
                      >
                        Run now
                      </button>
                      <button
                        onClick={() => removeRule(rule.id)}
                        aria-label={`Remove rule ${rule.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-warning-light hover:text-warning"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-4">
          <RuleForm onAdd={addRule} />
        </div>
      </section>

      {/* Log */}
      <section aria-labelledby="log">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="log"
            className="font-display text-xl font-extrabold text-foreground"
          >
            Log
          </h2>
          {state.log.length > 0 && (
            <div className="flex gap-2.5">
              <button
                onClick={downloadLog}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Export CSV
              </button>
              <button
                onClick={clearLog}
                className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-muted transition-colors hover:text-warning"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {state.log.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Nothing has happened yet. Every attempt, including a refused one,
            lands here with a reason.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {state.log.slice(0, 40).map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm"
              >
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyle[e.status]}`}
                >
                  {e.status}
                </span>
                <span className="font-semibold text-foreground">
                  {e.ruleName}
                </span>
                {e.amount > 0 && (
                  <span className="text-muted">
                    {money(e.amount)} {e.symbol}
                  </span>
                )}
                {e.quantity !== undefined && e.price !== undefined && (
                  <span className="text-muted">
                    → {e.quantity} @ {money(e.price)}
                  </span>
                )}
                {e.brokerRef && (
                  <span className="font-mono text-xs text-muted">
                    {e.brokerRef}
                  </span>
                )}
                {e.detail && (
                  <span className="w-full text-xs text-muted">{e.detail}</span>
                )}
                <span className="ml-auto text-xs text-muted">
                  {new Date(e.atISO).toLocaleString("en-GB")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
