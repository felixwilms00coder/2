import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getCategory, getSubcategory } from "@/lib/content/categories";
import { articles, getArticle, getArticlesForCategory } from "@/lib/content/articles";
import { Container, KindBadge, ContentCard } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MarkReadButton } from "@/components/progress-widgets";
import { ArticleBody } from "@/components/article-body";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";

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
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/leerstof/${category}/${slug}`,
    type: "article",
  });
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

  const subcategory = getSubcategory(cat.slug, article.subcategorySlug);
  const href = `/leerstof/${cat.slug}/${article.slug}`;

  // Prefer other articles in the same theme, then top up from elsewhere.
  const sameTheme = getArticlesForCategory(cat.slug).filter(
    (a) => a.slug !== article.slug,
  );
  const related = [
    ...sameTheme,
    ...articles.filter(
      (a) => a.categorySlug !== cat.slug && a.slug !== article.slug,
    ),
  ].slice(0, 3);

  return (
    <div className="bg-surface">
      <ArticleJsonLd
        title={article.title}
        description={article.summary}
        href={href}
        readMinutes={article.readMinutes}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Leerstof", href: "/leerstof" },
          { name: cat.title, href: `/leerstof/${cat.slug}` },
          { name: article.title, href },
        ]}
      />
      <div className="relative overflow-hidden border-b border-border bg-surface-muted">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 text-accent/[0.06]"
        />
        <Container className="relative py-12">
          <Breadcrumbs
            items={[
              { name: "Leerstof", href: "/leerstof" },
              { name: cat.title, href: `/leerstof/${cat.slug}` },
              ...(subcategory
                ? [
                    {
                      name: subcategory.title,
                      href: `/leerstof/${cat.slug}#${subcategory.slug}`,
                    },
                  ]
                : []),
              { name: article.title },
            ]}
          />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <KindBadge kind={article.kind} />
            <span className="text-sm font-medium text-accent">
              {article.readMinutes} minuten lezen
            </span>
          </div>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{article.summary}</p>
        </Container>
      </div>
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <ArticleBody blocks={article.blocks} />
        </div>
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center gap-4 border-t border-border pt-6">
          <MarkReadButton categorySlug={cat.slug} slug={article.slug} />
          <Link
            href={`/leerstof/${cat.slug}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alle artikels in {cat.title}
          </Link>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="verder-lezen" className="mt-14">
            <h2
              id="verder-lezen"
              className="font-display text-xl font-extrabold tracking-tight text-foreground"
            >
              Verder lezen
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((a) => (
                <ContentCard
                  key={a.slug}
                  href={`/leerstof/${a.categorySlug}/${a.slug}`}
                  kind={a.kind}
                  title={a.title}
                  description={a.summary}
                  readMinutes={a.readMinutes}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
