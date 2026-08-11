import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games, getGame } from "@/lib/content/game";
import { Container, PageHero } from "@/components/ui";
import { KeuzespelEngine } from "@/components/keuzespel-engine";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.description,
    alternates: { canonical: `/spel/${game.slug}` },
  };
}

export default async function SpelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <>
      <PageHero
        eyebrow="Keuzespel"
        title={game.title}
        description={game.description}
      />
      <Container className="py-14">
        <div className="mx-auto max-w-2xl">
          <KeuzespelEngine game={game} />
        </div>
      </Container>
    </>
  );
}
