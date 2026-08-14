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
    short: "Een stappenplan in 13 stappen voor complete beginners",
    description:
      "Een gratis pdf-cursus voor wie nog nooit belegd heeft en geen voorkennis van beleggen of economie heeft. Geen losse hoofdstukken over onderwerpen, maar een concreet stappenplan van 13 stappen, in de volgorde waarin je ze in de praktijk zou zetten: van je eerste noodbuffer tot kosten, belastingen en de keuze tussen broker, bank of app.",
    categorySlug: "sparen-en-beleggen",
    pdfPath: "/downloads/finedu-eerste-stappen-beleggen.pdf",
    pageCount: 16,
    chapters: [
      "Zorg eerst voor een noodbuffer",
      "Ken het verschil tussen sparen en beleggen",
      "Begrijp rendement en risico",
      "Laat tijd voor je werken",
      "Kies een beleggingsvorm die bij een beginner past",
      "Kies waarlangs je belegt: broker, bank of app",
      "Spreid je risico (diversificatie)",
      "Check de kosten voor je instapt",
      "Belastingen op je beleggingen",
      "Lees het infodocument, en check de vergunning",
      "Herken beleggingsfraude",
      "Begin klein, regelmatig, en blijf consequent",
      "Vermijd deze veelgemaakte fouten",
    ],
  },
];

export function getGids(slug: string): Gids | undefined {
  return gidsen.find((g) => g.slug === slug);
}
