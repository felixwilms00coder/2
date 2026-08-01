"use client";

import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { simulatePlan } from "@/lib/calculations/beleggingsplan";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function NumberField({
  id,
  label,
  suffix,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  suffix?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
        />
        {suffix && (
          <span className="shrink-0 text-sm text-muted">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export function Beleggingsplan() {
  const [start, setStart] = useState(500);
  const [maandelijks, setMaandelijks] = useState(150);
  const [jaren, setJaren] = useState(20);
  const [rendement, setRendement] = useState(6);
  const [kosten, setKosten] = useState(0.25);
  const [transactiekost, setTransactiekost] = useState(1);

  const result = useMemo(
    () =>
      simulatePlan({ start, maandelijks, jaren, rendement, kosten, transactiekost }),
    [start, maandelijks, jaren, rendement, kosten, transactiekost],
  );

  const max = Math.max(
    ...result.perJaar.map((p) => Math.max(p.waarde, p.ingelegd)),
    1,
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl border-l-4 border-l-warning bg-warning-light p-4">
        <ShieldAlert
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-bold">Dit is een rekenmodel, geen advies.</span>{" "}
          FinEdu plaatst geen orders, beheert geen portefeuilles en beveelt geen
          producten aan. Een constant rendement bestaat niet: markten schommelen,
          en een slecht jaar op het verkeerde moment verandert de uitkomst sterk.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            id="start"
            label="Startbedrag"
            suffix="€"
            value={start}
            min={0}
            max={1000000}
            step={100}
            onChange={setStart}
          />
          <NumberField
            id="maandelijks"
            label="Maandelijkse inleg"
            suffix="€"
            value={maandelijks}
            min={0}
            max={10000}
            step={25}
            onChange={setMaandelijks}
          />
          <NumberField
            id="rendement"
            label="Verwacht brutorendement"
            suffix="% / jaar"
            value={rendement}
            min={0}
            max={15}
            step={0.5}
            onChange={setRendement}
          />
          <NumberField
            id="kosten"
            label="Lopende kosten van het fonds"
            suffix="% / jaar"
            value={kosten}
            min={0}
            max={3}
            step={0.05}
            onChange={setKosten}
          />
          <NumberField
            id="transactiekost"
            label="Transactiekost per aankoop"
            suffix="€"
            value={transactiekost}
            min={0}
            max={50}
            step={0.5}
            onChange={setTransactiekost}
          />
          <div>
            <label
              htmlFor="jaren"
              className="text-sm font-semibold text-foreground"
            >
              Beleggingshorizon
            </label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                id="jaren"
                type="range"
                min={1}
                max={40}
                value={jaren}
                onChange={(e) => setJaren(Number(e.target.value))}
                aria-valuetext={`${jaren} jaar`}
                className="w-full accent-[var(--color-accent)]"
              />
              <span className="w-16 shrink-0 text-sm font-semibold text-foreground">
                {jaren} jaar
              </span>
            </div>
          </div>
        </div>

        {/* Outcome */}
        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Zelf ingelegd</dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {euro(result.ingelegd)}
            </dd>
          </div>
          <div className="rounded-2xl bg-accent-soft p-4">
            <dt className="text-xs font-semibold text-accent">
              Geschatte eindwaarde
            </dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-accent">
              {euro(result.eindwaarde)}
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">
              Waarvan rendement
            </dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {euro(result.rendementBedrag)}
            </dd>
          </div>
        </dl>

        {/* Chart */}
        <div className="mt-8">
          <h3 className="font-display font-bold text-foreground">
            Verloop over de jaren
          </h3>
          <div
            className="mt-4 flex h-44 items-end gap-1"
            role="img"
            aria-label={`Grafiek: na ${jaren} jaar groeit ${euro(
              result.ingelegd,
            )} eigen inleg naar naar schatting ${euro(result.eindwaarde)}.`}
          >
            {result.perJaar.map((p) => (
              <div
                key={p.jaar}
                className="flex h-full flex-1 flex-col justify-end gap-px"
                title={`Jaar ${p.jaar}: ${euro(p.waarde)}`}
              >
                <div
                  className="rounded-t bg-accent/35"
                  style={{
                    height: `${((p.waarde - p.ingelegd) / max) * 100}%`,
                  }}
                />
                <div
                  className="rounded-b bg-accent"
                  style={{ height: `${(p.ingelegd / max) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-sm bg-accent"
              />
              Je eigen inleg
            </span>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-sm bg-accent/35"
              />
              Rendement erbovenop
            </span>
          </div>
        </div>

        {/* Cost impact */}
        <div className="mt-8 rounded-2xl border border-border p-4">
          <p className="text-sm leading-relaxed text-foreground/90">
            <span className="font-bold">Wat kosten je kosten?</span> Bij{" "}
            {kosten}% lopende kosten en {euro(transactiekost)} per aankoop
            scheelt dat over {jaren} jaar ongeveer{" "}
            <span className="font-bold text-warning">
              {euro(result.kostenBedrag)}
            </span>{" "}
            aan eindwaarde. Kosten lijken klein per jaar, maar ze knagen elk
            jaar opnieuw aan het bedrag dat had kunnen meegroeien.
          </p>
        </div>
      </div>
    </div>
  );
}
