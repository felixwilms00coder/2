export type ProgressState = {
  /** Article ids, stored as "categorySlug/articleSlug". */
  read: string[];
  /** Best score per quiz slug. */
  quizBest: Record<string, number>;
  /** Best end-score of the decision game. */
  gameBest: number | null;
};

export const EMPTY_PROGRESS: ProgressState = {
  read: [],
  quizBest: {},
  gameBest: null,
};

export const STORAGE_KEY = "finedu:progress:v1";

export const XP_PER_ARTICLE = 10;
export const XP_PER_CORRECT_ANSWER = 5;
export const XP_PER_GAME = 25;

export function articleId(categorySlug: string, slug: string): string {
  return `${categorySlug}/${slug}`;
}

export function calculateXp(state: ProgressState): number {
  const readXp = state.read.length * XP_PER_ARTICLE;
  const quizXp =
    Object.values(state.quizBest).reduce((sum, s) => sum + s, 0) *
    XP_PER_CORRECT_ANSWER;
  const gameXp = state.gameBest !== null ? XP_PER_GAME : 0;
  return readXp + quizXp + gameXp;
}

export type Level = {
  name: string;
  min: number;
  next: number | null;
};

const LEVELS: Level[] = [
  { name: "Nieuwkomer", min: 0, next: 50 },
  { name: "Starter", min: 50, next: 110 },
  { name: "Budgetbewust", min: 110, next: 190 },
  { name: "Spaarder", min: 190, next: 290 },
  { name: "Geldwijs", min: 290, next: null },
];

export function levelForXp(xp: number): Level {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.min) current = level;
  }
  return current;
}

/** 0..1 progress towards the next level (1 when maxed out). */
export function levelProgress(xp: number): number {
  const level = levelForXp(xp);
  if (level.next === null) return 1;
  return Math.min(1, (xp - level.min) / (level.next - level.min));
}

export function readState(): ProgressState {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      read: Array.isArray(parsed.read) ? parsed.read : [],
      quizBest:
        parsed.quizBest && typeof parsed.quizBest === "object"
          ? parsed.quizBest
          : {},
      gameBest:
        typeof parsed.gameBest === "number" ? parsed.gameBest : null,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function writeState(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (private mode, quota). Progress is a
    // nice-to-have, so failing to persist must never break the page.
  }
}
