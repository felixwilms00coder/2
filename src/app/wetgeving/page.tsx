import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container, PageHero } from "@/components/ui";
import { legislation } from "@/lib/content/legislation";
import { officialSources } from "@/lib/content/sources";
import type { Jurisdiction } from "@/lib/content/types";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LegislationJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Wetgeving",
  description:
    "Wetgeving die van toepassing is op de onderwerpen op FinEdu, samengevat in gewone taal met een link naar de officieel geconsolideerde tekst.",
  path: "/wetgeving",
});

const jurisdictionLabels: Record<Jurisdiction, string> = {
  vlaams: "Vlaams",
  federaal: "Federaal",
  eu: "Europees",
};

export default function WetgevingPage() {
  return (
    <>
      <LegislationJsonLd entries={legislation} />
      <BreadcrumbJsonLd items={[{ name: "Wetgeving", href: "/wetgeving" }]} />
      <PageHero
        eyebrow="Wetgeving"
        title="De regels achter de leerstof"
        description="Wetgeving die relevant is voor de onderwerpen op FinEdu, samengevat in gewone taal: met telkens een link naar de officieel geconsolideerde tekst. Dit is ook de bron waarop het AI-antwoord op /zoeken zich baseert."
      />
      <Container className="py-14">
        <Breadcrumbs items={[{ name: "Wetgeving" }]} />
        <div className="mt-8 max-w-2xl rounded-2xl border border-warning/25 bg-warning-light p-5 text-sm leading-relaxed text-foreground/90">
          Dit zijn geen volledige of juridisch sluitende weergaves van de wet: enkel de kernstructuur, herschreven in gewone taal, en cijfers
          die vaak wijzigen (tarieven, drempels) staan hier bewust niet op.
          Voor een bindend antwoord op jouw concrete situatie: raadpleeg een
          notaris of advocaat.
        </div>

        <h2 className="sr-only">Alle wetgeving</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {legislation.map((entry) => (
            <div
              key={entry.slug}
              id={entry.slug}
              className="flex flex-col gap-3 rounded-[1.75rem] border border-border bg-surface p-6 scroll-mt-24"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-accent">
                  {jurisdictionLabels[entry.jurisdiction]}
                </span>
                <span className="text-xs text-muted">
                  Nagekeken op {entry.lastVerified}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-muted">
                  {entry.officialTitle}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {entry.summary}
              </p>
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                Officiële tekst lezen
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-foreground">
            Officiële bronnen
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Geen van deze partijen biedt een publieke koppeling voor derden
            aan: dit zijn dus doorverwijzingen, geen live geïntegreerde
            data.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {officialSources.map((source) => (
              <a
                key={source.slug}
                id={source.slug}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ease-smooth flex scroll-mt-24 flex-col gap-1.5 rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-[0_16px_36px_-20px_rgba(3,105,161,0.25)]"
              >
                <span className="font-display font-bold text-foreground">
                  {source.name}
                </span>
                <span className="text-sm text-muted">
                  {source.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
