import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Container, PageHero, Callout } from "@/components/ui";
import { AanvullendPensioen } from "@/components/tools/aanvullend-pensioen";

export const metadata: Metadata = pageMetadata({
  title: "Aanvullend-pensioen-simulator",
  description:
    "Simuleer wat pensioensparen of apart sparen tot je pensioen kan opleveren. Geen schatting van je wettelijk pensioen.",
  path: "/tools/aanvullend-pensioen",
});

export default function AanvullendPensioenPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Rekentools", href: "/tools" },
          { name: "Wat bouw je zelf op voor je pensioen?", href: "/tools/aanvullend-pensioen" },
        ]}
      />
      <PageHero
        eyebrow="Rekentool"
        title="Wat bouw je zelf op voor je pensioen?"
        description="Simuleer wat een maandelijkse inleg via pensioensparen, VAPZ of gewoon apart sparen kan opleveren tegen je pensioenleeftijd."
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Rekentools", href: "/tools" },
              { name: "Wat bouw je zelf op voor je pensioen?" },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <AanvullendPensioen />

          <section aria-labelledby="waarom-apart">
            <h2
              id="waarom-apart"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Waarom staat dit los van je wettelijk pensioen?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Het Belgisch wettelijk pensioen berekenen vergt een complexe,
                jaarlijks wijzigende formule: met onder meer loonplafonds en
                gelijkgestelde periodes (bijvoorbeeld tijdelijke werkloosheid
                of ziekte) die meetellen. Daar bestaat geen betrouwbare
                vereenvoudigde vuistregel voor die we hier durven aanbieden.
              </p>
              <p>
                Voor een schatting van je eigen, echte wettelijk pensioen op
                basis van je loopbaan tot nu toe, ga je naar de officiële
                simulatie op MyPension.be: die houdt wel rekening met je
                werkelijke loopbaangegevens.
              </p>
              <p>
                Deze tool simuleert enkel wat je er <strong>zelf bovenop</strong>{" "}
                opbouwt: pensioensparen, een VAPZ (voor zelfstandigen), of
                gewoon een aparte spaar- of beleggingsrekening voor later.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze tool niet meerekent">
            Belastingvoordelen of -heffingen op pensioensparen (bv. de
            eindbelasting bij 60 jaar), inflatie, en het feit dat een
            rendement nooit elk jaar constant is. Dit is een rekenmodel, geen
            beleggingsadvies.
          </Callout>
        </div>
      </Container>
    </>
  );
}
