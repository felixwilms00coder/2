"use client";

import Link from "next/link";
import { Check, PartyPopper } from "lucide-react";
import { useProgress } from "@/components/progress-provider";
import { XP_PER_GIDS_STEP } from "@/lib/progress";

/**
 * Afvinkbare stappenlijst voor een gids: dezelfde localStorage-voortgang
 * als "markeer als gelezen" bij artikels, maar per stap-index binnen één
 * gids. Geeft XP per afgevinkte stap (zie XP_PER_GIDS_STEP in progress.ts)
 * en telt mee in het niveau op /voortgang.
 */
export function GidsStepChecklist({
  gidsSlug,
  chapters,
}: {
  gidsSlug: string;
  chapters: string[];
}) {
  const { ready, isGidsStepDone, toggleGidsStep } = useProgress();

  const doneCount = ready
    ? chapters.filter((_, i) => isGidsStepDone(gidsSlug, i)).length
    : 0;
  const total = chapters.length;
  const complete = ready && doneCount === total;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">
          {doneCount} van {total} stappen afgevinkt
        </p>
        <p className="text-sm font-bold text-accent">
          +{doneCount * XP_PER_GIDS_STEP} XP
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${total > 0 ? (doneCount / total) * 100 : 0}%` }}
        />
      </div>

      <ol className="mt-5 space-y-2">
        {chapters.map((chapter, i) => {
          const done = ready && isGidsStepDone(gidsSlug, i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggleGidsStep(gidsSlug, i)}
                aria-pressed={done}
                className={`ease-smooth flex min-h-11 w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all duration-150 ${
                  done
                    ? "border-accent/30 bg-accent-soft text-foreground"
                    : "border-border bg-surface text-foreground hover:border-accent/40 hover:bg-accent-soft/40"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                    done
                      ? "border-accent bg-accent text-accent-contrast"
                      : "border-border text-muted"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={done ? "font-medium" : ""}>{chapter}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {complete && (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-5"
        >
          <PartyPopper
            className="mt-0.5 h-5 w-5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <div>
            <p className="font-display text-base font-bold text-foreground">
              Volledige gids doorlopen
            </p>
            <p className="mt-1 text-sm text-muted">
              Je vinkte alle {total} stappen af. Test wat je leerde in de
              praktijk, zonder er echt geld mee te riskeren:{" "}
              <Link
                href="/spel/je-eerste-keer-beleggen"
                className="font-semibold text-accent hover:underline"
              >
                speel het keuzespel &apos;Je eerste keer beleggen&apos;
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
