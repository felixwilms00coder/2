import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Bot } from "lucide-react";
import { blogPosts } from "@/lib/content/blog";
import { getCategory } from "@/lib/content/categories";
import { Container, PageHero, Callout, ContentCard } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Elke dag een nieuw, AI-gegenereerd artikel over een van de FinEdu-thema's, telkens gegrond op de bestaande wetgeving en uitleg op het platform.",
  path: "/blog",
});

export default function BlogOverviewPage() {
  const sorted = [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Elke dag een nieuw artikel"
        description="Automatisch gegenereerd, één per dag, telkens over een van de FinEdu-thema's."
      />
      <Container className="py-14">
        <Callout tone="warning" title="Volledig AI-gegenereerd, ongelezen door een mens">
          Elk artikel hier wordt automatisch geschreven en gepubliceerd door
          een dagelijkse agent, zonder menselijke redactie vooraf. De agent
          baseert zich uitsluitend op de wetgeving en uitleg die al elders op
          FinEdu staat (zie /wetgeving en /lexicon): geen vrij verzonnen
          cijfers of wetsartikels, maar een fout is nooit volledig
          uitgesloten. Dit is algemene, educatieve informatie, geen
          persoonlijk advies.
        </Callout>

        <h2 className="sr-only">Alle blogartikels</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sorted.map((post) => {
            const category = getCategory(post.categorySlug);
            return (
              <ContentCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                kind="blog"
                title={post.title}
                description={
                  category ? `${category.title}: ${post.summary}` : post.summary
                }
                readMinutes={post.readMinutes}
                color={category?.color}
              />
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border p-10 text-center">
            <Bot className="h-8 w-8 text-muted" aria-hidden="true" />
            <p className="text-muted">
              Nog geen artikels: de eerste verschijnt bij de volgende
              geplande uitvoering van de agent.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
