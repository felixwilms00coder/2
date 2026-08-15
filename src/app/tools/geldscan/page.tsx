import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";
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
      <BreadcrumbJsonLd
        items={[
          { name: "Rekentools", href: "/tools" },
          { name: "Geldscan", href: "/tools/geldscan" },
        ]}
      />
      <PageHero
        eyebrow="Rekentool"
        title="Geldscan"
        description="Plak je rekeningoverzicht en zie meteen waar je geld naartoe gaat, welke abonnementen blijven doorlopen, en waar er ruimte zit om te besparen."
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Rekentools", href: "/tools" },
              { name: "Geldscan" },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <BudgetScan />
        </div>
      </Container>
    </>
  );
}
