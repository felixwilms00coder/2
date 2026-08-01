import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ProgressOverview } from "@/components/progress-overview";

export const metadata: Metadata = {
  title: "Jouw voortgang",
  description:
    "Bekijk hoeveel je al leerde: gelezen artikels, quizscores, je beste spelresultaat en je niveau.",
  alternates: { canonical: "/voortgang" },
};

export default function VoortgangPage() {
  return (
    <>
      <PageHero
        eyebrow="Voortgang"
        title="Jouw voortgang"
        description="Alles wordt lokaal in je browser bewaard. Geen account, geen gedoe."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <ProgressOverview />
        </div>
      </Container>
    </>
  );
}
