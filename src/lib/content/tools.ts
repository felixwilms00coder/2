import { ToolSummary } from "./types";

export const tools: ToolSummary[] = [
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
    slug: "spaardoel",
    title: "Spaardoel-calculator",
    short: "Hoe lang duurt het voor je je spaardoel haalt?",
    description:
      "Bereken hoeveel je maandelijks opzij moet zetten om een spaardoel te bereiken, of hoe lang het duurt tegen jouw huidig spaarritme.",
    icon: "piggy-bank",
  },
];

export function getTool(slug: string): ToolSummary | undefined {
  return tools.find((t) => t.slug === slug);
}
