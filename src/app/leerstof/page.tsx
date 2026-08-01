import type { Metadata } from "next";
import { categories } from "@/lib/content/categories";
import { getArticlesForCategory } from "@/lib/content/articles";
import { Container, PageHero, EntityCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leerstof",
  description:
    "Alle thema's op een rij: budget, familie, sparen en beleggen, erven, pensioen, belasting en werk, en wonen, uitgelegd voor starters.",
  alternates: { canonical: "/leerstof" },
};

export default function LeerstofPage() {
  return (
    <>
      <PageHero
        eyebrow="Leerstof"
        title="Kies een thema om mee te starten"
        description="Zeven thema's die bijna elke starter op de arbeidsmarkt tegenkomt. Kort, praktisch, zonder overbodig jargon."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = getArticlesForCategory(cat.slug).length;
            return (
              <EntityCard
                key={cat.slug}
                href={`/leerstof/${cat.slug}`}
                icon={cat.icon}
                title={cat.title}
                description={`${cat.description} (${count} artikel${
                  count === 1 ? "" : "en"
                })`}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}
