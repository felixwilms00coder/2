import { ToolSummary } from "./types";

export const tools: ToolSummary[] = [
  {
    slug: "geldscan",
    title: "Geldscan",
    short: "Waar gaat je geld eigenlijk naartoe?",
    description:
      "Plak je rekeningoverzicht en krijg een indeling van je uitgaven, je terugkerende abonnementen en concrete plekken waar ruimte zit. Alles blijft in je browser.",
    icon: "scan",
  },
  {
    slug: "nettoloon",
    title: "Bruto-nettoloon calculator",
    short: "Wat blijft er over van je brutoloon?",
    description:
      "Geef je brutomaandloon in en krijg een schatting van je RSZ-bijdrage, bedrijfsvoorheffing en nettoloon.",
    icon: "wallet",
  },
  {
    slug: "budgetplanner",
    title: "50/30/20 budgetplanner",
    short: "Verdeel je nettoloon over noden, wensen en sparen",
    description:
      "Vul je nettoloon in en zie meteen een voorstel van budget voor noden, wensen en sparen, plus vergelijking met je eigen uitgaven.",
    icon: "chart",
  },
  {
    slug: "beleggingsplan",
    title: "Beleggingsplan-simulator",
    short: "Wat levert maandelijks beleggen op termijn op?",
    description:
      "Simuleer periodiek beleggen over meerdere jaren en zie hoeveel je kosten van je eindresultaat afhalen. Een rekenmodel, geen advies.",
    icon: "line-chart",
  },
  {
    slug: "spaardoel",
    title: "Spaardoel-calculator",
    short: "Hoe lang duurt het voor je je spaardoel haalt?",
    description:
      "Bereken hoeveel je maandelijks opzij moet zetten om een spaardoel te bereiken, of hoe lang het duurt tegen jouw huidig spaarritme.",
    icon: "piggy-bank",
  },
  {
    slug: "spaarrekening-vergelijker",
    title: "Spaarrekening-vergelijker",
    short: "Vergelijk zelf ingevulde spaartarieven",
    description:
      "Vul de basisrente en getrouwheidspremie van rekeningen in die je zelf gevonden hebt, en zie het verschil na verloop van tijd. Geen eigen rentetabel, geen aanbeveling.",
    icon: "scale",
  },
  {
    slug: "verzekering-vergelijker",
    title: "Verzekeringsoffertes vergelijken",
    short: "Premie én vrijstelling samen bekijken",
    description:
      "Vul je eigen offertes in en zie de verwachte totale jaarkost, niet enkel de premie. Geen eigen polissen, geen rangschikking van verzekeraars.",
    icon: "umbrella",
  },
  {
    slug: "lening-vergelijker",
    title: "Lening-vergelijker",
    short: "Maandelijkse aflossing en totale kost per scenario",
    description:
      "Vul rentevoeten en looptijden in die je zelf gevonden hebt en zie de maandelijkse aflossing en totale kost naast elkaar. Geen eigen rentetabel, geen aanbeveling.",
    icon: "credit-card",
  },
  {
    slug: "noodbuffer-calculator",
    title: "Noodbuffer-calculator",
    short: "Hoeveel maanden dekt je spaargeld?",
    description:
      "Zie hoeveel maanden vaste uitgaven je huidige spaargeld dekt, afgezet tegen de gangbare vuistregel van 3 tot 6 maanden.",
    icon: "shield",
  },
  {
    slug: "72-regel",
    title: "De 72-regel",
    short: "Hoe snel verdubbelt je geld?",
    description:
      "Vul een verwacht jaarlijks rendement in en zie in hoeveel jaar je bedrag ongeveer verdubbelt bij samengestelde interest.",
    icon: "trending-up",
  },
  {
    slug: "aanvullend-pensioen",
    title: "Aanvullend-pensioen-simulator",
    short: "Wat bouw je zelf op boven je wettelijk pensioen?",
    description:
      "Simuleer wat pensioensparen of apart sparen tot je pensioen kan opleveren. Geen schatting van je wettelijk pensioen: daarvoor verwijzen we naar MyPension.be.",
    icon: "landmark",
  },
  {
    slug: "aankoopkosten-woning",
    title: "Aankoopkosten-calculator",
    short: "Wat kost een woning kopen, boven de aankoopprijs?",
    description:
      "Vul de registratierechten, notariskosten en eventuele kredietkosten in die voor jouw situatie gelden, en zie in één keer de totale prijs.",
    icon: "receipt",
  },
];

export function getTool(slug: string): ToolSummary | undefined {
  return tools.find((t) => t.slug === slug);
}
