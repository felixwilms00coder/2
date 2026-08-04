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
  const href = `/leerstof/${category}/${slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: href },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: href,
    },
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
      <div className="on-dark relative overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/hero-skyline.svg')] bg-cover bg-bottom bg-no-repeat opacity-45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,13,11,0.96)_0%,rgba(14,13,11,0.82)_55%,rgba(14,13,11,0.35)_100%)]"
        />
        <Container className="relative py-12">
          <Breadcrumbs
            onDark
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
            <KindBadge kind={article.kind} inverse />
            <span className="text-sm font-medium text-accent-bright">
              {article.readMinutes} minuten lezen
            </span>
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">{article.summary}</p>
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
