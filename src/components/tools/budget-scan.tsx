"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  Lock,
  RotateCcw,
  Repeat,
  Upload,
} from "lucide-react";
import { parseTransactionsCsv } from "@/lib/analysis/parse-csv";
import { analyse } from "@/lib/analysis/insights";
import { SAMPLE_CSV } from "@/lib/analysis/sample";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const bucketMeta = {
  noden: { label: "Noden", target: 50, bar: "bg-accent" },
  wensen: { label: "Wensen", target: 30, bar: "bg-accent/55" },
  sparen: { label: "Sparen & aflossen", target: 20, bar: "bg-accent/30" },
} as const;

export function BudgetScan() {
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const parsed = useMemo(
    () => (submitted ? parseTransactionsCsv(submitted) : null),
    [submitted],
  );
  const result = useMemo(
    () =>
      parsed && parsed.transactions.length > 0
        ? analyse(parsed.transactions)
        : null,
    [parsed],
  );

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setRaw(text);
    setSubmitted(text);
  }

  function reset() {
    setRaw("");
    setSubmitted(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  /* ---------------- Input state ---------------- */
  if (!result) {
    return (
      <div className="space-y-6">
        <div className="flex gap-3 rounded-2xl border border-accent/25 bg-accent-soft p-4">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground/90">
            <span className="font-bold">Je gegevens blijven op je toestel.</span>{" "}
            De analyse draait volledig in je browser. Er wordt niets geüpload,
            opgeslagen of doorgestuurd: je kan je internetverbinding zelfs
            uitzetten.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-foreground">
            Plak of upload je rekeningoverzicht
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Exporteer je transacties als CSV in je bankapp (bij de meeste
            Belgische banken via &quot;Downloaden&quot; of &quot;Exporteren&quot;
            bij je rekeningoverzicht) en plak de inhoud hieronder. Twee tot drie
            maanden geeft het beste beeld.
          </p>

          <label htmlFor="csv-input" className="sr-only">
            CSV-inhoud van je rekeningoverzicht
          </label>
          <textarea
            id="csv-input"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            spellCheck={false}
            placeholder="Datum;Omschrijving;Bedrag&#10;01/03/2026;LOON MAART;2150,00&#10;02/03/2026;HUUR;-780,00"
            className="mt-4 w-full rounded-2xl border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground placeholder:text-muted focus:border-accent"
          />

          {parsed && parsed.transactions.length === 0 && (
            <p
              role="alert"
              className="mt-3 rounded-xl border-l-4 border-l-warning bg-warning-light p-3 text-sm text-foreground/90"
            >
              We konden hier geen transacties uit lezen. Controleer of je de
              volledige CSV geplakt hebt, inclusief de kopregel met
              kolomnamen.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setSubmitted(raw)}
              disabled={raw.trim().length === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-45"
            >
              Analyseer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Bestand kiezen
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.txt,text/csv,text/plain"
              onChange={handleFile}
              className="sr-only"
              aria-label="CSV-bestand uploaden"
            />

            <button
              onClick={() => {
                setRaw(SAMPLE_CSV);
                setSubmitted(SAMPLE_CSV);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
            >
              Probeer met voorbeelddata
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Result state ---------------- */
  const maxCategory = result.categories[0]?.total ?? 1;

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Gemiddeld per maand
            </p>
            <p className="mt-1 text-sm text-muted">
              Op basis van {parsed?.transactions.length} transacties over{" "}
              {result.monthsCovered}{" "}
              {result.monthsCovered === 1 ? "maand" : "maanden"}
              {parsed && parsed.skipped > 0 && (
                <> · {parsed.skipped} regels overgeslagen</>
              )}
            </p>
          </div>
          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Andere data
          </button>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Inkomsten</dt>
            <dd className="mt-1 font-display text-2xl font-extrabold text-foreground">
              {euro(result.perMonth.income)}
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Uitgaven</dt>
            <dd className="mt-1 font-display text-2xl font-extrabold text-foreground">
              {euro(result.perMonth.expenses)}
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Verschil</dt>
            <dd
              className={`mt-1 font-display text-2xl font-extrabold ${
                result.perMonth.net < 0 ? "text-warning" : "text-accent"
              }`}
            >
              {euro(result.perMonth.net)}
            </dd>
          </div>
        </dl>

        {/* 50/30/20 comparison */}
        <div className="mt-8">
          <h3 className="font-display font-bold text-foreground">
            Jouw verdeling tegenover 50/30/20
          </h3>
          <div className="mt-4 space-y-4">
            {(["noden", "wensen", "sparen"] as const).map((key) => {
              const meta = bucketMeta[key];
              const pct = Math.round(result.bucketShare[key] * 100);
              return (
                <div key={key}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      {meta.label}
                    </span>
                    <span className="text-muted">
                      <span className="font-bold text-foreground">{pct}%</span>{" "}
                      · richtlijn {meta.target}%
                    </span>
                  </div>
                  <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className={`h-full rounded-full ${meta.bar} transition-all duration-500`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-0 h-full w-0.5 bg-foreground/45"
                      style={{ left: `${meta.target}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted">
            De verticale streep toont de richtlijn. Afbetalingen van leningen
            tellen mee bij &quot;sparen &amp; aflossen&quot;.
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <section aria-labelledby="suggesties">
        <h2
          id="suggesties"
          className="flex items-center gap-2 font-display text-xl font-extrabold text-foreground"
        >
          <Lightbulb className="h-5 w-5 text-accent" aria-hidden="true" />
          Waar valt er ruimte te vinden?
        </h2>
        <div className="mt-4 grid gap-3">
          {result.suggestions.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display font-bold text-foreground">
                  {s.title}
                </h3>
                {s.impact !== undefined && s.impact > 0 && (
                  <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                    tot {euro(s.impact)}/maand
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
              {s.href && (
                <Link
                  href={s.href}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  {s.linkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section aria-labelledby="categorieen">
        <h2
          id="categorieen"
          className="font-display text-xl font-extrabold text-foreground"
        >
          Waar gaat je geld naartoe?
        </h2>
        <ul className="mt-4 space-y-2.5">
          {result.categories.map((c) => (
            <li
              key={c.key}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-semibold text-foreground">{c.label}</span>
                <span className="shrink-0 text-muted">
                  <span className="font-bold text-foreground">
                    {euro(c.total / result.monthsCovered)}
                  </span>
                  /maand · {c.count}x
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${(c.total / maxCategory) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recurring */}
      {result.recurring.length > 0 && (
        <section aria-labelledby="terugkerend">
          <h2
            id="terugkerend"
            className="flex items-center gap-2 font-display text-xl font-extrabold text-foreground"
          >
            <Repeat className="h-5 w-5 text-accent" aria-hidden="true" />
            Terugkerende betalingen
          </h2>
          <p className="mt-2 text-sm text-muted">
            Betalingen die elke maand terugkomen met ongeveer hetzelfde bedrag.
            Loop ze even na: gebruik je ze allemaal nog?
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {result.recurring.map((r) => (
              <li
                key={r.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold capitalize text-foreground">
                    {r.label}
                  </span>
                  <span className="text-xs text-muted">
                    {r.occurrences} keer gezien
                  </span>
                </span>
                <span className="shrink-0 font-display font-bold text-foreground">
                  {euro(r.amount)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="rounded-2xl border-l-4 border-l-warning bg-warning-light p-4 text-sm leading-relaxed text-foreground/90">
        <span className="font-bold">Let op:</span> dit is een automatische
        indeling op basis van trefwoorden in je omschrijvingen. Ze zit er soms
        naast, zeker bij vage omschrijvingen. Het is informatie om zelf mee
        verder te kijken, geen persoonlijk financieel advies.
      </p>
    </div>
  );
}
