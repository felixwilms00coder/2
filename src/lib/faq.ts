import type { ArticleBlock } from "./content/types";

export type FaqPair = { question: string; answer: string };

/**
 * Haalt vraag/antwoord-paren uit check- en reveal-blokken, voor FAQPage
 * JSON-LD. Enkel zinvol sinds de Fase-C-fix: daarvoor stond deze tekst niet
 * in de server-HTML, dus zou dit schema iets beweren dat niet klopte.
 */
export function extractFaqPairs(blocks: ArticleBlock[]): FaqPair[] {
  const pairs: FaqPair[] = [];
  for (const block of blocks) {
    if (block.type === "check") {
      pairs.push({ question: block.question, answer: block.explanation });
    } else if (block.type === "reveal") {
      pairs.push({ question: block.prompt, answer: block.answer });
    }
  }
  return pairs;
}
