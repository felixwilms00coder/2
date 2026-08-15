import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { tools } from "@/lib/content/tools";
import { Container, PageHero, EntityCard } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Rekentools",
  description:
    "Bereken je nettoloon, stel een 50/30/20-budget op of bereken hoe lang het duurt voor je een spaardoel haalt.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentools"
        title="Reken het na voor jouw situatie"
        description="Eenvoudige tools die je meteen een concreet antwoord geven. Alle berekeningen zijn indicatief."
      />
      <Container className="py-14">
        <h2 className="sr-only">Alle rekentools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <EntityCard
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
