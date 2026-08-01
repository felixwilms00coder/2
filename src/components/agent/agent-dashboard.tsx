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
  saxoClearToken,
  saxoStoreToken,
  type SaxoMode,
} from "@/lib/agent/brokers/saxo";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

const statusStyle: Record<LogEntry["status"], string> = {
  uitgevoerd: "bg-accent text-accent-contrast",
  gesimuleerd: "bg-accent-soft text-accent",
  wacht: "bg-warning-light text-warning",
  geweigerd: "bg-surface-muted text-muted",
  mislukt: "bg-warning-light text-warning",
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
  const [token, setToken] = useState("");
  const [saxoMode, setSaxoMode] = useState<SaxoMode>("sim");
  const [connectMsg, setConnectMsg] = useState<string | null>(null);

  if (!ready) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8">
        <p className="text-muted">Je agent wordt geladen…</p>
      </div>
    );
  }

  const pending = state.log.filter((e) => e.status === "wacht");

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
            ruleName: "Controle",
            symbol: "-",
            amount: 0,
            status: "geweigerd",
            brokerId: broker.id,
            detail: "Geen enkele regel stond vandaag gepland.",
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
      if (entry.status === "uitgevoerd" || entry.status === "gesimuleerd") {
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
      if (result.status === "uitgevoerd" || result.status === "gesimuleerd") {
        markRan([rule.id]);
      }
      // The pending entry is resolved, so it no longer needs an answer.
      removeLogEntry(entry.id);
    } finally {
      setBusy(false);
    }
  }

  async function connectSaxo(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    saxoStoreToken(token.trim(), saxoMode);
    setToken("");
    setBrokerId("saxo");
    setConnectMsg(
      saxoMode === "live"
        ? "Verbonden met je LIVE Saxo-omgeving. Orders kosten vanaf nu echt geld."
        : "Verbonden met Saxo's simulatie-omgeving.",
    );
  }

  function downloadLog() {
    const blob = new Blob([exportLogCsv(state.log)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finedu-agent-logboek.csv";
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
                    ? "Actief — echte orders"
                    : "Actief — simulatie"
                  : "Op pauze"}
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
                Alles pauzeren
              </>
            ) : (
              <>
                <Play className="h-4 w-4" aria-hidden="true" />
                Agent activeren
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
            Je agent staat op scherp tegen een live rekening. Elke uitgevoerde
            regel is een echte aankoop op jouw naam.
          </p>
        )}
      </div>

      {/* Broker connection */}
      <section
        aria-labelledby="verbinding"
        className="rounded-3xl border border-border bg-surface p-6"
      >
        <h2
          id="verbinding"
          className="flex items-center gap-2 font-display text-lg font-bold text-foreground"
        >
          <Plug className="h-5 w-5 text-accent" aria-hidden="true" />
          Verbinding
        </h2>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-foreground">
            Waar worden je orders naartoe gestuurd?
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

        {state.settings.brokerId === "saxo" && (
          <div className="mt-5 rounded-2xl border border-dashed border-warning/50 bg-warning-light p-4">
            <p className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                aria-hidden="true"
              />
              <span>
                <span className="font-bold">
                  Deze koppeling is nooit tegen de echte Saxo-API getest.
                </span>{" "}
                Gebruik eerst hun simulatie-omgeving en controleer of orders
                aankomen zoals verwacht. Het token komt uit jouw eigen
                Saxo-ontwikkelaarsapplicatie en wordt alleen in dit tabblad
                bewaard — het verdwijnt zodra je het sluit en wordt nooit naar
                FinEdu gestuurd.
              </span>
            </p>

            <form onSubmit={connectSaxo} className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="saxo-token"
                  className="text-sm font-semibold text-foreground"
                >
                  Saxo access token
                </label>
                <input
                  id="saxo-token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  autoComplete="off"
                  placeholder="Plak hier je eigen token"
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-mono text-sm text-foreground focus:border-accent"
                />
              </div>
              <fieldset>
                <legend className="text-sm font-semibold text-foreground">
                  Omgeving
                </legend>
                <div className="mt-2 flex gap-2">
                  {(["sim", "live"] as SaxoMode[]).map((m) => (
                    <label
                      key={m}
                      className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                        saxoMode === m
                          ? "border-accent border-2 bg-surface text-accent"
                          : "border-border text-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="saxomode"
                        checked={saxoMode === m}
                        onChange={() => setSaxoMode(m)}
                        className="h-4 w-4 accent-[var(--color-accent)]"
                      />
                      {m === "sim" ? "Simulatie" : "Live"}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="submit"
                  disabled={!token.trim()}
                  className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-45"
                >
                  Verbinden
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saxoClearToken();
                    setConnectMsg("Token gewist.");
                  }}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
                >
                  Token wissen
                </button>
              </div>
            </form>

            <p aria-live="polite" className="mt-2 text-sm font-semibold text-foreground">
              {connectMsg}
            </p>
          </div>
        )}
      </section>

      {/* Pending confirmations */}
      {pending.length > 0 && (
        <section
          aria-labelledby="bevestigen"
          className="rounded-3xl border-2 border-accent bg-accent-soft p-6"
        >
          <h2
            id="bevestigen"
            className="font-display text-lg font-bold text-foreground"
          >
            Wacht op jouw bevestiging ({pending.length})
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pending.map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-4"
              >
                <span className="text-sm">
                  <span className="font-bold text-foreground">
                    {euro(e.amount)} {e.symbol}
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
                    Versturen
                  </button>
                  <button
                    onClick={() => removeLogEntry(e.id)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-muted transition-colors hover:text-warning"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Overslaan
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Rules */}
      <section aria-labelledby="regels">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="regels"
            className="font-display text-xl font-extrabold text-foreground"
          >
            Jouw regels
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={runNow}
              disabled={busy || state.rules.length === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-45"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Nu controleren
            </button>
          </div>
        </div>

        {state.rules.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-sm text-muted">
            Je hebt nog geen regels. Maak er een aan: jij kiest het instrument,
            het bedrag en het ritme.
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
                        {euro(rule.amount)} in {rule.symbol} ·{" "}
                        {rule.frequency} · volgende keer{" "}
                        {formatDate(nextRunDate(rule))}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Deze maand {euro(spent)} van max {euro(rule.maxPerMonth)}
                        {" · "}
                        {rule.autoConfirm
                          ? "verstuurt zonder bevestiging"
                          : "vraagt eerst bevestiging"}
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
                        {rule.enabled ? "Aan" : "Uit"}
                      </button>
                      <button
                        onClick={() => runOne(rule)}
                        disabled={busy}
                        className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-45"
                      >
                        Nu uitvoeren
                      </button>
                      <button
                        onClick={() => removeRule(rule.id)}
                        aria-label={`Regel ${rule.name} verwijderen`}
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
      <section aria-labelledby="logboek">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="logboek"
            className="font-display text-xl font-extrabold text-foreground"
          >
            Logboek
          </h2>
          {state.log.length > 0 && (
            <div className="flex gap-2.5">
              <button
                onClick={downloadLog}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Exporteer CSV
              </button>
              <button
                onClick={clearLog}
                className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-muted transition-colors hover:text-warning"
              >
                Wissen
              </button>
            </div>
          )}
        </div>

        {state.log.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Nog niets gebeurd. Elke poging, ook een geweigerde, komt hier met
            reden terecht.
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
                    {euro(e.amount)} {e.symbol}
                  </span>
                )}
                {e.quantity !== undefined && e.price !== undefined && (
                  <span className="text-muted">
                    → {e.quantity} @ {euro(e.price)}
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
                  {new Date(e.atISO).toLocaleString("nl-BE")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
