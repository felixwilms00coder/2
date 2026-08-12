import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { AankoopkostenWoning } from "@/components/tools/aankoopkosten-woning";

export const metadata: Metadata = {
  title: "Aankoopkosten-calculator",
  description:
    "Vul de registratierechten, notariskosten en eventuele kredietkosten in die voor jouw situatie gelden, en zie meteen de totale prijs van een woning.",
  alternates: { canonical: "/tools/aankoopkosten-woning" },
};

export default function AankoopkostenWoningPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Wat kost een woning kopen, boven de aankoopprijs?"
        description="Vul de registratierechten, notariskosten en eventuele kredietkosten in die voor jouw situatie gelden, en zie meteen de totale prijs."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <AankoopkostenWoning />

          <section aria-labelledby="wat-telt-mee">
            <h2
              id="wat-telt-mee"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Wat telt mee bovenop de aankoopprijs?
            </h2>
            <div className="prose-article mt-4">
              <p>
                De registratierechten zijn de belasting die je betaalt bij de
                aankoop van een woning of grond, berekend op de aankoopprijs.
                Het tarief hangt af van het gewest en van je situatie,
                bijvoorbeeld of het je enige en eigen woning is: check het
                actuele tarief bij VLABEL of je notaris voor je dit invult.
              </p>
              <p>
                Notariskosten komen daar apart bovenop, voor het opstellen
                van de aankoopakte. Financier je (deels) met een hypothecair
                krediet, dan komen daar meestal nog een aparte notariële
                akte en kosten van de kredietgever bij: vraag een
                gedetailleerde kostenraming op bij je notaris en
                kredietgever voor je tekent.
              </p>
              <p>
                Meer lezen over deze begrippen? Check{" "}
                <Link
                  href="/lexicon"
                  className="font-semibold text-accent hover:underline"
                >
                  het lexicon
                </Link>{" "}
                of{" "}
                <Link
                  href="/wetgeving"
                  className="font-semibold text-accent hover:underline"
                >
                  de wetgevingspagina
                </Link>
                .
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze tool niet doet">
            Deze calculator telt enkel de cijfers op die jij zelf invult:
            FinEdu houdt geen actuele tarieventabel voor registratierechten
            of notariskosten bij, en berekent niets automatisch op basis van
            je gewest of situatie. Voor de exacte, actuele bedragen ga je
            langs bij VLABEL, FOD Financiën of je notaris.
          </Callout>
        </div>
      </Container>
    </>
  );
}
