import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/content/categories";
import { articles, getArticle, getArticlesForCategory } from "@/lib/content/articles";
import { Container } from "@/components/ui";
import { ArticleBody } from "@/components/article-body";

export function generateStaticParams() {
  return articles.map((a) => ({
    category: a.categorySlug,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = getCategory(category);
  const article = getArticle(category, slug);
  if (!cat || !article) notFound();

  const siblings = getArticlesForCategory(cat.slug);
  const currentIndex = siblings.findIndex((a) => a.slug === article.slug);
  const next = siblings[currentIndex + 1];

  return (
    <div className="bg-surface">
      <div className="bg-primary text-white">
        <Container className="py-12">
          <Link
            href={`/leerstof/${cat.slug}`}
            className="text-sm font-medium text-white/70 hover:text-white"
          >
            ← {cat.title}
          </Link>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold max-w-2xl">
            {article.title}
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">{article.summary}</p>
          <p className="mt-4 text-sm text-accent font-medium">
            {article.readMinutes} minuten leestijd
          </p>
        </Container>
      </div>
      <Container className="py-12">
        <div className="max-w-2xl">
          <ArticleBody blocks={article.blocks} />
        </div>
        <div className="mt-10 max-w-2xl border-t border-border pt-6 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href={`/leerstof/${cat.slug}`}
            className="text-sm font-semibold text-primary-light hover:underline"
          >
            ← Alle artikels in {cat.title}
          </Link>
          {next && (
            <Link
              href={`/leerstof/${cat.slug}/${next.slug}`}
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Volgend artikel: {next.title} →
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}
