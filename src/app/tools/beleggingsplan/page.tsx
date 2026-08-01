import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { Beleggingsplan } from "@/components/tools/beleggingsplan";

export const metadata: Metadata = {
  title: "Beleggingsplan-simulator",
  description:
    "Simuleer wat periodiek beleggen op lange termijn kan opleveren, inclusief de impact van kosten. Een rekenmodel, geen advies en geen orderuitvoering.",
  alternates: { canonical: "/tools/beleggingsplan" },
};

export default function BeleggingsplanPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Beleggingsplan-simulator"
        description="Zie wat een vast maandbedrag op lange termijn kan worden, en hoeveel je kosten daarvan opeten."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <Beleggingsplan />

          <section aria-labelledby="automatiseren">
            <h2
              id="automatiseren"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Kan dit automatisch?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Deels. Wat je hier simuleert, kan je bij de meeste Belgische
                brokers zelf instellen als een{" "}
                <strong>periodiek beleggingsplan</strong>: je geeft één keer op
                welk bedrag, op welke dag en in welk fonds of welke tracker moet
                worden belegd, en de broker voert dat daarna zelf uit. Dat is
                automatisering die je zelf in handen houdt.
              </p>
              <p>
                Wat FinEdu <strong>niet</strong> doet, is orders in jouw naam
                plaatsen of je portefeuille beheren. Dat is in België
                vergunningsplichtig: discretionair vermogensbeheer en
                beleggingsadvies vallen onder MiFID II en vereisen een
                vergunning van de FSMA. Een educatief platform mag dat niet, en
                het zou ook botsen met onze belofte om geen financiële producten
                te verkopen.
              </p>
              <p>
                Voor je zo&apos;n plan opzet: zorg eerst dat je noodbuffer op
                orde is, en controleer op{" "}
                <Link href="https://www.fsma.be" className="font-semibold text-accent hover:underline">
                  fsma.be
                </Link>{" "}
                of je aanbieder vergund is.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat dit model niet meerekent">
            Belastingen (beurstaks, roerende voorheffing), inflatie,
            wisselkoersen en het feit dat rendementen sterk schommelen van jaar
            tot jaar. Een gemiddelde van 6% betekent nooit 6% elk jaar. Gebruik
            dit om de orde van grootte te begrijpen, niet om een bedrag te
            voorspellen.
          </Callout>
        </div>
      </Container>
    </>
  );
}
