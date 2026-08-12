"use client";

import Link from "next/link";
import { BookOpenCheck, Check, Trophy } from "lucide-react";
import { useProgress } from "@/components/progress-provider";
import { articleId } from "@/lib/progress";

/** "Mark as read" toggle at the end of an article. */
export function MarkReadButton({
  categorySlug,
  slug,
}: {
  categorySlug: string;
  slug: string;
}) {
  const { ready, isRead, toggleRead } = useProgress();
  const done = ready && isRead(categorySlug, slug);

  return (
    <button
      onClick={() => toggleRead(categorySlug, slug)}
      aria-pressed={done}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
        done
          ? "bg-accent text-accent-contrast hover:bg-accent-strong"
          : "border border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft"
      }`}
    >
      {done ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Gelezen
        </>
      ) : (
        <>
          <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
          Markeer als gelezen
        </>
      )}
    </button>
  );
}

/** Small ring showing "x of y read" for a theme. */
export function ThemeProgressRing({
  categorySlug,
  slugs,
}: {
  categorySlug: string;
  slugs: string[];
}) {
  const { ready, isRead } = useProgress();
  if (!ready || slugs.length === 0) return null;

  const done = slugs.filter((s) => isRead(categorySlug, s)).length;
  if (done === 0) return null;

  const fraction = done / slugs.length;
  const complete = done === slugs.length;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent"
      title={`${done} van ${slugs.length} gelezen`}
    >
      <svg viewBox="0 0 36 36" className="h-4 w-4 -rotate-90" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          strokeWidth="6"
          className="stroke-accent/25"
        />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-accent"
          strokeDasharray={`${fraction * 94} 94`}
        />
      </svg>
      {complete ? "Volledig gelezen" : `${done}/${slugs.length}`}
    </span>
  );
}

/** XP + level pill, shown in the header once the reader has any progress. */
export function LevelPill() {
  const { ready, xp, level, levelFraction } = useProgress();
  if (!ready || xp === 0) return null;

  return (
    <Link
      href="/voortgang"
      className="hidden min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft lg:inline-flex"
      title={`${xp} XP: niveau ${level.name}`}
    >
      <Trophy className="h-4 w-4 text-accent" aria-hidden="true" />
      <span>{level.name}</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-10 overflow-hidden rounded-full bg-surface-muted"
      >
        <span
          className="block h-full rounded-full bg-accent"
          style={{ width: `${levelFraction * 100}%` }}
        />
      </span>
      <span className="sr-only">{xp} ervaringspunten</span>
    </Link>
  );
}

/** Read-state tick used on article cards in listings. */
export function ReadTick({
  categorySlug,
  slug,
}: {
  categorySlug: string;
  slug: string;
}) {
  const { ready, state } = useProgress();
  if (!ready || !state.read.includes(articleId(categorySlug, slug))) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent">
      <Check className="h-3.5 w-3.5" aria-hidden="true" />
      Gelezen
    </span>
  );
}
