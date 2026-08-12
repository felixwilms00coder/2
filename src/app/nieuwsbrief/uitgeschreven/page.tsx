import type { Metadata } from "next";
import { Container, PageHero, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Uitgeschreven",
  robots: { index: false },
};

export default function NieuwsbriefUitgeschrevenPage() {
  return (
    <>
      <PageHero
        eyebrow="Nieuwsbrief"
        title="Je bent uitgeschreven"
        description="Je ontvangt geen nieuwsbrief van FinEdu meer. Je kan je op elk moment opnieuw inschrijven."
      />
      <Container className="py-14">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <ButtonLink href="/">Naar de homepage</ButtonLink>
        </div>
      </Container>
    </>
  );
}
