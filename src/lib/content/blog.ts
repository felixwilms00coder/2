import { BlogPost } from "./types";

/**
 * Blogposts, nieuwste eerst. Wordt aangevuld door een dagelijkse agent
 * (zie docs/automatisering.md, sectie 9) — elke post moet gegrond zijn op
 * wat al in legislation.ts of lexicon.ts staat, geen vrij verzonnen
 * cijfers of wetsartikels.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "14-dagen-bedenktijd-bij-een-lening",
    title: "Je hebt altijd 14 dagen bedenktijd bij een lening — zo werkt het",
    summary:
      "Een consumentenkrediet afgesloten en toch twijfels? Je hebt wettelijk 14 kalenderdagen om er zonder kosten van af te zien.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    publishedAt: "2026-08-12",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Je hebt net een consumentenkrediet getekend — misschien voor een auto, misschien om een grotere aankoop te spreiden — en een paar dagen later bekruipt je twijfel. Goed nieuws: bij zo'n lening ben je wettelijk niet meteen vastgeklikt.",
      },
      { type: "h2", text: "14 dagen, zonder reden, zonder kosten" },
      {
        type: "p",
        text: "Het Wetboek van Economisch Recht (Boek VII, over betalings- en kredietdiensten) geeft je bij een consumentenkrediet altijd 14 kalenderdagen bedenktijd vanaf het sluiten van het contract. Binnen die termijn kan je de lening herroepen zonder dat je daarvoor een reden moet opgeven, en zonder extra kosten.",
      },
      {
        type: "figure",
        value: "14 dagen",
        label: "Wettelijke bedenktijd bij een consumentenkrediet",
        source: "Wetboek van Economisch Recht, Boek VII",
      },
      { type: "h2", text: "Waarom dit ook vóór het tekenen al nuttig is" },
      {
        type: "p",
        text: "Diezelfde wetgeving verplicht de kredietgever om je vóór je tekent een gestandaardiseerd informatieblad te geven, met daarin onder meer het jaarlijkse kostenpercentage (JKP) — niet enkel de rente, maar de volledige kost van het krediet op jaarbasis, kosten inbegrepen. Dat maakt het mogelijk om aanbiedingen van verschillende kredietgevers eerlijk te vergelijken vóór je een handtekening zet.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Bedenktijd is geen vervanging voor vergelijken vooraf",
        text: "Reken liever vooraf goed na — bijvoorbeeld met de Lening-vergelijker op FinEdu — dan achteraf op de bedenktijd te vertrouwen. Herroepen kan wel, maar een goed doordachte keuze vooraf bespaart je die stap.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen bindend advies over jouw concreet contract. Twijfel je of je herroepingsrecht nog loopt, of over de voorwaarden in jouw specifieke overeenkomst? Neem contact op met je kredietgever, of check bij twijfel de vergunning van een kredietbemiddelaar via fsma.be.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
