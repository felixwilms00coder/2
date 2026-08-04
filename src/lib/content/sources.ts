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
];

export function getSourcesForTopic(topic: string): OfficialSource[] {
  return officialSources.filter((s) => s.topics.includes(topic));
}
