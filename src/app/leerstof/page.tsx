import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { categories } from "@/lib/content/categories";
import { getArticlesForCategory } from "@/lib/content/articles";
import { Container, PageHero, EntityCard } from "@/components/ui";
import { ThemeProgressRing } from "@/components/progress-widgets";

export const metadata: Metadata = pageMetadata({
  title: "Leerstof",
  description:
    "Alle thema's op een rij: budget, familie, sparen en beleggen, erven, pensioen, belasting en werk, en wonen, uitgelegd voor starters.",
  path: "/leerstof",
});

export default function LeerstofPage() {
  return (
    <>
      <PageHero
        eyebrow="Leerstof"
        title="Kies een thema om mee te starten"
        description="Zeven thema's die bijna elke starter op de arbeidsmarkt tegenkomt. Kort, praktisch, zonder overbodig jargon."
      />
      <Container className="py-14">
        <h2 className="sr-only">Alle thema&apos;s</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const inTheme = getArticlesForCategory(cat.slug);
            return (
              <div key={cat.slug} className="relative">
                <EntityCard
                  href={`/leerstof/${cat.slug}`}
                  icon={cat.icon}
                  title={cat.title}
                  description={`${cat.description} (${inTheme.length} artikel${
                    inTheme.length === 1 ? "" : "en"
                  })`}
                  color={cat.color}
                />
                <span className="pointer-events-none absolute right-4 top-4">
                  <ThemeProgressRing
                    categorySlug={cat.slug}
                    slugs={inTheme.map((a) => a.slug)}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
