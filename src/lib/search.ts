import { articles } from "./content/articles";
import { getCategory } from "./content/categories";
import { tools } from "./content/tools";
import { quizzes } from "./content/quizzes";
import type { ArticleBlock } from "./content/types";

export type SearchResult = {
  href: string;
  kind: string;
  title: string;
  description: string;
  score: number;
  snippet?: string;
};

/** Woorden die geen betekenisvolle zoekterm vormen: genegeerd bij tokenisatie. */
const STOPWORDS = new Set([
  "de", "het", "een", "en", "of", "maar", "want", "dus", "dat", "die", "dit",
  "deze", "is", "ben", "zijn", "was", "waren", "wordt", "worden", "word",
  "heb", "hebt", "heeft", "hebben", "had", "hadden", "ik", "je", "jij", "u",
  "we", "wij", "jullie", "ze", "zij", "hij", "hem", "haar", "hun", "mijn",
  "jouw", "uw", "onze", "wat", "hoe", "waar", "wanneer", "waarom", "wie",
  "welke", "kan", "kun", "kunt", "moet", "moeten", "wil", "wilt", "willen",
  "zal", "zou", "zouden", "niet", "geen", "ook", "al", "nog", "dan", "toch",
  "wel", "om", "voor", "naar", "met", "van", "op", "in", "aan", "bij", "uit",
  "door", "over", "onder", "tussen", "tot", "als", "zoals", "veel", "meer",
  "meest", "mag", "mogen", "er", "the", "a", "te", "zo", "ben", "man", "vrouw",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

/** Telt hoe vaak elk zoektoken voorkomt in `text`, als heel woord of als deel van een woord. */
function scoreTextAgainstTokens(text: string, tokens: string[]): number {
  if (!text) return 0;
  const words = tokenize(text);
  const wordSet = new Set(words);
  let score = 0;
  for (const token of tokens) {
    if (wordSet.has(token)) {
      score += 3;
    } else if (token.length >= 4 && words.some((w) => w.includes(token))) {
      score += 1;
    }
  }
  return score;
}

/** Splitst een artikel op in doorzoekbare, op zichzelf staande tekstfragmenten. */
function articleChunks(blocks: ArticleBlock[]): string[] {
  const chunks: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "p":
      case "h2":
        chunks.push(block.text);
        break;
      case "list":
      case "steps":
        chunks.push(...block.items);
        break;
      case "callout":
        chunks.push(`${block.title}. ${block.text}`);
        break;
      case "check":
        chunks.push(`${block.question} ${block.explanation}`);
        break;
      case "reveal":
        chunks.push(`${block.prompt} ${block.answer}`);
        break;
      case "figure":
        chunks.push(`${block.label}: ${block.value}`);
        break;
    }
  }
  return chunks;
}

function buildSnippet(text: string, tokens: string[], maxLength = 220): string {
  if (text.length <= maxLength) return text;
  const lower = text.toLowerCase();
  const firstIndex = tokens
    .map((t) => lower.indexOf(t))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  if (firstIndex === undefined) return text.slice(0, maxLength).trimEnd() + "…";

  const start = Math.max(0, firstIndex - 60);
  const end = Math.min(text.length, start + maxLength);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end).trim() + suffix;
}

/** Kiest, uit alle tekstfragmenten van een artikel, het fragment dat de zoekvraag het best beantwoordt. */
function bestSnippet(blocks: ArticleBlock[], tokens: string[]): string | undefined {
  let best: { text: string; score: number } | undefined;
  for (const chunk of articleChunks(blocks)) {
    const score = scoreTextAgainstTokens(chunk, tokens);
    if (score > 0 && (!best || score > best.score)) {
      best = { text: chunk, score };
    }
  }
  return best ? buildSnippet(best.text, tokens) : undefined;
}

export function searchContent(query: string): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const phrase = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  for (const article of articles) {
    const titleScore = scoreTextAgainstTokens(article.title, tokens) * 4;
    const summaryScore = scoreTextAgainstTokens(article.summary, tokens) * 2;
    const bodyScore = articleChunks(article.blocks).reduce(
      (sum, chunk) => sum + scoreTextAgainstTokens(chunk, tokens),
      0,
    );
    const phraseBonus =
      article.title.toLowerCase().includes(phrase) ||
      article.summary.toLowerCase().includes(phrase)
        ? 15
        : 0;
    const score = titleScore + summaryScore + bodyScore + phraseBonus;
    if (score <= 0) continue;

    const category = getCategory(article.categorySlug);
    results.push({
      href: `/leerstof/${article.categorySlug}/${article.slug}`,
      kind: article.kind,
      title: article.title,
      description: category
        ? `${category.title} — ${article.summary}`
        : article.summary,
      score,
      snippet: bestSnippet(article.blocks, tokens),
    });
  }

  for (const tool of tools) {
    const titleScore = scoreTextAgainstTokens(tool.title, tokens) * 4;
    const descScore = scoreTextAgainstTokens(
      `${tool.short} ${tool.description}`,
      tokens,
    );
    const score = titleScore + descScore;
    if (score <= 0) continue;
    results.push({
      href: `/tools/${tool.slug}`,
      kind: "tool",
      title: tool.title,
      description: tool.description,
      score,
    });
  }

  for (const quiz of quizzes) {
    const titleScore = scoreTextAgainstTokens(quiz.title, tokens) * 4;
    const descScore = scoreTextAgainstTokens(
      `${quiz.short} ${quiz.description}`,
      tokens,
    );
    const questionScore = quiz.questions.reduce(
      (sum, question) =>
        sum +
        scoreTextAgainstTokens(
          `${question.question} ${question.explanation}`,
          tokens,
        ),
      0,
    );
    const score = titleScore + descScore + questionScore;
    if (score <= 0) continue;
    results.push({
      href: `/quiz/${quiz.slug}`,
      kind: "quiz",
      title: quiz.title,
      description: quiz.description,
      score,
    });
  }

  return results.sort((a, b) => b.score - a.score);
}
