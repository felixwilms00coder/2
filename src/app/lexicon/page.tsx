import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { LexiconLijst } from "@/components/lexicon-lijst";

export const metadata: Metadata = {
  title: "Financieel lexicon",
  description:
    "Korte, begrijpelijke uitleg van financieel jargon: van basisrente tot quotiteit. Doorzoekbaar en gefilterd per thema.",
  alternates: { canonical: "/lexicon" },
};

export default function LexiconPage() {
  return (
    <>
      <PageHero
        eyebrow="Lexicon"
        title="Financieel jargon, uitgelegd"
        description="Korte, feitelijke uitleg van begrippen die je elders op FinEdu tegenkomt: geen actuele bedragen of percentages, enkel wat een term betekent."
      />
      <Container className="py-14">
        <LexiconLijst />
      </Container>
    </>
  );
}
