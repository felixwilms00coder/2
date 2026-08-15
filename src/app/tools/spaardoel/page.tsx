import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Container, PageHero, Callout } from "@/components/ui";
import { SpaardoelCalculator } from "@/components/tools/spaardoel-calculator";

export const metadata: Metadata = pageMetadata({
  title: "Spaardoel-calculator",
  description:
    "Bereken hoe lang het duurt voor je je spaardoel bereikt, of hoeveel je maandelijks opzij moet zetten voor een vaste termijn.",
  path: "/tools/spaardoel",
});

export default function SpaardoelPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Rekentools", href: "/tools" },
          { name: "Spaardoel-calculator", href: "/tools/spaardoel" },
        ]}
      />
      <PageHero
        eyebrow="Rekentool"
        title="Spaardoel-calculator"
        description="Bereken hoe lang het duurt voor je je spaardoel haalt, of hoeveel je maandelijks nodig hebt voor een vaste termijn."
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Rekentools", href: "/tools" },
              { name: "Spaardoel-calculator" },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SpaardoelCalculator />
          <div className="max-w-md">
            <Callout tone="tip" title="Zonder rente berekend">
              Deze tool houdt geen rekening met spaarrente: op een
              gereglementeerde spaarrekening is die doorgaans laag en heeft ze
              weinig invloed op kortere termijnen. Voor langere termijnen kan
              rente wel een verschil maken.
            </Callout>
            <p className="mt-6 text-sm text-muted">
              Nog geen noodbuffer?{" "}
              <Link
                href="/leerstof/sparen-en-beleggen/noodbuffer-hoeveel-sparen"
                className="font-semibold text-accent hover:underline"
              >
                Lees eerst hoeveel je nodig hebt
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
