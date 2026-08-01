import { articles } from "./content/articles";
import { getCategory } from "./content/categories";
import { tools } from "./content/tools";
import { quizzes } from "./content/quizzes";

export type SearchResult = {
  href: string;
  kind: string;
  title: string;
  description: string;
};

export function searchContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const article of articles) {
    const haystack = `${article.title} ${article.summary}`.toLowerCase();
    if (haystack.includes(q)) {
      const category = getCategory(article.categorySlug);
      results.push({
        href: `/leerstof/${article.categorySlug}/${article.slug}`,
        kind: article.kind,
        title: article.title,
        description: category
          ? `${category.title} — ${article.summary}`
          : article.summary,
      });
    }
  }

  for (const tool of tools) {
    const haystack = `${tool.title} ${tool.description}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        href: `/tools/${tool.slug}`,
        kind: "tool",
        title: tool.title,
        description: tool.description,
      });
    }
  }

  for (const quiz of quizzes) {
    const haystack = `${quiz.title} ${quiz.description}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        href: `/quiz/${quiz.slug}`,
        kind: "quiz",
        title: quiz.title,
        description: quiz.description,
      });
    }
  }

  return results;
}
