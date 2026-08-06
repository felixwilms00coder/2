import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, EntityCard, Callout } from "@/components/ui";
import { pilots } from "@/lib/pilots/pilots";

export const metadata: Metadata = {
  title: "Pilots — publieke posities van bekende beleggers",
  description:
    "Bekijk de Amerikaanse aandelenposities die bekende beleggers wettelijk verplicht openbaar maken via SEC-formulier 13F. Puur informatief: geen aanbeveling, geen koppeling met je broker.",
  alternates: { canonical: "/pilots" },
};

export default function PilotsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publieke data"
        title="Pilots: wat bekende beleggers openbaar melden"
        description="Amerikaanse wetgeving verplicht grote fondsbeheerders om hun aandelenposities elk kwartaal te melden aan de SEC. Dit toont die meldingen, rechtstreeks van de bron."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <Callout tone="warning" title="Dit is informatie, geen aanbeveling">
            FinEdu kiest deze namen niet uit omdat ze &quot;goed&quot; zouden
            zijn, en
            rangschikt ze niet. Formulier 13F toont bovendien maar een deel
            van de werkelijkheid: alleen Amerikaanse long-posities in
            beursgenoteerde aandelen, tot 45 dagen na het einde van het
            kwartaal, zonder short-posities, opties of niet-Amerikaanse
            holdings. Wat je ziet kan dus al veranderd zijn. Wil je hiervan
            iets namaken in je eigen agent, dan kies en bevestig jij zelf het
            juiste instrument bij jouw broker — zie{" "}
            <Link href="/agent" className="font-semibold underline">
              /agent
            </Link>
            .
          </Callout>
        </div>

        <h2 className="sr-only">Alle pilots</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pilots.map((pilot) => (
            <EntityCard
              key={pilot.slug}
              href={`/pilots/${pilot.slug}`}
              icon="line-chart"
              title={pilot.name}
              description={`${pilot.manager} — ${pilot.description}`}
              meta="Bekijk posities"
            />
          ))}
        </div>
      </Container>
    </>
  );
}
