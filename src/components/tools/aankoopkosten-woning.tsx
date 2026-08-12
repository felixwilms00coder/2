"use client";

import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { berekenAankoopkosten } from "@/lib/calculations/aankoopkosten-woning";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

export function AankoopkostenWoning() {
  const [aankoopprijs, setAankoopprijs] = useState(300000);
  const [registratierechtenPercentage, setRegistratierechtenPercentage] =
    useState(3);
  const [notariskosten, setNotariskosten] = useState(4000);
  const [hypotheekkosten, setHypotheekkosten] = useState(0);
  const [andereKosten, setAndereKosten] = useState(0);

  const resultaat = useMemo(
    () =>
      berekenAankoopkosten({
        aankoopprijs,
        registratierechtenPercentage,
        notariskosten,
        hypotheekkosten,
        andereKosten,
      }),
    [
      aankoopprijs,
      registratierechtenPercentage,
      notariskosten,
      hypotheekkosten,
      andereKosten,
    ],
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl border-l-4 border-l-warning bg-warning-light p-4">
        <ShieldAlert
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-bold">
            Vul zelf de tarieven en offertes in die voor jou gelden.
          </span>{" "}
          Registratierechten verschillen per gewest en per situatie
          (bijvoorbeeld je enige en eigen woning), en notaris- en
          kredietkosten hangen af van je eigen dossier. FinEdu houdt hier
          geen eigen tarieventabel voor bij.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="aankoopprijs"
              className="text-sm font-semibold text-foreground"
            >
              Aankoopprijs van de woning
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="aankoopprijs"
                type="number"
                min={0}
                max={5000000}
                step={1000}
                value={aankoopprijs}
                onChange={(e) => setAankoopprijs(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div>
            <label
              htmlFor="registratierechten"
              className="text-sm font-semibold text-foreground"
            >
              Registratierechten
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="registratierechten"
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={registratierechtenPercentage}
                onChange={(e) =>
                  setRegistratierechtenPercentage(Number(e.target.value) || 0)
                }
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">%</span>
            </div>
          </div>
          <div>
            <label
              htmlFor="notariskosten"
              className="text-sm font-semibold text-foreground"
            >
              Notariskosten
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="notariskosten"
                type="number"
                min={0}
                max={50000}
                step={100}
                value={notariskosten}
                onChange={(e) =>
                  setNotariskosten(Number(e.target.value) || 0)
                }
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div>
            <label
              htmlFor="hypotheekkosten"
              className="text-sm font-semibold text-foreground"
            >
              Hypotheek- en kredietkosten (optioneel)
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="hypotheekkosten"
                type="number"
                min={0}
                max={50000}
                step={100}
                value={hypotheekkosten}
                onChange={(e) =>
                  setHypotheekkosten(Number(e.target.value) || 0)
                }
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="andere-kosten"
              className="text-sm font-semibold text-foreground"
            >
              Andere kosten (optioneel)
            </label>
            <div className="mt-1.5 flex max-w-xs items-center gap-2">
              <input
                id="andere-kosten"
                type="number"
                min={0}
                max={50000}
                step={100}
                value={andereKosten}
                onChange={(e) => setAndereKosten(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          Hypotheek- en kredietkosten: bijvoorbeeld dossierkosten van de
          lening en de aktekosten/inschrijvingsrecht van de hypothecaire
          akte, enkel als je (deels) financiert. Andere kosten: bijvoorbeeld
          een schattingsverslag. Beide zijn 0 als je die niet van toepassing
          vindt.
        </p>

        <div className="mt-8 rounded-2xl bg-accent-soft p-5">
          <p className="text-xs font-semibold text-accent">
            Totale prijs, alles inbegrepen
          </p>
          <p className="mt-1 font-display text-2xl font-extrabold text-accent">
            {euro(resultaat.totalePrijs)}
          </p>
          <p className="mt-2 text-sm text-foreground/90">
            {euro(resultaat.totaleBijkomendeKosten)} bijkomende kosten bovenop
            de aankoopprijs ({resultaat.bijkomendeKostenPercentage.toFixed(1)}
            %), waarvan {euro(resultaat.registratierechtenBedrag)}{" "}
            registratierechten.
          </p>
        </div>
      </div>
    </div>
  );
}
