import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container, PageHero, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Inschrijving bevestigd",
  robots: { index: false },
};

export default function NieuwsbriefBevestigdPage() {
  return (
    <>
      <PageHero
        eyebrow="Nieuwsbrief"
        title="Je inschrijving is bevestigd"
        description="Om de twee weken een gratis artikel in je inbox: budget, sparen, beleggen, wonen, pensioen of belastingen, uitgelegd voor starters."
      />
      <Container className="py-14">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />
          <p className="text-muted">
            Je kan je op elk moment uitschrijven via de link onderaan elke
            mail.
          </p>
          <ButtonLink href="/">Naar de homepage</ButtonLink>
        </div>
      </Container>
    </>
  );
}
