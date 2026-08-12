import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { SpaarrekeningVergelijker } from "@/components/tools/spaarrekening-vergelijker";

export const metadata: Metadata = {
  title: "Spaarrekening-vergelijker",
  description:
    "Vergelijk spaarrekeningen op basis van cijfers die je zelf invult. FinEdu houdt geen eigen rentetabel bij en beveelt geen bank aan.",
  alternates: { canonical: "/tools/spaarrekening-vergelijker" },
};

export default function SpaarrekeningVergelijkerPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Vergelijk spaarrekeningen"
        description="Vul de tarieven in die je zelf gevonden hebt, en zie meteen wat het verschil na verloop van tijd betekent."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <Callout tone="tip" title="Op zoek naar de rente van vandaag?">
            FinEdu houdt zelf geen actuele rentetabel bij. Voor een
            gerangschikt overzicht van huidige spaarrekeningen kan je
            terecht bij de{" "}
            <a
              href="https://www.wikifin.be/nl/sparen-en-beleggen/vergelijkingstool-spaarrekeningen"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              officiële Wikifin-vergelijkingstool van de FSMA
            </a>{" "}
            of het commerciële platform{" "}
            <a
              href="https://www.spaargids.be/sparen/spaartarieven.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              Spaargids.be
            </a>
            . Vul de cijfers die je daar vindt hieronder in om zelf na te
            rekenen wat ze voor jouw bedrag en termijn betekenen.
          </Callout>

          <SpaarrekeningVergelijker />

          <section aria-labelledby="waarom-zelf">
            <h2
              id="waarom-zelf"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Waarom vul je dit zelf in?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Geen enkele Belgische bank publiceert haar rentetarieven via een
                open koppeling, en een rangschikking van &quot;de goedkoopste
                spaarrekening&quot; opstellen is in België een gereglementeerde
                activiteit (financiële bemiddeling). FinEdu doet dat bewust
                niet: deze tool rekent alleen na met cijfers die jij hebt.
              </p>
              <p>
                Belgische spaarrekeningen werken meestal met twee onderdelen:
                een <strong>basisrente</strong>, die je altijd krijgt, en een{" "}
                <strong>getrouwheidspremie</strong>, die je enkel verdient op
                geld dat een vol jaar blijft staan. Kijk dus niet enkel naar het
                hoogste totaalpercentage, maar ook naar hoe vaak je bij dat geld
                moet kunnen.
              </p>
              <p>
                Spaargeld op een gereglementeerde spaarrekening is bovendien
                beschermd tot een bepaald bedrag per persoon per bank via het{" "}
                <Link
                  href="/wetgeving"
                  className="font-semibold text-accent hover:underline"
                >
                  Belgisch depositogarantiestelsel
                </Link>
                , mocht de bank in de problemen komen.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze tool niet doet">
            Dit is geen actuele rentetabel en geen aanbeveling. Rentes wijzigen
            regelmatig en verschillen per bank: controleer de huidige tarieven
            altijd rechtstreeks bij de bank zelf voor je een keuze maakt.
          </Callout>
        </div>
      </Container>
    </>
  );
}
