"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, ShieldAlert } from "lucide-react";
import {
  vergelijkVerzekeringsoffertes,
  type VerzekeringOfferteInput,
} from "@/lib/calculations/verzekeringsvergelijker";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

const MAX_OFFERTES = 4;

/** Enkel aangeroepen vanuit een click-handler (dus nooit tijdens SSR), dus
 * crypto.randomUUID() hier is veilig — geen hydration-mismatch mogelijk. */
function nieuweOfferte(naam: string): VerzekeringOfferteInput & { id: string } {
  return {
    id: crypto.randomUUID(),
    naam,
    jaarpremie: 0,
    vrijstelling: 0,
    verwachteSchadegevallen: 0.2,
  };
}

/** Vaste, deterministische id's voor de begintoestand: die wordt zowel
 * server- als client-side gerenderd en moet dus identiek zijn in beide. */
function initieleOffertes(): (VerzekeringOfferteInput & { id: string })[] {
  return [
    { id: "init-1", naam: "Offerte 1", jaarpremie: 0, vrijstelling: 0, verwachteSchadegevallen: 0.2 },
    { id: "init-2", naam: "Offerte 2", jaarpremie: 0, vrijstelling: 0, verwachteSchadegevallen: 0.2 },
  ];
}

export function VerzekeringVergelijker() {
  const [offertes, setOffertes] = useState(initieleOffertes);

  const resultaten = useMemo(
    () => vergelijkVerzekeringsoffertes(offertes),
    [offertes],
  );

  const goedkoopste = resultaten.reduce(
    (best, r) =>
      r.totaleVerwachteKost < (best?.totaleVerwachteKost ?? Infinity) ? r : best,
    resultaten[0],
  );

  function updateOfferte(
    id: string,
    patch: Partial<VerzekeringOfferteInput>,
  ) {
    setOffertes((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...patch } : o)),
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
          <span className="font-bold">Vul de offertes in die je al ontvangen hebt.</span>{" "}
          FinEdu levert of rangschikt geen eigen polissen — vraag offertes op bij
          verzekeraars of een erkende verzekeringsmakelaar (check de
          vergunning op fsma.be), en vul hier enkel de cijfers in om ze eerlijk
          te vergelijken. De laagste premie is niet altijd de laagste kost.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="space-y-4">
          {offertes.map((offerte, i) => (
            <div
              key={offerte.id}
              className="rounded-2xl border border-border p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  aria-label={`Naam van offerte ${i + 1}`}
                  value={offerte.naam}
                  onChange={(e) =>
                    updateOfferte(offerte.id, { naam: e.target.value })
                  }
                  className="min-h-9 w-full max-w-xs rounded-lg border border-transparent bg-transparent px-1 font-display font-bold text-foreground hover:border-border focus:border-accent"
                />
                {offertes.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setOffertes((prev) =>
                        prev.filter((o) => o.id !== offerte.id),
                      )
                    }
                    aria-label={`${offerte.naam} verwijderen`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor={`premie-${offerte.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Jaarpremie
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`premie-${offerte.id}`}
                      type="number"
                      min={0}
                      max={20000}
                      step={5}
                      value={offerte.jaarpremie}
                      onChange={(e) =>
                        updateOfferte(offerte.id, {
                          jaarpremie: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                    <span className="shrink-0 text-sm text-muted">€</span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`vrijstelling-${offerte.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Vrijstelling
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`vrijstelling-${offerte.id}`}
                      type="number"
                      min={0}
                      max={20000}
                      step={10}
                      value={offerte.vrijstelling}
                      onChange={(e) =>
                        updateOfferte(offerte.id, {
                          vrijstelling: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                    <span className="shrink-0 text-sm text-muted">€</span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`schade-${offerte.id}`}
                    className="text-xs font-semibold text-muted"
                  >
                    Verwachte schadegevallen/jaar
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id={`schade-${offerte.id}`}
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={offerte.verwachteSchadegevallen}
                      onChange={(e) =>
                        updateOfferte(offerte.id, {
                          verwachteSchadegevallen: Number(e.target.value) || 0,
                        })
                      }
                      className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {offertes.length < MAX_OFFERTES && (
            <button
              type="button"
              onClick={() =>
                setOffertes((prev) => [
                  ...prev,
                  nieuweOfferte(`Offerte ${prev.length + 1}`),
                ])
              }
              className="ease-smooth inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nog een offerte toevoegen
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="font-display font-bold text-foreground">
            Verwachte totale jaarkost
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {resultaten.map((r) => {
              const isGoedkoopst =
                r.naam === goedkoopste?.naam && resultaten.length > 1;
              return (
                <div
                  key={r.naam}
                  className={`rounded-2xl p-4 ${
                    isGoedkoopst ? "bg-accent-soft" : "bg-surface-muted"
                  }`}
                >
                  <dt
                    className={`text-xs font-semibold ${
                      isGoedkoopst ? "text-accent" : "text-muted"
                    }`}
                  >
                    {r.naam} {isGoedkoopst && "— goedkoopst verwacht"}
                  </dt>
                  <dd
                    className={`mt-1 font-display text-xl font-extrabold ${
                      isGoedkoopst ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {euro(r.totaleVerwachteKost)} / jaar
                  </dd>
                  <dd className="mt-0.5 text-sm text-muted">
                    {euro(r.jaarpremie)} premie +{" "}
                    {euro(r.verwachteVrijstellingskost)} verwachte vrijstelling
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
