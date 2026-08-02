export type Subcategory = {
  slug: string;
  title: string;
};

export type CategoryColor =
  | "blue"
  | "rose"
  | "green"
  | "amber"
  | "violet"
  | "orange"
  | "cyan";

export type Category = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  color: CategoryColor;
  subcategories: Subcategory[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "tip" | "warning"; title: string; text: string }
  | { type: "steps"; items: string[] }
  /** Inline knowledge check: breaks up reading with a question. */
  | {
      type: "check";
      question: string;
      options: { text: string; correct: boolean }[];
      explanation: string;
    }
  /** "Guess first, then reveal" — makes the reader commit before the answer. */
  | { type: "reveal"; prompt: string; answer: string }
  /** A single number worth remembering. */
  | { type: "figure"; value: string; label: string; source?: string };

export type ArticleKind = "artikel" | "tips" | "checklist";

export type Article = {
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  kind: ArticleKind;
  title: string;
  summary: string;
  readMinutes: number;
  blocks: ArticleBlock[];
};

export type ToolSummary = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
};

export type QuizOption = {
  text: string;
  correct: boolean;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
  explanation: string;
};

export type Quiz = {
  slug: string;
  title: string;
  short: string;
  description: string;
  questions: QuizQuestion[];
};
