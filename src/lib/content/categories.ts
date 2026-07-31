import { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "loon",
    title: "Loon & loonstrookje",
    short: "Snap wat er op je loonstrookje staat",
    description:
      "Van bruto naar netto: ontdek waar je geld naartoe gaat en wat al die codes op je loonstrookje betekenen.",
    icon: "wallet",
  },
  {
    slug: "budgetteren",
    title: "Budgetteren",
    short: "Grip op je inkomsten en uitgaven",
    description:
      "Leer je maandbudget opstellen, vaste en variabele kosten onderscheiden en voorkom dat je geld sneller op is dan je loon.",
    icon: "chart",
  },
  {
    slug: "sparen",
    title: "Sparen",
    short: "Bouw een buffer op voor onverwachte kosten",
    description:
      "Waarom je een noodbuffer nodig hebt, hoeveel is genoeg, en welke spaarrekeningen in België je daarvoor kan gebruiken.",
    icon: "piggy-bank",
  },
  {
    slug: "beleggen",
    title: "Beleggen",
    short: "De eerste stappen richting beleggen",
    description:
      "Wat beleggen precies is, welke risico's erbij horen, en hoe je met kleine bedragen aan de slag kan als starter.",
    icon: "trending-up",
  },
  {
    slug: "lenen",
    title: "Lenen & krediet",
    short: "Verantwoord lenen, schulden vermijden",
    description:
      "Het verschil tussen goede en slechte schulden, hoe kredietopeningen werken, en waarom kleine leningen duur uitpakken.",
    icon: "credit-card",
  },
  {
    slug: "verzekeringen",
    title: "Verzekeringen",
    short: "Welke verzekeringen heb je echt nodig?",
    description:
      "Van hospitalisatieverzekering tot familiale verzekering: wat is verplicht, wat is slim, en wat kan je overslaan als starter.",
    icon: "shield",
  },
  {
    slug: "pensioen",
    title: "Pensioen",
    short: "Waarom nu al aan later denken",
    description:
      "Hoe het Belgische pensioensysteem in elkaar zit (pijler 1, 2 en 3) en waarom vroeg beginnen zoveel verschil maakt.",
    icon: "clock",
  },
  {
    slug: "belastingen",
    title: "Belastingen",
    short: "Je eerste belastingaangifte overleven",
    description:
      "Wat de personenbelasting inhoudt, welke uitgaven fiscaal voordeel opleveren, en hoe je jouw aangifte voorbereidt.",
    icon: "file-text",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
