import { BlogPost } from "./types";

/**
 * Blogposts, nieuwste eerst. Wordt aangevuld door een dagelijkse agent
 * (zie docs/automatisering.md, sectie 9) — elke post moet gegrond zijn op
 * wat al in legislation.ts of lexicon.ts staat, geen vrij verzonnen
 * cijfers of wetsartikels.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "betaalkaart-verloren-of-gestolen-wettelijke-bescherming",
    title: "Je betaalkaart kwijt of gestolen? Dit bepaalt de wet over wie de schade draagt",
    summary:
      "Raakt je betaalkaart kwijt of gestolen, dan ben je voor niet-toegestane betalingen nadien wettelijk maar tot een beperkt bedrag zelf aansprakelijk, tenzij je grof nalatig was. Zodra je het meldt aan je bank, stopt in principe je aansprakelijkheid voor verdere transacties.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    publishedAt: "2026-08-16",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Je betaalkaart valt uit je zak op de trein, of je portefeuille wordt gestolen. Je eerste gedachte gaat naar je papieren en cash, maar minstens even belangrijk: wat als iemand anders met die kaart begint te betalen voor je het doorhebt? De wet legt vast wie dan voor welk deel opdraait.",
      },
      { type: "h2", text: "Een wettelijke grens, geen volledige aansprakelijkheid" },
      {
        type: "p",
        text: "Word je betaalkaart verloren, gestolen of misbruikt, dan ben je voor niet-toegestane betalingen die daarna nog gebeuren wettelijk aansprakelijk, maar slechts tot een beperkt bedrag. Je draagt dus niet automatisch de volledige schade zelf, op voorwaarde dat je niet frauduleus handelde of grof nalatig was.",
      },
      { type: "h2", text: "Wanneer ben je 'grof nalatig'?" },
      {
        type: "p",
        text: "Grove nalatigheid is het scharnierpunt in deze regel: gedraag je je onvoorzichtig genoeg met je kaart of pincode, dan kan de wettelijke bescherming wegvallen. Het klassieke voorbeeld is je pincode samen met je kaart bewaren, bijvoorbeeld op een briefje in dezelfde portefeuille, of je kaartgegevens en pincode delen met iemand anders. In zulke gevallen kan je bank een groter deel van de schade bij jou leggen.",
      },
      { type: "h2", text: "Meld het meteen: dat is de sleutel" },
      {
        type: "p",
        text: "Zodra je het verlies, de diefstal of het misbruik meldt aan je bank, stopt in principe je aansprakelijkheid voor alle transacties die daarna nog gebeuren, behalve als jijzelf frauduleus handelde. Hoe sneller je meldt, hoe korter de periode waarin je nog voor een deel van de schade kan opdraaien.",
      },
      {
        type: "list",
        items: [
          "Blokkeer je kaart onmiddellijk via de app van je bank, of via het centrale kaartstopnummer (Card Stop).",
          "Meld het verlies, de diefstal of het misbruik ook expliciet aan je bank zelf, niet enkel via Card Stop.",
          "Overloop nadien je recente transacties en meld elke betaling die je niet zelf deed.",
          "Bewaar een bevestiging van je melding: die kan later relevant zijn bij discussie over een transactie.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Het exacte grensbedrag staat hier bewust niet",
        text: "FinEdu houdt zelf geen actueel maximumbedrag bij: dat ligt wettelijk vast, maar FinEdu verifieert dit cijfer niet zelf. Check de actuele stand bij je eigen bank of via de FOD Economie voor je op een concreet bedrag rekent.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Het verschil tussen een debet- en kredietkaart telt hier ook mee",
        text: "Twijfel je over het verschil tussen een debetkaart en een kredietkaart, of hoe contactloos betalen precies werkt? Het financieel lexicon van FinEdu legt die begrippen apart uit.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen bindend advies over jouw concrete situatie: bij discussie over een specifieke transactie met je bank kan je terecht bij je bank zelf, de Ombudsman in financiële geschillen, of bij twijfel over de regelgeving zelf bij de FOD Economie.",
      },
    ],
  },
  {
    slug: "rsz-bijdrage-financiert-meer-dan-je-pensioen",
    title: "Je RSZ-bijdrage betaalt niet enkel je eigen pensioen",
    summary:
      "De sociale zekerheidsbijdrage die van je brutoloon afgaat, is geen individuele spaarpot: ze financiert een gemeenschappelijke pot die onder meer het wettelijk pensioen, ziekteverzekering, werkloosheid en kindergeld betaalt.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    publishedAt: "2026-08-15",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Op je loonstrookje staat een post die bijna even groot is als de bedrijfsvoorheffing: de RSZ-bijdrage. Veel starters denken dat dit gewoon een voorschot op hun eigen pensioen is, zoals een verplicht spaarpotje. Dat klopt niet helemaal, en het is nuttig om te weten waar dat geld dan wél naartoe gaat.",
      },
      { type: "h2", text: "Eén gemeenschappelijke pot, geen individuele rekening" },
      {
        type: "p",
        text: "De sociale zekerheidsbijdrage die op je brutoloon wordt ingehouden, gaat naar een gemeenschappelijke pot: geen persoonlijke spaarrekening met jouw naam erop. Die pot financiert onder meer het wettelijk pensioen, de ziekte- en invaliditeitsverzekering, de werkloosheidsuitkering en het kindergeld, voor iedereen die daar op dat moment recht op heeft.",
      },
      {
        type: "h2",
        text: "Je bouwt wel rechten op, ook al is het geen eigen rekening",
      },
      {
        type: "p",
        text: "Dat het geen individuele spaarpot is, betekent niet dat je bijdrage voor niets is. Je bouwt naarmate je meer en langer bijdraagt wel degelijk pensioenrechten op: het wettelijk pensioen wordt berekend op basis van je loopbaan als werknemer, zelfstandige of ambtenaar. Hoe die opbouw precies verloopt, hangt af van je concrete loopbaan.",
      },
      {
        type: "list",
        items: [
          "Wettelijk pensioen: het pensioen dat je via de sociale zekerheid opbouwt op basis van je loopbaan.",
          "Ziekte- en invaliditeitsverzekering: dekking bij ziekte of arbeidsongeschiktheid.",
          "Werkloosheidsuitkering: een uitkering als je zonder werk valt.",
          "Kindergeld: financiële ondersteuning voor wie kinderen ten laste heeft.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Het wettelijk pensioen is meestal niet je enige pensioen",
        text: "Naast het wettelijk pensioen (eerste pijler) bestaat er ook een aanvullend pensioen, via je werkgever of jezelf opgebouwd. Bereken op finedu.be/tools/aanvullend-pensioen wat een aanvullend pensioen je later ongeveer kan opleveren, bovenop het wettelijke.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw pensioenopbouw: je concrete rechten hangen af van je volledige loopbaan. Voor een overzicht van je eigen, opgebouwde pensioenrechten kan je terecht bij mypension.be.",
      },
    ],
  },
  {
    slug: "bedrijfsvoorheffing-is-geen-definitieve-belasting",
    title: "Waarom er zoveel wordt ingehouden van je eerste loon: bedrijfsvoorheffing uitgelegd",
    summary:
      "Wat je werkgever elke maand inhoudt als bedrijfsvoorheffing, is een voorschot op je belastingen, geen definitief bedrag: pas bij je aangifte wordt duidelijk of je nog iets terugkrijgt of moet bijbetalen.",
    categorySlug: "belasting-werk-en-inkomen",
    publishedAt: "2026-08-14",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Je eerste loonstrookje ligt er, en het verschil tussen wat er in je contract staat en wat er echt op je rekening komt, valt meteen op. Een flink stuk daarvan gaat naar iets dat 'bedrijfsvoorheffing' heet. Logische vraag: is dat gewoon weg, of komt daar nog iets van terug?",
      },
      { type: "h2", text: "Een voorschot, geen definitieve belasting" },
      {
        type: "p",
        text: "Bedrijfsvoorheffing is het bedrag dat je werkgever maandelijks van je brutoloon inhoudt en rechtstreeks doorstort aan de fiscus. Dat gebeurt automatisch, je hoeft daar zelf niets voor te doen. Belangrijk om te weten: het is een voorschot op je uiteindelijke personenbelasting, niet het definitieve bedrag dat je verschuldigd bent.",
      },
      { type: "h2", text: "Waarom het uiteindelijke bedrag kan afwijken" },
      {
        type: "p",
        text: "Je echte, definitieve belasting wordt pas berekend bij je jaarlijkse belastingaangifte, op basis van je volledige inkomen van dat jaar en de progressieve belastingschijven die daarop van toepassing zijn. Dat eindresultaat wordt dan vergeleken met wat er via bedrijfsvoorheffing al werd voorafbetaald. Is er te veel ingehouden, dan krijg je het verschil terug. Is er te weinig ingehouden, dan moet je bijbetalen.",
      },
      {
        type: "list",
        items: [
          "Nettoloon: wat je effectief op je rekening krijgt, na RSZ-bijdrage én bedrijfsvoorheffing.",
          "Brutoloon: het bedrag uit je arbeidscontract, vóór die inhoudingen.",
          "Bedrijfsvoorheffing: het maandelijkse voorschot op je personenbelasting.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Je loonstrookje wordt duidelijker met de juiste begrippen",
        text: "Twijfel je nog over het verschil tussen bruto- en nettoloon, of wat er allemaal wordt ingehouden? Het financieel lexicon van FinEdu legt die begrippen apart uit, en de Bruto-nettoloon calculator toont hoe ze samenhangen voor een concreet bedrag.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw belastingsituatie: de exacte schijfgrenzen en percentages worden jaarlijks geïndexeerd en vind je bij de officiële bron via /wetgeving. Voor vragen over je concrete belastingaangifte kan je terecht bij FOD Financiën of een erkend boekhouder.",
      },
    ],
  },
  {
    slug: "depositogarantiestelsel-hoe-veilig-is-je-spaargeld",
    title: "Wat als je bank omvalt? Zo werkt de bescherming van je spaargeld",
    summary:
      "Spaar- en zichtgeld bij een vergunde bank is via het depositogarantiestelsel beschermd bij een faillissement, maar de bescherming geldt per bank, niet per rekening: iets om te weten voor je spaart bij meerdere instellingen.",
    categorySlug: "sparen-en-beleggen",
    publishedAt: "2026-08-13",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Je hebt een spaarrekening geopend en er staat stilaan een leuk bedrag op. Dan lees je in het nieuws dat ergens een bank in de problemen komt, en de vraag dringt zich op: wat gebeurt er dan met jouw geld? Het antwoord zit in het depositogarantiestelsel, en het is handig om te weten hoe dat precies werkt nog vóór je het ooit nodig hebt.",
      },
      { type: "h2", text: "Wat het depositogarantiestelsel dekt" },
      {
        type: "p",
        text: "Staat je spaar- of zichtgeld bij een bank met een Belgische of Europese vergunning, dan is dat geld beschermd via het depositogarantiestelsel, mocht die bank onverhoopt failliet gaan. Je sluit daar zelf niets voor af en betaalt er ook niets voor: het is een wettelijke bescherming die automatisch geldt zodra je een rekening opent bij een vergunde instelling.",
      },
      { type: "h2", text: "Per bank, niet per rekening" },
      {
        type: "p",
        text: "Een belangrijk detail: de bescherming geldt per persoon, per bank, niet per rekening. Heb je bij dezelfde bank zowel een spaar- als een zichtrekening, dan stapelt dat niet op: het is één beschermd bedrag voor die bank samen. Spreid je je geld wel over meerdere banken, dan geldt de bescherming voor elke bank apart.",
      },
      {
        type: "list",
        items: [
          "Heeft de bank een Belgische of Europese bankvergunning?",
          "Bij welk garantiefonds is de instelling precies aangesloten?",
          "Hoeveel van je geld staat, opgeteld over al je rekeningen, al bij diezelfde bank?",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Het beschermde bedrag verandert zelden, maar controleer het",
        text: "FinEdu houdt zelf geen actueel beschermd bedrag bij, want dat ligt wettelijk vast maar kan wijzigen. Het precieze bedrag dat per bank beschermd is, vind je bij het Garantiefonds voor financiële diensten.",
      },
      {
        type: "p",
        text: "Dit stelsel beschermt je spaar- en zichtgeld bij een bankfaillissement: het is geen bescherming tegen koersverlies op beleggingen zoals aandelen of obligaties, dat is een ander soort risico. Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw situatie. Twijfel je over de vergunning van een bank, check die dan via fsma.be, en vergelijk zelf tarieven en voorwaarden van verschillende spaarrekeningen via de Spaarrekening-vergelijker op FinEdu.",
      },
    ],
  },
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
