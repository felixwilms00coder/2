"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Frequency, Rule } from "@/lib/agent/types";

const WEEKDAYS = [
  { value: 1, label: "maandag" },
  { value: 2, label: "dinsdag" },
  { value: 3, label: "woensdag" },
  { value: 4, label: "donderdag" },
  { value: 5, label: "vrijdag" },
];

const inputClass =
  "min-h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-medium text-foreground focus:border-accent";

export function RuleForm({
  onAdd,
  prefillName,
}: {
  onAdd: (rule: Omit<Rule, "id" | "createdISO">) => void;
  /**
   * Optional suggested label for a new rule (e.g. from /pilots) — a name
   * only, never a ticker or amount. The user still has to fill in and
   * confirm the actual instrument themselves, same as any other rule.
   */
  prefillName?: string;
}) {
  const [open, setOpen] = useState(Boolean(prefillName));
  const [name, setName] = useState(prefillName ?? "");
  const [symbol, setSymbol] = useState("");
  const [uic, setUic] = useState("");
  const [assetType, setAssetType] = useState("Etf");
  const [amount, setAmount] = useState(100);
  const [frequency, setFrequency] = useState<Frequency>("maandelijks");
  const [dayOfMonth, setDayOfMonth] = useState(5);
  const [weekday, setWeekday] = useState(1);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [maxPerOrder, setMaxPerOrder] = useState(250);
  const [maxPerMonth, setMaxPerMonth] = useState(500);

  const [error, setError] = useState<string | null>(null);
  const valid = symbol.trim().length > 0 && amount > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError("Vul minstens een ticker en een bedrag groter dan 0 in.");
      return;
    }
    setError(null);
    onAdd({
      enabled: true,
      name: name.trim() || symbol.trim().toUpperCase(),
      symbol: symbol.trim().toUpperCase(),
      uic: uic.trim() || undefined,
      assetType,
      amount,
      frequency,
      dayOfMonth,
      weekday,
      autoConfirm,
      maxPerOrder,
      maxPerMonth,
    });
    setName("");
    setSymbol("");
    setUic("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Nieuwe regel
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-border bg-surface p-6"
    >
      <h3 className="font-display text-lg font-bold text-foreground">
        Jouw regel
      </h3>
      <p className="mt-1 text-sm text-muted">
        Jij bepaalt wat er gekocht wordt en wanneer. FinEdu stelt niets voor en
        vult niets in.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="r-name" className="text-sm font-semibold text-foreground">
            Naam van de regel
          </label>
          <input
            id="r-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="bv. Maandelijkse wereldtracker"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div>
          <label htmlFor="r-symbol" className="text-sm font-semibold text-foreground">
            Ticker of ISIN <span className="text-warning">*</span>
          </label>
          <input
            id="r-symbol"
            required
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="bv. IWDA"
            className={`mt-1.5 ${inputClass}`}
          />
          <p className="mt-1 text-xs text-muted">
            Precies zoals jij het instrument bij je broker terugvindt.
          </p>
        </div>

        <div>
          <label htmlFor="r-uic" className="text-sm font-semibold text-foreground">
            Saxo Uic
          </label>
          <input
            id="r-uic"
            value={uic}
            onChange={(e) => setUic(e.target.value)}
            inputMode="numeric"
            placeholder="bv. 12345"
            className={`mt-1.5 ${inputClass}`}
          />
          <p className="mt-1 text-xs text-muted">
            Alleen nodig voor Saxo. Zoek het instrument-id op in je eigen
            Saxo-account.
          </p>
        </div>

        <div>
          <label
            htmlFor="r-assettype"
            className="text-sm font-semibold text-foreground"
          >
            Type instrument
          </label>
          <select
            id="r-assettype"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="Etf">ETF</option>
            <option value="Stock">Aandeel</option>
            <option value="Bond">Obligatie</option>
          </select>
        </div>

        <div>
          <label htmlFor="r-amount" className="text-sm font-semibold text-foreground">
            Bedrag per aankoop (€)
          </label>
          <input
            id="r-amount"
            type="number"
            min={1}
            step="any"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="r-frequency"
            className="text-sm font-semibold text-foreground"
          >
            Hoe vaak
          </label>
          <select
            id="r-frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="maandelijks">Maandelijks</option>
            <option value="tweewekelijks">Om de twee weken</option>
            <option value="wekelijks">Wekelijks</option>
          </select>
        </div>

        {frequency === "maandelijks" ? (
          <div>
            <label htmlFor="r-dom" className="text-sm font-semibold text-foreground">
              Dag van de maand
            </label>
            <input
              id="r-dom"
              type="number"
              min={1}
              max={28}
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(Number(e.target.value) || 1)}
              className={`mt-1.5 ${inputClass}`}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="r-wd" className="text-sm font-semibold text-foreground">
              Dag van de week
            </label>
            <select
              id="r-wd"
              value={weekday}
              onChange={(e) => setWeekday(Number(e.target.value))}
              className={`mt-1.5 ${inputClass}`}
            >
              {WEEKDAYS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label
            htmlFor="r-maxorder"
            className="text-sm font-semibold text-foreground"
          >
            Max. per order (€)
          </label>
          <input
            id="r-maxorder"
            type="number"
            min={1}
            step="any"
            value={maxPerOrder}
            onChange={(e) => setMaxPerOrder(Number(e.target.value) || 0)}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="r-maxmonth"
            className="text-sm font-semibold text-foreground"
          >
            Max. per maand (€)
          </label>
          <input
            id="r-maxmonth"
            type="number"
            min={1}
            step="any"
            value={maxPerMonth}
            onChange={(e) => setMaxPerMonth(Number(e.target.value) || 0)}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-2xl border border-border p-4">
        <input
          type="checkbox"
          checked={autoConfirm}
          onChange={(e) => setAutoConfirm(e.target.checked)}
          className="mt-0.5 h-5 w-5 accent-[var(--color-accent)]"
        />
        <span className="text-sm">
          <span className="font-semibold text-foreground">
            Zonder bevestiging versturen
          </span>
          <span className="mt-0.5 block text-muted">
            Laat dit uit als je elke order eerst zelf wil goedkeuren. Aangeraden
            zolang je de agent nog aan het testen bent.
          </span>
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border-l-4 border-l-warning bg-warning-light p-3 text-sm text-foreground/90"
        >
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-45"
        >
          Regel opslaan
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
        >
          Annuleren
        </button>
      </div>
    </form>
  );
}
