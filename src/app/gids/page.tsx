import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { gidsen } from "@/lib/content/gidsen";
import { Container, PageHero, EntityCard } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Gidsen",
  description:
    "Gratis downloadbare pdf-gidsen: langere cursussen over één onderwerp, om in je eigen tempo door te nemen.",
  path: "/gids",
});

export default function GidsenOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Gidsen"
        title="Gratis gidsen om te downloaden"
        description="Langere pdf-cursussen over één onderwerp, voor wie liever stap voor stap en in eigen tempo leert."
      />
      <Container className="py-14">
        <h2 className="sr-only">Alle gidsen</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gidsen.map((gids) => (
            <EntityCard
              key={gids.slug}
              href={`/gids/${gids.slug}`}
              icon="download"
              title={gids.title}
              description={gids.short}
              meta={`${gids.pageCount} pagina's, gratis pdf`}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
