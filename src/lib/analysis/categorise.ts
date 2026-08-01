export type CategoryKey =
  | "inkomen"
  | "wonen"
  | "energie"
  | "telecom"
  | "boodschappen"
  | "transport"
  | "verzekering"
  | "gezondheid"
  | "horeca"
  | "shopping"
  | "abonnementen"
  | "sparen"
  | "beleggen"
  | "afbetaling"
  | "overig";

/** Which 50/30/20 bucket a category belongs to. */
export type Bucket = "noden" | "wensen" | "sparen" | "inkomen" | "overig";

export const categoryMeta: Record<
  CategoryKey,
  { label: string; bucket: Bucket }
> = {
  inkomen: { label: "Inkomen", bucket: "inkomen" },
  wonen: { label: "Wonen", bucket: "noden" },
  energie: { label: "Energie & water", bucket: "noden" },
  telecom: { label: "Telefoon & internet", bucket: "noden" },
  boodschappen: { label: "Boodschappen", bucket: "noden" },
  transport: { label: "Vervoer", bucket: "noden" },
  verzekering: { label: "Verzekeringen", bucket: "noden" },
  gezondheid: { label: "Gezondheid", bucket: "noden" },
  horeca: { label: "Uit eten & drinken", bucket: "wensen" },
  shopping: { label: "Shopping", bucket: "wensen" },
  abonnementen: { label: "Abonnementen", bucket: "wensen" },
  sparen: { label: "Sparen", bucket: "sparen" },
  beleggen: { label: "Beleggen", bucket: "sparen" },
  afbetaling: { label: "Leningen & afbetalingen", bucket: "sparen" },
  overig: { label: "Overig", bucket: "overig" },
};

/**
 * Keyword rules, matched case-insensitively against the description.
 * Order matters: the first category with a hit wins.
 */
const RULES: [CategoryKey, string[]][] = [
  [
    "inkomen",
    ["loon", "wedde", "salaris", "salary", "bezoldiging", "vakantiegeld"],
  ],
  [
    "sparen",
    ["spaarrekening", "naar spaar", "spaardoel", "overboeking spaar"],
  ],
  [
    "beleggen",
    [
      "bolero",
      "saxo",
      "keytrade",
      "degiro",
      "mexem",
      "re=bel",
      "rebel",
      "medirect",
      "beleggingsrekening",
      "effectenrekening",
      "pensioenspaar",
      "pensioensparen",
    ],
  ],
  [
    "afbetaling",
    [
      "lening",
      "krediet",
      "afbetaling",
      "hypothe",
      "aflossing",
      "kredietopening",
    ],
  ],
  [
    "wonen",
    ["huur", "syndic", "immo", "onroerende voorheffing", "huurwaarborg"],
  ],
  [
    "energie",
    [
      "engie",
      "luminus",
      "eneco",
      "mega ",
      "octa+",
      "totalenergies",
      "elektriciteit",
      "aardgas",
      "farys",
      "pidpa",
      "watergroep",
      "water-link",
      "vivaqua",
    ],
  ],
  [
    "telecom",
    [
      "proximus",
      "telenet",
      "orange",
      "base ",
      "mobile vikings",
      "scarlet",
      "voo ",
      "edpnet",
    ],
  ],
  [
    "boodschappen",
    [
      "colruyt",
      "delhaize",
      "carrefour",
      "aldi",
      "lidl",
      "albert heijn",
      "okay",
      "spar ",
      "bio-planet",
      "cru ",
      "intermarch",
      "match",
      "supermarkt",
      "kruidvat",
      "di ",
    ],
  ],
  [
    "transport",
    [
      "nmbs",
      "sncb",
      "de lijn",
      "mivb",
      "stib",
      "tec ",
      "shell",
      "total ",
      "q8",
      "esso",
      "texaco",
      "lukoil",
      "dats24",
      "tankstation",
      "parking",
      "interparking",
      "cambio",
      "uber",
      "taxi",
      "blue-bike",
      "swapfiets",
      "villo",
    ],
  ],
  [
    "verzekering",
    [
      "verzekering",
      "ag insurance",
      "ethias",
      "axa",
      "baloise",
      "allianz",
      "dvv",
      "p&v",
      "corona direct",
      "assurance",
      "vivium",
    ],
  ],
  [
    "gezondheid",
    [
      "apotheek",
      "pharmacie",
      "dokter",
      "tandarts",
      "ziekenhuis",
      "mutualiteit",
      "christelijke mutualiteit",
      "solidaris",
      "partena",
      "liantis",
      "kinesist",
      "optiek",
    ],
  ],
  [
    "horeca",
    [
      "restaurant",
      "brasserie",
      "taverne",
      "cafe",
      "café",
      "frituur",
      "friterie",
      "pizzeria",
      "deliveroo",
      "uber eats",
      "takeaway",
      "mcdonald",
      "quick",
      "panos",
      "exki",
      "starbucks",
      "bakkerij",
      "traiteur",
      "bar ",
    ],
  ],
  [
    "abonnementen",
    [
      "netflix",
      "spotify",
      "disney",
      "amazon prime",
      "primevideo",
      "hbo",
      "streamz",
      "dazn",
      "apple.com/bill",
      "itunes",
      "google one",
      "youtube premium",
      "dropbox",
      "basic-fit",
      "jims",
      "fitness",
      "sportoase",
      "abonnement",
      "patreon",
      "audible",
    ],
  ],
  [
    "shopping",
    [
      "zalando",
      "bol.com",
      "coolblue",
      "mediamarkt",
      "krefel",
      "action",
      "hema",
      "ikea",
      "decathlon",
      "primark",
      "h&m",
      "zara",
      "amazon",
      "asos",
      "veritas",
      "jbc",
      "e5",
      "torfs",
      "brico",
      "hubo",
      "gamma",
    ],
  ],
];

export function categorise(description: string): CategoryKey {
  const d = description.toLowerCase();
  for (const [category, keywords] of RULES) {
    if (keywords.length === 0) continue;
    for (const kw of keywords) {
      if (d.includes(kw)) return category;
    }
  }
  return "overig";
}
