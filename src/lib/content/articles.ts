import { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "loonstrookje-ontcijferd",
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "belasting-werk-en-inkomen",
    subcategorySlug: "eerste-job",
    kind: "artikel",
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
      {
        type: "figure",
        value: "13,07%",
        label: "van je brutoloon gaat naar de RSZ",
        source: "Werknemersbijdrage sociale zekerheid, België",
      },
      {
        type: "check",
        question:
          "Je brutoloon is 2.800 euro. Ongeveer hoeveel hou je netto over?",
        options: [
          { text: "Ongeveer 2.600 euro", correct: false },
          { text: "Ongeveer 2.150 euro", correct: true },
          { text: "Ongeveer 1.500 euro", correct: false },
        ],
        explanation:
          "Na de RSZ-bijdrage en de bedrijfsvoorheffing hou je bij dit loon ruwweg 2.100 tot 2.200 euro over. Reken je eigen situatie na met de bruto-nettoloon calculator.",
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
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    subcategorySlug: "budget-en-budgetbeheer",
    kind: "artikel",
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
      {
        type: "check",
        question:
          "Je verdient 2.000 euro netto. Hoeveel gaat er volgens deze regel naar sparen?",
        options: [
          { text: "200 euro", correct: false },
          { text: "400 euro", correct: true },
          { text: "600 euro", correct: false },
        ],
        explanation:
          "20% van 2.000 euro is 400 euro. Dat bedrag gebruik je om je noodbuffer op te bouwen of om schulden versneld af te lossen.",
      },
      {
        type: "reveal",
        prompt:
          "Denk even na: welke uitgave van jou zit eigenlijk bij 'wensen', terwijl je ze als 'noden' beschouwt?",
        answer:
          "Veelgenoemde twijfelgevallen zijn streamingdiensten, een duurder telefoonabonnement dan nodig, dagelijkse koffie onderweg, en abonnementen die je vergeten bent op te zeggen. Ze voelen als vaste kosten, maar je kan ze aanpassen. Dat maakt ze wensen, en dus de plek waar je het snelst ruimte vindt.",
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
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "sparen-en-beleggen",
    subcategorySlug: "spaarrekening",
    kind: "tips",
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
      {
        type: "figure",
        value: "3-6",
        label: "maanden aan noodzakelijke uitgaven als richtbedrag",
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
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "sparen-en-beleggen",
    subcategorySlug: "beleggen-en-risicospreiding",
    kind: "artikel",
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
      {
        type: "check",
        question:
          "Een belegging belooft een hoog rendement zonder enig risico. Wat is hier aan de hand?",
        options: [
          {
            text: "Dat kan kloppen als je lang genoeg belegt",
            correct: false,
          },
          {
            text: "Dit bestaat niet: hoger rendement gaat altijd samen met meer risico",
            correct: true,
          },
          { text: "Alleen banken mogen dat aanbieden", correct: false },
        ],
        explanation:
          "Hoog rendement zonder risico bestaat niet. Zo'n belofte is een klassiek kenmerk van beleggingsfraude. Check bij twijfel altijd of de aanbieder vergund is bij de FSMA.",
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
      {
        type: "callout",
        tone: "tip",
        title: "Liever een volledige cursus dan losse artikels?",
        text: "Download de gratis gids 'Je eerste stappen om te beleggen' (/gids/eerste-stappen-beleggen): een stap-voor-stap pdf voor wie helemaal bij nul begint.",
      },
    ],
  },
  {
    slug: "verantwoord-lenen",
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    subcategorySlug: "lening-en-krediet",
    kind: "artikel",
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
      {
        type: "reveal",
        prompt:
          "Lening A: 60 euro per maand, 48 maanden. Lening B: 90 euro per maand, 30 maanden. Welke is goedkoper?",
        answer:
          "Lening B. Je betaalt in totaal 2.700 euro terug (90 x 30), tegenover 2.880 euro bij lening A (60 x 48). De lagere maandelijkse afbetaling van A oogt aantrekkelijker, maar door de langere looptijd betaal je uiteindelijk meer. Kijk daarom altijd naar het JKP en naar de totale terugbetaalde som.",
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
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    subcategorySlug: "verzekeren",
    kind: "checklist",
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
      {
        type: "check",
        question:
          "Je fietst tegen een geparkeerde auto en veroorzaakt 3.000 euro schade. Welke verzekering dekt dit?",
        options: [
          { text: "Je hospitalisatieverzekering", correct: false },
          { text: "Je familiale verzekering", correct: true },
          { text: "Geen enkele, je betaalt zelf", correct: false },
        ],
        explanation:
          "De familiale verzekering dekt schade die je in je privéleven per ongeluk aan anderen toebrengt. Voor een paar tientallen euro's per jaar dek je zo risico's die in de duizenden euro's kunnen lopen.",
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
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    subcategorySlug: "drie-pensioenpijlers",
    kind: "artikel",
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
      {
        type: "figure",
        value: "3",
        label: "pensioenpijlers in België: wettelijk, via je werkgever, en zelf",
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
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    categorySlug: "belasting-werk-en-inkomen",
    subcategorySlug: "belastingaangifte",
    kind: "artikel",
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
      {
        type: "reveal",
        prompt:
          "Je verdient meer en schuift op naar een hogere belastingschijf. Betaal je nu over je hele inkomen dat hogere tarief?",
        answer:
          "Nee. De personenbelasting werkt met progressieve schijven: het hogere tarief geldt alleen op het deel van je inkomen dat boven de grens uitkomt, niet op alles wat je verdient. Opslag krijgen betekent dus nooit dat je er netto op achteruit gaat.",
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
  {
    slug: "meer-dan-je-basisloon",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "belasting-werk-en-inkomen",
    subcategorySlug: "inkomen-en-loon",
    kind: "artikel",
    title: "Eindejaarspremie, flexi-job en fiscaal voordeel: meer dan je basisloon",
    summary:
      "Je loonstrookje toont je maandloon, maar je inkomen bestaat vaak uit meer: een eindejaarspremie, misschien een flexi-job, en fiscale voordelen die je pas bij je belastingaangifte voelt.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Je eerste loonstrookje ontcijferd legt uit hoe je van brutoloon naar nettoloon komt. Maar je inkomen als starter bestaat vaak uit meer dan alleen dat vaste maandloon: een eindejaarspremie, misschien een flexi-job ernaast, en fiscale voordelen die je pas bij je belastingaangifte echt voelt. Dit artikel zoomt in op die extra looncomponenten.",
      },
      { type: "h2", text: "De eindejaarspremie: een dertiende maand?" },
      {
        type: "p",
        text: "Veel werknemers krijgen eind december een eindejaarspremie bovenop hun gewone loon, in de volksmond soms 'dertiende maand' genoemd. Dat is geen wettelijke verplichting voor iedereen: of je die premie krijgt, en hoeveel, hangt af van de collectieve arbeidsovereenkomst (cao) van jouw sector of je specifieke werkgever. Sta je aan het begin van je carrière, vraag dan gerust na bij je hr-dienst of vakbond of er in jouw sector een eindejaarspremie geldt.",
      },
      {
        type: "p",
        text: "Belangrijk om te weten: een eindejaarspremie is fiscaal en sociaal gezien gewoon loon. Ze telt mee als brutoloon en wordt dus, net als je maandloon, onderworpen aan een RSZ-bijdrage en bedrijfsvoorheffing. Het bedrag dat je effectief op je rekening ziet, ligt daardoor lager dan het brutobedrag dat in je arbeidsovereenkomst of cao vermeld staat.",
      },
      {
        type: "check",
        question:
          "Krijgt elke werknemer in België automatisch een eindejaarspremie?",
        options: [
          { text: "Ja, dat is overal wettelijk verplicht", correct: false },
          {
            text: "Nee, het hangt af van de sector of cao van je werkgever",
            correct: true,
          },
          { text: "Enkel wie een flexi-job doet, krijgt dit", correct: false },
        ],
        explanation:
          "Een eindejaarspremie is niet overal wettelijk verplicht: of je die krijgt en hoeveel, hangt af van de cao van je sector of je bedrijf. Vraag dit na bij je hr-dienst of vakbond als het niet duidelijk in je arbeidscontract staat.",
      },
      { type: "h2", text: "Bijverdienen met een flexi-job" },
      {
        type: "p",
        text: "Een flexi-job is een vorm van bijverdienen naast een hoofdjob of pensioen, in bepaalde sectoren zoals horeca en handel, met een fiscaal gunstig regime. Het is bedoeld als extra, niet als vervanging van een volwaardige job: je moet elders al een hoofdactiviteit hebben, bijvoorbeeld als werknemer met een andere job, of als gepensioneerde.",
      },
      {
        type: "reveal",
        prompt:
          "Kan je zomaar starten met een flexi-job als bijverdienste, zonder dat je al ergens anders werkt?",
        answer:
          "Nee. Een flexi-job is bedoeld als bijverdienste bovenop een bestaande hoofdactiviteit: je moet elders al aan de slag zijn, of bijvoorbeeld gepensioneerd zijn. De precieze voorwaarden bepalen wie in aanmerking komt; check die bij de RSZ of je (toekomstige) werkgever voor je ervan uitgaat dat je een flexi-job kan combineren met je situatie.",
      },
      {
        type: "p",
        text: "Omdat een flexi-job apart en fiscaal anders behandeld wordt dan een gewone job, verschijnt dat inkomen ook niet zomaar op hetzelfde loonstrookje als je hoofdjob. Wil je weten hoe een flexi-job precies past in jouw situatie, dan is dat iets om concreet na te vragen bij de werkgever die de flexi-job aanbiedt, of bij de RSZ.",
      },
      { type: "h2", text: "Fiscaal voordeel: hoe uitgaven je belasting kunnen verlagen" },
      {
        type: "p",
        text: "Naast wat je verdient, speelt ook wat je uitgeeft (of investeert) een rol in hoeveel belasting je uiteindelijk betaalt. Een fiscaal voordeel is een vermindering van je belasting die je krijgt door bepaalde uitgaven te doen of bepaalde keuzes te maken.",
      },
      {
        type: "list",
        items: [
          "Beroepskosten: kosten die je maakt om je loon te verdienen, aftrekbaar van je belastbaar inkomen: forfaitair (een vast, automatisch toegepast percentage), of, als dat voordeliger is, op basis van je werkelijke kosten met bewijsstukken.",
          "Pensioensparen: premies die je zelf stort voor je aanvullend pensioen (derde pijler) geven meestal recht op een fiscaal voordeel, binnen een jaarlijkse grens.",
          "Giften aan erkende goede doelen: onder bepaalde voorwaarden fiscaal aftrekbaar.",
          "Dienstencheques: een deel van wat je aan dienstencheques betaalt, geeft eveneens recht op een fiscaal voordeel.",
        ],
      },
      {
        type: "p",
        text: "Deze voordelen verlagen niet je nettoloon van maand tot maand, maar wel het bedrag dat je uiteindelijk aan personenbelasting verschuldigd bent (of terugkrijgt) na je belastingaangifte. Hoe dat proces precies werkt, lees je in 'Je eerste belastingaangifte: een stap-voor-stap gids'.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Reken je basisloon eerst na",
        text: "Wil je weten wat je gewone maandloon netto oplevert, los van premies of bijverdiensten? Gebruik de Bruto-nettoloon calculator (/tools/nettoloon) om een schatting te maken op basis van je brutoloon.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Cao's, grenzen en tarieven verschillen en veranderen",
        text: "Of je recht hebt op een eindejaarspremie, onder welke voorwaarden een flexi-job mag, en hoeveel fiscaal voordeel een uitgave precies oplevert: dat hangt af van je sector, cao en jaarlijks geïndexeerde regels. Check bij twijfel je concrete arbeidsovereenkomst, je vakbond, of de website van FOD Financiën.",
      },
    ],
  },
  {
    slug: "ziek-of-werkloos-wat-verandert-er-financieel",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "belasting-werk-en-inkomen",
    subcategorySlug: "ziekte-en-werkloosheid",
    kind: "artikel",
    title: "Ziek of werkloos als starter: wat verandert er financieel?",
    summary:
      "Denken aan ziekte of werkloosheid voelt ver weg als je net begint te werken. Toch is het nuttig om te weten hoe het systeem in elkaar zit, en wie je dan moet contacteren.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Bij je eerste job denk je vooral aan je loon, niet aan wat er gebeurt als je ziek wordt of je job verliest. Toch is het nuttig om nu al te weten hoe dat systeem in elkaar zit: niet met exacte bedragen, want die hangen af van je persoonlijke situatie en veranderen regelmatig, maar wel met de structuur, zodat je weet wie je moet contacteren als het ooit nodig is.",
      },
      { type: "h2", text: "Wie betaalt dit eigenlijk?" },
      {
        type: "p",
        text: "De RSZ-bijdrage die maandelijks van je brutoloon wordt ingehouden, gaat naar een gemeenschappelijke pot, geen persoonlijke spaarrekening met jouw naam erop. Die pot financiert onder meer het wettelijk pensioen, maar ook de ziekte- en invaliditeitsverzekering en de werkloosheidsuitkering. Val je zelf ooit ziek of zonder werk, dan spreek je met andere woorden een systeem aan waar je zelf al aan meebetaalde, samen met alle andere werknemers.",
      },
      {
        type: "check",
        question:
          "Je RSZ-bijdrage wordt maandelijks ingehouden. Bouw je daarmee een persoonlijke spaarpot op voor als je ooit ziek of werkloos wordt?",
        options: [
          { text: "Ja, het is jouw eigen gereserveerde bedrag", correct: false },
          {
            text: "Nee, het gaat naar een gemeenschappelijke pot die de sociale zekerheid financiert",
            correct: true,
          },
          {
            text: "Nee, RSZ-bijdragen hebben niets met ziekte of werkloosheid te maken",
            correct: false,
          },
        ],
        explanation:
          "De RSZ-bijdrage gaat naar een gemeenschappelijke pot, geen individuele rekening. Die pot financiert onder meer het wettelijk pensioen, de ziekte- en invaliditeitsverzekering en de werkloosheidsuitkering voor iedereen die daar op dat moment recht op heeft.",
      },
      { type: "h2", text: "Als je ziek wordt" },
      {
        type: "p",
        text: "Word je ziek, dan betaalt je werkgever in een eerste periode nog je loon door: dit heet het gewaarborgd loon. Duurt je ziekte langer, dan neemt je mutualiteit (ziekenfonds) het over met een ziekte-uitkering: een vervangingsinkomen, geen volledig loon. Hoeveel dat precies bedraagt en vanaf wanneer, hangt af van wettelijk vastgelegde regels die regelmatig wijzigen: je mutualiteit berekent dit voor jouw concrete situatie.",
      },
      {
        type: "steps",
        items: [
          "Verwittig je werkgever zo snel mogelijk dat je ziek bent, volgens de afspraken in je arbeidsreglement.",
          "Bezorg tijdig een medisch getuigschrift aan je werkgever én, bij langere afwezigheid, aan je mutualiteit.",
          "Duurt je ziekte langer dan de periode van gewaarborgd loon, neem dan zelf contact op met je mutualiteit over de ziekte-uitkering.",
          "Bij twijfel over je rechten of de te volgen stappen: je mutualiteit en je vakbond helpen je hier kosteloos bij.",
        ],
      },
      { type: "h2", text: "Als je werkloos wordt" },
      {
        type: "p",
        text: "Verlies je onvrijwillig je job, dan kan je in aanmerking komen voor een werkloosheidsuitkering via de RVA. Twee stappen zijn daarbij belangrijk: je inschrijven als werkzoekende bij de bevoegde gewestelijke dienst (VDAB in Vlaanderen), en een uitkeringsaanvraag indienen, meestal via je vakbond of de Hulpkas voor Werkloosheidsuitkeringen (HVW).",
      },
      {
        type: "p",
        text: "Hoeveel je uitkering bedraagt en hoe lang je daar recht op hebt, hangt af van je vroegere loon, je gezinssituatie en je arbeidsverleden. Ben je pas afgestudeerd of heb je nog maar kort gewerkt, dan gelden er andere, aparte regels en wachttijden dan voor wie al langer aan het werk was. Vraag je concrete situatie na bij de RVA of je vakbond.",
      },
      {
        type: "reveal",
        prompt:
          "Ben je net afgestudeerd en vind je nog geen job: krijg je dan meteen dezelfde werkloosheidsuitkering als een collega die al jaren werkt?",
        answer:
          "Niet noodzakelijk. Voor starters die nog maar kort of nog helemaal niet gewerkt hebben, gelden aparte regels en wachttijden bij de RVA, verschillend van de regeling voor wie al een langere loopbaan achter de rug heeft. Check je concrete situatie bij de RVA of je vakbond voor je van een bepaald bedrag of een bepaalde wachttijd uitgaat.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Wie kan je helpen?",
        text: "Je mutualiteit (bij ziekte) en je vakbond of de Hulpkas voor Werkloosheidsuitkeringen (bij werkloosheid) geven je kosteloos concreet advies over je eigen dossier, en over de actuele bedragen en voorwaarden.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Geen bedragen op deze pagina, bewust",
        text: "FinEdu geeft hier bewust geen concrete uitkeringsbedragen: die hangen sterk af van je persoonlijke situatie en veranderen regelmatig. Voor de actuele, correcte bedragen en voorwaarden ga je naar de website van de RVA of je eigen mutualiteit.",
      },
    ],
  },
  {
    slug: "eerste-keer-huren",
    datePublished: "2026-08-01",
    dateModified: "2026-08-01",
    categorySlug: "woning-en-hypothecaire-lening",
    subcategorySlug: "woning-huren-verhuren",
    kind: "tips",
    title: "Voor het eerst een woning huren: waar moet je op letten?",
    summary:
      "Je eerste huurcontract tekenen is spannend. Deze tips helpen je financiële verrassingen te vermijden.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Je eerste eigen kot of appartement huren is een grote stap, ook financieel. Naast de maandelijkse huur komen er nog kosten bij die je makkelijk over het hoofd ziet.",
      },
      { type: "h2", text: "Waar moet je op letten?" },
      {
        type: "list",
        items: [
          "Huurwaarborg: meestal twee of drie maanden huur, te storten op een geblokkeerde huurwaarborgrekening op jouw naam, niet zomaar op de rekening van de verhuurder.",
          "Plaatsbeschrijving: laat bij intrede altijd een gedetailleerde, tegensprekelijke plaatsbeschrijving opmaken, anders riskeer je bij het einde van je huur oneterecht schade aangerekend te krijgen.",
          "Kosten en lasten: check wat wel en niet inbegrepen is in de huurprijs (water, verwarming, gemeenschappelijke kosten) en vraag dit na voor je tekent.",
          "Registratie van het huurcontract: dit is verplicht en gratis, en gebeurt normaal door de verhuurder. Vraag na of dit in orde is, want dit beschermt jou als huurder.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Budgetteer de opstartkosten apart",
        text: "Huurwaarborg, eerste maand huur, en soms een makelaarskost: reken op een opstartbudget van al snel drie tot vier maanden huur voor je de sleutel krijgt.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Onderteken niets onder tijdsdruk",
        text: "Een huurcontract is een juridisch bindend document. Neem de tijd om het te lezen, en twijfel je? Vraag gratis advies bij een huurdersbond voor je tekent.",
      },
    ],
  },
  {
    slug: "studieschulden-naast-eerste-loon",
    datePublished: "2026-08-01",
    dateModified: "2026-08-01",
    categorySlug: "familie",
    subcategorySlug: "studeren",
    kind: "artikel",
    title: "Nog studieschulden? Zo combineer je die met je eerste loon",
    summary:
      "Een studielening of achterstallige studiekosten lopen niet vanzelf weg zodra je begint te werken. Zo pak je het gestructureerd aan.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Niet elke starter begint met een schone lei: een studielening bij de bank, een afbetalingsplan voor het studentenkot, of nog openstaande facturen van je studies. Dat hoeft geen probleem te zijn zolang je het gestructureerd aanpakt naast je nieuwe, regelmatige inkomen.",
      },
      { type: "h2", text: "Zo pak je het aan" },
      {
        type: "steps",
        items: [
          "Zet al je openstaande schulden op een rijtje: bedrag, rentevoet en maandelijkse afbetaling.",
          "Betaal eerst de duurste schuld (hoogste rente) sneller af, en betaal van de andere het minimum verder af.",
          "Bouw parallel een kleine noodbuffer op, ook al is die klein: zo moet je niet opnieuw lenen bij de volgende tegenslag.",
          "Neem contact op met je kredietverstrekker als een afbetaling even niet lukt, in plaats van gewoon niet te betalen: een aangepast plan is vaak mogelijk.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Gebruik de 50/30/20-regel als kader",
        text: "Verwerk je resterende studieschulden in het 'sparen en schulden aflossen'-deel van je budget, zodat je aflossing een vast, voorspelbaar onderdeel van je maand wordt.",
      },
    ],
  },
  {
    slug: "erven-als-starter",
    datePublished: "2026-08-01",
    dateModified: "2026-08-01",
    categorySlug: "erven",
    subcategorySlug: "erfenis-plannen",
    kind: "artikel",
    title: "Moet je als starter al aan erfenissen denken?",
    summary:
      "Erven en schenken lijkt iets voor later, maar een paar basisbegrippen kennen kan al vroeg nuttig zijn.",
    readMinutes: 4,
    blocks: [
      {
        type: "p",
        text: "Als starter sta je waarschijnlijk niet vaak stil bij erven of schenken. Toch kan het geen kwaad om de basis te kennen, bijvoorbeeld als je ouders je willen helpen bij een grote uitgave zoals een woning.",
      },
      { type: "h2", text: "Twee begrippen om te kennen" },
      {
        type: "list",
        items: [
          "Schenking: geld of goederen die je tijdens iemands leven krijgt, bijvoorbeeld als hulp bij een aankoop. Afhankelijk van de vorm (hand- of bankgift versus notariële schenking) gelden andere regels en eventueel schenkbelasting.",
          "Erfenis: wat je krijgt na iemands overlijden, verdeeld volgens het erfrecht of een testament. Hierop zijn successierechten verschuldigd, die verschillen naargelang de verwantschap en de regio.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Krijg je hulp van familie?",
        text: "Laat een schenking altijd (laten) vastleggen, ook informeel binnen de familie. Dat voorkomt discussies later en kan bij een latere erfenis van belang zijn.",
      },
    ],
  },
  {
    slug: "hoe-werkt-erfbelasting",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "erven",
    subcategorySlug: "erven-en-successierechten",
    kind: "artikel",
    title: "Hoe werkt erfbelasting eigenlijk?",
    summary:
      "Erfbelasting is geen vast percentage: het tarief hangt af van hoeveel je erft en van je band met de overledene. Zo werkt het schijvenstelsel.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Wie erft, betaalt daarop erfbelasting (vroeger 'successierechten' genoemd) aan de regio waar de overledene het laatst woonde. In Vlaanderen is dat de Vlaamse erfbelasting, geïnd door VLABEL. Veel starters denken dat er één vast percentage bestaat, maar dat klopt niet: het werkt met een progressief schijvenstelsel.",
      },
      { type: "h2", text: "Twee dingen bepalen je tarief" },
      {
        type: "list",
        items: [
          "Hoeveel je erft: net zoals bij de personenbelasting betaal je op de eerste schijf van je erfdeel een lager tarief, en stijgt het tarief naarmate het bedrag groter wordt. Elke schijf heeft zijn eigen percentage, dat enkel op dat deel van het bedrag wordt toegepast.",
          "Je band met de overledene: partners en kinderen (rechte lijn) betalen doorgaans de gunstigste tarieven. Broers, zussen, ooms, tantes en niet-verwante personen betalen op eenzelfde bedrag meer, en vaak volgens een ander schijvenstelsel.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Geen bedragen uit je hoofd leren",
        text: "De exacte schijfgrenzen en percentages veranderen soms. FinEdu geeft bewust geen concrete cijfers hier: check die altijd bij VLABEL of bij een notaris voor je een reële erfenis probeert te berekenen.",
      },
      { type: "h2", text: "Waarom dit systeem bestaat" },
      {
        type: "p",
        text: "Het progressieve schijvenstelsel zorgt ervoor dat kleinere erfenissen relatief minder belast worden dan grote. Het verschil per band met de overledene weerspiegelt een keuze van de wetgever: naaste familie (partner, kinderen) wordt fiscaal minder zwaar belast dan verdere familie of vreemden, omdat zij vaker mee opgebouwd hebben aan het vermogen of ervan afhankelijk zijn.",
      },
      {
        type: "reveal",
        prompt:
          "Twee mensen erven elk 50.000 euro van een niet-verwante kennis: de ene als kind, de andere als goede vriend zonder familieband. Betalen ze evenveel erfbelasting?",
        answer:
          "Nee. Ook al is het bedrag identiek, het tarief hangt mee af van de band met de overledene. Een kind (rechte lijn) betaalt op datzelfde bedrag doorgaans een pak minder dan een vriend zonder familieband, die als 'derde' wordt beschouwd.",
      },
      { type: "h2", text: "Wat als je een erfenis niet ziet zitten?" },
      {
        type: "p",
        text: "Een nalatenschap kan ook schulden bevatten. Erf je automatisch mee in die schulden zodra je de erfenis aanvaardt, dus soms is het verstandiger om een erfenis te verwerpen of onder voorrecht van boedelbeschrijving te aanvaarden. Dat is telkens een individuele afweging, en de notaris die de nalatenschap afhandelt, legt de opties uit.",
      },
      {
        type: "check",
        question:
          "Wat bepaalt vooral hoe hoog de erfbelasting is die iemand betaalt?",
        options: [
          {
            text: "Enkel het totale bedrag van de nalatenschap, ongeacht wie erft",
            correct: false,
          },
          {
            text: "Het geërfde bedrag én de band met de overledene, samen via een schijvenstelsel",
            correct: true,
          },
          { text: "Enkel de leeftijd van de erfgenaam", correct: false },
        ],
        explanation:
          "Erfbelasting werkt progressief: hoe meer je erft, hoe hoger het tarief op dat deel. Daarnaast bepaalt je verwantschap met de overledene welk schijvenstelsel en welke tarieven van toepassing zijn.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Educatieve uitleg, geen advies over jouw situatie",
        text: "Dit artikel legt de algemene werking van de erfbelasting uit. Voor de concrete berekening en afhandeling van een echte nalatenschap ga je altijd langs bij een notaris, en voor de actuele tarieven en schijfgrenzen bij VLABEL.",
      },
    ],
  },
  {
    slug: "schenken-in-de-praktijk",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "erven",
    subcategorySlug: "schenking",
    kind: "tips",
    title: "Schenken in de praktijk: waar moet je op letten?",
    summary:
      "Roerend of onroerend, via de notaris of als handgift: de vorm van een schenking bepaalt welke regels en risico's ervoor gelden.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Een schenking klinkt eenvoudig: iemand geeft je iets tijdens zijn of haar leven. In de praktijk bepaalt de vorm van de schenking welke regels gelden, en dat maakt best wel wat verschil.",
      },
      { type: "h2", text: "Roerend versus onroerend" },
      {
        type: "list",
        items: [
          "Roerende goederen: geld, effecten (aandelen, fondsen), sieraden, en andere zaken die je kan verplaatsen. Die kan je op verschillende manieren schenken, met elk hun eigen gevolgen.",
          "Onroerende goederen: een woning, grond of ander vastgoed. Dat schenken kan enkel via een notariële akte, er bestaat geen alternatief zoals bij roerende goederen.",
        ],
      },
      { type: "h2", text: "Drie manieren om roerend te schenken" },
      {
        type: "steps",
        items: [
          "Notariële schenking: de notaris stelt een akte op en registreert de schenking. Dit kost registratiekosten, maar geeft meteen zekerheid over de datum en de inhoud van de schenking.",
          "Bankgift: geld overschrijven via de bank, meestal met een begeleidend document (pacte adjoint) waarin de schenker en begiftigde de voorwaarden vastleggen. Niet verplicht om te registreren, maar dat kan wel.",
          "Handgift: iets fysiek overhandigen, bijvoorbeeld cash geld of een sieraad, zonder notaris of geschreven document. De eenvoudigste vorm, maar ook de minst goed te bewijzen.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Het risico van een niet-geregistreerde schenking",
        text: "Overlijdt de schenker binnen een bepaalde termijn na een handgift of niet-geregistreerde bankgift, dan kan de fiscus die schenking alsnog meetellen bij de nalatenschap en er erfbelasting op heffen, in plaats van de doorgaans voordeligere schenkbelasting. Laat een schenking daarom (laten) registreren als je die termijn niet volledig zeker wil afwachten.",
      },
      { type: "h2", text: "Waarom toch (laten) registreren?" },
      {
        type: "list",
        items: [
          "Zekerheid over de datum: bij een geregistreerde schenking staat onomstotelijk vast wanneer ze gebeurde, wat de risicotermijn voor de erfbelasting laat starten.",
          "Bewijs bij discussie: een handgift zonder document is achteraf moeilijk te bewijzen, bijvoorbeeld als andere erfgenamen later betwisten dat er iets geschonken is.",
          "Vaak een lager tarief: schenkbelasting op roerende goederen ligt doorgaans op een vast en relatief laag tarief, wat voordeliger kan zijn dan het progressieve tarief van de erfbelasting later.",
        ],
      },
      {
        type: "figure",
        value: "2",
        label: "hoofdcategorieën van schenkbaar vermogen: roerend en onroerend, elk met hun eigen route",
      },
      {
        type: "reveal",
        prompt:
          "Een ouder geeft zijn kind 10.000 euro cash in een envelop, zonder document. Is dat juridisch een schenking?",
        answer:
          "Ja, ook een handgift is een geldige schenking. Het probleem zit niet in de geldigheid, maar in het bewijs en de fiscale gevolgen: zonder registratie is er geen vaste datum, en overlijdt de schenker binnen de risicotermijn, dan kan de fiscus dit bedrag alsnog als erfenis belasten.",
      },
      {
        type: "check",
        question: "Waarom kan een handgift achteraf tot problemen leiden?",
        options: [
          {
            text: "Omdat handgiften juridisch niet geldig zijn",
            correct: false,
          },
          {
            text: "Omdat ze moeilijk te bewijzen zijn en, bij overlijden van de schenker binnen de risicotermijn, alsnog als erfenis belast kunnen worden",
            correct: true,
          },
          {
            text: "Omdat een handgift altijd hoger belast wordt dan een erfenis",
            correct: false,
          },
        ],
        explanation:
          "Een handgift is geldig, maar zonder geregistreerd document ontbreekt een vaste datum en sluitend bewijs. Overlijdt de schenker binnen de wettelijke risicotermijn, dan kan de schenking alsnog bij de nalatenschap gerekend worden.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Bespreek je situatie met een notaris",
        text: "Welke vorm van schenken het meest geschikt is, hangt af van wat je schenkt, aan wie, en welk risico je aanvaardbaar vindt. FinEdu legt hier enkel de algemene principes uit: voor een concrete schenking en de actuele tarieven ga je langs bij een notaris of check je bij VLABEL.",
      },
    ],
  },
  {
    slug: "hypothecair-krediet-basisbegrippen",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "woning-en-hypothecaire-lening",
    subcategorySlug: "hypothecaire-lening",
    kind: "artikel",
    title: "Hypothecair krediet: de basisbegrippen voor wie nog nooit leende",
    summary:
      "Vaste of variabele rente, quotiteit, wederbeleggingsvergoeding: de kernbegrippen van een hypothecair krediet in gewone taal, voor je met een kredietbemiddelaar gaat praten.",
    readMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Een woning kopen doen de meeste mensen niet met eigen geld alleen. De lening die je daarvoor afsluit, heet een hypothecair krediet: een lening om een woning te kopen, bouwen of verbouwen, waarbij de woning zelf als onderpand dient. Voor je een gesprek aangaat met een kredietbemiddelaar, helpt het om een paar kernbegrippen al te kennen.",
      },
      { type: "h2", text: "Wat maakt een hypothecair krediet anders dan een gewone lening?" },
      {
        type: "p",
        text: "Bij een hypothecair krediet krijgt de kredietgever een hypotheek op je woning: een wettelijk recht om de woning te laten verkopen als je niet meer terugbetaalt. Daardoor loopt de bank minder risico dan bij een lening zonder onderpand, en dat vertaalt zich meestal in een lagere rente en een langere looptijd dan bij bijvoorbeeld een autolening.",
      },
      { type: "h2", text: "Vaste of variabele rente?" },
      {
        type: "p",
        text: "Een van de eerste keuzes die je maakt, is die tussen een vaste en een variabele rente. Bij een vaste rente ligt je rentevoet vast voor de hele looptijd: je weet dus vooraf exact wat je elke maand betaalt. Bij een variabele rente kan de rentevoet periodiek stijgen of dalen, gekoppeld aan een referte-index. Dat kan voordeliger uitpakken als de rente daalt, maar je loopt ook het risico dat je maandelijkse aflossing stijgt.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Geen keuze die je licht moet nemen",
        text: "Vraag bij een variabele rente altijd na hoe vaak de rente herzien kan worden, en of er een maximale afwijking ('cap') is ten opzichte van de startrente. Een FSMA-gecheckte kredietbemiddelaar (te checken via fsma.be) moet je dit vooraf duidelijk uitleggen.",
      },
      { type: "h2", text: "Quotiteit: hoeveel leen je ten opzichte van de waarde van de woning?" },
      {
        type: "p",
        text: "De quotiteit is de verhouding tussen het bedrag dat je leent en de waarde van de woning. Leen je het volledige aankoopbedrag, dan is de quotiteit hoog; breng je een deel eigen geld in (eigen inbreng), dan daalt ze. Hoe hoger de quotiteit, hoe meer risico de bank loopt, en dat zie je vaak terug in de voorwaarden: een hogere quotiteit kan een hogere rente of strengere voorwaarden betekenen.",
      },
      {
        type: "check",
        question:
          "Je koopt een woning en leent het volledige bedrag, zonder eigen inbreng. Wat gebeurt er meestal met de quotiteit en de voorwaarden?",
        options: [
          { text: "De quotiteit is laag, en de voorwaarden worden voordeliger", correct: false },
          {
            text: "De quotiteit is hoog, en de bank vraagt vaak een hogere rente of strengere voorwaarden",
            correct: true,
          },
          { text: "De quotiteit heeft geen invloed op de voorwaarden", correct: false },
        ],
        explanation:
          "Hoe groter het geleende bedrag ten opzichte van de waarde van de woning, hoe hoger de quotiteit en hoe meer risico de bank loopt. Banken vertalen dat risico vaak in de rentevoet of in bijkomende voorwaarden, zoals een schuldsaldoverzekering.",
      },
      { type: "h2", text: "Vervroegd terugbetalen: de wederbeleggingsvergoeding" },
      {
        type: "p",
        text: "Wil je je hypothecair krediet vervroegd (gedeeltelijk) terugbetalen, bijvoorbeeld na een erfenis of bonus, dan mag de kredietgever daarvoor een wederbeleggingsvergoeding aanrekenen: een vergoeding voor de rente-inkomsten die de bank misloopt doordat jij vroeger terugbetaalt dan afgesproken. Vraag dit steeds na voor je een vervroegde terugbetaling plant, want het kan mee bepalen of dat de moeite loont.",
      },
      { type: "h2", text: "Andere kosten om niet te vergeten" },
      {
        type: "list",
        items: [
          "Dossierkosten: eenmalige kosten voor het opstellen en verwerken van het krediet.",
          "Schuldsaldoverzekering: vaak (bijna) verplicht gekoppeld aan een hypothecair krediet, dekt het overlijdensrisico zodat de lening bij overlijden (deels) afbetaald raakt.",
          "Notariskosten voor de hypothecaire akte: een aparte post, los van de notariskosten bij de aankoop van de woning zelf.",
        ],
      },
      { type: "h2", text: "Zelf verschillende scenario's vergelijken" },
      {
        type: "p",
        text: "Rentevoeten en voorwaarden verschillen sterk van kredietgever tot kredietgever, en FinEdu geeft daarover bewust geen eigen tarieven of aanbevelingen. Vul de rentevoeten en looptijden die je zelf bij verschillende aanbieders opvraagt in bij de lening-vergelijker, en zie meteen naast elkaar wat de maandelijkse aflossing en de totale kost betekenen.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Laat je begeleiden",
        text: "Een hypothecair krediet afsluiten is een van de grootste financiële beslissingen die je zal nemen. Een FSMA-gecheckte kredietbemiddelaar (controleer dit via fsma.be) kan je door de opties gidsen. FinEdu geeft educatieve informatie, geen bindend financieel advies.",
      },
    ],
  },
  {
    slug: "woning-kopen-stappen-en-kosten",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "woning-en-hypothecaire-lening",
    subcategorySlug: "woning-kopen-bouwen-verbouwen",
    kind: "checklist",
    title: "Een woning kopen: de stappen en kosten op een rij",
    summary:
      "Van bod tot notariële akte: welke stappen doorloop je bij een aankoop, en welke kosten komen er bovenop de aankoopprijs?",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Een woning kopen is meer dan de aankoopprijs betalen. Er komt een vast traject bij kijken, met een aantal kosten die je makkelijk over het hoofd ziet. Deze checklist geeft een overzicht.",
      },
      { type: "h2", text: "De stappen bij een aankoop" },
      {
        type: "steps",
        items: [
          "Bod doen: je doet een (schriftelijk) bod op de woning, vaak via de verkoper of een makelaar.",
          "Onderhandse verkoopovereenkomst (compromis): zodra bod en verkoper akkoord zijn, teken je een eerste, juridisch bindend contract met de belangrijkste afspraken.",
          "Financiering rondmaken: binnen de afgesproken termijn regel je je hypothecair krediet, vaak met een opschortende voorwaarde in het compromis.",
          "Notariële akte: binnen een wettelijk bepaalde termijn na het compromis verlijdt de notaris de authentieke akte, en word je officieel eigenaar.",
          "Registratie en overschrijving: de notaris zorgt voor de registratie van de akte en de inschrijving in het hypotheekkantoor.",
        ],
      },
      { type: "h2", text: "Wat kost een woning kopen, naast de aankoopprijs?" },
      {
        type: "list",
        items: [
          "Registratierechten: de belasting die je betaalt op de aankoopprijs, in Vlaanderen ook het verkooprecht genoemd.",
          "Notariskosten: de kosten voor de notaris die de aankoopakte opstelt, bovenop de registratierechten.",
          "Kosten voor de hypothecaire akte: leen je voor de aankoop, dan komen daar nog aparte notaris- en registratiekosten voor de hypotheek bovenop.",
          "Schattingskosten en administratieve kosten: sommige kredietgevers vragen een schatting van de woning voor ze een hypothecair krediet toekennen.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Reken het voor jouw situatie na",
        text: "Vul de registratierechten, notariskosten en eventuele kredietkosten die voor jouw situatie gelden in bij de aankoopkosten-calculator, en zie in één keer wat de totale prijs wordt boven op de aankoopprijs.",
      },
      { type: "h2", text: "Het energieprestatiecertificaat (EPC)" },
      {
        type: "p",
        text: "Bij elke verkoop is een geldig energieprestatiecertificaat verplicht: het geeft de energiezuinigheid van de woning weer. Een slecht EPC-label betekent niet alleen een hogere energiefactuur later, maar kan ook wijzen op verbouwingskosten die je best mee in je budget opneemt voor je een bod doet.",
      },
      {
        type: "reveal",
        prompt:
          "Denk je dat 'notariskosten' alle kosten dekt die je aan de notaris betaalt bij een aankoop?",
        answer:
          "Niet helemaal. Notariskosten verwijzen specifiek naar het ereloon van de notaris zelf. De registratierechten zijn een aparte, meestal veel grotere post die de notaris voor jou int en doorstort aan de overheid: geen inkomen voor de notaris. Reken dus altijd met beide posten samen, niet enkel met de notariskosten, als je je totale aankoopbudget bepaalt.",
      },
      { type: "h2", text: "Verbouwen: hetzelfde principe" },
      {
        type: "p",
        text: "Koop je een woning om te verbouwen, dan gelden dezelfde aankoopkosten (registratierechten, notariskosten) als bij een instapklare woning. Reken daarnaast een aparte buffer voor de verbouwing zelf, en hou rekening met een aparte financiering of een uitbreiding van je hypothecair krediet indien nodig.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Een notaris is verplicht, koop nooit zonder",
        text: "De overdracht van een woning kan in België enkel via een notariële akte. De notaris is onafhankelijk en behartigt de belangen van beide partijen. Twijfel je over je hypothecair krediet, raadpleeg dan een FSMA-gecheckte kredietbemiddelaar (te checken via fsma.be). FinEdu geeft educatieve informatie, geen bindend advies.",
      },
    ],
  },
  {
    slug: "beleggingsproducten-vergelijken",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "sparen-en-beleggen",
    subcategorySlug: "beleggingsproducten",
    kind: "artikel",
    title: "Aandelen, fondsen, tak21 en tak23: welk beleggingsproduct past waar?",
    summary:
      "Achter 'beleggen' schuilen heel verschillende producten, elk met hun eigen kosten, risico's en werking. Een overzicht van de belangrijkste types, zonder productadvies.",
    readMinutes: 8,
    blocks: [
      {
        type: "p",
        text: "Als je de basisbegrippen van beleggen kent, zoals rendement, risico en spreiding, is de volgende stap begrijpen welke concrete producten er bestaan. 'Beleggen' is geen homogeen ding: een individueel aandeel kopen, instappen in een fonds, of sparen via een verzekeringsproduct werken heel anders en hebben elk een eigen kostenstructuur.",
      },
      { type: "h2", text: "Een individueel aandeel of obligatie versus een fonds" },
      {
        type: "p",
        text: "Een aandeel is een bewijs van mede-eigenaarschap in één onderneming: je deelt mee in de winst (bijvoorbeeld via een dividend), maar ook in het risico als het bedrijf het moeilijk heeft. Een obligatie is een schuldbewijs: je leent geld aan een overheid of onderneming in ruil voor periodieke rente en terugbetaling op de eindvervaldag. Beide zijn concentratierisico: je hangt af van het lot van één uitgever.",
      },
      {
        type: "list",
        items: [
          "Individueel aandeel of obligatie: mogelijk hoger rendement bij een goede keuze, maar je risico zit bij één onderneming of één overheid.",
          "Beleggingsfonds of ETF/tracker: je geld wordt gespreid over tientallen tot duizenden aandelen of obligaties tegelijk (diversificatie), wat het risico van één slecht presterende uitgever verkleint.",
          "Een effectenrekening bij een broker of bank is nodig om aandelen, obligaties, fondsen of trackers aan te houden: hierop worden je transactiekosten en eventueel bewaarloon aangerekend.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Simuleer voor je instapt",
        text: "Met de beleggingsplan-simulator (/tools/beleggingsplan) zie je hoe periodiek beleggen zich over jaren opstapelt, en hoeveel kosten daarvan afknabbelen. De 72-regel (/tools/72-regel) geeft een vuistregel voor hoe snel een bedrag verdubbelt bij een bepaald rendement.",
      },
      { type: "h2", text: "Actief beheerde fondsen versus ETF's (trackers)" },
      {
        type: "p",
        text: "Binnen fondsen bestaat een belangrijk onderscheid. Een actief beheerd fonds probeert de markt te verslaan door een fondsbeheerder die zelf aandelen selecteert: daarvoor betaal je een hogere beheersvergoeding, vaak samen met een instapkost. Een ETF (tracker) volgt gewoon passief een index en rekent doorgaans lagere lopende kosten (TER) aan. Geen van beide is per definitie de betere keuze: dat hangt af van je situatie, en FinEdu doet daar geen uitspraak over.",
      },
      {
        type: "check",
        question:
          "Twee fondsen beleggen in dezelfde markt en behalen exact hetzelfde brutorendement. Fonds A heeft hogere lopende kosten dan fonds B. Wat is het gevolg op lange termijn?",
        options: [
          { text: "Geen verschil, kosten spelen enkel op korte termijn", correct: false },
          {
            text: "Fonds A levert netto minder op dan fonds B, ook al is het brutorendement gelijk",
            correct: true,
          },
          { text: "Fonds A levert automatisch meer op omdat het duurder is", correct: false },
        ],
        explanation:
          "Lopende kosten worden jaarlijks ingehouden, ongeacht de prestatie. Op lange termijn tikt zelfs een klein verschil in kosten flink aan door het effect van samengestelde interest. Check daarom altijd de lopende kosten (TER) in het essentiële-informatiedocument (KID) voor je instapt.",
      },
      { type: "h2", text: "Beleggen via een verzekeringsproduct: tak21 en tak23" },
      {
        type: "p",
        text: "Naast rechtstreeks beleggen via een effectenrekening, bestaan er levensverzekeringsproducten die als spaar- of beleggingsvorm dienen. Tak 21 combineert een gewaarborgd rendement met kapitaalgarantie: je krijgt minstens je ingelegd kapitaal terug, maar meestal enkel op de eindvervaldag, niet als je tussentijds verkoopt. Tak 23 heeft geen gewaarborgd rendement: je premie wordt belegd in onderliggende fondsen, en het resultaat hangt volledig af van hoe die fondsen presteren, net als bij een gewoon beleggingsfonds.",
      },
      {
        type: "list",
        items: [
          "Ook tak21- en tak23-producten kunnen instapkosten en beheersvergoedingen aanrekenen: vergelijk deze net zo kritisch als bij een gewoon fonds.",
          "Kapitaalgarantie bij tak21 is geen synoniem voor risicoloos: het gewaarborgd rendement kan laag zijn, en vervroegd uitstappen kan kosten of een lagere waarde met zich meebrengen.",
          "De fiscale behandeling van een verzekeringsproduct verschilt van rechtstreeks beleggen: laat dit bij twijfel navragen door de verzekeraar of een onafhankelijke, FSMA-vergunde adviseur.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Lees altijd het essentiële-informatiedocument",
        text: "Elk verpakt beleggingsproduct, ook tak21 en tak23, moet een essentiële-informatiedocument (KID) hebben met de risico-indicator, kosten en scenario's. Vraag dit op vóór je tekent, en check de risico-indicator (1 tot 7) om te zien hoe het product zich verhoudt tot andere producten.",
      },
      { type: "h2", text: "Pensioensparen: een fonds met een fiscaal kader" },
      {
        type: "p",
        text: "Pensioensparen is in essentie ook een fonds (of een tak21-verzekering), maar dan met een specifiek fiscaal voordeel binnen bepaalde jaarlijkse grenzen, bedoeld om een kapitaal op te bouwen tegen je pensioen. Het geld zit daardoor in de praktijk vrijwel vast tot je pensioenleeftijd: opnemen vóór dan kan een deel van het fiscaal voordeel ongedaan maken. Dit onderwerp komt uitgebreider aan bod bij pensioen en pensioenvoorbereiding op FinEdu; hier is het vooral van belang als voorbeeld van hoe eenzelfde onderliggend fonds in een ander 'jasje' (fiscaal of verzekeringstechnisch) verpakt kan zitten.",
      },
      {
        type: "reveal",
        prompt:
          "Denk na: is geld dat in pensioensparen zit even vlot beschikbaar als geld op een gewone effectenrekening met een ETF erop?",
        answer:
          "Nee. Een gewoon beleggingsfonds of ETF op een effectenrekening kan je in principe op elk moment verkopen (al blijft het koersrisico van dat moment gelden). Pensioensparen is gekoppeld aan een fiscaal voordeel dat net veronderstelt dat je pas op je pensioenleeftijd opneemt: vervroegd opnemen kan dat voordeel gedeeltelijk terugdraaien. Hou hier rekening mee: gebruik pensioensparen niet voor geld dat je mogelijk eerder nodig hebt.",
      },
      { type: "h2", text: "Voor je in een product stapt" },
      {
        type: "steps",
        items: [
          "Lees het essentiële-informatiedocument (KID) en check de risico-indicator.",
          "Tel alle kosten op: instapkost, lopende kosten (TER) of beheersvergoeding, transactiekosten, bewaarloon, en eventuele uitstapkost.",
          "Vraag na via welke weg je koopt (broker, bank of verzekeraar) en of die aanbieder een FSMA-vergunning heeft.",
          "Vergelijk niet enkel het verwachte rendement, maar ook hoe vlot je eraan kan als je het geld toch nodig hebt.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Nog geen ervaring met beleggen?",
        text: "Download eerst de gratis gids 'Je eerste stappen om te beleggen' (/gids/eerste-stappen-beleggen) voor je in een specifiek product stapt: die legt de volgorde van stappen uit, van noodbuffer tot kosten en belastingen.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Dit is geen productadvies",
        text: "FinEdu is niet FSMA-vergund en beveelt geen specifieke banken, brokers, fondsen of verzekeraars aan. Voor een aanbeveling op maat van jouw situatie heb je een FSMA-vergunde adviseur nodig: check de vergunning altijd via fsma.be.",
      },
    ],
  },
  {
    slug: "beleggingsfraude-herkennen",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "sparen-en-beleggen",
    subcategorySlug: "fraude-bij-beleggen",
    kind: "checklist",
    title: "Beleggingsfraude herkennen: rode vlaggen en wat je kan doen",
    summary:
      "Van nepplatformen tot valse adviseurs: dit zijn de signalen van beleggingsfraude, hoe je een vergunning checkt, en wat te doen als het toch misgaat.",
    readMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Beleggingsfraude komt in veel vormen voor: een nepplatform dat torenhoge, gegarandeerde rendementen belooft, een 'adviseur' die je ongevraagd belt of appt, of een clone firm die zich voordoet als een bestaande, vergunde instelling. De technieken evolueren, maar een aantal signalen komen telkens terug.",
      },
      { type: "h2", text: "Rode vlaggen" },
      {
        type: "list",
        items: [
          "Een hoog rendement wordt beloofd zonder enig risico, of 'gegarandeerd': hoger rendement gaat altijd samen met meer risico, zoiets bestaat niet.",
          "Tijdsdruk: je moet 'nu meteen' instappen, anders mis je een unieke kans.",
          "Ongevraagd contact via social media, WhatsApp, een advertentie of een koude telefoonoproep.",
          "Je wordt gevraagd te betalen via cryptomunten of een overschrijving naar een privérekening, in plaats van te storten op een effectenrekening bij een erkende instelling.",
          "Het is moeilijk of onmogelijk om je geld (deels) terug op te vragen, of er duiken telkens nieuwe kosten op voor je zou kunnen opnemen.",
          "De website of het contactadres lijkt sterk op dat van een bekende, vergunde instelling, maar met kleine afwijkingen (een cijfer, een andere extensie).",
          "Onduidelijke of ontbrekende bedrijfsgegevens, of een 'vergunning' die je niet zelf onafhankelijk kan terugvinden.",
          "De nadruk ligt op het aanbrengen van nieuwe deelnemers of investeerders, eerder dan op een uitlegbare onderliggende belegging.",
        ],
      },
      {
        type: "check",
        question:
          "Iemand belt je onverwacht op met een 'exclusieve' beleggingskans die gegarandeerd een zeer hoog maandelijks rendement oplevert. Wat is de meest verstandige reactie?",
        options: [
          { text: "Meteen een klein bedrag storten om het te testen", correct: false },
          {
            text: "Ophangen, en zelf onafhankelijk de vergunning van de aanbieder controleren via fsma.be voor je iets doet",
            correct: true,
          },
          { text: "Vragen om meer bedenktijd van een week en dan toch instappen", correct: false },
        ],
        explanation:
          "Een gegarandeerd hoog rendement bij ongevraagd contact is een klassiek patroon van beleggingsfraude. Ga nooit in op de tijdsdruk, en zoek de contactgegevens van de FSMA altijd zelf op (niet via een link die de aanbieder je stuurt) voor je een vergunning controleert.",
      },
      { type: "h2", text: "Hoe check je of een aanbieder vergund is?" },
      {
        type: "steps",
        items: [
          "Surf zelf naar fsma.be (typ het adres zelf in, klik niet op een link die de aanbieder je stuurde) en zoek het openbaar register van vergunde instellingen.",
          "Vergelijk niet alleen de naam, maar ook het ondernemingsnummer en de contactgegevens met wat de aanbieder je gaf.",
          "Check ook de waarschuwingslijst van de FSMA: daar verzamelt de toezichthouder meldingen over niet-vergunde aanbieders en clone firms.",
          "Twijfel je nog? Beleggingsadvies en vermogensbeheer mogen in België enkel door FSMA-vergunde partijen worden aangeboden: geen vergunning is een duidelijk stopsignaal.",
        ],
      },
      {
        type: "reveal",
        prompt:
          "Denk na: een 'adviseur' stuurt je een screenshot van een vergunningsnummer dat overeenkomt met een bestaande, vergunde instelling. Betekent dat automatisch dat alles klopt?",
        answer:
          "Nee. Bij een 'clone firm' geeft een oplichter zich uit voor een bestaand, echt vergund bedrijf en gebruikt diens naam of vergunningsnummer, maar met eigen (andere) contactgegevens. Controleer daarom altijd zelf, via de contactgegevens op fsma.be (niet via wat de aanbieder je doorstuurt), of je wel degelijk met de échte, vergunde instelling te maken hebt.",
      },
      { type: "h2", text: "Wat als je toch slachtoffer werd?" },
      {
        type: "steps",
        items: [
          "Stop onmiddellijk met verdere betalingen, ook als je wordt beloofd dat een extra storting nodig is om eerder geld vrij te maken.",
          "Verzamel bewijs: e-mails, chatberichten, screenshots van het platform, en bewijzen van overschrijvingen.",
          "Neem meteen contact op met je bank: vraag of een overschrijving nog geblokkeerd of teruggevorderd kan worden.",
          "Dien klacht in bij de politie, en meld het ook bij de FSMA via het meldpunt op fsma.be.",
          "Gaat het om een geschil met een wél vergunde instelling, dan kan je bij Ombudsfin terecht voor een bemiddelingsprocedure.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Meer achtergrond nodig?",
        text: "De gratis gids 'Je eerste stappen om te beleggen' (/gids/eerste-stappen-beleggen) bevat een hoofdstuk 'Herken beleggingsfraude' dat dit thema kort kadert binnen de volledige beginnersroute.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Dit is geen juridisch of financieel advies",
        text: "Deze checklist is educatief bedoeld en vervangt geen professioneel advies. FinEdu is niet FSMA-vergund. Ben je slachtoffer of twijfel je over een concrete situatie, neem dan contact op met de politie, de FSMA (fsma.be) of een FSMA-vergunde adviseur.",
      },
    ],
  },
  {
    slug: "financieel-geletterd-blijven-na-je-studies",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "familie",
    subcategorySlug: "financiele-opvoeding",
    kind: "tips",
    title: "Financieel geletterd blijven (of worden) na je studies",
    summary:
      "School leert je zelden hoe je een loonstrookje leest of een budget opstelt. Deze gewoontes helpen je om het zelf bij te houden, en later door te geven.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Voor veel starters stopt financiële opvoeding zodra de schoolbanken achter je liggen, net op het moment dat de grootste beslissingen beginnen: je eerste loonstrookje, je eerste huurcontract, je eerste lening. Financieel geletterd zijn is geen aangeboren talent, maar een gewoonte die je opbouwt door bewust met geld bezig te blijven.",
      },
      { type: "h2", text: "Vijf gewoontes die het verschil maken" },
      {
        type: "steps",
        items: [
          "Lees elk document dat je ondertekent, ook als het saai of lang is: een huurcontract, een verzekeringspolis, de voorwaarden van een lening.",
          "Volg maandelijks op waar je geld naartoe gaat, bijvoorbeeld met de geldscan-tool, in plaats van pas actie te ondernemen als het te laat is.",
          "Gebruik onafhankelijke, officiële bronnen zoals Wikifin.be om jargon of een aanbod te checken, in plaats van enkel af te gaan op reclame of een tip op sociale media.",
          "Bouw een vast moment in, bijvoorbeeld één keer per maand, om je budget en spaardoelen te herbekijken met de 50/30/20 budgetplanner en de spaardoel-calculator.",
          "Stel vragen als je iets niet begrijpt, aan een onafhankelijke bron, je hr-dienst of een erkende professional, niet enkel aan wie je het product probeert te verkopen.",
        ],
      },
      {
        type: "check",
        question:
          "Een account op sociale media belooft je 'gegarandeerd snel rijk worden' met een investeringstip. Wat is de verstandigste eerste stap?",
        options: [
          {
            text: "Meteen instappen voor je de kans mist",
            correct: false,
          },
          {
            text: "Nagaan of de aanbieder een FSMA-vergunning heeft en de belofte kritisch checken",
            correct: true,
          },
          {
            text: "Enkel een klein bedrag inzetten, dat kan geen kwaad",
            correct: false,
          },
        ],
        explanation:
          "Gegarandeerd hoog rendement zonder risico bestaat niet. Check bij twijfel altijd of een aanbieder vergund is bij de FSMA voor je erop ingaat, en wees extra kritisch bij tips die vooral haast willen creëren.",
      },
      {
        type: "reveal",
        prompt:
          "Denk even na: wanneer heb jij voor het laatst een financieel document echt volledig gelezen voor je het ondertekende?",
        answer:
          "Veel mensen scrollen door de algemene voorwaarden en klikken 'akkoord'. Dat is menselijk, maar bij grote beslissingen (een lening, een huurcontract, een verzekering) loont het om er tijd voor te nemen of iemand te vragen mee te lezen. De kleine lettertjes zijn vaak net de plek waar uitsluitingen of extra kosten staan.",
      },
      { type: "h2", text: "Het later doorgeven" },
      {
        type: "p",
        text: "Financiële opvoeding werkt in twee richtingen: wat jij nu opbouwt, geef je later vaak door aan jongere broers, zussen, of eigen kinderen. Dat hoeft niet ingewikkeld te zijn. Praat open over geld in plaats van er een taboe van te maken, laat kinderen al vroeg meebeslissen over kleine, begrensde aankopen, en toon voor hoe je zelf een budget of spaardoel bijhoudt.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Geen taboe, wel grenzen",
        text: "Open praten over geld betekent niet dat je alle details moet delen (zoals je exacte loon), maar wel dat je laat zien hoe je keuzes maakt: waarom je spaart, waarom je iets wel of niet koopt.",
      },
    ],
  },
  {
    slug: "feitelijk-wettelijk-samenwonen-of-trouwen",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "familie",
    subcategorySlug: "trouwen-samenwonen",
    kind: "artikel",
    title: "Feitelijk samenwonen, wettelijk samenwonen of trouwen: wat verandert er financieel?",
    summary:
      "Je eerste keer samenwonen met een partner roept een praktische vraag op: doe je dat gewoon, laat je het registreren, of trouw je? Het financiële verschil is groter dan het lijkt.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Veel starters trekken samen met een partner zonder er lang bij stil te staan welke juridische vorm dat krijgt. Toch bestaan er in België drie duidelijk verschillende opties, elk met eigen gevolgen voor wie wat bezit, wie voor wiens schulden opdraait, en wat er gebeurt bij een overlijden of een breuk.",
      },
      { type: "h2", text: "Drie vormen, drie uitgangspunten" },
      {
        type: "list",
        items: [
          "Feitelijk samenwonen: samen onder één dak wonen zonder dat te registreren bij de gemeente. De eenvoudigste vorm, maar ook de vorm met de minste automatische wettelijke bescherming: jullie vermogens en schulden blijven in de regel volledig gescheiden, tenzij je zelf afspraken vastlegt.",
          "Wettelijk samenwonen: samenwonen met een officiële verklaring bij de burgerlijke stand. Dit levert een aantal wettelijke rechten en plichten op (zoals een basisbescherming van de gezinswoning), zonder te huwen. Nog steeds blijft elk vermogen in principe apart, tenzij jullie een samenlevingscontract opstellen.",
          "Huwelijk: je valt automatisch onder een huwelijksvermogensstelsel, dat bepaalt welk vermogen van jou, van je partner, of gemeenschappelijk is. Dat wettelijk stelsel geldt tenzij je er via een huwelijkscontract van afwijkt.",
        ],
      },
      { type: "h2", text: "Waarom dit voor je portefeuille uitmaakt" },
      {
        type: "p",
        text: "Het verschil wordt vooral zichtbaar in drie situaties. Bij het kopen van een woning samen bepaalt de vorm mee hoe eigendom en aankoopschuld worden verdeeld als jullie niet exact evenveel inbrengen. Bij schulden die één partner alleen aangaat, draait de ander daar in de regel niet automatisch voor op, ongeacht de samenlevingsvorm, tenzij het om een gezamenlijke schuld of de gemeenschappelijke huishouding gaat. En bij een overlijden of een breuk verschillen de automatische rechten sterk: gehuwden en wettelijk samenwonenden hebben een aantal wettelijke beschermingen, feitelijk samenwonenden nauwelijks.",
      },
      {
        type: "check",
        question:
          "Je bent feitelijk samenwonend en je partner overlijdt zonder testament. Erf je automatisch van je partner?",
        options: [
          {
            text: "Nee, niet automatisch: feitelijk samenwonenden erven niet van elkaar zonder testament",
            correct: true,
          },
          { text: "Ja, net zoals gehuwde partners", correct: false },
          {
            text: "Ja, zolang jullie op hetzelfde adres ingeschreven staan",
            correct: false,
          },
        ],
        explanation:
          "Feitelijk samenwonen geeft geen automatisch erfrecht. Wil je dat je partner van je erft zonder te huwen of wettelijk samen te wonen, dan moet dat via een testament geregeld worden. Wettelijk samenwonenden en gehuwden hebben wel een aantal automatische rechten, al verschillen die onderling ook.",
      },
      { type: "h2", text: "Financieel voorbereiden, ongeacht je keuze" },
      {
        type: "steps",
        items: [
          "Bespreek voor je samenwoont hoe jullie gezamenlijke kosten (huur, boodschappen, nutsvoorzieningen) verdelen, en zet dat liefst op papier.",
          "Hou bij grote, gezamenlijke aankopen (zoals meubels of een woning) bij wie welk aandeel betaalde, zeker als jullie niet gehuwd zijn.",
          "Overweeg een samenlevingscontract (bij wettelijk samenwonen) of een huwelijkscontract (bij een huwelijk) als jullie afwijkende afspraken op maat willen vastleggen.",
          "Praat over hoe jullie met schulden omgaan: eigen schulden blijven in de regel eigen schulden, tenzij je ze samen aangaat.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Twijfel je welke vorm bij jullie past?",
        text: "Elke vorm heeft eigen gevolgen op vlak van erfrecht, bescherming van de gezinswoning en wat er gebeurt bij een breuk. Een notaris kan je situatie kosteloos toelichten voor je een knoop doorhakt.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Dit is geen bindend advies",
        text: "Deze informatie is educatief bedoeld en vervangt geen persoonlijk juridisch of notarieel advies. Raadpleeg een notaris voor een concrete beslissing over trouwen, samenwonen of een contract.",
      },
    ],
  },
  {
    slug: "eerste-kind-financieel-voorbereiden",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "familie",
    subcategorySlug: "kinderen-krijgen",
    kind: "checklist",
    title: "Een eerste kind: hoe bereid je je financieel voor?",
    summary:
      "Een baby verandert je budget structureel: van eenmalige aankopen tot een tijdelijk lager inkomen. Deze checklist helpt je vooraf na te denken.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Een eerste kind krijgen brengt niet alleen grote vreugde, maar ook een structurele verandering in je budget. Sommige kosten zijn eenmalig, andere blijven terugkeren, en tijdens verlofperiodes ligt je inkomen tijdelijk lager. Vooraf nadenken over die verschuivingen scheelt stress achteraf.",
      },
      { type: "h2", text: "Wat verandert er in je budget?" },
      {
        type: "list",
        items: [
          "Eenmalige aankopen: babyuitzet, kinderwagen, bed. Vaak de grootste eenmalige kost, maar tweedehands materiaal of spullen van familie kunnen dit sterk drukken.",
          "Terugkerende kosten: kinderopvang, luiers, voeding. Deze lopen door nadat de eenmalige aankopen achter de rug zijn, en wegen op de lange termijn zwaarder door.",
          "Tijdelijk lager inkomen: tijdens moederschaps-, geboorte- of ouderschapsverlof ontvang je niet je volledige normale loon, maar een vervangingsuitkering via je ziekenfonds of de RVA die meestal lager ligt dan je gewone nettoloon.",
        ],
      },
      {
        type: "check",
        question:
          "Tijdens ouderschapsverlof betaalt je werkgever gewoon je volledig loon door.",
        options: [
          { text: "Klopt, je loon loopt gewoon door", correct: false },
          {
            text: "Klopt niet: je krijgt een vervangingsuitkering die meestal lager ligt dan je normale loon",
            correct: true,
          },
          {
            text: "Klopt, maar enkel bij een voltijds ouderschapsverlof",
            correct: false,
          },
        ],
        explanation:
          "Ouderschapsverlof is een van de 'thematische verloven': je werkgever betaalt het opgenomen deel niet langer als gewoon loon, maar je kan hiervoor een vervangingsuitkering aanvragen bij de RVA. Die dekt het gemiste loon in de regel niet volledig. Reken dit tijdig na in je budget.",
      },
      { type: "h2", text: "Checklist: financieel voorbereid op een eerste kind" },
      {
        type: "list",
        items: [
          "Reken uit hoeveel je noodbuffer moet aangroeien om de periode met lager inkomen op te vangen, bijvoorbeeld met de noodbuffer-calculator.",
          "Zoek tijdig uit welk type verlof (geboorteverlof, moederschapsverlof, ouderschapsverlof) voor jou en je partner van toepassing is, en welke uitkering daarbij hoort via je ziekenfonds of de RVA.",
          "Vraag het Groeipakket tijdig aan zodra je kind geboren is: dit is de Vlaamse financiële ondersteuning voor gezinnen met kinderen, maandelijks uitbetaald per kind.",
          "Herbekijk je budgetverdeling met de nieuwe vaste kosten erbij, bijvoorbeeld via de 50/30/20 budgetplanner, en pas je spaardoelen aan met de spaardoel-calculator.",
          "Check of een kind ten laste invloed heeft op je belastingaangifte, en of bestaande verzekeringen (familiale verzekering, hospitalisatieverzekering) je kind automatisch mee verzekeren of dat je dit moet aanpassen.",
        ],
      },
      {
        type: "p",
        text: "Blijkt na een paar maanden dat je nieuwe budget structureel niet meer klopt, wacht dan niet af. Herbekijk je uitgaven, en neem bij aanhoudende moeilijkheden contact op met een dienst voor schuldbemiddeling of het OCMW voor gratis budgetbegeleiding, in plaats van bij te lenen om het verschil op te vangen.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Bereken het vooraf",
        text: "Gebruik de noodbuffer-calculator en de 50/30/20 budgetplanner om al voor de geboorte een realistisch beeld te krijgen van je nieuwe maandbudget.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Dit is algemene informatie, geen persoonlijk advies",
        text: "De regels rond geboorte-, moederschaps- en ouderschapsverlof en het Groeipakket wijzigen geregeld qua voorwaarden en bedragen. Raadpleeg voor jouw concrete situatie je ziekenfonds, de RVA, of de FOD Sociale Zekerheid (Groeipakket).",
      },
    ],
  },
  {
    slug: "hoe-je-wettelijk-pensioen-wordt-opgebouwd",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    subcategorySlug: "wettelijk-pensioen",
    kind: "artikel",
    title: "Hoe je wettelijk pensioen wordt opgebouwd: loopbaanjaren en gelijkgestelde periodes",
    summary:
      "Je wettelijk pensioen hangt af van hoeveel jaar je werkte en wat je verdiende, maar ook periodes van ziekte of werkloosheid kunnen meetellen. Zo werkt de opbouw.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Je weet ondertussen dat je RSZ-bijdrage niet naar een persoonlijke spaarpot gaat, maar naar een gemeenschappelijke pot voor de hele sociale zekerheid. Toch bouw je wel degelijk een eigen wettelijk pensioen op: hoe dat precies gebeurt, hangt af van je loopbaanjaren en van wat er in die jaren op je loonstrookje stond.",
      },
      { type: "h2", text: "Elk loopbaanjaar telt apart" },
      {
        type: "p",
        text: "Het wettelijk pensioen wordt niet berekend als één vast percentage van je laatste loon. Voor werknemers telt elk loopbaanjaar apart mee: hoe meer loopbaanjaren je hebt en hoe hoger (tot een wettelijk plafond) je loon in die jaren was, hoe hoger je uiteindelijke pensioen. Een onderbroken of kortere loopbaan geeft dus ook een lager pensioen, tenzij die onderbreking als gelijkgestelde periode meetelt.",
      },
      { type: "h2", text: "Gelijkgestelde periodes: ook zonder werken bouw je soms mee" },
      {
        type: "p",
        text: "Niet elk jaar dat je niet werkte, is automatisch een verloren jaar voor je pensioen. De wet erkent een aantal situaties als gelijkgestelde periodes: je bouwt dan, onder voorwaarden, mee pensioenrechten op alsof je gewerkt had, ook al ontving je toen geen loon.",
      },
      {
        type: "list",
        items: [
          "Tijdelijke of volledige werkloosheid: telt onder voorwaarden mee als gelijkgestelde periode.",
          "Ziekte en invaliditeit: erkende periodes van arbeidsongeschiktheid tellen eveneens mee.",
          "Bepaalde vormen van tijdskrediet of loopbaanonderbreking: soms gedeeltelijk gelijkgesteld, afhankelijk van het type en de periode.",
          "Enkele andere specifieke situaties, zoals legerdienst in het verleden.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "De regels veranderen, de logica blijft",
        text: "Welke periodes precies gelijkgesteld worden en hoe zwaar ze meetellen, ligt vast in uitvoeringsbesluiten die geregeld wijzigen. De onderliggende logica (dat bepaalde onderbrekingen je pensioenopbouw beschermen) blijft wel overeind.",
      },
      {
        type: "check",
        question:
          "Als je een tijdje werkloos was, telt die periode dan automatisch voor 0 euro mee in je wettelijk pensioen?",
        options: [
          { text: "Ja, werkloosheid telt nooit mee voor je pensioen", correct: false },
          {
            text: "Nee, ze kan als gelijkgestelde periode meetellen, onder voorwaarden",
            correct: true,
          },
          { text: "Enkel als je vrijwillig ontslag nam", correct: false },
        ],
        explanation:
          "Werkloosheid kan als gelijkgestelde periode meetellen voor je wettelijk pensioen, weliswaar onder voorwaarden die afhangen van het type werkloosheid en de duur. Het is dus niet automatisch een verloren jaar.",
      },
      { type: "h2", text: "Zo check je je eigen opbouw" },
      {
        type: "steps",
        items: [
          "Maak een account op mypension.be en bekijk je loopbaanoverzicht: welke jaren staan geregistreerd, en welke ontbreken?",
          "Vraag bij twijfel over een periode (bv. een periode in het buitenland of een onduidelijke onderbreking) na bij de Federale Pensioendienst of die periode meetelt.",
          "Bekijk ook de geschatte pensioenleeftijd en het geschatte pensioenbedrag op basis van je huidige loopbaan.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Dit is geen persoonlijke berekening",
        text: "Deze uitleg beschrijft de algemene logica achter het wettelijk pensioen, geen berekening van jouw eigen bedrag. Voor je eigen, actuele pensioenrechten en -leeftijd is mypension.be de enige betrouwbare bron.",
      },
    ],
  },
  {
    slug: "pensioensparen-derde-pijler-uitgelegd",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    subcategorySlug: "pensioensparen",
    kind: "artikel",
    title: "Pensioensparen: wat de derde pijler wel en niet is",
    summary:
      "Pensioensparen wordt vaak in één adem genoemd met 'je pensioen', maar het staat los van het wettelijk pensioen en de groepsverzekering. Dit is het verschil.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Pensioensparen duikt elk jaar rond de jaarwisseling op in reclame en nieuwsberichten. Het is een populaire manier om een fiscaal voordeel te combineren met sparen voor later, maar het is maar één onderdeel van hoe je pensioen in België is opgebouwd: de derde pijler.",
      },
      { type: "h2", text: "Drie pijlers, drie verschillende systemen" },
      {
        type: "p",
        text: "Pensioensparen wordt vaak in één adem genoemd met 'je pensioen', maar het staat los van het wettelijk pensioen (pijler 1) en het aanvullend pensioen via je werkgever (pijler 2). Het verschil zit vooral in wie het opbouwt en wie erover beslist.",
      },
      {
        type: "list",
        items: [
          "Wettelijk pensioen (pijler 1): opgebouwd via de sociale zekerheid, op basis van je loopbaan. Jij beslist hier niets over: het volgt automatisch uit je werk.",
          "Aanvullend pensioen via de werkgever (pijler 2): een groepsverzekering die je werkgever al dan niet voorziet, vaak deels met een eigen bijdrage van jou. Je hebt hier zelf beperkte keuzevrijheid.",
          "Pensioensparen (pijler 3): een individueel initiatief. Jij kiest zelf of, hoeveel (binnen het fiscale maximum) en via welke vorm je spaart, los van je werkgever.",
        ],
      },
      {
        type: "check",
        question:
          "Je werkgever biedt geen groepsverzekering aan. Betekent dat automatisch dat je geen aanvullend pensioen kan opbouwen?",
        options: [
          {
            text: "Klopt, zonder werkgever is er geen aanvullend pensioen mogelijk",
            correct: false,
          },
          {
            text: "Niet noodzakelijk: je kan zelf individueel pensioensparen (pijler 3), los van je werkgever",
            correct: true,
          },
          { text: "Enkel zelfstandigen kunnen dat oplossen", correct: false },
        ],
        explanation:
          "Pijler 2 (groepsverzekering) hangt af van je werkgever, maar pijler 3 (pensioensparen) is een individueel initiatief dat je zelf kan opstarten, ongeacht wat je werkgever aanbiedt.",
      },
      { type: "h2", text: "Twee vormen, geen aanbevelingen hier" },
      {
        type: "p",
        text: "Pensioensparen kan via twee soorten producten: een pensioenspaarverzekering (tak21, met een gewaarborgd rendement van de verzekeraar) of een pensioenspaarfonds (belegd in aandelen en obligaties, zonder kapitaalgarantie). FinEdu doet hier bewust geen aanbeveling van een specifiek fonds of een specifieke verzekeraar: welke vorm bij jou past, hangt af van je risicobereidheid en je horizon, en dat bespreek je best met een FSMA-gecheckte adviseur.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Geen garantie is geen probleem, wel iets om te weten",
        text: "Een pensioenspaarfonds kent doorgaans een hoger verwacht rendement dan een spaarverzekering, maar ook meer schommelingen (volatiliteit) en geen kapitaalgarantie. Het essentiële-informatiedocument van elk product legt de risico-indicator en de kosten uit voor je instapt.",
      },
      { type: "h2", text: "Het fiscaal voordeel heeft grenzen" },
      {
        type: "p",
        text: "Pensioensparen levert een fiscaal voordeel op binnen een jaarlijks wettelijk maximumbedrag: stort je meer, dan geniet je op dat extra bedrag geen belastingvoordeel meer. Dat maximumbedrag en het bijhorende belastingvoordeel worden regelmatig herzien, dus check de actuele grens voor je een bedrag inplant.",
      },
      {
        type: "reveal",
        prompt: "Ben je verplicht om aan pensioensparen te doen zodra je begint te werken?",
        answer:
          "Nee. Pensioensparen is volledig vrijwillig en individueel. Het wettelijk pensioen (pijler 1) bouw je automatisch op via je werk; pensioensparen (pijler 3) is een keuze die je zelf maakt, meestal pas nadat je noodbuffer op orde is.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Eerst de basis, dan pensioensparen",
        text: "Pensioensparen is voor de meeste starters pas interessant nadat de noodbuffer op orde is: het geld zit vrijwel vast tot je pensioenleeftijd. Wil je een idee van wat apart sparen op lange termijn kan opleveren, gebruik dan de aanvullend-pensioen-rekentool op finedu.be/tools/aanvullend-pensioen.",
      },
      {
        type: "p",
        text: "Pensioensparen vervangt dus geen van de andere twee pijlers: het is een extra, optioneel bouwblokje. Voor een volledig beeld van wat je via het wettelijk pensioen opbouwt, blijft mypension.be de beste start; voor productkeuzes binnen pensioensparen kan een FSMA-gecheckte adviseur je verder helpen.",
      },
    ],
  },
  {
    slug: "groepsverzekering-checklist-aanvullend-pensioen",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    subcategorySlug: "aanvullend-pensioen",
    kind: "checklist",
    title: "Groepsverzekering: een checklist voor je aanvullend pensioen via je werkgever",
    summary:
      "Niet elke werkgever biedt een groepsverzekering aan, en de voorwaarden lopen sterk uiteen. Met deze checklist weet je wat je moet navragen.",
    readMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Een groepsverzekering is het aanvullend pensioen dat je werkgever voor jou (en je collega's) opbouwt: de tweede pijler. Niet elke werkgever voorziet dit, en de voorwaarden verschillen sterk van bedrijf tot bedrijf en soms zelfs van functie tot functie. Deze checklist helpt je uitzoeken wat er voor jou concreet geldt.",
      },
      { type: "h2", text: "Wat navragen bij je hr-dienst?" },
      {
        type: "list",
        items: [
          "Bestaat er een groepsverzekering, en geldt die voor iedereen of enkel voor bepaalde functies of een bepaalde anciënniteit?",
          "Wie betaalt de bijdrage: enkel de werkgever, of wordt er ook een eigen bijdrage van jouw brutoloon afgehouden?",
          "Verandert de bijdrage met je leeftijd of anciënniteit?",
          "Welke verzekeraar of welk pensioenfonds beheert het contract, en is er een overzicht beschikbaar van je opgebouwde reserves?",
          "Wat gebeurt er met je opgebouwde reserves als je van job verandert?",
        ],
      },
      { type: "h2", text: "Een wettelijk minimum, ook al kies je zelf de verzekeraar niet" },
      {
        type: "p",
        text: "Bij een groepsverzekering kies jij als werknemer meestal niet zelf de verzekeraar of het fonds: dat doet je werkgever. De wet regelt wel een minimumbescherming: de werkgever (of inrichter) moet op de gestorte bijdragen een wettelijk minimumrendement garanderen, ongeacht het werkelijke beleggingsresultaat van de verzekeraar of het pensioenfonds.",
      },
      {
        type: "check",
        question: "Verlies je je opgebouwde aanvullend pensioen als je van werkgever verandert?",
        options: [
          {
            text: "Ja, het contract stopt en het opgebouwde bedrag vervalt",
            correct: false,
          },
          {
            text: "Nee, de opgebouwde reserves blijven van jou, ook bij een jobwissel",
            correct: true,
          },
          { text: "Enkel als je zelf ontslag neemt", correct: false },
        ],
        explanation:
          "De reserves die je al opbouwde in een groepsverzekering, blijven van jou, ook als je van werkgever verandert. Wat er precies met die reserves gebeurt (laten staan of overdragen), hangt af van de voorwaarden van het contract en je nieuwe situatie: dat check je best via mypension.be of bij de pensioeninstelling zelf.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Bereken wat het je kan opleveren",
        text: "Wil je een idee krijgen van wat een aanvullend pensioen, via een groepsverzekering of via eigen sparen, je op termijn ongeveer kan opleveren? Gebruik de aanvullend-pensioen-rekentool op finedu.be/tools/aanvullend-pensioen. Voor een schatting van je wettelijk pensioen (pijler 1) verwijst die rekentool bewust naar mypension.be: dat blijft de enige juiste bron daarvoor.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Geen productadvies",
        text: "Deze pagina legt uit hoe een groepsverzekering in het algemeen werkt, niet welke verzekeraar of welk fonds het beste is voor jouw situatie. Voor die keuze, voor zover je er zelf iets over te zeggen hebt, kan je terecht bij een FSMA-gecheckte adviseur.",
      },
    ],
  },
  {
    slug: "zichtrekening-kosten-en-keuze",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    subcategorySlug: "zichtrekening",
    kind: "artikel",
    title: "Je zichtrekening: wat ze kost en waar je op let",
    summary:
      "Je zichtrekening is de motor van je dagelijkse geldzaken. Wat kost ze eigenlijk, en waar let je op als je een rekening kiest of vergelijkt?",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Je zichtrekening is de rekening waarlangs bijna al je geld beweegt: je loon komt er binnen, je huur en abonnementen gaan er via domiciliëring vanaf, en je gebruikt ze om met je betaalkaart te betalen. In tegenstelling tot een spaarrekening is het geld erop meteen beschikbaar, maar daar staat meestal weinig tot geen rente tegenover.",
      },
      { type: "h2", text: "Wat kost een zichtrekening?" },
      {
        type: "p",
        text: "De meeste banken rekenen beheerskosten aan: een vast bedrag per maand of per jaar voor het bijhouden van de rekening, los van hoeveel je ze gebruikt. Daarbovenop kunnen kosten komen voor een betaalkaart, extra kaarten, papieren rekeninguittreksels, of overschrijvingen buiten de eurozone. Sommige banken bieden voordelige pakketten voor jongeren of studenten aan.",
      },
      {
        type: "list",
        items: [
          "Beheerskosten: vaak jaarlijks of per kwartaal aangerekend, soms verschillend per pakket (basis versus uitgebreid).",
          "Kosten voor een betaalkaart: kan inbegrepen zijn in het pakket, of apart aangerekend.",
          "Kosten bij roodstand: als je meer uitgeeft dan er op je rekening staat, betaal je vaak een hoge debetrente op het tekort.",
          "Kosten voor extra diensten: een tweede kaart, een papieren uittreksel aan het loket, of een overschrijving in een andere munt.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Zie je eigen kosten in één oogopslag",
        text: "Plak je rekeninguittreksel in de Geldscan (/tools/geldscan) om te zien welke kosten er precies van je zichtrekening afgaan, en neem beheerskosten mee als vaste post in je budgetplanner (/tools/budgetplanner).",
      },
      {
        type: "check",
        question:
          "Je zichtrekening staat 200 euro in het rood, met toestemming van je bank. Wat gebeurt er meestal?",
        options: [
          { text: "Niets, dat is altijd gratis", correct: false },
          {
            text: "Je betaalt debetrente op het bedrag dat je in het rood staat",
            correct: true,
          },
          { text: "Je rekening wordt automatisch geblokkeerd", correct: false },
        ],
        explanation:
          "Een toegelaten roodstand is geen gratis extra budget: de bank rekent er doorgaans een aanzienlijke debetrente op aan, vaak hoger dan bij een gewone lening. Bekijk het liever als een dure noodoplossing dan als vast onderdeel van je budget.",
      },
      { type: "h2", text: "Waar let je op als je een rekening kiest?" },
      {
        type: "list",
        items: [
          "Welke diensten zitten in het basispakket, en welke betaal je apart bij?",
          "Is er een voordeliger tarief zolang je jonger bent dan een bepaalde leeftijd, en wat verandert er daarna?",
          "Kan je makkelijk internationale overschrijvingen doen, bijvoorbeeld voor een stage of studie in het buitenland?",
          "Hoe werkt de mobiele app: kan je er je kaart tijdelijk blokkeren, uitgaven opvolgen, of meldingen instellen?",
          "Wat zijn de voorwaarden en kosten om de rekening weer te sluiten of over te stappen naar een andere bank?",
        ],
      },
      {
        type: "p",
        text: "FinEdu vergelijkt bewust geen concrete banken of pakketten: welke rekening het beste bij jou past, hangt af van je eigen gebruik. Vergelijk zelf de voorwaarden op de website van elke bank of vraag een overzicht van de kosten op voor je een keuze maakt.",
      },
      { type: "h2", text: "Geen rekening kunnen openen? Er is een vangnet" },
      {
        type: "reveal",
        prompt:
          "Denk even na: mag een bank je zomaar weigeren als klant voor een gewone zichtrekening?",
        answer:
          "Niet zonder meer. In België bestaat het recht op een basisbankdienst: een beperkt maar functioneel pakket (onder meer een betaalkaart, overschrijvingen en domiciliëringen) waar iedereen die legaal in de EU verblijft in principe recht op heeft, ook zonder inkomen. Een bank mag de aanvraag alleen weigeren in wettelijk bepaalde gevallen. Meer uitleg vind je bij Wikifin.be, de voorlichtingswebsite van de FSMA.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Niet akkoord met je bank?",
        text: "Kom je er met je bank niet uit, bijvoorbeeld over aangerekende kosten of een geweigerde aanvraag, dan kan je gratis terecht bij Ombudsfin, de ombudsdienst voor financiële geschillen. Dit artikel is algemene informatie, geen persoonlijk advies.",
      },
    ],
  },
  {
    slug: "betaalkaarten-debet-krediet-en-veiligheid",
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    subcategorySlug: "betaalkaarten",
    kind: "checklist",
    title: "Betaalkaarten: debet vs. krediet, en wat te doen bij verlies of diefstal",
    summary:
      "Niet elke betaalkaart werkt hetzelfde. Het verschil tussen debet en krediet, hoe veilig contactloos betalen is, en je actieplan bij verlies of diefstal.",
    readMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Een betaalkaart lijkt een simpel plastic kaartje, maar niet elke kaart werkt op dezelfde manier. Het verschil tussen een debetkaart en een kredietkaart bepaalt of je met je eigen geld betaalt, of eigenlijk telkens een klein krediet opneemt.",
      },
      { type: "h2", text: "Debetkaart versus kredietkaart" },
      {
        type: "list",
        items: [
          "Debetkaart: het bedrag van je aankoop wordt onmiddellijk van je zichtrekening afgeschreven. Je kan niet meer uitgeven dan er op je rekening staat (op een eventuele toegelaten roodstand na). Dit is de kaart die de meeste starters standaard bij hun zichtrekening krijgen.",
          "Kredietkaart: de uitgever betaalt je aankoop voor, en jij betaalt het opgenomen bedrag nadien terug, meestal maandelijks. Betaal je niet het volledige bedrag in één keer terug, dan reken je effectief een lening af, vaak tegen een aanzienlijke debetrente.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Een kredietkaart is een vorm van krediet",
        text: "Betaal je maandelijks slechts een deel van je kredietkaartschuld terug, dan loop je tegen dezelfde valkuilen aan als bij een kredietopening: de rente op het openstaande saldo kan hoog oplopen. Lees Verantwoord lenen voor meer uitleg over het jaarlijks kostenpercentage (JKP).",
      },
      {
        type: "check",
        question:
          "Je betaalt met een debetkaart voor boodschappen van 40 euro, maar er staat maar 25 euro op je rekening (geen toegelaten roodstand). Wat gebeurt er normaal?",
        options: [
          { text: "De betaling lukt gewoon, je komt in het rood", correct: false },
          { text: "De betaling wordt geweigerd", correct: true },
          { text: "De bank leent je automatisch het verschil", correct: false },
        ],
        explanation:
          "Zonder toegelaten roodstand kan een debetkaart normaal geen betaling doorvoeren die je saldo overschrijdt: de transactie wordt geweigerd. Dat is een belangrijk verschil met een kredietkaart, waarbij de uitgever de aankoop wél voorschiet.",
      },
      { type: "h2", text: "Contactloos betalen: hoe veilig is het?" },
      {
        type: "p",
        text: "Bij contactloos betalen houd je je kaart of toestel tegen de betaalterminal in plaats van de kaart in te steken. Voor de meeste kleinere bedragen is geen pincode nodig, maar vanaf een bepaald bedrag, of na een aantal opeenvolgende contactloze betalingen, vraagt de terminal alsnog je pincode als extra controle. Verlies je je kaart, dan is dit een reden te meer om ze meteen te laten blokkeren: zolang je dat niet doet, kan iemand er in theorie kleine contactloze betalingen mee doen.",
      },
      { type: "h2", text: "Verlies of diefstal: je actieplan" },
      {
        type: "steps",
        items: [
          "Blokkeer je kaart onmiddellijk via de app van je bank, of via de centrale kaartblokkeringsdienst als je de app niet bij de hand hebt.",
          "Neem daarna contact op met je bank om te melden wat er gebeurd is en de vervolgstappen te bespreken.",
          "Doe bij diefstal ook aangifte bij de politie: dat kan nodig zijn voor de afhandeling met je bank of een eventuele verzekering.",
          "Controleer nadien je rekeninguittreksels op transacties die je niet herkent, en meld die meteen aan je bank.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Meld het zo snel mogelijk",
        text: "Tot je het verlies, de diefstal of het misbruik van je kaart meldt, ben je voor niet-toegestane betalingen wettelijk maar tot een beperkt bedrag zelf aansprakelijk, tenzij je frauduleus handelde of grof nalatig was. Zodra je meldt, stopt in principe je aansprakelijkheid voor verdere transacties. Check bij je bank hoe en waar je precies moet melden.",
      },
      { type: "h2", text: "Veilig omgaan met je kaart en pincode" },
      {
        type: "list",
        items: [
          "Deel je pincode nooit, ook niet met familie of 'medewerkers' die erom vragen aan de telefoon.",
          "Bewaar je pincode nooit samen met je kaart, bijvoorbeeld opgeschreven in je portefeuille.",
          "Dek het toetsenbord af met je hand wanneer je je pincode ingeeft aan een terminal of geldautomaat.",
          "Controleer regelmatig je transacties via de app van je bank, zodat je snel afwijkingen opmerkt.",
          "Wees achterdochtig bij een geldautomaat die er beschadigd of aangepast uitziet: dat kan wijzen op skimming.",
        ],
      },
      {
        type: "reveal",
        prompt:
          "Iemand belt je op en zegt van je bank te zijn. Ze vragen je pincode om 'een verdachte transactie te blokkeren'. Wat doe je?",
        answer:
          "Je geeft nooit je pincode door, ook niet aan iemand die zich voordoet als medewerker van je bank. Banken vragen dit nooit telefonisch. Hang op en bel zelf terug via het officiële nummer van je bank (niet een nummer dat de beller je doorgeeft) om te checken of er echt iets aan de hand is.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Algemene informatie, geen persoonlijk advies",
        text: "Dit artikel legt de algemene werking uit. Heb je een concreet geschil met je bank over een fraudegeval, dan kan je terecht bij Ombudsfin, de ombudsdienst voor financiële geschillen.",
      },
    ],
  },
];

export function getArticlesForCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getArticlesForSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): Article[] {
  return articles.filter(
    (a) =>
      a.categorySlug === categorySlug &&
      a.subcategorySlug === subcategorySlug,
  );
}

export function getArticle(
  categorySlug: string,
  slug: string,
): Article | undefined {
  return articles.find(
    (a) => a.categorySlug === categorySlug && a.slug === slug,
  );
}
