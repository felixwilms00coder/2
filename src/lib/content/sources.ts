import { OfficialSource } from "./types";

/**
 * Geverifieerde officiële bronnen. Geen van deze partijen biedt een publieke
 * API voor derden aan — dit is dus een curated lijst, geen live koppeling.
 * Het AI-antwoord (src/app/api/ai-answer/route.ts) krijgt deze lijst als
 * context en moet de relevante bron citeren/linken in plaats van zelf
 * bedragen, termijnen of regels te verzinnen.
 */
export const officialSources: OfficialSource[] = [
  {
    slug: "notaris",
    name: "Notaris.be (Koninklijke Federatie van het Belgisch Notariaat)",
    url: "https://www.notaris.be",
    description:
      "Officiële voorlichting van het Belgisch notariaat over erven, schenken, huwelijksvermogen, aankoop en verkoop van een woning. Voor een bindend advies of akte is een afspraak bij een notaris nodig.",
    topics: ["erven", "schenking", "woning", "familie"],
  },
  {
    slug: "fod-financien",
    name: "FOD Financiën",
    url: "https://financien.belgium.be",
    description:
      "Federale belastingdienst: personenbelasting, belastingaangifte, roerende voorheffing, successie- en registratierechten (Brussel en Wallonië).",
    topics: ["belasting", "erven", "woning"],
  },
  {
    slug: "rsz",
    name: "RSZ (Rijksdienst voor Sociale Zekerheid)",
    url: "https://www.rsz.be",
    description:
      "Sociale zekerheidsbijdragen op lonen, werkloosheid, ziekte- en invaliditeitsverzekering.",
    topics: ["belasting", "werk"],
  },
  {
    slug: "vlaamse-belastingdienst",
    name: "Vlaamse Belastingdienst (VLABEL)",
    url: "https://belastingen.vlaanderen.be",
    description:
      "Vlaamse erfbelasting, schenkbelasting en registratiebelasting (verkooprecht) bij aankoop van een woning in Vlaanderen.",
    topics: ["erven", "schenking", "woning"],
  },
  {
    slug: "fsma",
    name: "FSMA (Autoriteit voor Financiële Diensten en Markten)",
    url: "https://www.fsma.be",
    description:
      "Toezichthouder op beleggingsdiensten, verzekeringen en pensioensparen. Controleer hier of een aanbieder een vergunning heeft.",
    topics: ["sparen", "beleggen", "verzekeren", "pensioen"],
  },
  {
    slug: "mypension",
    name: "MyPension.be",
    url: "https://www.mypension.be",
    description:
      "Officieel overzicht van je opgebouwde wettelijk pensioen en pensioensimulaties.",
    topics: ["pensioen"],
  },
  {
    slug: "justel",
    name: "Justel / e-Justice (FOD Justitie)",
    url: "https://www.ejustice.just.fgov.be",
    description:
      "De officiële, geconsolideerde tekst van Belgische wetten, decreten en besluiten. De brontekst achter elke wetsamenvatting op FinEdu.",
    topics: ["erven", "schenking", "woning", "belasting", "sparen", "beleggen"],
  },
  {
    slug: "vlaanderen-wonen",
    name: "Vlaanderen.be — Wonen",
    url: "https://www.vlaanderen.be/wonen",
    description:
      "Vlaamse overheidsinformatie over huren en verhuren, de Vlaamse huurwaarborglening en premies voor eigenaars.",
    topics: ["woning"],
  },
  {
    slug: "garantiefonds",
    name: "Garantiefonds voor financiële diensten",
    url: "https://www.garantiefonds.belgium.be",
    description:
      "Beheert het Belgisch depositogarantiestelsel: hoeveel van je spaargeld beschermd is als een bank failliet gaat, en hoe je een schadeclaim indient.",
    topics: ["sparen"],
  },
  {
    slug: "wikifin-vergelijkingstool-sparen",
    name: "Wikifin — Vergelijkingstool spaarrekeningen (FSMA)",
    url: "https://www.wikifin.be/nl/sparen-en-beleggen/vergelijkingstool-spaarrekeningen",
    description:
      "De officiële, door de FSMA beheerde vergelijkingstool voor spaarrekeningen: vul je startbedrag, maandelijkse storting en spaarperiode in en krijg een gerangschikte lijst op basis van basisrente en getrouwheidspremie, met categorie (A/B/C) en of er roerende voorheffing verschuldigd is. FinEdu houdt zelf geen actuele rentetabel bij — dit is de plek voor de rente van vandaag.",
    topics: ["sparen"],
  },
  {
    slug: "spaargids",
    name: "Spaargids.be (DPG Media)",
    url: "https://www.spaargids.be/sparen/spaartarieven.html",
    description:
      "Een privaat, commercieel vergelijkingsplatform van DPG Media, sinds 2006 een van de grootste financiële vergelijkingssites in België. Niet gelieerd aan FinEdu of de FSMA — FinEdu heeft de cijfers op deze site niet zelf geverifieerd. Let op: de vergelijkingstools van Spaargids.be worden in de loop van 2026 geleidelijk overgeheveld naar Mijnvergelijker.be.",
    topics: ["sparen"],
  },
];

export function getSourcesForTopic(topic: string): OfficialSource[] {
  return officialSources.filter((s) => s.topics.includes(topic));
}
