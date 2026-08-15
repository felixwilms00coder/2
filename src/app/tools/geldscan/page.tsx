import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHero } from "@/components/ui";
import { BudgetScan } from "@/components/tools/budget-scan";

export const metadata: Metadata = pageMetadata({
  title: "Geldscan: analyseer je inkomsten en uitgaven",
  description:
    "Plak je rekeningoverzicht en krijg meteen zicht op je inkomsten, uitgaven, terugkerende abonnementen en waar er ruimte zit om te besparen. Alles blijft in je browser.",
  path: "/tools/geldscan",
});

export default function GeldscanPage() {
  return (
    <>
      <PageHero
        eyebrow="Rekentool"
        title="Geldscan"
        description="Plak je rekeningoverzicht en zie meteen waar je geld naartoe gaat, welke abonnementen blijven doorlopen, en waar er ruimte zit om te besparen."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <BudgetScan />
        </div>
      </Container>
    </>
  );
}
