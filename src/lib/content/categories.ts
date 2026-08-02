import { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "budget-betalen-lenen-en-verzekeren",
    title: "Budget, betalen, lenen en verzekeren",
    short: "Grip op je geld, dag na dag",
    description:
      "Alles over je dagelijkse geldzaken: een budget opstellen, verantwoord lenen, en de verzekeringen die je als starter echt nodig hebt.",
    icon: "credit-card",
    color: "blue",
    subcategories: [
      { slug: "budget-en-budgetbeheer", title: "Budget en budgetbeheer" },
      { slug: "lening-en-krediet", title: "Lening en krediet" },
      { slug: "verzekeren", title: "Verzekeren" },
      { slug: "zichtrekening", title: "Zichtrekening" },
      { slug: "betaalkaarten", title: "Betaalkaarten" },
    ],
  },
  {
    slug: "familie",
    title: "Familie",
    short: "Studeren, samenwonen en financiële opvoeding",
    description:
      "Van studieschulden tot je eerste keer samenwonen: hoe familiale keuzes je budget als starter beïnvloeden.",
    icon: "users",
    color: "rose",
    subcategories: [
      { slug: "studeren", title: "Studeren" },
      { slug: "financiele-opvoeding", title: "Financiële opvoeding" },
      {
        slug: "trouwen-samenwonen",
        title: "Trouwen, wettelijk of feitelijk samenwonen",
      },
      { slug: "kinderen-krijgen", title: "Kinderen krijgen" },
    ],
  },
  {
    slug: "sparen-en-beleggen",
    title: "Sparen en beleggen",
    short: "Van je eerste buffer tot je eerste belegging",
    description:
      "Een noodbuffer opbouwen en de basisprincipes van beleggen, uitgelegd voor wie er nog nooit mee bezig was.",
    icon: "piggy-bank",
    color: "green",
    subcategories: [
      { slug: "spaarrekening", title: "Spaarrekening" },
      {
        slug: "beleggen-en-risicospreiding",
        title: "Hoe beleggen en risicospreiding",
      },
      { slug: "beleggingsproducten", title: "Beleggingsproducten" },
      { slug: "fraude-bij-beleggen", title: "Fraude en oplichting bij beleggen" },
    ],
  },
  {
    slug: "erven",
    title: "Erven",
    short: "Waarom dit ook als starter al meetelt",
    description:
      "Erven en schenken lijken ver weg als je net begint te werken, maar een paar basisbegrippen kennen kan later veel uitleggen schelen.",
    icon: "scroll-text",
    color: "amber",
    subcategories: [
      { slug: "erven-en-successierechten", title: "Erven en successierechten" },
      { slug: "erfenis-plannen", title: "Erfenis plannen" },
      { slug: "schenking", title: "Schenking" },
    ],
  },
  {
    slug: "pensioen-en-pensioenvoorbereiding",
    title: "Pensioen en pensioen­voorbereiding",
    short: "Waarom nu al aan later denken",
    description:
      "Hoe het Belgische pensioensysteem in elkaar zit en waarom vroeg beginnen zoveel verschil maakt voor je latere pensioen.",
    icon: "clock",
    color: "violet",
    subcategories: [
      { slug: "drie-pensioenpijlers", title: "Drie pensioenpijlers" },
      { slug: "wettelijk-pensioen", title: "Wettelijk pensioen" },
      { slug: "pensioensparen", title: "Pensioensparen" },
      { slug: "aanvullend-pensioen", title: "Aanvullend pensioen" },
    ],
  },
  {
    slug: "belasting-werk-en-inkomen",
    title: "Belasting, werk en inkomen",
    short: "Je loonstrookje en je belastingaangifte",
    description:
      "Wat er op je loonstrookje staat, hoe je eerste belastingaangifte werkt, en wat er verandert bij je eerste job.",
    icon: "file-text",
    color: "orange",
    subcategories: [
      { slug: "belastingaangifte", title: "Belastingaangifte" },
      { slug: "inkomen-en-loon", title: "Inkomen en loon" },
      { slug: "eerste-job", title: "Eerste job" },
      { slug: "ziekte-en-werkloosheid", title: "Ziekte en werkloosheid" },
    ],
  },
  {
    slug: "woning-en-hypothecaire-lening",
    title: "Woning en hypo­thecaire lening",
    short: "Huren of kopen: je eerste stappen",
    description:
      "Van je eerste huurcontract tot de basis van een hypothecaire lening voor als je later een woning koopt.",
    icon: "home",
    color: "cyan",
    subcategories: [
      { slug: "woning-huren-verhuren", title: "Woning huren, verhuren" },
      { slug: "hypothecaire-lening", title: "Hypothecaire lening" },
      {
        slug: "woning-kopen-bouwen-verbouwen",
        title: "Woning kopen, bouwen, verbouwen",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(categorySlug: string, subcategorySlug: string) {
  return getCategory(categorySlug)?.subcategories.find(
    (s) => s.slug === subcategorySlug,
  );
}
