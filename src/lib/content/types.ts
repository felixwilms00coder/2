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

export type Jurisdiction = "vlaams" | "federaal" | "eu";

/**
 * Curated, plain-language summary of één wetgevend kader. Geen vervanging
 * van de officiële tekst — telkens met een link naar de geconsolideerde
 * bron en een datum waarop een redacteur de samenvatting laatst nakeek.
 * Wordt gebruikt om het AI-antwoord te gronden (zie src/lib/legal-context.ts)
 * en om broncitaten in de UI te tonen.
 */
export type LegislationEntry = {
  slug: string;
  title: string;
  officialTitle: string;
  jurisdiction: Jurisdiction;
  topics: string[];
  summary: string;
  sourceUrl: string;
  lastVerified: string;
};

export type OfficialSource = {
  slug: string;
  name: string;
  url: string;
  description: string;
  topics: string[];
};

/**
 * Eén term in het financieel lexicon: een korte, feitelijke uitleg in
 * gewone taal. Bewust geen actuele bedragen of percentages (die veranderen
 * jaarlijks) — enkel de betekenis van het begrip zelf.
 */
export type LexiconEntry = {
  slug: string;
  term: string;
  uitleg: string;
  categorySlug: string;
};

/**
 * Een blogpost in de "Blog"-sectie: gegenereerd door een dagelijkse agent,
 * altijd gegrond op wat al elders op FinEdu staat (legislation.ts,
 * lexicon.ts) — geen vrij verzonnen feiten. Elke post is duidelijk
 * gelabeld als AI-gegenereerd (zie de PageHero/Callout op /blog), dus dit
 * type zelf houdt geen los "aiGenerated"-veld bij: dat geldt voor de hele
 * sectie, niet per post.
 */
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  publishedAt: string;
  readMinutes: number;
  blocks: ArticleBlock[];
};
