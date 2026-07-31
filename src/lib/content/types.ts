export type Category = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "tip" | "warning"; title: string; text: string }
  | { type: "steps"; items: string[] };

export type Article = {
  slug: string;
  categorySlug: string;
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
