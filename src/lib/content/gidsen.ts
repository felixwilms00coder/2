import { Gids } from "./types";

/**
 * Downloadbare gidsen (PDF's): langere cursussen over één onderwerp,
 * gegrond op dezelfde inhoud als de rest van FinEdu (artikels, lexicon).
 * Het PDF-bestand zelf staat onder public/downloads/.
 */
export const gidsen: Gids[] = [
  {
    slug: "eerste-stappen-beleggen",
    title: "Je eerste stappen om te beleggen",
    short: "Een gratis gids voor complete beginners",
    description:
      "Een gratis pdf-cursus voor wie nog nooit belegd heeft en geen voorkennis van beleggen of economie heeft: van het verschil tussen sparen en beleggen tot een concreet stappenplan om zelf te starten.",
    categorySlug: "sparen-en-beleggen",
    pdfPath: "/downloads/finedu-eerste-stappen-beleggen.pdf",
    pageCount: 14,
    chapters: [
      "Sparen versus beleggen",
      "Eerst een noodbuffer, dan beleggen",
      "Rendement en risico: de basisregel",
      "Tijd is je beste bondgenoot",
      "De belangrijkste beleggingsvormen",
      "Spreiden: niet alles op één kaart",
      "Kosten die je rendement stilletjes opeten",
      "Het essentiële-informatiedocument lezen",
      "Beleggingsfraude herkennen",
      "Concreet stappenplan om te beginnen",
      "Veelgemaakte beginnersfouten",
      "Verder op FinEdu, en de kleine lettertjes",
    ],
  },
];

export function getGids(slug: string): Gids | undefined {
  return gidsen.find((g) => g.slug === slug);
}
