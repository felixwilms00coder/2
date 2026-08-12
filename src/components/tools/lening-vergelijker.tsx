"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, ShieldAlert } from "lucide-react";
import {
  vergelijkLeningen,
  type LeningScenario,
} from "@/lib/calculations/leningsimulator";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

const MAX_SCENARIOS = 4;

/** Enkel aangeroepen vanuit een click-handler (dus nooit tijdens SSR), dus
 * crypto.randomUUID() hier is veilig — geen hydration-mismatch mogelijk. */
function nieuwScenario(naam: string): LeningScenario & { id: string } {
  return { id: crypto.randomUUID(), naam, jaarrente: 3.5, looptijdJaren: 20 };
}

/** Vaste, deterministische id's voor de begintoestand: die wordt zowel
 * server- als client-side gerenderd en moet dus identiek zijn in beide. */
function initieleScenarios(): (LeningScenario & { id: string })[] {
  return [
    { id: "init-1", naam: "Scenario 1", jaarrente: 3.5, looptijdJaren: 20 },
    { id: "init-2", naam: "Scenario 2", jaarrente: 3.5, looptijdJaren: 25 },
  ];
}

export function LeningVergelijker() {
  const [scenarios, setScenarios] = useState(initieleScenarios);
  const [bedrag, setBedrag] = useState(200000);

  const resultaten = useMemo(
    () => vergelijkLeningen({ scenarios, bedrag }),
    [scenarios, bedrag],
  );

  const voordeligst = resultaten.reduce(
    (best, r) => (r.totaleKost < (best?.totaleKost ?? Infinity) ? r : best),
    resultaten[0],
  );

  function updateScenario(
    id: string,
    patch: Partial<Omit<LeningScenario, "naam">> & { naam?: string },
  ) {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
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
          <span className="font-bold">Vul zelf de rentevoeten in die je al hebt.</span>{" "}
          FinEdu houdt geen eigen rentetabel bij en beveelt geen bank of
          kredietgever aan: deze tool rekent enkel na met cijfers die jij
          van een offerte of simulatie overneemt. Dossierkosten,
          schuldsaldoverzekering en notariskosten (bij een hypothecair
          krediet) zitten hier niet in.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div>
          <label htmlFor="bedrag" className="text-sm font-semibold text-foreground">
            Te lenen bedrag
          </label>
          <div className="mt-1.5 flex max-w-xs items-center gap-2">
            <input
              id="bedrag"
              type="number"
              min={0}
              max={2000000}
              step={1000}
              value={bedrag}
              onChange={(e) => setBedrag(Number(e.target.value) || 0)}
              className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
            />
            <span className="shrink-0 text-sm text-muted">€</span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {scenarios.map((scenario, i) => (
            <div
              key={scenario.id}
              className="rounded-2xl border border-border p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  aria-label={`Naam van scenario ${i + 1}`}
                  value={scenario.naam}
                  onChange={(e) =>
                    updateScenario(scenario.id, { naam: e.target.value })
                  }
                  className="min-h-9 w-full max-w-xs rounded-lg border border-transparent bg-transparent px-1 font-display font-bold text-foreground hover:border-border focus:border-accent"
                />
                {scenarios.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setScenarios((prev) =>
                        prev.filter((s) => s.id !== scenario.id),
                      )
                    }
                    aria-label={`${scenario.naam} verwijderen`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`rente-${scenario.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Jaarlijkse rente
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`rente-${scenario.id}`}
                      type="number"
                      min={0}
                      max={15}
                      step={0.05}
                      value={scenario.jaarrente}
                      onChange={(e) =>
                        updateScenario(scenario.id, {
                          jaarrente: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                    <span className="shrink-0 text-sm text-muted">%</span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`looptijd-${scenario.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Looptijd
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`looptijd-${scenario.id}`}
                      type="number"
                      min={1}
                      max={35}
                      step={1}
                      value={scenario.looptijdJaren}
                      onChange={(e) =>
                        updateScenario(scenario.id, {
                          looptijdJaren: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                    <span className="shrink-0 text-sm text-muted">jaar</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {scenarios.length < MAX_SCENARIOS && (
            <button
              type="button"
              onClick={() =>
                setScenarios((prev) => [
                  ...prev,
                  nieuwScenario(`Scenario ${prev.length + 1}`),
                ])
              }
              className="ease-smooth inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nog een scenario toevoegen
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="font-display font-bold text-foreground">Resultaat</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {resultaten.map((r) => {
              const isVoordeligst =
                r.naam === voordeligst?.naam && resultaten.length > 1;
              return (
                <div
                  key={r.naam}
                  className={`rounded-2xl p-4 ${
                    isVoordeligst ? "bg-accent-soft" : "bg-surface-muted"
                  }`}
                >
                  <dt
                    className={`text-xs font-semibold ${
                      isVoordeligst ? "text-accent" : "text-muted"
                    }`}
                  >
                    {r.naam} {isVoordeligst && ": laagste totale kost"}
                  </dt>
                  <dd
                    className={`mt-1 font-display text-xl font-extrabold ${
                      isVoordeligst ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {euro(r.maandelijkseAflossing)} / maand
                  </dd>
                  <dd className="mt-0.5 text-sm text-muted">
                    {euro(r.totaleKost)} totaal, waarvan {euro(r.totaleInterest)}{" "}
                    interest
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
