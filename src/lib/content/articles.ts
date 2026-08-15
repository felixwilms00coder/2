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
    slug: "hypothecair-krediet-basisbegrippen",
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
