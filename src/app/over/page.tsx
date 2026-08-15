import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Over FinEdu",
  description:
    "FinEdu is een educatief platform over geld voor starters op de Vlaamse arbeidsmarkt, geïnspireerd door Wikifin.",
  path: "/over",
});

export default function OverPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title="Over FinEdu"
        description="Financieel wegwijs vanaf je eerste job."
      />
      <Container className="py-14">
        <div className="prose-article max-w-2xl">
          <p>
            FinEdu is een educatief platform dat jonge starters op de Vlaamse
            arbeidsmarkt helpt wegwijs te raken in hun geldzaken: van het
            lezen van je eerste loonstrookje tot je eerste budget, je eerste
            spaarrekening, en de keuzes die daarna komen.
          </p>
          <p>
            Dit platform is opgezet in de geest van{" "}
            <span className="font-semibold text-foreground">Wikifin</span>,
            de financiële educatiewebsite van de FSMA, maar is een
            onafhankelijk, niet-officieel initiatief. FinEdu is geen
            overheidsdienst en geeft geen persoonlijk financieel advies.
          </p>
          <h2>Wat je hier vindt</h2>
          <ul>
            <li>Korte, praktische leerstof per thema, ingedeeld per onderwerp.</li>
            <li>
              Rekentools om je eigen situatie na te rekenen: nettoloon, budget,
              spaardoel.
            </li>
            <li>Een quiz om je financiële kennis te testen.</li>
          </ul>
          <h2>Onafhankelijk</h2>
          <p>
            FinEdu verkoopt geen financiële producten en werkt niet samen met
            banken, verzekeraars of andere financiële spelers.
          </p>
        </div>
      </Container>
    </>
  );
}
