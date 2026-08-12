import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { VerzekeringVergelijker } from "@/components/tools/verzekering-vergelijker";

export const metadata: Metadata = {
  title: "Verzekeringsoffertes vergelijken",
  description:
    "Vergelijk verzekeringsoffertes op premie én vrijstelling. FinEdu levert of rangschikt geen eigen polissen.",
  alternates: { canonical: "/tools/verzekering-vergelijker" },
};

export default function VerzekeringVergelijkerPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Vergelijk verzekeringsoffertes"
        description="De laagste premie is niet altijd de laagste kost. Vul je offertes in en zie de verwachte totale jaarkost."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <VerzekeringVergelijker />

          <section aria-labelledby="waarom-zelf">
            <h2
              id="waarom-zelf"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Waarom vul je dit zelf in?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Een verzekeringspremie hangt af van jouw persoonlijke situatie: leeftijd, adres, schadeverleden, gekozen dekking: dus een
                algemene &quot;goedkoopste verzekering&quot; bestaat niet als
                vast getal. Bovendien is het aanbieden van een rangschikking van
                polissen in België een gereglementeerde activiteit
                (verzekeringsbemiddeling), waarvoor een vergunning van de FSMA
                nodig is.
              </p>
              <p>
                Vraag daarom zelf offertes op bij verzekeraars of een erkende
                verzekeringsmakelaar: je kan de vergunning van een tussenpersoon
                controleren via{" "}
                <Link
                  href="https://www.fsma.be"
                  className="font-semibold text-accent hover:underline"
                >
                  fsma.be
                </Link>
                . Vul de cijfers dan hier in om ze eerlijk te vergelijken.
              </p>
              <p>
                Let bij het vergelijken ook op wat de polissen precies dekken en
                welke uitsluitingen erin staan: twee polissen met dezelfde
                premie kunnen sterk verschillen in wat ze bij een schadegeval
                effectief uitbetalen.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze tool niet doet">
            Dit is geen actuele premietabel, geen rangschikking van
            verzekeraars, en geen advies over welke dekking bij jou past. Het is
            een rekenmodel dat premie en vrijstelling samen bekijkt in plaats
            van enkel de premie.
          </Callout>
        </div>
      </Container>
    </>
  );
}
