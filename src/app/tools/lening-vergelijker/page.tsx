import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { LeningVergelijker } from "@/components/tools/lening-vergelijker";

export const metadata: Metadata = {
  title: "Lening-vergelijker",
  description:
    "Vergelijk leningscenario's op basis van rentevoeten die je zelf invult. FinEdu houdt geen eigen rentetabel bij en beveelt geen kredietgever aan.",
  alternates: { canonical: "/tools/lening-vergelijker" },
};

export default function LeningVergelijkerPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Vergelijk leningscenario's"
        description="Vul de rentevoeten en looptijden in die je zelf gevonden hebt, en zie de maandelijkse aflossing en totale kost naast elkaar."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <LeningVergelijker />

          <section aria-labelledby="waarom-zelf">
            <h2
              id="waarom-zelf"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Waarom vul je dit zelf in?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Net als bij spaarrekeningen publiceert geen enkele Belgische
                bank of kredietgever haar rentetarieven via een open
                koppeling, en een rangschikking van &quot;de goedkoopste
                lening&quot; opstellen is in België een gereglementeerde
                activiteit (kredietbemiddeling). Deze tool rekent enkel na
                met cijfers die jij hebt — bijvoorbeeld uit een offerte of
                online simulatie.
              </p>
              <p>
                Een lagere maandelijkse aflossing betekent niet automatisch
                een goedkopere lening: een langere looptijd verlaagt de
                maandlast, maar verhoogt meestal de totale interest die je
                betaalt. Kijk dus naar beide cijfers samen.
              </p>
              <p>
                Wil je een kredietgever of -makelaar vergelijken op
                betrouwbaarheid? Check de vergunning via{" "}
                <Link
                  href="https://www.fsma.be"
                  className="font-semibold text-accent hover:underline"
                >
                  fsma.be
                </Link>
                .
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze tool niet meerekent">
            Dossierkosten, schuldsaldoverzekering, notariskosten (bij een
            hypothecair krediet) en het effect van een variabele in plaats
            van vaste rente. Vraag altijd een volledige simulatie op bij de
            kredietgever zelf voor je een beslissing neemt.
          </Callout>
        </div>
      </Container>
    </>
  );
}
