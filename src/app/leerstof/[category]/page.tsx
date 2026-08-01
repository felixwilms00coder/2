import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/content/categories";
import { getArticlesForSubcategory } from "@/lib/content/articles";
import { Container, PageHero, ContentCard } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";

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
    alternates: { canonical: `/leerstof/${cat.slug}` },
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

  return (
    <>
      <PageHero
        eyebrow="Leerstof"
        title={cat.title}
        description={cat.description}
      >
        <div className="mt-6">
          <Breadcrumbs
            onDark
            items={[
              { name: "Leerstof", href: "/leerstof" },
              { name: cat.title },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <nav
          aria-label="Onderwerpen in dit thema"
          className="flex flex-wrap gap-2"
        >
          {cat.subcategories.map((sub) => {
            const count = getArticlesForSubcategory(cat.slug, sub.slug).length;
            return (
              <a
                key={sub.slug}
                href={`#${sub.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {sub.title}
                <span className="rounded-full bg-surface-muted px-1.5 py-0.5 text-xs font-bold text-muted">
                  {count}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="mt-12 space-y-14">
          {cat.subcategories.map((sub) => {
            const subArticles = getArticlesForSubcategory(cat.slug, sub.slug);
            return (
              <section
                key={sub.slug}
                id={sub.slug}
                className="scroll-mt-24 border-t border-border pt-8"
              >
                <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                  {sub.title}
                </h2>
                {subArticles.length > 0 ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {subArticles.map((article) => (
                      <ContentCard
                        key={article.slug}
                        href={`/leerstof/${cat.slug}/${article.slug}`}
                        kind={article.kind}
                        title={article.title}
                        description={article.summary}
                        readMinutes={article.readMinutes}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface-muted/60 p-5">
                    <p className="text-sm text-muted">
                      Hier komt binnenkort inhoud. Bekijk ondertussen de{" "}
                      <Link
                        href="/tools"
                        className="font-semibold text-accent hover:underline"
                      >
                        rekentools
                      </Link>{" "}
                      of een ander onderwerp hierboven.
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
