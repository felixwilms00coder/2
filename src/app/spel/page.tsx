import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { games } from "@/lib/content/game";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Keuzespel",
  description:
    "Speel korte, realistische geldsituaties door: elke keuze telt, en je ziet meteen wat ze betekent voor je buffer, je vaste kosten en je levenskwaliteit.",
  path: "/spel",
});

export default function SpelOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Keuzespel"
        title="Speel je geldkeuzes door"
        description="Korte, realistische scenario's. Elke keuze telt, en je ziet meteen wat ze betekent voor je buffer, je vaste kosten en je levenskwaliteit."
      />
      <Container className="py-14">
        <h2 className="sr-only">Alle keuzespellen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/spel/${game.slug}`}
              className="ease-smooth group flex flex-col gap-2 rounded-[1.75rem] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_22px_44px_-20px_rgba(15,122,95,0.28)]"
            >
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {game.title}
              </h3>
              <p className="text-sm text-muted">{game.description}</p>
              <p className="mt-2 text-xs font-medium text-muted">
                {game.rounds.length} situaties
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
