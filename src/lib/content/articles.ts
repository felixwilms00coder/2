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
    slug: "beleggingsproducten-vergelijken",
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
