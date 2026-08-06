import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { AgentDashboard } from "@/components/agent/agent-dashboard";

export const metadata: Metadata = {
  title: "Beleggingsagent — jouw regels, jouw broker",
  description:
    "Stel je eigen automatische aankoopregels in en voer ze uit via je eigen brokerkoppeling. Jij bepaalt wat, hoeveel en wanneer. FinEdu beveelt niets aan.",
  alternates: { canonical: "/agent" },
};

export default async function AgentPage({
  searchParams,
}: {
  searchParams: Promise<{ ruleName?: string }>;
}) {
  const { ruleName } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Automatisering"
        title="Je eigen beleggingsagent"
        description="Schrijf je eigen regels, stel je eigen limieten in, en koppel je eigen brokeraccount. Begin in simulatie tot je zeker bent."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <Callout tone="tip" title="Jij bent de opdrachtgever">
            FinEdu kiest geen instrumenten, doet geen aanbevelingen en beheert
            je portefeuille niet. Je regels staan in jouw browser, orders gaan
            rechtstreeks van jouw toestel naar jouw broker, en er is geen
            FinEdu-server in dat pad. Wat je hier bouwt, is jouw opdracht — wij
            leveren alleen het gereedschap.
          </Callout>

          <AgentDashboard prefillName={ruleName} />

          <section aria-labelledby="hoe-werkt-het">
            <h2
              id="hoe-werkt-het"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Goed om te weten
            </h2>
            <div className="prose-article mt-4">
              <h2>De agent draait wanneer jij de pagina opent</h2>
              <p>
                Er is bewust geen server die in jouw naam blijft draaien. Open
                je deze pagina, dan kijkt de agent welke van jouw regels
                intussen aan de beurt waren. Mis je een dag, dan wordt de regel
                de eerstvolgende keer alsnog uitgevoerd — hij slaat geen maand
                over.
              </p>
              <p>
                Wil je uitvoering die ook zonder jou doorloopt, gebruik dan het{" "}
                <strong>periodieke beleggingsplan van je broker zelf</strong>.
                Dat is dezelfde automatisering, uitgevoerd door de vergunde
                partij bij wie je rekening staat.
              </p>

              <h2>Begin altijd in simulatie</h2>
              <p>
                De simulatiebroker plaatst papieren orders met reproduceerbare
                koersen. Laat je regels daar een paar cycli lopen en controleer
                het logboek voor je een echte koppeling activeert.
              </p>

              <h2>Over je tokens</h2>
              <p>
                Een brokertoken wordt alleen in het geheugen van dit tabblad
                bewaard en verdwijnt zodra je het sluit. Het gaat nooit naar
                FinEdu. Gebruik een token met zo weinig mogelijk rechten, en
                trek het in bij je broker zodra je stopt met testen.
              </p>

              <h2>Interactive Brokers</h2>
              <p>
                Voor IBKR praat deze pagina rechtstreeks met de Client Portal
                Gateway die je zelf lokaal draait en waarin je zelf inlogt op{" "}
                <code>https://localhost:5000</code> — er is geen token om te
                plakken en geen FinEdu-server ertussen. Begin met een
                paper-account: welke rekening je krijgt hangt volledig af van
                waarmee je inlogt op de gateway, niet van een instelling hier.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat dit niet is">
            Geen beleggingsadvies en geen vermogensbeheer. FinEdu beoordeelt
            niet of een instrument bij jou past, of je genoeg buffer hebt, of
            het moment goed is. Dat blijft jouw beoordeling — en die van een
            vergund adviseur als je daar behoefte aan hebt. Lees eerst{" "}
            <Link
              href="/leerstof/sparen-en-beleggen/beleggen-de-basis"
              className="font-semibold text-accent hover:underline"
            >
              de basis van beleggen
            </Link>{" "}
            als je nog twijfelt.
          </Callout>
        </div>
      </Container>
    </>
  );
}
