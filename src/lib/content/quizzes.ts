import { Quiz } from "./types";

export const quizzes: Quiz[] = [
  {
    slug: "financieel-fit-als-starter",
    title: "Ben jij financieel fit als starter?",
    short: "10 vragen over loon, sparen, lenen en verzekeren",
    description:
      "Test in een paar minuten hoeveel je al weet over je loonstrookje, budgetteren, sparen en verzekeren als starter op de arbeidsmarkt. Na elke vraag krijg je meteen uitleg.",
    questions: [
      {
        question:
          "Welk percentage van je brutoloon gaat er als werknemer ongeveer naar de sociale zekerheid (RSZ)?",
        options: [
          { text: "Ongeveer 3%", correct: false },
          { text: "Ongeveer 13%", correct: true },
          { text: "Ongeveer 25%", correct: false },
          { text: "Ongeveer 40%", correct: false },
        ],
        explanation:
          "Werknemers dragen ongeveer 13,07% van hun brutoloon af als RSZ-bijdrage. Dit financiert onder andere je pensioen, ziekteverzekering en werkloosheidsuitkering.",
      },
      {
        question:
          "Wat betekent 'bedrijfsvoorheffing' op je loonstrookje?",
        options: [
          {
            text: "Een boete voor te laat komen op het werk",
            correct: false,
          },
          {
            text: "Een voorschot op je uiteindelijke personenbelasting",
            correct: true,
          },
          { text: "Een verplichte bijdrage aan je vakbond", correct: false },
          { text: "De prijs van je maaltijdcheques", correct: false },
        ],
        explanation:
          "De bedrijfsvoorheffing is een voorschot dat je werkgever al inhoudt op je loon. Bij je jaarlijkse belastingaangifte wordt bekeken of dat voorschot klopte, te hoog of te laag was.",
      },
      {
        question:
          "Volgens de 50/30/20-regel: welk percentage van je nettoloon reserveer je richtlijn-gewijs voor sparen en schulden aflossen?",
        options: [
          { text: "5%", correct: false },
          { text: "20%", correct: true },
          { text: "50%", correct: false },
          { text: "80%", correct: false },
        ],
        explanation:
          "De 50/30/20-regel stelt voor om 50% van je nettoloon aan noden te besteden, 30% aan wensen, en 20% te sparen of schulden mee af te lossen. Het zijn richtpercentages, geen strikte regel.",
      },
      {
        question:
          "Hoeveel maanden aan noodzakelijke uitgaven wordt vaak als vuistregel gebruikt voor een noodbuffer?",
        options: [
          { text: "0,5 tot 1 maand", correct: false },
          { text: "3 tot 6 maanden", correct: true },
          { text: "12 tot 18 maanden", correct: false },
          { text: "24 tot 36 maanden", correct: false },
        ],
        explanation:
          "Een courante vuistregel is drie tot zes maanden aan noodzakelijke uitgaven als noodbuffer, afhankelijk van je persoonlijke situatie (vast contract, gezinslasten, zelfstandige activiteit...).",
      },
      {
        question: "Wat geeft het JKP (jaarlijks kostenpercentage) bij een lening weer?",
        options: [
          {
            text: "Enkel de rentevoet, zonder bijkomende kosten",
            correct: false,
          },
          {
            text: "De totale kostprijs van een krediet op jaarbasis, inclusief kosten",
            correct: true,
          },
          { text: "Het bedrag dat je maandelijks terugbetaalt", correct: false },
          {
            text: "De belasting die je betaalt op een lening",
            correct: false,
          },
        ],
        explanation:
          "Het JKP geeft de volledige kostprijs van een krediet weer op jaarbasis, rente én kosten inbegrepen. Het is de beste maatstaf om leningen van verschillende aanbieders te vergelijken.",
      },
      {
        question:
          "Welke verzekering wordt vaak als eerste prioriteit aanbevolen voor starters, ook al is ze niet overal wettelijk verplicht?",
        options: [
          {
            text: "Verzekering voor een nieuwe smartphone",
            correct: false,
          },
          { text: "Familiale verzekering (burgerlijke aansprakelijkheid)", correct: true },
          { text: "Annulatieverzekering voor reizen", correct: false },
          { text: "Verzekering tegen diefstal van een fiets", correct: false },
        ],
        explanation:
          "De familiale verzekering dekt schade die je per ongeluk aan anderen toebrengt, en dat kan om zeer hoge bedragen gaan. Ze is relatief goedkoop en dekt een groot financieel risico.",
      },
      {
        question:
          "Hoeveel pensioenpijlers kent het Belgische pensioensysteem?",
        options: [
          { text: "1", correct: false },
          { text: "2", correct: false },
          { text: "3", correct: true },
          { text: "5", correct: false },
        ],
        explanation:
          "België kent drie pensioenpijlers: het wettelijk pensioen (pijler 1), het aanvullend pensioen via je werkgever (pijler 2), en individueel pensioensparen (pijler 3).",
      },
      {
        question:
          "Waarom maakt vroeg beginnen met sparen of beleggen voor je pensioen zo'n groot verschil?",
        options: [
          {
            text: "Omdat de belastingvrije som dan hoger ligt",
            correct: false,
          },
          {
            text: "Door het rente-op-rente-effect krijgt je geld meer tijd om te groeien",
            correct: true,
          },
          {
            text: "Omdat werkgevers verplicht zijn extra bij te dragen bij jonge werknemers",
            correct: false,
          },
          { text: "Dat maakt eigenlijk geen verschil", correct: false },
        ],
        explanation:
          "Dankzij het rente-op-rente-effect groeit geld dat je vroeg opzij zet gedurende meer jaren. Daardoor kan een kleiner bedrag dat je jong inlegt, op termijn meer opbrengen dan een groter bedrag dat je later inlegt.",
      },
      {
        question:
          "Wat is over het algemeen waar over het verband tussen risico en verwacht rendement bij beleggen?",
        options: [
          {
            text: "Hoger risico betekent meestal een hoger verwacht rendement",
            correct: true,
          },
          {
            text: "Risico en rendement hebben niets met elkaar te maken",
            correct: false,
          },
          {
            text: "Een hoger risico levert altijd een lager rendement op",
            correct: false,
          },
          {
            text: "Beleggen kent geen enkel risico als je lang genoeg wacht",
            correct: false,
          },
        ],
        explanation:
          "Als vuistregel geldt: hoe hoger het verwachte rendement van een belegging, hoe hoger doorgaans ook het risico. Er bestaat geen belegging met hoog rendement en geen risico.",
      },
      {
        question:
          "Je hebt een noodbuffer nodig. Waar zet je dat geld het best opzij?",
        options: [
          {
            text: "In aandelen, voor het hoogste verwachte rendement",
            correct: false,
          },
          {
            text: "Op een gereglementeerde spaarrekening, apart van je zichtrekening",
            correct: true,
          },
          { text: "Cash thuis in een lade", correct: false },
          {
            text: "In een langetermijnbelegging die je pas na 10 jaar kan opnemen",
            correct: false,
          },
        ],
        explanation:
          "Een noodbuffer moet snel beschikbaar en veilig zijn. Een gereglementeerde spaarrekening, gescheiden van je zichtrekening, is daarvoor het meest geschikt. Beleggingen kunnen in waarde schommelen net wanneer je het geld nodig hebt.",
      },
    ],
  },
];

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}
