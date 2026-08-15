import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { gidsen, getGids } from "@/lib/content/gidsen";
import { getCategory } from "@/lib/content/categories";
import { Container, PageHero, Callout } from "@/components/ui";
import { GidsStepChecklist } from "@/components/gids-progress";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return gidsen.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gids = getGids(slug);
  if (!gids) return {};
  return pageMetadata({
    title: gids.title,
    description: gids.description,
    path: `/gids/${gids.slug}`,
  });
}

export default async function GidsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gids = getGids(slug);
  if (!gids) notFound();

  const category = getCategory(gids.categorySlug);
  const href = `/gids/${gids.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Gidsen", href: "/gids" },
          { name: gids.title, href },
        ]}
      />
      <PageHero
        eyebrow={category ? `Gids: ${category.title}` : "Gids"}
        title={gids.title}
        description={gids.description}
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Gidsen", href: "/gids" },
              { name: gids.title },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <FileText className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {`${gids.pageCount} pagina's, pdf, gratis`}
                </p>
                <p className="text-sm text-muted">
                  Geen aanmelding of e-mailadres nodig.
                </p>
              </div>
            </div>
            <a
              href={gids.pdfPath}
              download
              className="ease-smooth mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-all duration-200 hover:bg-accent-strong active:scale-[0.97]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download de gids (pdf)
            </a>
          </div>

          <section aria-labelledby="inhoud">
            <h2
              id="inhoud"
              className="font-display text-xl font-extrabold text-foreground"
            >
              {`Het stappenplan in ${gids.chapters.length} stappen`}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Vink een stap af zodra je ze in de pdf las: je voortgang en XP
              worden lokaal in je browser bewaard, net als bij artikels.
            </p>
            <div className="mt-4">
              <GidsStepChecklist gidsSlug={gids.slug} chapters={gids.chapters} />
            </div>
          </section>

          <Callout tone="warning" title="Wat deze gids niet is">
            Algemene, educatieve informatie: geen persoonlijk beleggings-,
            financieel of juridisch advies, en geen aanbeveling van
            specifieke banken, brokers of producten. FinEdu is niet
            FSMA-vergund. Voor advies dat op jouw situatie is afgestemd,
            raadpleeg je een erkend financieel adviseur (vergunning te
            checken via fsma.be).
          </Callout>

          <section aria-labelledby="verder">
            <h2
              id="verder"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Verder op FinEdu
            </h2>
            <div className="prose-article mt-4">
              <p>
                Wil je de begrippen uit deze gids online opzoeken? Check{" "}
                <Link
                  href="/lexicon"
                  className="font-semibold text-accent hover:underline"
                >
                  het lexicon
                </Link>
                . Wil je de beslissingen uit deze gids eens in de praktijk
                voelen?{" "}
                <Link
                  href="/spel/je-eerste-keer-beleggen"
                  className="font-semibold text-accent hover:underline"
                >
                  Speel het keuzespel &apos;Je eerste keer beleggen&apos;
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
