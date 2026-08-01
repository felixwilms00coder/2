import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/content/categories";
import { getArticlesForSubcategory } from "@/lib/content/articles";
import { Container, PageHero, KindBadge } from "@/components/ui";

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
      />
      <Container className="py-14">
        <Link
          href="/leerstof"
          className="text-sm font-semibold text-primary-light hover:underline"
        >
          ← Alle thema&apos;s
        </Link>

        <nav
          aria-label="Onderwerpen in dit thema"
          className="mt-6 flex flex-wrap gap-2"
        >
          {cat.subcategories.map((sub) => (
            <a
              key={sub.slug}
              href={`#${sub.slug}`}
              className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted hover:border-foreground/30 hover:text-foreground transition-colors"
            >
              {sub.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-14">
          {cat.subcategories.map((sub) => {
            const subArticles = getArticlesForSubcategory(cat.slug, sub.slug);
            return (
              <section
                key={sub.slug}
                id={sub.slug}
                className="scroll-mt-24 border-t border-border pt-8"
              >
                <h2 className="font-display text-xl font-bold text-foreground">
                  {sub.title}
                </h2>
                {subArticles.length > 0 ? (
                  <div className="mt-5 grid gap-4">
                    {subArticles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/leerstof/${cat.slug}/${article.slug}`}
                        className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <KindBadge kind={article.kind} />
                          <h3 className="mt-2 font-semibold text-foreground group-hover:text-primary-light transition-colors">
                            {article.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {article.summary}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-medium text-muted whitespace-nowrap">
                          {article.readMinutes} min
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted">
                    Voor dit onderwerp komen er binnenkort artikels aan.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
