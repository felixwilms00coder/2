import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Welke gegevens FinEdu verzamelt via de nieuwsbrief, waarom, en hoe je je kan uitschrijven.",
  alternates: { canonical: "/privacybeleid" },
};

export default function PrivacybeleidPage() {
  return (
    <>
      <PageHero
        eyebrow="Goed om te weten"
        title="Privacybeleid"
        description="Welke gegevens we verzamelen, waarom, en hoe je controle houdt."
      />
      <Container className="py-14">
        <div className="prose-article max-w-2xl">
          <p>
            FinEdu verzamelt zo weinig mogelijk persoonsgegevens. Dit
            privacybeleid gaat over de nieuwsbrief: de enige plek op FinEdu
            waar je vrijwillig een gegeven (je e-mailadres) achterlaat.
          </p>
          <h2>Wat we verzamelen, en waarom</h2>
          <p>
            Vul je je e-mailadres in bij de nieuwsbrief, dan gebruiken we dat
            uitsluitend om je de FinEdu-nieuwsbrief te sturen: om de twee
            weken een artikel over budget, sparen, beleggen, wonen, pensioen
            of belastingen. We gebruiken je adres niet voor iets anders, en
            verkopen of delen het niet met derden, behalve met de
            e-maildienst die we gebruiken om de nieuwsbrief te versturen
            (Resend), die als verwerker optreedt onder een eigen
            privacybeleid.
          </p>
          <h2>Dubbele bevestiging (double opt-in)</h2>
          <p>
            Na inschrijven ontvang je een bevestigingsmail. Pas als je op de
            link in die mail klikt, sturen we je effectief de nieuwsbrief.
            Doe je dat niet, dan gebeurt er niets en wordt er niets van je
            bewaard buiten die ene, niet-actieve inschrijving.
          </p>
          <h2>Bewaartermijn en uitschrijven</h2>
          <p>
            We bewaren je e-mailadres zolang je ingeschreven blijft. Elke
            nieuwsbrief bevat een uitschrijflink onderaan: klik daarop, en je
            adres wordt onmiddellijk uit de verzendlijst gehaald.
          </p>
          <h2>Je rechten</h2>
          <p>
            Je hebt het recht om te weten welke gegevens we van je bijhouden,
            om die te laten corrigeren, en om ze te laten verwijderen. Neem
            hiervoor contact op via{" "}
            <span className="font-semibold">[in te vullen contact-e-mailadres]</span>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
