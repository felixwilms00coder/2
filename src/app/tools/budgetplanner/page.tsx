import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container, PageHero, Callout } from "@/components/ui";
import { BudgetPlanner } from "@/components/tools/budget-planner";

export const metadata: Metadata = pageMetadata({
  title: "50/30/20 budgetplanner",
  description:
    "Verdeel je nettoloon over noden, wensen en sparen volgens de 50/30/20-regel, en vergelijk met je eigen uitgaven.",
  path: "/tools/budgetplanner",
});

export default function BudgetplannerPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="50/30/20 budgetplanner"
        description="Vul je nettoloon in en zie meteen een voorstel van budget voor noden, wensen en sparen."
      />
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <BudgetPlanner />
          <div className="max-w-md">
            <Callout tone="tip" title="Richtpercentages, geen wet">
              De 50/30/20-verdeling is een vuistregel. Woon je in een dure
              regio of pendel je ver, dan kan het aandeel &apos;noden&apos;
              hoger liggen. Belangrijk is dat je weet waar je geld naartoe
              gaat en dat er elke maand bewust iets opzij gaat voor later.
            </Callout>
            <p className="mt-6 text-sm text-muted">
              Meer weten over budgetteren als starter?{" "}
              <Link
                href="/leerstof/budget-betalen-lenen-en-verzekeren/50-30-20-regel"
                className="font-semibold text-accent hover:underline"
              >
                Lees het volledige artikel
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
