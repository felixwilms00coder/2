"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Frequency, Rule } from "@/lib/agent/types";

const WEEKDAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
];

const inputClass =
  "min-h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-medium text-foreground focus:border-accent";

export function RuleForm({
  onAdd,
}: {
  onAdd: (rule: Omit<Rule, "id" | "createdISO">) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [uic, setUic] = useState("");
  const [assetType, setAssetType] = useState("Etf");
  const [amount, setAmount] = useState(100);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
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
      setError("Fill in at least a ticker and an amount greater than 0.");
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
        New rule
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-border bg-surface p-6"
    >
      <h3 className="font-display text-lg font-bold text-foreground">
        Your rule
      </h3>
      <p className="mt-1 text-sm text-muted">
        You decide what gets bought and when. Auto Broker suggests nothing
        and pre-fills nothing.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="r-name" className="text-sm font-semibold text-foreground">
            Rule name
          </label>
          <input
            id="r-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Monthly world tracker"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div>
          <label htmlFor="r-symbol" className="text-sm font-semibold text-foreground">
            Ticker or ISIN <span className="text-warning">*</span>
          </label>
          <input
            id="r-symbol"
            required
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g. IWDA"
            className={`mt-1.5 ${inputClass}`}
          />
          <p className="mt-1 text-xs text-muted">
            Exactly as you find the instrument at your own broker.
          </p>
        </div>

        <div>
          <label htmlFor="r-uic" className="text-sm font-semibold text-foreground">
            Instrument ID (optional)
          </label>
          <input
            id="r-uic"
            value={uic}
            onChange={(e) => setUic(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 12345"
            className={`mt-1.5 ${inputClass}`}
          />
          <p className="mt-1 text-xs text-muted">
            IBKR calls this a conid — look it up at your broker. Leave blank
            and Auto Broker searches by ticker where it can.
          </p>
        </div>

        <div>
          <label
            htmlFor="r-assettype"
            className="text-sm font-semibold text-foreground"
          >
            Instrument type
          </label>
          <select
            id="r-assettype"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="Etf">ETF</option>
            <option value="Stock">Stock</option>
            <option value="Bond">Bond</option>
          </select>
        </div>

        <div>
          <label htmlFor="r-amount" className="text-sm font-semibold text-foreground">
            Amount per purchase
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
            How often
          </label>
          <select
            id="r-frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="monthly">Monthly</option>
            <option value="biweekly">Every two weeks</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {frequency === "monthly" ? (
          <div>
            <label htmlFor="r-dom" className="text-sm font-semibold text-foreground">
              Day of the month
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
              Day of the week
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
            Max. per order
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
            Max. per month
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
            Send without confirmation
          </span>
          <span className="mt-0.5 block text-muted">
            Leave this off if you want to approve every order yourself.
            Recommended while you&apos;re still testing the agent.
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
          Save rule
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
