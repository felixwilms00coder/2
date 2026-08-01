import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Belangrijke informatie over het gebruik van FinEdu: geen persoonlijk financieel advies, indicatieve rekentools.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Goed om te weten"
        title="Disclaimer"
        description="Belangrijke informatie voor je verder gaat."
      />
      <Container className="py-14">
        <div className="prose-article max-w-2xl">
          <p>
            De informatie op FinEdu is algemeen en educatief van aard. Ze
            houdt geen rekening met jouw persoonlijke financiële situatie en
            vormt geen persoonlijk financieel, fiscaal of juridisch advies.
            Raadpleeg bij twijfel een erkend adviseur, je hr-dienst, of de
            officiële overheidsdiensten (FOD Financiën, RSZ, mypension.be).
          </p>
          <h2>Rekentools</h2>
          <p>
            De rekentools op FinEdu (bruto-nettoloon calculator,
            budgetplanner, spaardoel-calculator) gebruiken vereenvoudigde,
            afgeronde modellen. Ze zijn bedoeld als indicatie, niet als
            officiële berekening. Bedragen, tarieven en belastingschijven
            worden jaarlijks geïndexeerd en kunnen intussen gewijzigd zijn.
          </p>
          <h2>Geen aanbevelingen</h2>
          <p>
            FinEdu vermeldt geen specifieke banken, verzekeraars of
            financiële producten, en doet geen aanbevelingen voor of tegen
            specifieke aanbieders.
          </p>
        </div>
      </Container>
    </>
  );
}
