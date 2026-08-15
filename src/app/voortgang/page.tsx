import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHero } from "@/components/ui";
import { ProgressOverview } from "@/components/progress-overview";

export const metadata: Metadata = pageMetadata({
  title: "Jouw voortgang",
  description:
    "Bekijk hoeveel je al leerde: gelezen artikels, quizscores, je beste spelresultaat en je niveau.",
  path: "/voortgang",
  robots: { index: false },
});

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
