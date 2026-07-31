"use client";

import { useMemo, useState } from "react";
import { calculateBudgetSplit } from "@/lib/calculations/budget";

function formatEuro(value: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

const categories = [
  {
    key: "noden" as const,
    label: "Noden",
    hint: "Huur, energie, boodschappen, verzekeringen, vervoer",
    percentage: 50,
    barClass: "bg-primary-light",
  },
  {
    key: "wensen" as const,
    label: "Wensen",
    hint: "Restaurant, hobby's, kleding, streamingdiensten",
    percentage: 30,
    barClass: "bg-accent",
  },
  {
    key: "sparen" as const,
    label: "Sparen & schulden aflossen",
    hint: "Noodbuffer, spaardoelen, extra aflossingen",
    percentage: 20,
    barClass: "bg-positive",
  },
];

export function BudgetPlanner() {
  const [netto, setNetto] = useState(2000);
  const [actual, setActual] = useState({ noden: 1000, wensen: 500, sparen: 200 });

  const recommended = useMemo(() => calculateBudgetSplit(netto), [netto]);
  const actualTotal = actual.noden + actual.wensen + actual.sparen;
  const remaining = netto - actualTotal;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <label
        htmlFor="netto-input"
        className="block text-sm font-semibold text-foreground"
      >
        Je nettoloon per maand
      </label>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-2xl font-bold text-muted">€</span>
        <input
          id="netto-input"
          type="number"
          min={0}
          step={50}
          value={netto}
          onChange={(e) => setNetto(Number(e.target.value) || 0)}
          className="w-full max-w-[220px] rounded-lg border border-border bg-surface px-3 py-2 text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>

      <div className="mt-8 space-y-5">
        {categories.map((cat) => (
          <div key={cat.key}>
            <div className="flex items-baseline justify-between">
              <p className="font-semibold text-foreground">
                {cat.label}{" "}
                <span className="font-normal text-muted">
                  ({cat.percentage}%)
                </span>
              </p>
              <p className="font-bold text-foreground">
                {formatEuro(recommended[cat.key])}
              </p>
            </div>
            <p className="text-xs text-muted">{cat.hint}</p>
            <div className="mt-2 h-2.5 w-full rounded-full bg-surface-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${cat.barClass}`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="text-sm font-semibold text-foreground">
          Vergelijk met je eigen uitgaven (optioneel)
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.key}>
              <label
                htmlFor={`actual-${cat.key}`}
                className="text-xs font-medium text-muted"
              >
                {cat.label}
              </label>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-sm text-muted">€</span>
                <input
                  id={`actual-${cat.key}`}
                  type="number"
                  min={0}
                  step={10}
                  value={actual[cat.key]}
                  onChange={(e) =>
                    setActual((prev) => ({
                      ...prev,
                      [cat.key]: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-2 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
              </div>
            </div>
          ))}
        </div>
        <p
          className={`mt-4 text-sm font-semibold ${
            remaining < 0 ? "text-warning" : "text-positive"
          }`}
        >
          {remaining < 0
            ? `Je geeft ${formatEuro(Math.abs(remaining))} meer uit dan je nettoloon.`
            : `Je hebt nog ${formatEuro(remaining)} niet toegewezen.`}
        </p>
      </div>
    </div>
  );
}
