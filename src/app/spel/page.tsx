import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { MoneyGame } from "@/components/money-game";

export const metadata: Metadata = {
  title: "Je eerste jaar — het keuzespel",
  description:
    "Speel je eerste jaar als starter door: verdeel je loon, vang tegenslagen op en ontdek wat je keuzes na twaalf maanden opleveren.",
  alternates: { canonical: "/spel" },
};

export default function SpelPage() {
  return (
    <>
      <PageHero
        eyebrow="Keuzespel"
        title="Je eerste jaar als starter"
        description="Zeven echte situaties, elke keuze telt. Je begint met een nettoloon van 2.150 euro en geen spaargeld. Waar sta je na twaalf maanden?"
      />
      <Container className="py-14">
        <div className="mx-auto max-w-2xl">
          <MoneyGame />
        </div>
      </Container>
    </>
  );
}
