import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHero } from "@/components/ui";
import { LexiconLijst } from "@/components/lexicon-lijst";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LexiconJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { lexicon } from "@/lib/content/lexicon";

export const metadata: Metadata = pageMetadata({
  title: "Financieel lexicon",
  description:
    "Korte, begrijpelijke uitleg van financieel jargon: van basisrente tot quotiteit. Doorzoekbaar en gefilterd per thema.",
  path: "/lexicon",
});

export default function LexiconPage() {
  return (
    <>
      <LexiconJsonLd
        terms={lexicon.map((entry) => ({
          term: entry.term,
          definition: entry.uitleg,
        }))}
      />
      <BreadcrumbJsonLd items={[{ name: "Lexicon", href: "/lexicon" }]} />
      <PageHero
        eyebrow="Lexicon"
        title="Financieel jargon, uitgelegd"
        description="Korte, feitelijke uitleg van begrippen die je elders op FinEdu tegenkomt: geen actuele bedragen of percentages, enkel wat een term betekent."
      />
      <Container className="py-14">
        <Breadcrumbs items={[{ name: "Lexicon" }]} />
        <div className="mt-8">
          <LexiconLijst />
        </div>
      </Container>
    </>
  );
}
