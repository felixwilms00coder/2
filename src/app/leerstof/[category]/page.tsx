import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/content/categories";
import { getArticlesForSubcategory } from "@/lib/content/articles";
import { Container, PageHero, ContentCard } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { CategoryColor } from "@/lib/content/types";
import { pageMetadata } from "@/lib/metadata";

const pillColorStyles: Record<CategoryColor, string> = {
  blue: "hover:border-cat-blue hover:bg-cat-blue-soft hover:text-cat-blue",
  rose: "hover:border-cat-rose hover:bg-cat-rose-soft hover:text-cat-rose",
  green: "hover:border-accent hover:bg-accent-soft hover:text-accent",
  amber: "hover:border-cat-amber hover:bg-cat-amber-soft hover:text-cat-amber",
  violet:
    "hover:border-cat-violet hover:bg-cat-violet-soft hover:text-cat-violet",
  orange:
    "hover:border-cat-orange hover:bg-cat-orange-soft hover:text-cat-orange",
  cyan: "hover:border-cat-cyan hover:bg-cat-cyan-soft hover:text-cat-cyan",
};

const dotColorStyles: Record<CategoryColor, string> = {
  blue: "bg-cat-blue",
  rose: "bg-cat-rose",
  green: "bg-accent",
  amber: "bg-cat-amber",
  violet: "bg-cat-violet",
  orange: "bg-cat-orange",
  cyan: "bg-cat-cyan",
};

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
  return pageMetadata({
    title: cat.title,
    description: cat.description,
    path: `/leerstof/${cat.slug}`,
  });
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
      <BreadcrumbJsonLd
        items={[
          { name: "Leerstof", href: "/leerstof" },
          { name: cat.title, href: `/leerstof/${cat.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Leerstof"
        title={cat.title}
        description={cat.description}
      >
        <div className="mt-6">
          <Breadcrumbs
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
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-foreground/80 transition-colors ${pillColorStyles[cat.color]}`}
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
                <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-foreground">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ${dotColorStyles[cat.color]}`}
                  />
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
                        color={cat.color}
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
