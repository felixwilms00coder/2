"use client";

import Link from "next/link";
import { BookOpen, Gamepad2, RotateCcw, Trophy } from "lucide-react";
import { useProgress } from "@/components/progress-provider";
import { articles } from "@/lib/content/articles";
import { quizzes } from "@/lib/content/quizzes";
import { games } from "@/lib/content/game";
import { categories } from "@/lib/content/categories";
import { articleId } from "@/lib/progress";
import { ButtonLink, ContentCard } from "@/components/ui";

export function ProgressOverview() {
  const { ready, state, xp, level, levelFraction, reset } = useProgress();

  if (!ready) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8">
        <p className="text-muted">Je voortgang wordt geladen…</p>
      </div>
    );
  }

  const readCount = state.read.length;
  const quizCount = Object.keys(state.quizBest).length;
  const gameScores = Object.values(state.gameBest);
  const bestGameScore = gameScores.length > 0 ? Math.max(...gameScores) : null;
  const unread = articles.filter(
    (a) => !state.read.includes(articleId(a.categorySlug, a.slug)),
  );

  if (xp === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
        <Trophy className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-extrabold text-foreground">
          Je bent nog niet begonnen
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Lees een artikel, doe de quiz of speel het keuzespel. Je voortgang
          wordt lokaal in je browser bewaard: je hoeft geen account te maken.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/leerstof">Begin met lezen</ButtonLink>
          <ButtonLink href="/spel" variant="outline">
            Speel het keuzespel
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Level */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Jouw niveau
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-foreground">
              {level.name}
            </p>
          </div>
          <p className="font-display text-2xl font-extrabold text-accent">
            {xp} XP
          </p>
        </div>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${levelFraction * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted">
          {level.next === null
            ? "Je hebt het hoogste niveau bereikt."
            : `Nog ${level.next - xp} XP tot het volgende niveau.`}
        </p>
      </div>

      {/* Stats */}
      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <dt className="flex items-center gap-2 text-sm font-semibold text-muted">
            <BookOpen className="h-4 w-4 text-accent" aria-hidden="true" />
            Gelezen artikels
          </dt>
          <dd className="mt-2 font-display text-2xl font-extrabold text-foreground">
            {readCount}
            <span className="text-base text-muted">/{articles.length}</span>
          </dd>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <dt className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Trophy className="h-4 w-4 text-accent" aria-hidden="true" />
            Quizzen gedaan
          </dt>
          <dd className="mt-2 font-display text-2xl font-extrabold text-foreground">
            {quizCount}
            <span className="text-base text-muted">/{quizzes.length}</span>
          </dd>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <dt className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Gamepad2 className="h-4 w-4 text-accent" aria-hidden="true" />
            Beste spelscore
          </dt>
          <dd className="mt-2 font-display text-2xl font-extrabold text-foreground">
            {bestGameScore === null ? ": " : `${bestGameScore}/100`}
          </dd>
          <dd className="mt-1 text-xs text-muted">
            {gameScores.length}/{games.length} keuzespellen gespeeld
          </dd>
        </div>
      </dl>

      {/* Per theme */}
      <div>
        <h2 className="font-display text-xl font-extrabold text-foreground">
          Per thema
        </h2>
        <ul className="mt-4 space-y-2.5">
          {categories.map((cat) => {
            const inTheme = articles.filter(
              (a) => a.categorySlug === cat.slug,
            );
            if (inTheme.length === 0) return null;
            const done = inTheme.filter((a) =>
              state.read.includes(articleId(a.categorySlug, a.slug)),
            ).length;
            const pct = (done / inTheme.length) * 100;
            return (
              <li key={cat.slug}>
                <Link
                  href={`/leerstof/${cat.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent hover:bg-accent-soft"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {cat.title}
                    </span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-muted">
                      <span
                        className="block h-full rounded-full bg-accent transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-muted">
                    {done}/{inTheme.length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Continue */}
      {unread.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-extrabold text-foreground">
            Ga verder
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {unread.slice(0, 3).map((a) => (
              <ContentCard
                key={a.slug}
                href={`/leerstof/${a.categorySlug}/${a.slug}`}
                kind={a.kind}
                title={a.title}
                description={a.summary}
                readMinutes={a.readMinutes}
              />
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6">
        <button
          onClick={() => {
            if (
              window.confirm(
                "Weet je zeker dat je je voortgang wil wissen? Dit kan niet ongedaan gemaakt worden.",
              )
            ) {
              reset();
            }
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-muted transition-colors hover:border-warning hover:text-warning"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Voortgang wissen
        </button>
      </div>
    </div>
  );
}
