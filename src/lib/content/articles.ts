import { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "loonstrookje-ontcijferd",
    categorySlug: "loon",
    title: "Je eerste loonstrookje ontcijferd",
    summary:
      "Bruto, netto, RSZ, bedrijfsvoorheffing... je loonstrookje lijkt een vreemde taal. Hier lees je wat elk onderdeel betekent.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Je eerste loonstrookje is voor veel starters een schok: het bedrag dat op je rekening komt, ligt vaak flink lager dan het loon dat in je contract staat. Dat komt doordat er tussen je brutoloon en je nettoloon twee grote inhoudingen zitten: de sociale zekerheidsbijdrage en de bedrijfsvoorheffing.",
      },
      { type: "h2", text: "Van bruto naar netto in drie stappen" },
      {
        type: "steps",
        items: [
          "Brutoloon: het loon dat in je arbeidscontract staat, vóór alle inhoudingen.",
          "RSZ-bijdrage (ook wel ONSS): werknemers betalen 13,07% van hun brutoloon aan sociale zekerheid. Dit financiert onder andere je pensioen, ziekteverzekering en werkloosheidsuitkering.",
          "Bedrijfsvoorheffing: een voorschot op je uiteindelijke personenbelasting, berekend op basis van schalen die rekening houden met je loon, gezinssituatie en aantal kinderen ten laste.",
        ],
      },
      {
        type: "p",
        text: "Wat overblijft na deze twee inhoudingen, is je nettoloon: het bedrag dat effectief op je rekening wordt gestort. Bij de meeste starterslonen komt dit neer op ruwweg 65 tot 75% van het brutoloon, maar dat percentage hangt af van je loonhoogte en persoonlijke situatie.",
      },
      { type: "h2", text: "Andere codes die je kan tegenkomen" },
      {
        type: "list",
        items: [
          "Maaltijdcheques of ecocheques: extralegale voordelen, apart van je loon, meestal onbelast binnen bepaalde grenzen.",
          "Vakantiegeld: enkel en dubbel vakantiegeld worden meestal apart uitbetaald, niet elke maand.",
          "Woon-werkverplaatsing: een vergoeding voor je verplaatsing naar het werk, bijvoorbeeld een fietsvergoeding of treinabonnement.",
          "Nettovergoeding kosten eigen aan de werkgever: terugbetaling van effectief gemaakte kosten, hierop betaal je geen belasting.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Reken het zelf na",
        text: "Gebruik onze nettoloon-rekentool om snel een schatting te maken van jouw netto maandloon op basis van je brutoloon.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Klopt je loonstrookje niet met wat je verwachtte?",
        text: "Vraag altijd uitleg aan je hr-dienst of het sociaal secretariaat van je werkgever. Bedragen en percentages worden jaarlijks geïndexeerd, dus check bij twijfel de officiële bronnen zoals de RSZ of FOD Financiën.",
      },
    ],
  },
  {
    slug: "50-30-20-regel",
    categorySlug: "budgetteren",
    title: "De 50/30/20-regel: je eerste budget opstellen",
    summary:
      "Een simpele vuistregel om je nettoloon te verdelen over noden, wensen en sparen, zonder ingewikkelde spreadsheets.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Als je net begint te werken, is het verleidelijk om weinig stil te staan bij budgetteren: er komt tenslotte elke maand loon binnen. Maar zonder overzicht is geld sneller op dan verwacht. De 50/30/20-regel is een eenvoudige manier om structuur aan te brengen zonder elke euro te moeten registreren.",
      },
      { type: "h2", text: "Hoe werkt de verdeling?" },
      {
        type: "list",
        items: [
          "50% noden: huur of afbetaling, energie, boodschappen, verzekeringen, vervoer, telefoon en internet.",
          "30% wensen: restaurantbezoek, hobby's, streamingdiensten, kleding, uitstapjes.",
          "20% sparen en schulden aflossen: je noodbuffer opbouwen, sparen voor doelen, of studieschulden versneld terugbetalen.",
        ],
      },
      {
        type: "p",
        text: "Dit zijn richtpercentages, geen wet van Meden en Perzen. Woon je in een dure regio of pendel je ver, dan kan het aandeel 'noden' hoger liggen. Belangrijk is dat je weet waar je geld naartoe gaat en dat er elke maand bewust iets opzij gaat voor later.",
      },
      { type: "h2", text: "Zo begin je" },
      {
        type: "steps",
        items: [
          "Zet je nettoloon en vaste inkomsten op een rijtje.",
          "Som je vaste kosten van de afgelopen maand op: huur, abonnementen, verzekeringen.",
          "Bekijk drie maanden aan bankuittreksels om een gemiddelde te schatten van je variabele uitgaven.",
          "Zet automatisch een vast bedrag opzij naar een aparte spaarrekening, het liefst net na je loonstorting.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Automatiseer je sparen",
        text: "Stel een automatische, terugkerende overschrijving in naar je spaarrekening, net na de dag dat je loon wordt gestort. Wat je niet op je zichtrekening ziet staan, geef je minder snel uit.",
      },
    ],
  },
  {
    slug: "noodbuffer-hoeveel-sparen",
    categorySlug: "sparen",
    title: "Je noodbuffer: hoeveel spaargeld heb je nodig als starter?",
    summary:
      "Een noodbuffer is je financiële vangnet voor onverwachte kosten. Ontdek hoeveel je nodig hebt en waar je het best opzij zet.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Een kapotte wasmachine, een onverwachte tandartsrekening, of een paar maanden zonder werk: het leven is onvoorspelbaar. Een noodbuffer zorgt ervoor dat je zulke tegenslagen kan opvangen zonder in de rode cijfers te gaan of geld te moeten lenen tegen hoge kosten.",
      },
      { type: "h2", text: "Hoeveel is genoeg?" },
      {
        type: "p",
        text: "Een courante vuistregel is drie tot zes maanden aan noodzakelijke uitgaven (huur, energie, eten, verzekeringen). Als starter met een vast contract en weinig mensen ten laste kan drie maanden een realistisch startpunt zijn. Werk je als zelfstandige of freelancer, dan is een buffer aan de hoge kant van die vork veiliger.",
      },
      { type: "h2", text: "Waar zet je die buffer opzij?" },
      {
        type: "list",
        items: [
          "Een gereglementeerde spaarrekening: je spaargeld is beschikbaar wanneer je het nodig hebt en een deel van de rente is vrijgesteld van roerende voorheffing.",
          "Vermijd beleggingen (aandelen, fondsen) voor je noodbuffer: de waarde kan schommelen op net het moment dat je het geld nodig hebt.",
          "Hou de buffer gescheiden van je gewone zichtrekening, zodat je niet in de verleiding komt om het aan te spreken voor gewone uitgaven.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Begin klein",
        text: "Lukt drie maanden loon sparen niet meteen? Begin met een concreet, haalbaar tussendoel, bijvoorbeeld 500 euro, en bouw van daaruit verder.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Let op de voorwaarden",
        text: "Sommige spaarrekeningen werken met getrouwheidspremies die pas na een langere periode worden uitbetaald. Lees de voorwaarden na zodat je weet wanneer je zonder verlies aan rente kan opnemen.",
      },
    ],
  },
  {
    slug: "beleggen-de-basis",
    categorySlug: "beleggen",
    title: "Beleggen voor beginners: de basis in 10 minuten",
    summary:
      "Wat is het verschil tussen sparen en beleggen, welke risico's zijn er, en hoe begin je met kleine bedragen?",
    readMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Sparen en beleggen worden vaak door elkaar gebruikt, maar het zijn twee verschillende dingen. Sparen is geld veilig opzij zetten met een lage, stabiele opbrengst. Beleggen betekent dat je geld inzet om mogelijk meer rendement te behalen, maar met het risico dat je (tijdelijk of blijvend) waarde verliest.",
      },
      { type: "h2", text: "Waarom pas beleggen na je noodbuffer?" },
      {
        type: "p",
        text: "Beleggingen kunnen in waarde schommelen, soms fors. Als je moet verkopen op een slecht moment omdat je dringend geld nodig hebt, kan dat een verlies vastklikken dat je anders had kunnen vermijden. Bouw daarom eerst een noodbuffer op, en beleg pas met geld dat je een aantal jaar kan missen.",
      },
      { type: "h2", text: "Enkele basisbegrippen" },
      {
        type: "list",
        items: [
          "Rendement: de opbrengst van je belegging, vaak uitgedrukt in procent per jaar. Rendement uit het verleden is geen garantie voor de toekomst.",
          "Risico: de kans dat je belegging in waarde daalt. Over het algemeen geldt: hoe hoger het verwachte rendement, hoe hoger het risico.",
          "Spreiding (diversificatie): je risico verminderen door in veel verschillende bedrijven, sectoren of regio's tegelijk te beleggen, bijvoorbeeld via een indexfonds of ETF.",
          "Beleggingshorizon: hoe lang je het geld kan missen. Hoe langer je horizon, hoe meer tijd je hebt om koersschommelingen op te vangen.",
          "Kosten: instapkosten, beheerskosten en transactiekosten kunnen je rendement flink drukken op lange termijn.",
        ],
      },
      { type: "h2", text: "Hoe begin je als starter?" },
      {
        type: "steps",
        items: [
          "Zorg dat je noodbuffer op orde is en dat je geen dure schulden hebt openstaan.",
          "Bepaal hoeveel je maandelijks kan missen zonder dat het je levensstijl in het gedrang brengt.",
          "Leer de basisbegrippen kennen voor je in een product stapt, en lees altijd het essentiële-informatiedocument (Kiid) van een product.",
          "Denk aan spreiding in de tijd: periodiek een klein bedrag inleggen (bijvoorbeeld maandelijks) vermindert het risico om net op een piekmoment in te stappen.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Beleg nooit met geleend geld of je noodbuffer",
        text: "Beleg alleen met geld dat je gedurende meerdere jaren kan missen. Raadpleeg bij twijfel een erkend financieel adviseur en vergelijk altijd de kosten van verschillende aanbieders.",
      },
    ],
  },
  {
    slug: "verantwoord-lenen",
    categorySlug: "lenen",
    title: "Verantwoord lenen: het verschil tussen goede en slechte schulden",
    summary:
      "Niet elke schuld is slecht, maar sommige leningen zijn véél duurder dan ze lijken. Zo herken je het verschil.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Lenen is niet per definitie slecht: een studielening of een hypothecair krediet voor een woning kan een verstandige investering in je toekomst zijn. Andere vormen van krediet, zoals een kredietopening of minilening voor consumptiegoederen, kunnen daarentegen snel duur uitpakken.",
      },
      { type: "h2", text: "Let op de jaarlijkse kostenpercentage (JKP)" },
      {
        type: "p",
        text: "Het JKP (jaarlijks kostenpercentage) geeft de totale kostprijs van een krediet weer op jaarbasis, inclusief rente en kosten. Vergelijk altijd het JKP tussen verschillende aanbieders in plaats van enkel naar de maandelijkse afbetaling te kijken: een lage maandelijkse afbetaling kan verbergen dat je over een langere looptijd veel meer terugbetaalt.",
      },
      { type: "h2", text: "Veelvoorkomende valkuilen" },
      {
        type: "list",
        items: [
          "Kredietopeningen (vroeger 'kredietkaarten met doorlopend krediet'): flexibel, maar vaak met een hoge rentevoet als je het opgenomen bedrag niet snel terugbetaalt.",
          "'Gratis' 0%-financiering bij aankopen: reken na of het echt zonder kosten is, en of je de aankoop had gedaan zonder die lening.",
          "Verlengen van de looptijd om de maandelijkse afbetaling te verlagen: dit verhoogt vaak de totale kostprijs van de lening.",
          "Meerdere kleine leningen tegelijk: de som van de maandelijkse afbetalingen kan je budget onder druk zetten zonder dat je het in de gaten hebt.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Vergelijk voor je tekent",
        text: "Vraag bij minstens twee of drie aanbieders een simulatie op met hetzelfde bedrag en dezelfde looptijd, en vergelijk het JKP en de totale terugbetaalde som.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Signalen van overmatige schulden",
        text: "Moet je lenen om je gewone maandelijkse uitgaven te dekken, of gebruik je de ene lening om de andere af te betalen? Neem dan contact op met een dienst voor schuldbemiddeling of het OCMW voor gratis budgetbegeleiding.",
      },
    ],
  },
  {
    slug: "verzekeringen-voor-starters",
    categorySlug: "verzekeringen",
    title: "Welke verzekeringen heb je nodig als starter?",
    summary:
      "Niet elke verzekering is even relevant als je net alleen gaat wonen of aan je carrière begint. Dit is waar je prioriteit aan geeft.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Verzekeringsmakelaars bieden tientallen polissen aan, maar niet elke verzekering is voor iedereen even nuttig. Als starter is het vooral belangrijk om de verzekeringen met een groot financieel risico eerst te regelen.",
      },
      { type: "h2", text: "Vaak verplicht of vrijwel onmisbaar" },
      {
        type: "list",
        items: [
          "Familiale verzekering (burgerlijke aansprakelijkheid privéleven): dekt schade die jij per ongeluk aan anderen toebrengt. Relatief goedkoop en dekt potentieel zeer hoge schadebedragen.",
          "Brandverzekering (woningverzekering): vaak verplicht opgelegd door je verhuurder of hypotheekverstrekker, en dekt brand-, water- en stormschade aan je woning en inboedel.",
          "Autoverzekering burgerlijke aansprakelijkheid: wettelijk verplicht als je een auto bezit of bestuurt.",
        ],
      },
      { type: "h2", text: "Vaak zinvol, afhankelijk van je situatie" },
      {
        type: "list",
        items: [
          "Hospitalisatieverzekering: dekt kosten bij een ziekenhuisopname. Check eerst of je via je werkgever al een collectieve polis hebt, dat is meestal voordeliger.",
          "Rechtsbijstandsverzekering: dekt juridische kosten bij een geschil, bijvoorbeeld met een verhuurder of werkgever.",
          "Schuldsaldoverzekering: relevant zodra je een hypothecair krediet afsluit, dekt de resterende schuld bij overlijden.",
        ],
      },
      { type: "h2", text: "Vaak minder prioritair voor starters" },
      {
        type: "list",
        items: [
          "Overlijdensverzekeringen zonder afhankelijke personen: minder urgent als niemand financieel van jou afhankelijk is.",
          "Uitgebreide verzekeringen voor dure elektronica: vaak duurder dan het risico rechtvaardigt, reken na of het je waard is.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Vergelijk dekking, niet enkel prijs",
        text: "Een goedkope polis met veel uitsluitingen kan je duur uitkomen op het moment dat je een beroep op de verzekering wil doen. Lees de algemene voorwaarden en vraag naar de uitsluitingen.",
      },
    ],
  },
  {
    slug: "waarom-nu-al-pensioen",
    categorySlug: "pensioen",
    title: "Waarom je nu al aan je pensioen moet denken",
    summary:
      "Pensioen lijkt ver weg als je net begint te werken, maar hoe vroeger je begint, hoe groter het verschil dat je opbouwt.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Pensioen voelt voor een starter als iets voor later. Toch maakt vroeg beginnen een groot verschil, dankzij het rente-op-rente-effect: geld dat je nu opzij zet, krijgt decennia de tijd om te groeien.",
      },
      { type: "h2", text: "De drie pensioenpijlers in België" },
      {
        type: "list",
        items: [
          "Pijler 1: het wettelijk pensioen, opgebouwd via de sociale zekerheidsbijdragen die je als werknemer betaalt.",
          "Pijler 2: het aanvullend pensioen via je werkgever, ook wel groepsverzekering genoemd. Niet elke werkgever biedt dit aan, dus vraag ernaar bij je hr-dienst.",
          "Pijler 3: individueel pensioensparen dat je zelf afsluit, met een fiscaal voordeel binnen bepaalde jaarlijkse grenzen.",
        ],
      },
      { type: "h2", text: "Wat kan je nu al doen?" },
      {
        type: "steps",
        items: [
          "Maak een account aan op mypension.be om te zien hoeveel wettelijk pensioen je al hebt opgebouwd en een schatting te krijgen van je pensioenleeftijd.",
          "Vraag je werkgever of er een aanvullend pensioen (pijler 2) wordt voorzien, en hoeveel daarvan door jouw eigen bijdrage komt.",
          "Overweeg pensioensparen (pijler 3) pas nadat je noodbuffer op orde is: het is doorgaans pas rendabel op lange termijn en het geld zit vrijwel vast tot je pensioenleeftijd.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Klein bedrag, groot verschil",
        text: "Door het rente-op-rente-effect kan geld dat je op je 25e opzij zet decennia langer groeien dan geld dat je pas op je 45e begint te sparen. Vroeg beginnen weegt vaak zwaarder door dan het bedrag zelf.",
      },
    ],
  },
  {
    slug: "eerste-belastingaangifte",
    categorySlug: "belastingen",
    title: "Je eerste belastingaangifte: een stap-voor-stap gids",
    summary:
      "De personenbelasting lijkt ingewikkeld, maar met een paar basisbegrippen en een systematische aanpak kom je een heel eind.",
    readMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Elk jaar (meestal in de lente) moet je een belastingaangifte indienen over de inkomsten van het vorige jaar. Veel gegevens staan tegenwoordig al vooraf ingevuld, maar het loont om alles na te kijken.",
      },
      { type: "h2", text: "Enkele basisbegrippen" },
      {
        type: "list",
        items: [
          "Belastbaar inkomen: je inkomen waarop belasting wordt berekend, na aftrek van bijvoorbeeld beroepskosten.",
          "Belastingvrije som: een deel van je inkomen waarop je geen belasting betaalt. Dit bedrag wordt jaarlijks geïndexeerd.",
          "Belastingschijven: de personenbelasting werkt met progressieve schijven; hoe hoger je inkomen, hoe hoger het tarief op het bovenste deel van dat inkomen (niet op je hele inkomen).",
          "Bedrijfsvoorheffing: het voorschot dat je werkgever al inhield. De aangifte bepaalt of je nog moet bijbetalen of geld terugkrijgt.",
        ],
      },
      { type: "h2", text: "Zo pak je het aan" },
      {
        type: "steps",
        items: [
          "Log in op Tax-on-web (via itsme of je eID) en controleer de vooraf ingevulde gegevens.",
          "Verzamel bewijsstukken voor fiscale voordelen: bijvoorbeeld pensioensparen, giften aan goede doelen, of dienstencheques.",
          "Kijk na of je recht hebt op een aftrek voor werkelijke beroepskosten, of dat de forfaitaire (standaard) aftrek voordeliger is voor jou.",
          "Dien je aangifte in vóór de vermelde deadline, en bewaar een kopie en de bewijsstukken.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Bedragen en tarieven veranderen jaarlijks",
        text: "Belastingschijven en de belastingvrije som worden jaarlijks geïndexeerd. Controleer de actuele bedragen altijd op de website van de FOD Financiën voor je een schatting maakt van wat je moet betalen of terugkrijgt.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Hulp nodig?",
        text: "De FOD Financiën organiseert elk jaar gratis invulsessies (Tax-on-web hulp) waar je met vragen terecht kan. Ook je gemeente biedt vaak gratis hulp bij het invullen van de aangifte.",
      },
    ],
  },
];

export function getArticlesForCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getArticle(
  categorySlug: string,
  slug: string,
): Article | undefined {
  return articles.find(
    (a) => a.categorySlug === categorySlug && a.slug === slug,
  );
}
