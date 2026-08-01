export type GameEffect = {
  /** Change to the current account, in euro. */
  saldo?: number;
  /** Change to the emergency buffer, in euro. */
  buffer?: number;
  /** Change to quality of life, on a 0-100 scale. */
  humeur?: number;
  /** Recurring monthly cost this choice locks in, in euro. */
  vasteKost?: number;
};

export type GameChoice = {
  label: string;
  effect: GameEffect;
  /** Shown after picking: what actually happened and why it matters. */
  feedback: string;
};

export type GameRound = {
  /** Which month of the first year this happens in. */
  maand: number;
  title: string;
  situation: string;
  choices: GameChoice[];
  /** Optional pointer to the article that explains the underlying idea. */
  leesMeer?: { label: string; href: string };
};

export const START_SALDO = 0;
export const START_BUFFER = 0;
export const START_HUMEUR = 70;
export const NETTO_LOON = 2150;
export const BASIS_VASTE_KOSTEN = 1250;

export const gameRounds: GameRound[] = [
  {
    maand: 1,
    title: "Je eerste loon staat op je rekening",
    situation:
      "2.150 euro netto. Na huur, energie, boodschappen en vervoer hou je ongeveer 900 euro over. Wat doe je met dat overschot?",
    choices: [
      {
        label: "Ik zet 400 euro meteen op een aparte spaarrekening",
        effect: { saldo: 500, buffer: 400, humeur: -3 },
        feedback:
          "Slimme start. Door het bedrag meteen weg te zetten, geef je het niet ongemerkt uit. Dit is precies de 20% uit de 50/30/20-regel.",
      },
      {
        label: "Ik laat alles staan en zie eind van de maand wel",
        effect: { saldo: 780, buffer: 0, humeur: 4 },
        feedback:
          "Wat op je zichtrekening staat, geef je makkelijker uit. Aan het eind van de maand blijkt er meestal minder over dan gedacht.",
      },
      {
        label: "Ik trakteer mezelf op een weekend weg (350 euro)",
        effect: { saldo: 480, buffer: 0, humeur: 12 },
        feedback:
          "Genieten van je eerste loon mag zeker. Let er wel op dat het geen patroon wordt: zonder buffer komt de eerste tegenslag hard aan.",
      },
    ],
    leesMeer: {
      label: "De 50/30/20-regel",
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/50-30-20-regel",
    },
  },
  {
    maand: 2,
    title: "Je collega's gaan elke vrijdag lunchen",
    situation:
      "Buiten eten kost ongeveer 15 euro per keer, vier keer per maand. Leuk voor de sfeer op het werk, maar het telt op.",
    choices: [
      {
        label: "Elke week mee (60 euro per maand)",
        effect: { saldo: 840, buffer: 0, humeur: 8, vasteKost: 60 },
        feedback:
          "Sociale contacten op het werk zijn waardevol. Wel goed om te weten: 60 euro per maand is 720 euro per jaar.",
      },
      {
        label: "Om de twee weken mee (30 euro per maand)",
        effect: { saldo: 870, buffer: 0, humeur: 5, vasteKost: 30 },
        feedback:
          "Een middenweg. Je blijft erbij horen en houdt de kost beheersbaar. Dit soort compromissen maakt budgetteren vol te houden.",
      },
      {
        label: "Nooit, ik neem altijd boterhammen mee",
        effect: { saldo: 900, buffer: 0, humeur: -6 },
        feedback:
          "Financieel het scherpst, maar een budget dat geen enkel plezier toelaat, hou je zelden lang vol.",
      },
    ],
  },
  {
    maand: 3,
    title: "Je wasmachine is stuk",
    situation:
      "Een nieuwe kost 480 euro. Je hebt hem nodig, dus uitstellen is geen optie.",
    choices: [
      {
        label: "Ik betaal met mijn spaargeld",
        effect: { saldo: 0, buffer: -480, humeur: -2 },
        feedback:
          "Hiervoor dient een noodbuffer. Geen rente, geen schuld. Vul de buffer daarna wel weer aan.",
      },
      {
        label: "Ik betaal in 12 keer bij de winkel (JKP 14%)",
        effect: { saldo: -40, humeur: -5, vasteKost: 43 },
        feedback:
          "Je betaalt zo'n 36 euro extra aan kosten. Kleine bedragen op afbetaling lijken onschuldig, maar het JKP maakt ze duur.",
      },
      {
        label: "Ik gebruik mijn kredietopening",
        effect: { saldo: -60, humeur: -9, vasteKost: 55 },
        feedback:
          "De duurste optie. Kredietopeningen hebben vaak hoge rentevoeten en lossen traag af, waardoor de schuld blijft hangen.",
      },
    ],
    leesMeer: {
      label: "Verantwoord lenen",
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/verantwoord-lenen",
    },
  },
  {
    maand: 5,
    title: "Je makelaar belt over verzekeringen",
    situation:
      "Je hebt nog geen familiale verzekering. Die kost ongeveer 8 euro per maand en dekt schade die je per ongeluk aan anderen toebrengt.",
    choices: [
      {
        label: "Ik sluit ze af",
        effect: { saldo: -8, humeur: 3, vasteKost: 8 },
        feedback:
          "Verstandig. Voor een klein bedrag dek je risico's die in de duizenden euro's kunnen lopen.",
      },
      {
        label: "Nee, dat overkomt mij toch niet",
        effect: { saldo: 0, humeur: 1 },
        feedback:
          "Een gok. De kans is klein, maar de schade kan enorm zijn: precies het soort risico waarvoor verzekeren bedoeld is.",
      },
      {
        label: "Ik neem meteen het volledige pakket (45 euro per maand)",
        effect: { saldo: -45, humeur: -4, vasteKost: 45 },
        feedback:
          "Oververzekerd zijn kost ook geld. Begin met de polissen die grote risico's dekken en bouw pas daarna uit.",
      },
    ],
    leesMeer: {
      label: "Welke verzekeringen heb je nodig?",
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/verzekeringen-voor-starters",
    },
  },
  {
    maand: 7,
    title: "Je krijgt je vakantiegeld: 1.400 euro",
    situation:
      "Een mooi extraatje bovenop je gewone loon. Waar gaat het naartoe?",
    choices: [
      {
        label: "Alles naar mijn noodbuffer",
        effect: { buffer: 1400, humeur: -4 },
        feedback:
          "Je buffer schiet hiermee flink omhoog. Eenmalige inkomsten zijn de snelste manier om er een op te bouwen.",
      },
      {
        label: "De helft sparen, de helft voor een reis",
        effect: { saldo: 0, buffer: 700, humeur: 12 },
        feedback:
          "Een goede balans: je bouwt buffer op én je geniet ervan. Zo blijft je budget haalbaar op lange termijn.",
      },
      {
        label: "Alles opgaan aan een reis en nieuwe spullen",
        effect: { saldo: -100, humeur: 18 },
        feedback:
          "Heerlijk moment, maar je staat er financieel niet sterker voor. Zonder buffer word je kwetsbaar voor de volgende tegenslag.",
      },
    ],
  },
  {
    maand: 9,
    title: "Je werkgever biedt pensioensparen aan",
    situation:
      "Je kan maandelijks 85 euro storten in een pensioenspaarplan, met belastingvoordeel. Je hebt nu ongeveer een halve maand aan buffer.",
    choices: [
      {
        label: "Eerst mijn buffer afwerken, pensioensparen volgend jaar",
        effect: { buffer: 300, humeur: 2 },
        feedback:
          "De juiste volgorde. Pensioengeld zit vast tot je pensioenleeftijd; je buffer heb je morgen misschien al nodig.",
      },
      {
        label: "Ik start meteen met pensioensparen",
        effect: { saldo: -85, humeur: -2, vasteKost: 85 },
        feedback:
          "Vroeg beginnen is waardevol door het rente-op-rente-effect. Maar zonder buffer moet je bij tegenslag alsnog duur lenen.",
      },
      {
        label: "Allebei tegelijk, ik knijp mijn budget wat samen",
        effect: { saldo: -85, buffer: 150, humeur: -9, vasteKost: 85 },
        feedback:
          "Ambitieus. Let op dat je jezelf niet te krap zet: een budget zonder ademruimte hou je meestal niet vol.",
      },
    ],
    leesMeer: {
      label: "Waarom nu al aan pensioen denken",
      href: "/leerstof/pensioen-en-pensioenvoorbereiding/waarom-nu-al-pensioen",
    },
  },
  {
    maand: 11,
    title: "Je wil op jezelf gaan wonen",
    situation:
      "Een appartement huren vraagt een waarborg van twee maanden (1.400 euro), de eerste maand huur, en verhuiskosten.",
    choices: [
      {
        label: "Ik wacht nog een paar maanden en spaar verder",
        effect: { buffer: 400, humeur: -5 },
        feedback:
          "Geduld kost je nu wat vrijheid, maar je vertrekt straks zonder schulden. Reken op drie tot vier maanden huur aan opstartkosten.",
      },
      {
        label: "Ik ga nu, en gebruik mijn buffer",
        effect: { buffer: -1400, saldo: -300, humeur: 14, vasteKost: 120 },
        feedback:
          "Je woont op jezelf, maar je buffer is bijna leeg. Bouw hem als eerste weer op voor je aan andere plannen begint.",
      },
      {
        label: "Ik ga nu en leen het verschil bij",
        effect: { saldo: -200, humeur: 10, vasteKost: 165 },
        feedback:
          "Lenen voor een waarborg is duur en riskant: je start je huurperiode met een vaste afbetaling erbovenop.",
      },
    ],
    leesMeer: {
      label: "Voor het eerst huren",
      href: "/leerstof/woning-en-hypothecaire-lening/eerste-keer-huren",
    },
  },
];
