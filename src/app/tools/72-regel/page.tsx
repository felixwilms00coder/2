import type { Metadata } from "next";
import { Container, PageHero, Callout } from "@/components/ui";
import { Regel72 } from "@/components/tools/regel-72";

export const metadata: Metadata = {
  title: "De 72-regel",
  description:
    "Vul een verwacht jaarlijks rendement in en zie in hoeveel jaar je bedrag ongeveer verdubbelt bij samengestelde interest.",
  alternates: { canonical: "/tools/72-regel" },
};

export default function Regel72Page() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="De 72-regel"
        description="Een snelle vuistregel om te schatten hoeveel jaar het duurt voor je geld verdubbelt."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <Regel72 />

          <section aria-labelledby="hoe-werkt">
            <h2
              id="hoe-werkt"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Hoe werkt de 72-regel?
            </h2>
            <div className="prose-article mt-4">
              <p>
                Deel 72 door je verwachte jaarlijkse rendementspercentage, en
                je krijgt een snelle schatting van het aantal jaren tot je
                bedrag verdubbelt bij samengestelde interest — interest op
                interest. Bij 6% is dat bijvoorbeeld 72 ÷ 6 = 12 jaar.
              </p>
              <p>
                Het is een vuistregel, geen exacte formule — vandaar dat deze
                tool ook het wiskundig exacte aantal jaren toont ter
                vergelijking. Voor rendementen tussen ongeveer 4% en 12% ligt
                de 72-regel dicht bij de werkelijkheid; daarbuiten wijkt ze
                meer af.
              </p>
            </div>
          </section>

          <Callout tone="warning" title="Wat deze regel niet meerekent">
            Een constant rendement bestaat niet — beleggingen schommelen van
            jaar tot jaar, en belastingen (roerende voorheffing, beurstaks) en
            inflatie zitten niet in deze berekening.
          </Callout>
        </div>
      </Container>
    </>
  );
}
