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
  /** Which step of the game this happens in (meaning depends on `roundLabel`). */
  stap: number;
  title: string;
  situation: string;
  choices: GameChoice[];
  /** Optional pointer to the article that explains the underlying idea. */
  leesMeer?: { label: string; href: string };
};

/**
 * Weights used to turn end-of-game stats into a 0-100 score. Kept per game
 * because the scale of buffer/saldo swings differs a lot between a
 * year-long game and a short, single-scenario game — reusing one fixed
 * scale would make short games nearly impossible to score well on.
 */
export type ScoreConfig = {
  bufferTarget: number;
  saldoFloor: number;
  saldoTarget: number;
};

export type Game = {
  slug: string;
  title: string;
  short: string;
  description: string;
  roundLabel: string;
  startSaldo: number;
  startBuffer: number;
  startHumeur: number;
  nettoLoon: number;
  basisVasteKosten: number;
  scoreConfig: ScoreConfig;
  rounds: GameRound[];
};

export const games: Game[] = [
  {
    slug: "je-eerste-jaar",
    title: "Je eerste jaar als starter",
    short: "Zeven situaties, twaalf maanden, jouw keuzes",
    description:
      "Zeven echte situaties, elke keuze telt. Je begint met een nettoloon van 2.150 euro en geen spaargeld. Waar sta je na twaalf maanden?",
    roundLabel: "Maand",
    startSaldo: 0,
    startBuffer: 0,
    startHumeur: 70,
    nettoLoon: 2150,
    basisVasteKosten: 1250,
    scoreConfig: { bufferTarget: 3000, saldoFloor: 500, saldoTarget: 2000 },
    rounds: [
      {
        stap: 1,
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
        stap: 2,
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
        stap: 3,
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
        stap: 5,
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
        stap: 7,
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
        stap: 9,
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
        stap: 11,
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
    ],
  },
  {
    slug: "onverwachte-uitgave",
    title: "Onverwachte uitgave: wat nu?",
    short: "Je auto valt uit: vijf beslissingen in twintig dagen",
    description:
      "Eén tegenvaller, een reeks beslissingen erna. Zie hoe je noodbuffer je helpt, en wat er gebeurt als je die niet gebruikt.",
    roundLabel: "Dag",
    startSaldo: 150,
    startBuffer: 700,
    startHumeur: 65,
    nettoLoon: 2100,
    basisVasteKosten: 1300,
    scoreConfig: { bufferTarget: 800, saldoFloor: 250, saldoTarget: 500 },
    rounds: [
      {
        stap: 1,
        title: "Je auto valt uit",
        situation:
          "Op weg naar het werk hoor je een raar geluid. De garage belt: de transmissie is stuk, herstelling kost 900 euro. Je hebt die auto nodig voor je job.",
        choices: [
          {
            label: "Ik betaal met mijn noodbuffer",
            effect: { buffer: -900, humeur: -5 },
            feedback:
              "Precies waarvoor een noodbuffer dient: een onverwachte, noodzakelijke uitgave zonder dat je in schulden hoeft te gaan.",
          },
          {
            label: "Ik betaal met mijn kredietkaart en los gespreid af",
            effect: { saldo: -150, humeur: -10, vasteKost: 45 },
            feedback:
              "Kredietkaarten rekenen vaak een hoge rente aan als je niet het volledige bedrag terugbetaalt. Die 900 euro kan zo flink oplopen.",
          },
          {
            label: "Ik stel de herstelling een paar weken uit",
            effect: { buffer: -1150, humeur: -12 },
            feedback:
              "Een defecte transmissie verergert vaak bij verder rijden. De garage meldt achteraf extra schade: de uiteindelijke rekening ligt hoger dan bij meteen herstellen.",
          },
        ],
        leesMeer: {
          label: "Hoeveel noodbuffer heb je nodig?",
          href: "/leerstof/sparen-en-beleggen/noodbuffer-hoeveel-sparen",
        },
      },
      {
        stap: 2,
        title: "Je moet toch naar het werk",
        situation:
          "Zonder auto moet je deze week op een andere manier op je werk geraken. Wat kies je?",
        choices: [
          {
            label: "Ik neem de trein met een weekabonnement (35 euro)",
            effect: { saldo: -35, humeur: 2 },
            feedback:
              "Een voorspelbare, beperkte kost: een prima noodoplossing.",
          },
          {
            label: "Ik bestel elke dag een taxi (25 euro per dag, 5 dagen)",
            effect: { saldo: -125, humeur: 5 },
            feedback:
              "Comfortabel, maar 125 euro voor één week transport is fors: dat loopt snel op als de auto langer buiten dienst blijft.",
          },
          {
            label: "Ik vraag een collega om elke dag mee te rijden",
            effect: { saldo: 0, humeur: -2 },
            feedback:
              "Kost niets, maar je bent afhankelijk van iemand anders z'n schema: niet altijd een houdbare oplossing.",
          },
        ],
      },
      {
        stap: 4,
        title: "Een vriend stelt voor om geld in te zamelen",
        situation:
          "Een vriend wil de kost in de vriendengroep 'crowdfunden' via een groepsapp, zodat je het niet alleen draagt. Wat doe je?",
        choices: [
          {
            label: "Ik bedank hem, maar los het zelf op",
            effect: { humeur: 3 },
            feedback:
              "Een onverwachte uitgave is vervelend, maar geen reden om vrienden financieel te betrekken: dat kan de relatie ook onder druk zetten.",
          },
          {
            label: "Ik ga akkoord, het scheelt toch",
            effect: { saldo: 200, humeur: -6 },
            feedback:
              "Het scheelt geld nu, maar geld lenen van vrienden brengt vaak ongemakkelijke verwachtingen met zich mee, ook als niemand dat hardop zegt.",
          },
          {
            label:
              "Ik vraag enkel mijn ouders om een renteloze lening, met een afspraak om terug te betalen",
            effect: { saldo: 300, humeur: 0 },
            feedback:
              "Familie kan een goede tussenoplossing zijn, zeker met een duidelijke afspraak: dat voorkomt latere misverstanden.",
          },
        ],
      },
      {
        stap: 10,
        title: "De herstelling is betaald. Nu je buffer weer aanvullen",
        situation:
          "Je noodbuffer is fors geslonken. Hoe pak je dat aan?",
        choices: [
          {
            label: "Ik zet een vast bedrag opzij bij elke loonstorting, automatisch",
            effect: { buffer: 150, humeur: 2 },
            feedback:
              "Automatiseren werkt: je geeft het geld niet ongemerkt uit voor je het kan wegzetten.",
          },
          {
            label: "Ik vul aan zodra er toevallig geld overblijft",
            effect: { buffer: 40, humeur: 0 },
            feedback:
              "Zonder vast ritme duurt het meestal veel langer om een buffer weer op peil te krijgen, en de volgende tegenvaller kan intussen alweer toeslaan.",
          },
          {
            label: "Ik stel het uit tot ik meer verdien",
            effect: { buffer: 0, humeur: -3 },
            feedback:
              "Zonder buffer sta je kwetsbaar voor de volgende onverwachte kost, en die komt vroeg of laat.",
          },
        ],
      },
      {
        stap: 20,
        title: "Een app belooft snel geld zonder papierwerk",
        situation:
          "Een collega raadt een app aan die binnen enkele minuten tot 500 euro leent, zonder aanvraagformulieren. 'Handig voor de volgende keer,' zegt hij.",
        choices: [
          {
            label: "Ik installeer de app niet: ik vertrouw liever op mijn buffer",
            effect: { humeur: 4 },
            feedback:
              "Snelle-kredietapps rekenen vaak hoge kosten aan voor het gemak. Een buffer die je zelf opbouwt, kost niets.",
          },
          {
            label: "Ik installeer de app 'voor de zekerheid', zonder ze meteen te gebruiken",
            effect: { humeur: 1 },
            feedback:
              "Op zich onschadelijk, maar een app die lenen zo makkelijk maakt, verlaagt de drempel om ze ook te gebruiken wanneer het niet echt nodig is.",
          },
          {
            label: "Ik gebruik de app meteen om alvast wat buffer aan te vullen",
            effect: { buffer: 200, saldo: -220, humeur: -4 },
            feedback:
              "Lenen om te sparen kost je per saldo geld door de kosten van de app: je buffer groeit zo trager dan wanneer je gewoon zelf spaart.",
          },
        ],
        leesMeer: {
          label: "Verantwoord lenen",
          href: "/leerstof/budget-betalen-lenen-en-verzekeren/verantwoord-lenen",
        },
      },
    ],
  },
  {
    slug: "eerste-keer-huren",
    title: "Je eerste appartement huren",
    short: "Vijf beslissingen, van waarborg tot inrichting",
    description:
      "Van de waarborg tot de plaatsbeschrijving: zie hoe je keuzes bij een verhuis je buffer en je maandelijkse kosten beïnvloeden.",
    roundLabel: "Week",
    startSaldo: 300,
    startBuffer: 1600,
    startHumeur: 68,
    nettoLoon: 2150,
    basisVasteKosten: 950,
    scoreConfig: { bufferTarget: 1200, saldoFloor: 250, saldoTarget: 500 },
    rounds: [
      {
        stap: 1,
        title: "Je vindt een appartement",
        situation:
          "Huur: 750 euro per maand. De verhuurder vraagt een waarborg van twee maanden huur (1.500 euro) en de eerste maand vooraf. Hoe pak je dat aan?",
        choices: [
          {
            label: "Ik betaal alles in één keer met mijn buffer",
            effect: { buffer: -2250, humeur: 10, vasteKost: 750 },
            feedback:
              "Je opstartkosten zijn meteen geregeld, maar je buffer is bijna leeg: bouw hem als eerste weer op.",
          },
          {
            label: "Ik betaal de waarborg via een huurwaarborglening",
            effect: { buffer: -750, saldo: -30, humeur: 6, vasteKost: 800 },
            feedback:
              "Een huurwaarborglening spreidt de kost, maar de afbetaling komt bovenop je huur: check de voorwaarden goed.",
          },
          {
            label:
              "Ik betaal de waarborg uit mijn buffer, maar hou de eerste maand huur nog even op mijn zichtrekening",
            effect: { buffer: -1500, saldo: -150, humeur: 7, vasteKost: 750 },
            feedback:
              "Een andere verdeling van dezelfde kost: je buffer wordt iets minder hard geraakt, maar je zichtrekening voelt het ook. Per saldo betaal je evenveel.",
          },
        ],
        leesMeer: {
          label: "Voor het eerst huren",
          href: "/leerstof/woning-en-hypothecaire-lening/eerste-keer-huren",
        },
      },
      {
        stap: 1,
        title: "De plaatsbeschrijving",
        situation:
          "Voor je intrek neemt, vraagt de verhuurder om snel de plaatsbeschrijving te tekenen. Er staat weinig detail in over een kras op de keukenkast.",
        choices: [
          {
            label: "Ik vraag om de kras expliciet te noteren voor ik teken",
            effect: { humeur: 5 },
            feedback:
              "Een goede plaatsbeschrijving beschermt je: zonder duidelijke notitie kan die kras bij het vertrek als jouw schade gelden.",
          },
          {
            label: "Ik teken snel, het is maar een kleinigheid",
            effect: { humeur: 0 },
            feedback:
              "Kleine details die niet genoteerd staan, kunnen bij het einde van je huurcontract alsnog op jouw rekening belanden.",
          },
          {
            label: "Ik laat de plaatsbeschrijving overdoen door een expert (kost 150 euro, gedeeld)",
            effect: { saldo: -75, humeur: 3 },
            feedback:
              "Grondig, en de kost wordt gedeeld met de verhuurder: een goede optie bij twijfel over de staat van de woning.",
          },
        ],
      },
      {
        stap: 2,
        title: "Verzekering voor je nieuwe plek",
        situation:
          "Je makelaar wijst je op een brandverzekering met inboedelverzekering, verplicht volgens je huurcontract. Kost: 12 euro per maand.",
        choices: [
          {
            label: "Ik sluit ze meteen af",
            effect: { saldo: -12, humeur: 3, vasteKost: 12 },
            feedback:
              "Verstandig: vaak ook een verplichting in je huurcontract, en ze dekt schade die anders volledig voor jouw rekening zou zijn.",
          },
          {
            label: "Ik stel het nog even uit",
            effect: { humeur: -3 },
            feedback:
              "Als brand of waterschade optreedt voor je verzekerd bent, betaal je alles zelf, en dat kan het bedrag van je hele waarborg overstijgen.",
          },
          {
            label: "Ik neem de duurste polis met alle extra's (35 euro per maand)",
            effect: { saldo: -35, humeur: -2, vasteKost: 35 },
            feedback:
              "Meer dekking kan geruststellend zijn, maar begin met wat verplicht en zinvol is: je kan later altijd uitbreiden.",
          },
        ],
      },
      {
        stap: 3,
        title: "Meubelen voor de nieuwe plek",
        situation:
          "Een lege woonkamer voelt kaal. Nieuwe meubels kosten al snel 800 euro.",
        choices: [
          {
            label: "Ik koop tweedehands en bouw geleidelijk uit",
            effect: { saldo: -150, humeur: 6 },
            feedback:
              "Een goede tussenweg: je woonkamer is bruikbaar, en je buffer krijgt de kans om zich te herstellen.",
          },
          {
            label: "Ik koop alles nieuw op krediet (JKP 9%)",
            effect: { saldo: -40, humeur: 10, vasteKost: 75 },
            feedback:
              "Een mooie woonkamer nu, maar met een vaste afbetaling erbovenop terwijl je buffer nog niet hersteld is van de verhuis.",
          },
          {
            label: "Ik wacht met grote aankopen tot mijn buffer weer aangevuld is",
            effect: { humeur: -5 },
            feedback:
              "Financieel de veiligste keuze: het duurt wel langer voor je woning helemaal ingericht aanvoelt.",
          },
        ],
      },
      {
        stap: 6,
        title: "Je buffer weer opbouwen",
        situation:
          "Je bent ingericht, en nu wil je je noodbuffer weer op peil brengen na de verhuis.",
        choices: [
          {
            label: "Ik zet automatisch een vast bedrag opzij elke maand",
            effect: { buffer: 250, humeur: 3 },
            feedback:
              "Zo groeit je buffer gestaag terug, zonder dat je er telkens actief aan hoeft te denken.",
          },
          {
            label: "Ik spaar enkel wat overblijft aan het einde van de maand",
            effect: { buffer: 60, humeur: 0 },
            feedback:
              "Werkt soms, maar in een nieuwe woning met nieuwe vaste kosten blijft er vaak minder over dan verwacht.",
          },
          {
            label: "Ik stel het nog even uit, ik geniet liever van mijn nieuwe plek",
            effect: { buffer: 0, humeur: 6 },
            feedback:
              "Begrijpelijk na een spannende verhuis, maar hoe langer je buffer leeg blijft, hoe kwetsbaarder je bent voor de volgende tegenvaller.",
          },
        ],
      },
    ],
  },
];

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
