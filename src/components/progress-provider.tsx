"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import {
  EMPTY_PROGRESS,
  ProgressState,
  articleId,
  calculateXp,
  levelForXp,
  levelProgress,
} from "@/lib/progress";
import {
  getReady,
  getServerReady,
  getServerSnapshot,
  getSnapshot,
  subscribe,
  updateProgress,
} from "@/lib/progress-store";

type ProgressContextValue = {
  /** False during SSR and hydration, true once the browser value is live. */
  ready: boolean;
  state: ProgressState;
  xp: number;
  level: ReturnType<typeof levelForXp>;
  levelFraction: number;
  isRead: (categorySlug: string, slug: string) => boolean;
  toggleRead: (categorySlug: string, slug: string) => void;
  recordQuiz: (quizSlug: string, score: number) => void;
  recordGame: (gameSlug: string, score: number) => void;
  isGidsStepDone: (gidsSlug: string, stepIndex: number) => boolean;
  toggleGidsStep: (gidsSlug: string, stepIndex: number) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const ready = useSyncExternalStore(subscribe, getReady, getServerReady);

  const value = useMemo<ProgressContextValue>(() => {
    const xp = calculateXp(state);
    return {
      ready,
      state,
      xp,
      level: levelForXp(xp),
      levelFraction: levelProgress(xp),
      isRead: (categorySlug, slug) =>
        state.read.includes(articleId(categorySlug, slug)),
      toggleRead: (categorySlug, slug) =>
        updateProgress((prev) => {
          const id = articleId(categorySlug, slug);
          return {
            ...prev,
            read: prev.read.includes(id)
              ? prev.read.filter((x) => x !== id)
              : [...prev.read, id],
          };
        }),
      recordQuiz: (quizSlug, score) =>
        updateProgress((prev) => ({
          ...prev,
          quizBest: {
            ...prev.quizBest,
            [quizSlug]: Math.max(prev.quizBest[quizSlug] ?? 0, score),
          },
        })),
      recordGame: (gameSlug, score) =>
        updateProgress((prev) => ({
          ...prev,
          gameBest: {
            ...prev.gameBest,
            [gameSlug]: Math.max(prev.gameBest[gameSlug] ?? 0, score),
          },
        })),
      isGidsStepDone: (gidsSlug, stepIndex) =>
        (state.gidsSteps[gidsSlug] ?? []).includes(stepIndex),
      toggleGidsStep: (gidsSlug, stepIndex) =>
        updateProgress((prev) => {
          const current = prev.gidsSteps[gidsSlug] ?? [];
          const next = current.includes(stepIndex)
            ? current.filter((i) => i !== stepIndex)
            : [...current, stepIndex];
          return {
            ...prev,
            gidsSteps: { ...prev.gidsSteps, [gidsSlug]: next },
          };
        }),
      reset: () => updateProgress(() => EMPTY_PROGRESS),
    };
  }, [state, ready]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside a ProgressProvider");
  }
  return ctx;
}
