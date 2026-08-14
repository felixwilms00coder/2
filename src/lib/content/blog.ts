import { BlogPost } from "./types";

/**
 * Blogposts, nieuwste eerst. Wordt aangevuld door een dagelijkse agent
 * (zie docs/automatisering.md, sectie 9) — elke post moet gegrond zijn op
 * wat al in legislation.ts of lexicon.ts staat, geen vrij verzonnen
 * cijfers of wetsartikels.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "huurcontract-opzeggen-vlaanderen-wat-de-wet-zegt",
    title: "Je huurcontract opzeggen: wat de wet in Vlaanderen vastlegt",
    summary:
      "Een standaard huurcontract van 9 jaar opzeggen kan, maar huurder en verhuurder moeten allebei vaste termijnen respecteren, en de verhuurder heeft daar bovendien een wettelijke reden voor nodig.",
    categorySlug: "woning-en-hypothecaire-lening",
    publishedAt: "2026-08-12",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Je huurt voor het eerst je eigen plek en het contract dat je tekende, loopt in principe negen jaar. Wil je toch verhuizen voor die negen jaar om zijn, of laat je verhuurder weten dat hij het pand nodig heeft? Dat kan, maar niet zomaar op elk moment en niet zonder vaste regels: voor jou als huurder, én voor je verhuurder.",
      },
      {
        type: "figure",
        value: "9 jaar",
        label: "Standaardduur van een woninghuurcontract in Vlaanderen",
        source: "Vlaams Huurdecreet van 9 november 2018",
      },
      { type: "h2", text: "Als huurder opzeggen" },
      {
        type: "p",
        text: "Wil je als huurder vroegtijdig weg uit een lopend contract van 9 jaar, dan moet je een minimale opzegtermijn respecteren. Zeg je op tijdens de eerste jaren van de looptijd, dan kan daar bovendien een opzegvergoeding aan verbonden zijn. Hoeveel opzegtermijn en welke vergoeding precies gelden, hangt af van het moment waarop je opzegt: check dat in je concreet huurcontract, of bij de officiële bron hieronder, want dit verschilt per situatie.",
      },
      { type: "h2", text: "Als verhuurder opzeggen: enkel met een wettelijke reden" },
      {
        type: "p",
        text: "Een verhuurder kan een lopend huurcontract van 9 jaar niet zomaar stopzetten. Dat mag enkel om specifieke, wettelijk voorziene redenen, zoals zelf (of een naaste) in de woning gaan wonen, of het pand grondig renoveren. Ook de verhuurder moet daarbij een vaste opzegtermijn respecteren.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Kortlopende contracten volgen een ander regime",
        text: "Huur je met een contract van 3 jaar of minder, dan gelden er strengere, deels andere opzegregels dan bij het standaardcontract van 9 jaar. Ga dus eerst na welk type contract je precies hebt getekend, voor je van bepaalde termijnen uitgaat.",
      },
      {
        type: "p",
        text: "Deze samenvatting geeft de structuur van de regel weer, niet elk exact aantal maanden of elk mogelijk bedrag: dat hangt af van het type contract en het moment van opzeg, en FinEdu houdt daar zelf geen actuele tabel van bij. Voor de precieze termijnen en vergoedingen kan je terecht bij Vlaanderen.be: Wonen, of bij de volledige wettekst via /wetgeving. Dit is algemene informatie op basis van de wet, geen bindend advies over jouw concreet huurcontract: laat je specifieke situatie bij twijfel bevestigen door een jurist of de dienst wonen van je gemeente.",
      },
    ],
  },
  {
    slug: "14-dagen-bedenktijd-bij-een-lening",
    title: "Je hebt altijd 14 dagen bedenktijd bij een lening: zo werkt het",
    summary:
      "Een consumentenkrediet afgesloten en toch twijfels? Je hebt wettelijk 14 kalenderdagen om er zonder kosten van af te zien.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    publishedAt: "2026-08-12",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Je hebt net een consumentenkrediet getekend: misschien voor een auto, misschien om een grotere aankoop te spreiden, en een paar dagen later bekruipt je twijfel. Goed nieuws: bij zo'n lening ben je wettelijk niet meteen vastgeklikt.",
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
        text: "Diezelfde wetgeving verplicht de kredietgever om je vóór je tekent een gestandaardiseerd informatieblad te geven, met daarin onder meer het jaarlijkse kostenpercentage (JKP): niet enkel de rente, maar de volledige kost van het krediet op jaarbasis, kosten inbegrepen. Dat maakt het mogelijk om aanbiedingen van verschillende kredietgevers eerlijk te vergelijken vóór je een handtekening zet.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Bedenktijd is geen vervanging voor vergelijken vooraf",
        text: "Reken liever vooraf goed na: bijvoorbeeld met de Lening-vergelijker op FinEdu: dan achteraf op de bedenktijd te vertrouwen. Herroepen kan wel, maar een goed doordachte keuze vooraf bespaart je die stap.",
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
