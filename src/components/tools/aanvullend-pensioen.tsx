"use client";

import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { berekenAanvullendPensioen } from "@/lib/calculations/aanvullendpensioen";

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function AanvullendPensioen() {
  const [huidigeLeeftijd, setHuidigeLeeftijd] = useState(25);
  const [pensioenleeftijd, setPensioenleeftijd] = useState(67);
  const [huidigKapitaal, setHuidigKapitaal] = useState(0);
  const [maandelijkseInleg, setMaandelijkseInleg] = useState(100);
  const [verwachtRendement, setVerwachtRendement] = useState(4);

  const resultaat = useMemo(
    () =>
      berekenAanvullendPensioen({
        huidigeLeeftijd,
        pensioenleeftijd,
        huidigKapitaal,
        maandelijkseInleg,
        verwachtRendement,
      }),
    [huidigeLeeftijd, pensioenleeftijd, huidigKapitaal, maandelijkseInleg, verwachtRendement],
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
            Dit is enkel wat je zelf extra opbouwt
          </span>{" "}: pensioensparen, VAPZ, of gewoon apart sparen: niet je wettelijk
          pensioen. Voor een schatting van dat wettelijk pensioen op basis van
          je echte loopbaan, ga naar de officiële{" "}
          <a
            href="https://www.mypension.be"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            MyPension.be
          </a>
          .
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="huidige-leeftijd" className="text-sm font-semibold text-foreground">
              Huidige leeftijd
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="huidige-leeftijd"
                type="number"
                min={16}
                max={70}
                step={1}
                value={huidigeLeeftijd}
                onChange={(e) => setHuidigeLeeftijd(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">jaar</span>
            </div>
          </div>
          <div>
            <label htmlFor="pensioenleeftijd" className="text-sm font-semibold text-foreground">
              Pensioenleeftijd
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="pensioenleeftijd"
                type="number"
                min={huidigeLeeftijd + 1}
                max={75}
                step={1}
                value={pensioenleeftijd}
                onChange={(e) => setPensioenleeftijd(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">jaar</span>
            </div>
          </div>
          <div>
            <label htmlFor="huidig-kapitaal" className="text-sm font-semibold text-foreground">
              Al opgebouwd kapitaal
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="huidig-kapitaal"
                type="number"
                min={0}
                max={1000000}
                step={100}
                value={huidigKapitaal}
                onChange={(e) => setHuidigKapitaal(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div>
            <label htmlFor="maandelijkse-inleg" className="text-sm font-semibold text-foreground">
              Maandelijkse inleg
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="maandelijkse-inleg"
                type="number"
                min={0}
                max={5000}
                step={10}
                value={maandelijkseInleg}
                onChange={(e) => setMaandelijkseInleg(Number(e.target.value) || 0)}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-semibold text-foreground focus:border-accent"
              />
              <span className="shrink-0 text-sm text-muted">€</span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="verwacht-rendement" className="text-sm font-semibold text-foreground">
              Verwacht jaarlijks rendement
            </label>
            <div className="mt-1.5 flex max-w-xs items-center gap-3">
              <input
                id="verwacht-rendement"
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={verwachtRendement}
                onChange={(e) => setVerwachtRendement(Number(e.target.value))}
                aria-valuetext={`${verwachtRendement}% per jaar`}
                className="w-full accent-[var(--color-accent)]"
              />
              <span className="w-16 shrink-0 text-sm font-semibold text-foreground">
                {verwachtRendement}%
              </span>
            </div>
          </div>
        </div>

        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Zelf ingelegd</dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {euro(resultaat.ingelegd)}
            </dd>
          </div>
          <div className="rounded-2xl bg-accent-soft p-4">
            <dt className="text-xs font-semibold text-accent">
              Geschat kapitaal op {pensioenleeftijd}
            </dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-accent">
              {euro(resultaat.eindkapitaal)}
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Waarvan rendement</dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {euro(resultaat.rendementBedrag)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
