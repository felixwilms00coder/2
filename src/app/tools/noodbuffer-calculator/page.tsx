import type { Metadata } from "next";
import { Container, PageHero, Callout } from "@/components/ui";
import { NoodbufferCalculator } from "@/components/tools/noodbuffer-calculator";

export const metadata: Metadata = {
  title: "Noodbuffer-calculator",
  description:
    "Zie hoeveel maanden vaste uitgaven je huidige spaargeld dekt, afgezet tegen de gangbare vuistregel van 3 tot 6 maanden.",
  alternates: { canonical: "/tools/noodbuffer-calculator" },
};

export default function NoodbufferCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Hoe groot is jouw noodbuffer?"
        description="Vul je spaargeld en je maandelijkse vaste uitgaven in en zie hoeveel maanden je overbrugt zonder inkomen."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <NoodbufferCalculator />

          <section aria-labelledby="waarom-buffer">
            <h2
              id="waarom-buffer"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Waarom eerst een noodbuffer?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Een noodbuffer is geld dat apart staat voor onverwachte
                uitgaven of inkomensverlies: een kapotte wasmachine, een
                medische kost, of een periode zonder job. Zonder buffer eindig
                je bij zo&apos;n uitgave vaak op een duurdere lening of
                creditcardschuld.
              </p>
              <p>
                Het is meestal verstandig om eerst deze buffer op te bouwen
                voor je begint te beleggen: beleggen werkt het best op lange
                termijn, en je wil niet gedwongen worden om te verkopen op een
                slecht moment omdat je plots geld nodig hebt.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze tool niet meerekent">
            De 3-tot-6-maanden-richtlijn is generiek. Wie een onzeker inkomen
            heeft (freelance, tijdelijk contract) of mensen ten laste, doet er
            vaak goed aan om aan de hoge kant van die richtlijn te mikken, of eroverheen.
          </Callout>
        </div>
      </Container>
    </>
  );
}
