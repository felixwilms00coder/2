"use client";

import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { berekenNoodbuffer } from "@/lib/calculations/noodbuffer";

const NIVEAU_TEKST = {
  onder: {
    label: "Onder de vuistregel",
    kleur: "text-warning",
    achtergrond: "bg-warning-light",
    uitleg:
      "Financiële-educatiebronnen zoals Wikifin noemen 3 tot 6 maanden vaste uitgaven als richtlijn. Je zit daar nu onder: een onverwachte uitgave kan dan sneller tot schulden leiden.",
  },
  binnen: {
    label: "Binnen de vuistregel",
    kleur: "text-accent",
    achtergrond: "bg-accent-soft",
    uitleg:
      "Dit valt binnen de gangbare richtlijn van 3 tot 6 maanden vaste uitgaven.",
  },
  boven: {
    label: "Boven de vuistregel",
    kleur: "text-foreground",
    achtergrond: "bg-surface-muted",
    uitleg:
      "Je buffer is groter dan de gangbare richtlijn. Overweeg of geld boven die 6 maanden elders meer voor je kan doen, bijvoorbeeld sparen voor een doel of beleggen op langere termijn.",
  },
} as const;

export function NoodbufferCalculator() {
  const [huidigSpaargeld, setHuidigSpaargeld] = useState(3000);
  const [maandelijkseUitgaven, setMaandelijkseUitgaven] = useState(1500);

  const resultaat = useMemo(
    () => berekenNoodbuffer({ huidigSpaargeld, maandelijkseUitgaven }),
    [huidigSpaargeld, maandelijkseUitgaven],
  );

  const niveau = NIVEAU_TEKST[resultaat.niveau];

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl border-l-4 border-l-warning bg-warning-light p-4">
        <ShieldAlert
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-bold">3 tot 6 maanden is een vuistregel, geen norm.</span>{" "}
          Hoeveel buffer je echt nodig hebt, hangt af van je situatie: hoe
          zeker is je inkomen, heb je mensen ten laste, hoe snel vind je een
          nieuwe job.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="huidig-spaargeld"
              className="text-sm font-semibold text-foreground"
            >
              Huidig spaargeld
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="huidig-spaargeld"
                type="number"
                min={0}
                max={1000000}
                step={100}
                value={huidigSpaargeld}
                onChange={(e) => setHuidigSpaargeld(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div>
            <label
              htmlFor="maandelijkse-uitgaven"
              className="text-sm font-semibold text-foreground"
            >
              Maandelijkse vaste uitgaven
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="maandelijkse-uitgaven"
                type="number"
                min={0}
                max={20000}
                step={50}
                value={maandelijkseUitgaven}
                onChange={(e) =>
                  setMaandelijkseUitgaven(Number(e.target.value) || 0)
                }
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
        </div>

        <div className={`mt-8 rounded-2xl p-5 ${niveau.achtergrond}`}>
          <p className={`text-xs font-semibold ${niveau.kleur}`}>
            {niveau.label}
          </p>
          <p className={`mt-1 font-display text-2xl font-extrabold ${niveau.kleur}`}>
            {Number.isFinite(resultaat.aantalMaanden)
              ? `${resultaat.aantalMaanden.toFixed(1)} maanden`
              : ": "}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {niveau.uitleg}
          </p>
        </div>
      </div>
    </div>
  );
}
