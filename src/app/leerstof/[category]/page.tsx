import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/content/categories";
import { getArticlesForCategory } from "@/lib/content/articles";
import { Container, PageHero, IconTile } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const articles = getArticlesForCategory(cat.slug);

  return (
    <>
      <PageHero
        eyebrow="Leerstof"
        title={cat.title}
        description={cat.description}
      />
      <Container className="py-14">
        <Link
          href="/leerstof"
          className="text-sm font-semibold text-primary-light hover:underline"
        >
          ← Alle onderwerpen
        </Link>
        <div className="mt-6 grid gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/leerstof/${cat.slug}/${article.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <IconTile icon={cat.icon} />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary-light transition-colors">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{article.summary}</p>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted whitespace-nowrap">
                {article.readMinutes} min
              </span>
            </Link>
          ))}
          {articles.length === 0 && (
            <p className="text-muted">
              Voor dit onderwerp komen er binnenkort artikels aan.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
