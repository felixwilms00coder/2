export type Suggestion = {
  question: string;
  answer: string;
  href: string;
};

export const homeSuggestions: Suggestion[] = [
  {
    question: "Wat blijft er over van mijn brutoloon?",
    answer:
      "Gemiddeld hou je als werknemer ruwweg 65 tot 75% van je brutoloon over als nettoloon, na RSZ-bijdrage en bedrijfsvoorheffing. Bereken je eigen schatting met de bruto-nettoloon calculator.",
    href: "/tools/nettoloon",
  },
  {
    question: "Hoeveel moet ik sparen als noodbuffer?",
    answer:
      "Een courante vuistregel is drie tot zes maanden aan noodzakelijke uitgaven, opzij gezet op een gereglementeerde spaarrekening.",
    href: "/leerstof/sparen-en-beleggen/noodbuffer-hoeveel-sparen",
  },
  {
    question: "Welke verzekeringen heb ik nodig als starter?",
    answer:
      "Een familiale verzekering en, als je een auto hebt, een autoverzekering burgerlijke aansprakelijkheid zijn voor de meeste starters de eerste prioriteit.",
    href: "/leerstof/budget-betalen-lenen-en-verzekeren/verzekeringen-voor-starters",
  },
  {
    question: "Hoe stel ik mijn eerste budget op?",
    answer:
      "De 50/30/20-regel verdeelt je nettoloon richtinggevend over 50% noden, 30% wensen en 20% sparen. Test het met de budgetplanner.",
    href: "/tools/budgetplanner",
  },
  {
    question: "Waarop moet ik letten bij mijn eerste huurcontract?",
    answer:
      "Let op de huurwaarborg, een tegensprekelijke plaatsbeschrijving, welke kosten inbegrepen zijn, en of het contract geregistreerd is.",
    href: "/leerstof/woning-en-hypothecaire-lening/eerste-keer-huren",
  },
  {
    question: "Waarom moet ik nu al aan pensioen denken?",
    answer:
      "Dankzij het rente-op-rente-effect groeit geld dat je vroeg opzij zet gedurende meer jaren, waardoor vroeg beginnen vaak zwaarder weegt dan het bedrag zelf.",
    href: "/leerstof/pensioen-en-pensioenvoorbereiding/waarom-nu-al-pensioen",
  },
];
