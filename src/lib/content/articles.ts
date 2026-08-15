import { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "loonstrookje-ontcijferd",
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
    slug: "eerste-keer-huren",
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
    slug: "hoe-je-wettelijk-pensioen-wordt-opgebouwd",
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
