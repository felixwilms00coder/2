"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, PiggyBank, RotateCcw, Smile, Wallet } from "lucide-react";
import { Game, GameEffect } from "@/lib/content/game";
import { useProgress } from "@/components/progress-provider";
import { ButtonLink } from "@/components/ui";

type Stats = {
  saldo: number;
  buffer: number;
  humeur: number;
  vasteKosten: number;
};

function euro(n: number) {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function apply(stats: Stats, effect: GameEffect): Stats {
  return {
    saldo: stats.saldo + (effect.saldo ?? 0),
    buffer: Math.max(0, stats.buffer + (effect.buffer ?? 0)),
    humeur: Math.max(0, Math.min(100, stats.humeur + (effect.humeur ?? 0))),
    vasteKosten: stats.vasteKosten + (effect.vasteKost ?? 0),
  };
}

/** 0-100 end score, weighing buffer, balance and quality of life against
 * the game's own scale (a short game has much smaller euro swings than a
 * year-long one, so each game defines its own targets). */
function endScore(stats: Stats, game: Game): number {
  const { bufferTarget, saldoFloor, saldoTarget } = game.scoreConfig;
  const bufferScore = Math.min(1, stats.buffer / bufferTarget) * 50;
  const saldoScore =
    Math.min(1, Math.max(0, stats.saldo + saldoFloor) / saldoTarget) * 25;
  const humeurScore = (stats.humeur / 100) * 25;
  return Math.round(bufferScore + saldoScore + humeurScore);
}

export function KeuzespelEngine({ game }: { game: Game }) {
  const start: Stats = {
    saldo: game.startSaldo,
    buffer: game.startBuffer,
    humeur: game.startHumeur,
    vasteKosten: game.basisVasteKosten,
  };

  const [index, setIndex] = useState(0);
  const [stats, setStats] = useState<Stats>(start);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const { recordGame } = useProgress();

  const round = game.rounds[index];
  const isLastRound = index === game.rounds.length - 1;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setStats((s) => apply(s, round.choices[i].effect));
  }

  function next() {
    if (isLastRound) {
      recordGame(game.slug, endScore(stats, game));
      setFinished(true);
      return;
    }
    setPicked(null);
    setIndex((i) => i + 1);
  }

  function restart() {
    setIndex(0);
    setStats(start);
    setPicked(null);
    setFinished(false);
  }

  const vrijBesteedbaar = game.nettoLoon - stats.vasteKosten;

  if (finished) {
    const score = endScore(stats, game);
    const verdict =
      score >= 75
        ? {
            title: "Sterk gespeeld",
            text: "Je hebt een stevige buffer opgebouwd zonder jezelf helemaal weg te cijferen. Precies de balans waar het om draait.",
          }
        : score >= 50
          ? {
              title: "Degelijk, met ruimte om te groeien",
              text: "Je houdt het hoofd boven water, maar je buffer of je vaste kosten verdienen aandacht. Speel opnieuw en probeer een andere volgorde.",
            }
          : {
              title: "Dat was een pittig traject",
              text: "Je koos vooral voor nu, waardoor tegenslagen hard aankwamen. Dat is precies wat een noodbuffer voorkomt: probeer het eens anders.",
            };

    return (
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
          Resultaat
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-6">
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="10"
                className="stroke-surface-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                className="stroke-accent transition-all duration-700"
                strokeDasharray={`${(score / 100) * 264} 264`}
              />
            </svg>
            <span className="absolute font-display text-2xl font-extrabold text-foreground">
              {score}
            </span>
          </div>
          <div className="min-w-[14rem] flex-1">
            <h2 className="font-display text-xl font-extrabold text-foreground">
              {verdict.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {verdict.text}
            </p>
          </div>
        </div>

        <dl className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">Noodbuffer</dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {euro(stats.buffer)}
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">
              Vaste kosten per maand
            </dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {euro(stats.vasteKosten)}
            </dd>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4">
            <dt className="text-xs font-semibold text-muted">
              Levenskwaliteit
            </dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-foreground">
              {stats.humeur}/100
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={restart}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Opnieuw spelen
          </button>
          <ButtonLink href="/leerstof" variant="outline">
            Naar de leerstof
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      {/* Live stats */}
      <dl className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-2xl bg-surface-muted p-3">
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <PiggyBank className="h-3.5 w-3.5" aria-hidden="true" />
            Buffer
          </dt>
          <dd className="mt-1 font-display text-lg font-extrabold text-foreground">
            {euro(stats.buffer)}
          </dd>
        </div>
        <div className="rounded-2xl bg-surface-muted p-3">
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
            Vrij per maand
          </dt>
          <dd className="mt-1 font-display text-lg font-extrabold text-foreground">
            {euro(vrijBesteedbaar)}
          </dd>
        </div>
        <div className="rounded-2xl bg-surface-muted p-3">
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Smile className="h-3.5 w-3.5" aria-hidden="true" />
            Humeur
          </dt>
          <dd className="mt-1 font-display text-lg font-extrabold text-foreground">
            {stats.humeur}
          </dd>
        </div>
      </dl>

      {/* Timeline */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-xs font-semibold text-muted">
          {game.roundLabel} {round.stap}
        </span>
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={game.rounds.length}
          aria-label={`Situatie ${index + 1} van ${game.rounds.length}`}
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${((index + 1) / game.rounds.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-muted">
          {index + 1}/{game.rounds.length}
        </span>
      </div>

      <h2 className="mt-6 font-display text-xl font-extrabold tracking-tight text-foreground">
        {round.title}
      </h2>
      <p className="mt-2 leading-relaxed text-muted">{round.situation}</p>

      <div className="mt-5 grid gap-2.5">
        {round.choices.map((choice, i) => {
          const isPicked = picked === i;
          let state =
            "border-border bg-surface hover:border-accent hover:bg-accent-soft";
          if (picked !== null && isPicked) {
            state = "border-accent border-2 bg-accent-soft";
          } else if (picked !== null) {
            state = "border-border bg-surface opacity-55";
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-medium text-foreground transition-all ${state} ${
                picked === null ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {picked !== null && (
          <div className="mt-5 rounded-2xl border-l-4 border-l-accent bg-surface-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/90">
              {round.choices[picked].feedback}
            </p>
            {round.leesMeer && (
              <Link
                href={round.leesMeer.href}
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                Lees: {round.leesMeer.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <div>
              <button
                onClick={next}
                className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
              >
                {isLastRound ? "Bekijk je resultaat" : "Volgende situatie"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
