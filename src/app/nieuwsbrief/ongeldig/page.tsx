import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { Container, PageHero, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Link verlopen of ongeldig",
  robots: { index: false },
};

export default function NieuwsbriefOngeldigPage() {
  return (
    <>
      <PageHero
        eyebrow="Nieuwsbrief"
        title="Deze link werkt niet (meer)"
        description="De link is verlopen (bevestigingslinks zijn 48 uur geldig), al gebruikt, of ongeldig."
      />
      <Container className="py-14">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <TriangleAlert className="h-10 w-10 text-warning" aria-hidden="true" />
          <p className="text-muted">
            Schrijf je opnieuw in via de homepage om een nieuwe
            bevestigingsmail te ontvangen.
          </p>
          <ButtonLink href="/">Naar de homepage</ButtonLink>
        </div>
      </Container>
    </>
  );
}
