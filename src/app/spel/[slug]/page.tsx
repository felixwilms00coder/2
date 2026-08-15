import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games, getGame } from "@/lib/content/game";
import { Container, PageHero } from "@/components/ui";
import { KeuzespelEngine } from "@/components/keuzespel-engine";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";

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
  return pageMetadata({
    title: game.title,
    description: game.description,
    path: `/spel/${game.slug}`,
  });
}

export default async function SpelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const href = `/spel/${game.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Keuzespel", href: "/spel" },
          { name: game.title, href },
        ]}
      />
      <PageHero
        eyebrow="Keuzespel"
        title={game.title}
        description={game.description}
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Keuzespel", href: "/spel" },
              { name: game.title },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="mx-auto max-w-2xl">
          <KeuzespelEngine game={game} />
        </div>
      </Container>
    </>
  );
}
