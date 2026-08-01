import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getSubcategory } from "@/lib/content/categories";
import { articles, getArticle, getArticlesForCategory } from "@/lib/content/articles";
import { Container, KindBadge } from "@/components/ui";
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
  const siblings = getArticlesForCategory(cat.slug);
  const currentIndex = siblings.findIndex((a) => a.slug === article.slug);
  const next = siblings[currentIndex + 1];
  const href = `/leerstof/${cat.slug}/${article.slug}`;

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
      <div className="relative overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/hero-skyline.svg')] bg-cover bg-bottom bg-no-repeat opacity-45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.8)_55%,rgba(10,10,10,0.35)_100%)]"
        />
        <Container className="relative py-12">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
            <Link href="/leerstof" className="hover:text-white">
              Leerstof
            </Link>
            <span>/</span>
            <Link href={`/leerstof/${cat.slug}`} className="hover:text-white">
              {cat.title}
            </Link>
            {subcategory && (
              <>
                <span>/</span>
                <Link
                  href={`/leerstof/${cat.slug}#${subcategory.slug}`}
                  className="hover:text-white"
                >
                  {subcategory.title}
                </Link>
              </>
            )}
          </div>
          <div className="mt-4">
            <KindBadge kind={article.kind} inverse />
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold max-w-2xl">
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
