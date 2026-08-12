"use client";

import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { berekenRegel72 } from "@/lib/calculations/regel72";

export function Regel72() {
  const [rendement, setRendement] = useState(6);

  const resultaat = useMemo(() => berekenRegel72(rendement), [rendement]);

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl border-l-4 border-l-warning bg-warning-light p-4">
        <ShieldAlert
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-bold">Een vuistregel voor snel hoofdrekenen.</span>{" "}
          Ze gaat uit van een constant jaarlijks rendement, wat in de
          werkelijkheid niet bestaat: gebruik dit om de orde van grootte aan
          te voelen, niet om een exact eindbedrag te voorspellen.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <label htmlFor="rendement-72" className="text-sm font-semibold text-foreground">
          Verwacht jaarlijks rendement
        </label>
        <div className="mt-1.5 flex max-w-xs items-center gap-3">
          <input
            id="rendement-72"
            type="range"
            min={1}
            max={15}
            step={0.5}
            value={rendement}
            onChange={(e) => setRendement(Number(e.target.value))}
            aria-valuetext={`${rendement}% per jaar`}
            className="w-full accent-[var(--color-accent)]"
          />
          <span className="w-16 shrink-0 text-sm font-semibold text-foreground">
            {rendement}%
          </span>
        </div>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-accent-soft p-4">
            <dt className="text-xs font-semibold text-accent">
              72-regel (72 ÷ {rendement})
            </dt>
            <dd className="mt-1 font-display text-2xl font-extrabold text-accent">
              ≈ {resultaat.vuistregelJaren.toFixed(1)} jaar
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Wiskundig exact</dt>
            <dd className="mt-1 font-display text-2xl font-extrabold text-foreground">
              {resultaat.exacteJaren.toFixed(1)} jaar
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-foreground/90">
          Bij <span className="font-semibold">{rendement}%</span> per jaar
          verdubbelt een bedrag dus grofweg elke{" "}
          <span className="font-semibold">
            {resultaat.vuistregelJaren.toFixed(1)} jaar
          </span>
          . Hoe hoger het rendement, hoe sneller de verdubbeling, maar meestal
          ook hoe hoger het risico dat je dat rendement niet elk jaar haalt.
        </p>
      </div>
    </div>
  );
}
