"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, ShieldAlert } from "lucide-react";
import {
  vergelijkSpaarrekeningen,
  type SpaarrekeningInput,
} from "@/lib/calculations/spaarvergelijker";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

const MAX_REKENINGEN = 4;

/** Enkel aangeroepen vanuit een click-handler (dus nooit tijdens SSR), dus
 * crypto.randomUUID() hier is veilig — geen hydration-mismatch mogelijk. */
function nieuweRekening(naam: string): SpaarrekeningInput & { id: string } {
  return { id: crypto.randomUUID(), naam, basisrente: 0, getrouwheidspremie: 0 };
}

/** Vaste, deterministische id's voor de begintoestand: die wordt zowel
 * server- als client-side gerenderd en moet dus identiek zijn in beide. */
function initieleRekeningen(): (SpaarrekeningInput & { id: string })[] {
  return [
    { id: "init-1", naam: "Rekening 1", basisrente: 0, getrouwheidspremie: 0 },
    { id: "init-2", naam: "Rekening 2", basisrente: 0, getrouwheidspremie: 0 },
  ];
}

export function SpaarrekeningVergelijker() {
  const [rekeningen, setRekeningen] = useState(initieleRekeningen);
  const [startbedrag, setStartbedrag] = useState(10000);
  const [jaren, setJaren] = useState(5);

  const resultaten = useMemo(
    () => vergelijkSpaarrekeningen({ rekeningen, startbedrag, jaren }),
    [rekeningen, startbedrag, jaren],
  );

  const beste = resultaten.reduce(
    (best, r) => (r.eindwaarde > (best?.eindwaarde ?? -Infinity) ? r : best),
    resultaten[0],
  );

  function updateRekening(
    id: string,
    patch: Partial<Omit<SpaarrekeningInput, "naam">> & { naam?: string },
  ) {
    setRekeningen((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl border-l-4 border-l-warning bg-warning-light p-4">
        <ShieldAlert
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-bold">Vul zelf de tarieven in die je al hebt.</span>{" "}
          FinEdu houdt geen eigen rentetabel bij en beveelt geen bank aan: deze
          tool rekent enkel na met cijfers die jij van je eigen offertes of de
          website van de bank overneemt. Vergelijk ook zelf actuele tarieven bij
          de banken of via een onafhankelijke bron.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="startbedrag" className="text-sm font-semibold text-foreground">
              Bedrag
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="startbedrag"
                type="number"
                min={0}
                max={1000000}
                step={100}
                value={startbedrag}
                onChange={(e) => setStartbedrag(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div>
            <label htmlFor="jaren" className="text-sm font-semibold text-foreground">
              Termijn
            </label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                id="jaren"
                type="range"
                min={1}
                max={20}
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

        <div className="mt-8 space-y-4">
          {rekeningen.map((rekening, i) => (
            <div
              key={rekening.id}
              className="rounded-2xl border border-border p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  aria-label={`Naam van rekening ${i + 1}`}
                  value={rekening.naam}
                  onChange={(e) =>
                    updateRekening(rekening.id, { naam: e.target.value })
                  }
                  className="min-h-9 w-full max-w-xs rounded-lg border border-transparent bg-transparent px-1 font-display font-bold text-foreground hover:border-border focus:border-accent"
                />
                {rekeningen.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setRekeningen((prev) =>
                        prev.filter((r) => r.id !== rekening.id),
                      )
                    }
                    aria-label={`${rekening.naam} verwijderen`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`basisrente-${rekening.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Basisrente
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`basisrente-${rekening.id}`}
                      type="number"
                      min={0}
                      max={10}
                      step={0.05}
                      value={rekening.basisrente}
                      onChange={(e) =>
                        updateRekening(rekening.id, {
                          basisrente: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                    <span className="shrink-0 text-sm text-muted">%</span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`getrouwheid-${rekening.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Getrouwheidspremie
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`getrouwheid-${rekening.id}`}
                      type="number"
                      min={0}
                      max={10}
                      step={0.05}
                      value={rekening.getrouwheidspremie}
                      onChange={(e) =>
                        updateRekening(rekening.id, {
                          getrouwheidspremie: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                    <span className="shrink-0 text-sm text-muted">%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {rekeningen.length < MAX_REKENINGEN && (
            <button
              type="button"
              onClick={() =>
                setRekeningen((prev) => [
                  ...prev,
                  nieuweRekening(`Rekening ${prev.length + 1}`),
                ])
              }
              className="ease-smooth inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nog een rekening toevoegen
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="font-display font-bold text-foreground">Resultaat</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {resultaten.map((r) => {
              const isBeste = r.naam === beste?.naam && resultaten.length > 1;
              return (
                <div
                  key={r.naam}
                  className={`rounded-2xl p-4 ${
                    isBeste ? "bg-accent-soft" : "bg-surface-muted"
                  }`}
                >
                  <dt
                    className={`text-xs font-semibold ${
                      isBeste ? "text-accent" : "text-muted"
                    }`}
                  >
                    {r.naam} {isBeste && ": beste van deze vergelijking"}
                  </dt>
                  <dd
                    className={`mt-1 font-display text-xl font-extrabold ${
                      isBeste ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {euro(r.eindwaarde)}
                  </dd>
                  <dd className="mt-0.5 text-sm text-muted">
                    {euro(r.interest)} interest op {jaren} jaar (effectief{" "}
                    {r.effectieveRente.toFixed(2)}%)
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
