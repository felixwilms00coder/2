import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, ContentCard } from "@/components/ui";
import { SearchBox } from "@/components/search-box";
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {results.map((result) => (
            <ContentCard
              key={result.href}
              href={result.href}
              kind={result.kind}
              title={result.title}
              description={result.description}
            />
          ))}
        </div>
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
