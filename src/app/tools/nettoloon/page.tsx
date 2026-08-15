import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Container, PageHero, Callout } from "@/components/ui";
import { NettoloonCalculator } from "@/components/tools/nettoloon-calculator";

export const metadata: Metadata = pageMetadata({
  title: "Bruto-nettoloon calculator",
  description:
    "Bereken een schatting van je nettoloon op basis van je brutomaandloon: RSZ-bijdrage, bedrijfsvoorheffing en nettoloon.",
  path: "/tools/nettoloon",
});

export default function NettoloonPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Rekentools", href: "/tools" },
          { name: "Bruto-nettoloon calculator", href: "/tools/nettoloon" },
        ]}
      />
      <PageHero
        eyebrow="Rekentool"
        title="Bruto-nettoloon calculator"
        description="Geef je brutomaandloon in en krijg meteen een schatting van je RSZ-bijdrage, bedrijfsvoorheffing en nettoloon."
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Rekentools", href: "/tools" },
              { name: "Bruto-nettoloon calculator" },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <NettoloonCalculator />
          <div className="max-w-md">
            <Callout tone="warning" title="Dit is een ruwe schatting">
              Deze tool gebruikt een vereenvoudigd model op basis van de
              RSZ-bijdrage (13,07%) en de progressieve schijven van de
              personenbelasting. Ze houdt geen rekening met je gezinssituatie,
              kinderen ten laste, dertiende maand, vakantiegeld of extralegale
              voordelen, en gebruikt afgeronde, jaarlijks geïndexeerde
              bedragen. Je echte loonstrookje kan hiervan afwijken. Voor een
              exacte berekening: vraag het na bij je hr-dienst of sociaal
              secretariaat.
            </Callout>
            <p className="mt-6 text-sm text-muted">
              Wil je eerst begrijpen wat elk onderdeel van je loonstrookje
              betekent?{" "}
              <Link
                href="/leerstof/belasting-werk-en-inkomen/loonstrookje-ontcijferd"
                className="font-semibold text-accent hover:underline"
              >
                Lees onze uitleg over het loonstrookje
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
