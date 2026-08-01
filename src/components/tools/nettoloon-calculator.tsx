"use client";

import { useMemo, useState } from "react";
import { calculateNettoloon } from "@/lib/calculations/nettoloon";

function formatEuro(value: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function NettoloonCalculator() {
  const [bruto, setBruto] = useState(2800);

  const result = useMemo(() => calculateNettoloon(bruto), [bruto]);

  const rows = [
    { label: "Brutomaandloon", value: result.bruto, tone: "neutral" as const },
    {
      label: "RSZ-bijdrage (13,07%)",
      value: -result.rszBijdrage,
      tone: "negative" as const,
    },
    {
      label: "Geschatte bedrijfsvoorheffing",
      value: -result.geschatteBedrijfsvoorheffing,
      tone: "negative" as const,
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <label
        htmlFor="bruto-input"
        className="block text-sm font-semibold text-foreground"
      >
        Brutomaandloon
      </label>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-2xl font-bold text-muted">€</span>
        <input
          id="bruto-input"
          type="number"
          min={0}
          step={50}
          value={bruto}
          onChange={(e) => setBruto(Number(e.target.value) || 0)}
          className="min-h-14 w-full max-w-[220px] rounded-lg border border-border bg-surface px-3 text-2xl font-bold text-foreground focus:border-accent"
        />
        <span className="text-sm text-muted">/ maand</span>
      </div>
      <input
        type="range"
        min={1500}
        max={7000}
        step={50}
        value={bruto}
        onChange={(e) => setBruto(Number(e.target.value))}
        className="mt-4 w-full accent-[var(--color-accent)]"
        aria-label="Brutomaandloon schuifregelaar"
      />

      <div className="mt-8 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-border pb-3 text-sm"
          >
            <span className="text-muted">{row.label}</span>
            <span
              className={`font-semibold ${
                row.tone === "negative" ? "text-warning" : "text-foreground"
              }`}
            >
              {row.value < 0 ? "−" : ""}
              {formatEuro(Math.abs(row.value))}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-foreground">
            Geschat nettoloon
          </span>
          <span className="text-2xl font-bold text-positive">
            {formatEuro(result.netto)}
          </span>
        </div>
        <p className="text-right text-xs text-muted">
          Ongeveer {result.nettoPercentage.toFixed(0)}% van je brutoloon
        </p>
      </div>
    </div>
  );
}
