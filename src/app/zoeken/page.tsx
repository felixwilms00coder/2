import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, PageHero, ContentCard, KindBadge } from "@/components/ui";
import { SearchBox } from "@/components/search-box";
import { AiAnswer } from "@/components/ai-answer";
import { searchContent } from "@/lib/search";

export const metadata: Metadata = {
  title: "Zoeken",
  description: "Doorzoek alle leerstof, rekentools en quizzen op FinEdu.",
};

export default async function ZoekenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchContent(q);
  const [topResult, ...otherResults] = results;
  const directAnswer = topResult?.snippet ? topResult : undefined;
  const restResults = directAnswer ? otherResults : results;

  return (
    <>
      <PageHero
        eyebrow="Zoeken"
        title={q ? `Resultaten voor "${q}"` : "Doorzoek FinEdu"}
        description="Zoek doorheen alle leerstof, rekentools en quizzen."
      />
      <Container className="py-14">
        <div className="max-w-xl">
          <SearchBox initialValue={q} />
        </div>

        {q && (
          <div className="mt-8">
            <AiAnswer query={q} />
          </div>
        )}

        {directAnswer && (
          <Link
            href={directAnswer.href}
            className="group mt-4 flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6 transition-colors hover:border-accent/60"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
                Direct antwoord
              </span>
              <KindBadge kind={directAnswer.kind} />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-accent">
              {directAnswer.title}
            </h2>
            <p className="leading-relaxed text-foreground/85">
              {directAnswer.snippet}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Lees het volledige artikel
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        )}

        {restResults.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {restResults.map((result) => (
              <ContentCard
                key={result.href}
                href={result.href}
                kind={result.kind}
                title={result.title}
                description={result.description}
              />
            ))}
          </div>
        )}
        {q && results.length === 0 && (
          <p className="mt-8 text-muted">
            Geen resultaten gevonden voor &quot;{q}&quot;. Probeer een ander
            zoekwoord, of bekijk{" "}
            <Link
              href="/leerstof"
              className="font-semibold text-accent hover:underline"
            >
              alle leerstof
            </Link>
            .
          </p>
        )}
      </Container>
    </>
  );
}
