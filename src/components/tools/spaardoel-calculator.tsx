"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  monthsToReachGoal,
  requiredMonthlyAmount,
} from "@/lib/calculations/spaardoel";

function formatEuro(value: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("nl-BE", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function SpaardoelCalculator() {
  const [doel, setDoel] = useState(2500);
  const [huidig, setHuidig] = useState(500);
  const [maandelijks, setMaandelijks] = useState(150);
  const [gewensteMaanden, setGewensteMaanden] = useState(12);

  const months = useMemo(
    () => monthsToReachGoal(doel, huidig, maandelijks),
    [doel, huidig, maandelijks],
  );

  const requiredMonthly = useMemo(
    () => requiredMonthlyAmount(doel, huidig, gewensteMaanden),
    [doel, huidig, gewensteMaanden],
  );

  const targetDate = months !== null ? addMonths(new Date(), months) : null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="doel" className="text-sm font-semibold text-foreground">
            Spaardoel
          </label>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-sm text-muted">€</span>
            <input
              id="doel"
              type="number"
              min={0}
              step={50}
              value={doel}
              onChange={(e) => setDoel(Number(e.target.value) || 0)}
              className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="huidig"
            className="text-sm font-semibold text-foreground"
          >
            Huidig spaargeld
          </label>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-sm text-muted">€</span>
            <input
              id="huidig"
              type="number"
              min={0}
              step={50}
              value={huidig}
              onChange={(e) => setHuidig(Number(e.target.value) || 0)}
              className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="maandelijks"
            className="text-sm font-semibold text-foreground"
          >
            Maandelijks opzij
          </label>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-sm text-muted">€</span>
            <input
              id="maandelijks"
              type="number"
              min={0}
              step={10}
              value={maandelijks}
              onChange={(e) => setMaandelijks(Number(e.target.value) || 0)}
              className="min-h-11 w-full rounded-lg border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-surface-muted p-5">
        {months === null && (
          <p className="text-sm text-warning font-medium">
            Vul een bedrag groter dan 0 in bij &apos;maandelijks opzij&apos;
            om te zien wanneer je je doel haalt.
          </p>
        )}
        {months === 0 && (
          <p className="text-sm font-semibold text-positive">
            Je hebt je spaardoel al bereikt.
          </p>
        )}
        {months !== null && months > 0 && targetDate && (
          <p className="text-foreground">
            Tegen dit spaarritme haal je je doel over{" "}
            <span className="font-bold text-accent">
              {months} {months === 1 ? "maand" : "maanden"}
            </span>
            , rond{" "}
            <span className="font-bold text-accent">
              {formatMonthYear(targetDate)}
            </span>
            .
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm font-semibold text-foreground">
          Of: hoeveel moet je opzij zetten voor een vaste termijn?
        </p>
        <div className="mt-3 flex items-center gap-3">
          <input
            id="gewensteMaanden"
            type="range"
            min={1}
            max={60}
            value={gewensteMaanden}
            onChange={(e) => setGewensteMaanden(Number(e.target.value))}
            aria-label="Gewenste termijn in maanden"
            aria-valuetext={`${gewensteMaanden} maanden`}
            className="w-full accent-[var(--color-accent)]"
          />
          <span className="w-28 shrink-0 text-sm font-semibold text-foreground">
            {gewensteMaanden} maanden
          </span>
        </div>
        <p className="mt-3 text-foreground">
          Dan moet je maandelijks{" "}
          <span className="font-bold text-positive">
            {formatEuro(requiredMonthly)}
          </span>{" "}
          opzij zetten.
        </p>
      </div>
    </div>
  );
}
