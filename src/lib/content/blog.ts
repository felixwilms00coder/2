import { BlogPost } from "./types";

/**
 * Blogposts, nieuwste eerst. Wordt aangevuld door een dagelijkse agent
 * (zie docs/automatisering.md, sectie 9) — elke post moet gegrond zijn op
 * wat al in legislation.ts of lexicon.ts staat, geen vrij verzonnen
 * cijfers of wetsartikels.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "vlaamse-erfbelasting-schijven-en-verwantschap",
    title: "Erfbelasting in Vlaanderen: niet één tarief, maar schijven die afhangen van wie je bent voor de overledene",
    summary:
      "Wie erft in het Vlaamse Gewest, betaalt erfbelasting volgens een progressief schijvenstelsel: hoe groter het geërfde bedrag, hoe hoger het tarief op dat gedeelte. Het tarief hangt ook af van je band met de overledene: partners en kinderen betalen minder dan broers/zussen, en zij weer minder dan anderen.",
    categorySlug: "erven",
    publishedAt: "2026-10-13",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "\"Hoeveel erfbelasting betaal ik?\" is geen vraag met één antwoord. In Vlaanderen hangt dat af van twee dingen tegelijk: hoeveel je erft, en wie je bent voor de overledene.",
      },
      { type: "h2", text: "Een progressief schijvenstelsel" },
      {
        type: "p",
        text: "Wie erft in het Vlaamse Gewest, betaalt erfbelasting volgens een progressief schijvenstelsel: hoe groter het geërfde bedrag, hoe hoger het tarief op dat gedeelte. Dat werkt zoals bij de personenbelasting: niet je hele erfenis wordt tegen één tarief belast, maar elke schijf van het bedrag krijgt zijn eigen tarief, oplopend naarmate het bedrag groter wordt.",
      },
      { type: "h2", text: "De band met de overledene telt mee" },
      {
        type: "p",
        text: "Daarbovenop hangt het tarief ook af van wie erft. Partners en kinderen (de zogenaamde rechte lijn) betalen minder dan broers en zussen, en die betalen op hun beurt weer minder dan anderen, zoals verdere familie of niet-verwanten. Dezelfde erfenis kan dus heel verschillend belast worden, afhankelijk van wie ze ontvangt.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "De exacte schijven en percentages wijzigen soms",
        text: "De precieze schijfgrenzen en tarieven liggen niet voor altijd vast en kunnen wijzigen. Check de actuele schijven en percentages bij VLABEL voor je zelf een concreet bedrag probeert te berekenen.",
      },
      {
        type: "list",
        items: [
          "Ga na in welke verwantschapscategorie jij valt ten opzichte van de overledene (partner/kind, broer of zus, of anders).",
          "Check de actuele schijven en tarieven bij VLABEL voor je een inschatting maakt.",
          "Bekijk ook de FinEdu-pagina over schenken: schenken tijdens het leven kan de uiteindelijke erfbelasting beïnvloeden.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Erfbelasting en schenkbelasting hangen samen",
        text: "Wie tijdens het leven al schenkt, kan daarmee soms vermijden dat eenzelfde vermogen later tegen een hoger erfbelastingtarief belast wordt. Het financieel lexicon van FinEdu legt de begrippen erfbelasting en schenking apart uit.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de regelgeving, geen persoonlijk advies over jouw concrete erfenis: voor de exacte schijven, tarieven en jouw eigen situatie raadpleeg je VLABEL of een notaris.",
      },
    ],
  },
  {
    slug: "schenken-vs-erven-vlaamse-schenkbelasting",
    title: "Schenken tijdens je leven kan fiscaal voordeliger zijn dan erven, als je de regels volgt",
    summary:
      "Een schenking van geld of effecten via de notaris wordt doorgaans belast tegen een vast, laag tarief. Een woning schenken volgt een apart, progressief tarief. Let op: een niet-geregistreerde schenking (zoals een handgift) kan bij overlijden binnen een bepaalde termijn toch als erfenis belast worden.",
    categorySlug: "erven",
    publishedAt: "2026-10-12",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Wie nadenkt over vermogen doorgeven, hoort vaak dat schenken voordeliger is dan erven. Dat klopt, maar enkel als je de regels van de Vlaamse schenkbelasting volgt.",
      },
      { type: "h2", text: "Schenking versus erfenis" },
      {
        type: "p",
        text: "Een schenking is het vrijwillig en kosteloos overdragen van een goed aan iemand anders tijdens je leven, in tegenstelling tot een erfenis die pas bij overlijden overgaat. Omdat je zelf kiest wanneer en hoeveel je schenkt, kan je daarmee spreiden in de tijd en vaak een gunstiger tarief krijgen dan erfbelasting achteraf.",
      },
      { type: "h2", text: "Roerend en onroerend: twee verschillende regimes" },
      {
        type: "p",
        text: "Een schenking van roerende goederen, zoals geld of effecten, via de notaris wordt belast tegen een vast, doorgaans laag tarief. Een woning of ander onroerend goed schenken gebeurt altijd via de notaris en volgt een apart, progressief tarief: hoe meer je schenkt, hoe hoger het tarief op dat gedeelte.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Een handgift is niet zonder risico",
        text: "Overlijdt de schenker binnen een bepaalde termijn na een niet-geregistreerde schenking (bijvoorbeeld een handgift, zonder notaris), dan kan de fiscus die schenking alsnog als erfenis belasten. De exacte termijn en tarieven wijzigen soms: laat dit altijd door een notaris bevestigen voor je schenkt.",
      },
      {
        type: "list",
        items: [
          "Bespreek met een notaris of een schenking via notariële akte of een handgift past bij jouw situatie.",
          "Vraag de actuele tarieven en termijnen na bij VLABEL of je notaris voor je een concreet bedrag schenkt.",
          "Bekijk ook de pagina Erven op FinEdu voor hoe erfbelasting zich daar tegenover verhoudt.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Erfbelasting werkt ook met schijven",
        text: "Erf je toch, dan betaal je erfbelasting volgens een progressief schijvenstelsel, met een tarief dat afhangt van je band met de overledene. Het financieel lexicon van FinEdu legt de begrippen schenking en erfbelasting apart uit.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de regelgeving, geen persoonlijk advies over jouw concrete successieplanning: voor de exacte tarieven, termijnen en de beste aanpak voor jouw situatie raadpleeg je een notaris of VLABEL.",
      },
    ],
  },
  {
    slug: "aanvullend-pensioen-minimumrendement-groepsverzekering",
    title: "Aanvullend pensioen via je werkgever: de wet garandeert een minimumrendement",
    summary:
      "Bouw je via je werkgever een aanvullend pensioen op (bv. een groepsverzekering)? Dan garandeert de wet een minimumrendement op de gestorte bijdragen, ongeacht het werkelijke beleggingsresultaat. Het percentage zelf staat niet vast in de wet en kan wijzigen.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    publishedAt: "2026-10-05",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Heb je via je werkgever een groepsverzekering of een ander aanvullend pensioen? Dan geldt er een wettelijke bescherming op die bijdragen waar veel werknemers niet van weten.",
      },
      { type: "h2", text: "Aanvullend pensioen: de tweede pijler" },
      {
        type: "p",
        text: "Naast het wettelijk pensioen (eerste pijler, opgebouwd via de sociale zekerheid) kan je werkgever voor jou een aanvullend pensioen opbouwen: de tweede pijler. Een groepsverzekering is daarvan de bekendste vorm. Dat is iets anders dan pensioensparen, waarbij je zelf een derde pijler opbouwt.",
      },
      { type: "h2", text: "De wet garandeert een minimumrendement" },
      {
        type: "p",
        text: "De Wet Aanvullende Pensioenen (WAP) legt de spelregels vast voor dat aanvullend pensioen. Eén ervan: de werkgever of inrichter moet op de gestorte bijdragen een wettelijk minimumrendement garanderen, ongeacht het werkelijke beleggingsresultaat van de verzekeraar of het pensioenfonds. Haalt de belegging minder op, dan moet de werkgever het verschil bijpassen.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Het percentage zelf staat niet in de wet",
        text: "Hoeveel dat minimumrendement precies bedraagt, ligt niet vast in de WAP zelf en kan wijzigen. Vraag de actuele stand na bij je pensioeninstelling of check de informatie bij de FSMA voor je verdere conclusies trekt.",
      },
      {
        type: "list",
        items: [
          "Vraag je jaarlijkse pensioenfiche op bij je werkgever of pensioeninstelling.",
          "Bekijk je opgebouwde aanvullend pensioen ook via mypension.be.",
          "Gebruik de aanvullend-pensioen-tool van FinEdu om een beeld te krijgen van wat een aanvullend pensioen kan betekenen bovenop je wettelijk pensioen.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Tweede en derde pijler zijn niet hetzelfde",
        text: "Een aanvullend pensioen via je werkgever (tweede pijler) is iets anders dan pensioensparen dat je zelf afsluit (derde pijler). Het financieel lexicon van FinEdu legt beide begrippen apart uit.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw concrete pensioenplan: voor de exacte voorwaarden en het actuele rendement van jouw contract raadpleeg je je pensioeninstelling of de FSMA.",
      },
    ],
  },
  {
    slug: "wettelijk-pensioen-loopbaanjaren-opbouw",
    title: "Je wettelijk pensioen is geen vast bedrag: het wordt jaar per jaar opgebouwd",
    summary:
      "Het wettelijk pensioen van werknemers is geen vast percentage van je laatste loon, maar wordt loopbaanjaar per loopbaanjaar opgebouwd: elk jaar telt je toenmalige loon mee, tot een wettelijk plafond. Ook bepaalde periodes van werkloosheid, ziekte of invaliditeit kunnen meetellen, als 'gelijkgestelde periodes'.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
    publishedAt: "2026-09-24",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Veel starters denken dat hun pensioen later berekend wordt op hun laatste loon. Voor het wettelijk pensioen van werknemers klopt dat niet: het wordt jaar per jaar opgebouwd, over je hele loopbaan.",
      },
      { type: "h2", text: "Loopbaanjaar per loopbaanjaar, geen vast percentage" },
      {
        type: "p",
        text: "Het wettelijk pensioen van werknemers wordt niet als één vast percentage van je laatste loon berekend, maar loopbaanjaar per loopbaanjaar opgebouwd: voor elk jaar telt het toenmalige loon mee, tot een wettelijk plafond. Een jaar met een hoger loon draagt dus meer bij aan je uiteindelijke pensioen dan een jaar met een lager loon.",
      },
      { type: "h2", text: "Niet-gewerkte periodes kunnen toch meetellen" },
      {
        type: "p",
        text: "Naast effectief gewerkte jaren erkent de wet ook 'gelijkgestelde periodes': bepaalde vormen van werkloosheid, ziekte of invaliditeit die onder voorwaarden meetellen alsof je gewerkt had. Dat betekent dat een moeilijke periode in je loopbaan niet automatisch een gat slaat in je pensioenopbouw.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "De precieze regels wijzigen",
        text: "Hoeveel loopbaanjaren nodig zijn voor een volledig pensioen en welke periodes precies gelijkgesteld worden, ligt vast in uitvoeringsbesluiten die kunnen wijzigen. FinEdu houdt deze regels zelf niet actueel bij: check je eigen loopbaanoverzicht en de actuele regels via mypension.be of de Federale Pensioendienst.",
      },
      {
        type: "list",
        items: [
          "Maak een account aan op mypension.be en bekijk je eigen, actueel opgebouwde loopbaanoverzicht.",
          "Check welke periodes in je loopbaan (bv. studentenwerk, tijdelijke werkloosheid) al meetellen.",
          "Gebruik de aanvullend-pensioen-simulator van FinEdu om te zien wat apart sparen bovenop je wettelijk pensioen kan opleveren.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Wettelijk pensioen is meestal niet je enige pensioen",
        text: "Naast het wettelijk pensioen (eerste pijler) bestaat er ook een aanvullend pensioen, via je werkgever of jezelf opgebouwd. Het financieel lexicon van FinEdu legt loopbaanjaren, gelijkgestelde periodes en aanvullend pensioen apart uit.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw concrete pensioenopbouw: voor je eigen, exacte loopbaangegevens en pensioenraming raadpleeg je mypension.be of de Federale Pensioendienst.",
      },
    ],
  },
  {
    slug: "ouderschapsverlof-thematisch-verlof-uitgelegd",
    title: "Ouderschapsverlof: minder werken voor je kind, met behoud van je job",
    summary:
      "Ouderschapsverlof geeft werknemers met voldoende anciënniteit het recht om voor een jong kind tijdelijk te stoppen, deeltijds te werken of het ritme te verminderen, met een wettelijk recht om nadien terug te keren. Een vervangingsuitkering via de RVA dekt het gemiste loon, maar meestal niet volledig.",
    categorySlug: "familie",
    publishedAt: "2026-09-02",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Een kind krijgen verandert niet enkel je privéleven, maar ook hoe je werk eruitziet. Veel starters weten niet dat ze daarvoor een wettelijk recht hebben op tijdelijk minder werken, zonder hun job te verliezen: ouderschapsverlof.",
      },
      { type: "h2", text: "Wat ouderschapsverlof precies inhoudt" },
      {
        type: "p",
        text: "Ouderschapsverlof behoort tot de zogenaamde 'thematische verloven'. Heb je voldoende anciënniteit, dan kan je voor een jong kind tijdelijk volledig stoppen met werken, deeltijds gaan werken, of je arbeidsritme verminderen. De band met je werkgever blijft daarbij behouden.",
      },
      { type: "h2", text: "Je hebt recht op terugkeer naar je functie" },
      {
        type: "p",
        text: "Een belangrijk element: je hebt een wettelijk recht om na je ouderschapsverlof terug te keren naar dezelfde functie, of een gelijkwaardige functie als de oorspronkelijke niet meer beschikbaar is. Je werkgever kan je dus niet zomaar vervangen tijdens die periode.",
      },
      { type: "h2", text: "Een vervangingsuitkering, geen volledig loon" },
      {
        type: "p",
        text: "Voor het inkomen dat je tijdens het ouderschapsverlof misloopt, kan je een vervangingsuitkering aanvragen bij de RVA. Die uitkering dekt het gemiste loon in de regel niet volledig: hou er dus rekening mee dat je erop achteruitgaat, ook met de uitkering erbij.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "De voorwaarden wijzigen geregeld",
        text: "De precieze voorwaarden — de leeftijdsgrens van het kind, de minimale anciënniteit, en de mogelijke opnamevormen — en het uitkeringsbedrag wijzigen geregeld. FinEdu houdt deze cijfers zelf niet bij: check de actuele regels bij de RVA voor je plannen maakt.",
      },
      {
        type: "list",
        items: [
          "Vraag bij je werkgever na hoe je ouderschapsverlof formeel aanvraagt en welke opnamevormen mogelijk zijn.",
          "Check je anciënniteit en of je aan de voorwaarden voldoet via de RVA.",
          "Bereken vooraf wat de vervangingsuitkering ongeveer betekent voor je maandelijks budget, zodat je niet voor verrassingen komt te staan.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Andere financiële voorbereiding op een kind?",
        text: "FinEdu's leerstof over een eerste kind financieel voorbereiden en de 50/30/20 budgetplanner helpen je breder in kaart brengen wat er verandert.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw concrete situatie: voor de exacte voorwaarden en het actuele uitkeringsbedrag raadpleeg je de RVA, en voor vragen over jouw arbeidscontract je werkgever of een vakbond.",
      },
    ],
  },
  {
    slug: "verzekeringsbemiddeling-fsma-registratie",
    title: "Wie verzekeringen aanbeveelt of vergelijkt, moet daarvoor geregistreerd zijn bij de FSMA",
    summary:
      "Verzekeringen voorstellen, aanbevelen, vergelijken of voorbereidend werk doen richting een verzekeringscontract, is in België een gereglementeerde activiteit: wie dat als dienst aanbiedt moet geregistreerd zijn bij de FSMA als verzekeringstussenpersoon, ook zonder commissie te ontvangen.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    publishedAt: "2026-08-25",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Krijg je van een 'onafhankelijke vergelijkingssite', een kennis die 'goed thuis is in verzekeringen', of iemand online een concrete aanbeveling over welke polis je moet nemen? Ook hier geldt een wettelijke check die je zelf snel kan doen: is die partij eigenlijk geregistreerd om dat te doen?",
      },
      { type: "h2", text: "Wat is 'verzekeringsbemiddeling' precies?" },
      {
        type: "p",
        text: "Verzekeringen voorstellen, aanbevelen, vergelijken, of voorbereidend werk doen richting het afsluiten van een verzekeringscontract: dat noemt de wet 'verzekeringsbemiddeling'. Het gaat dus niet enkel om wie uiteindelijk de polis verkoopt, maar ook om wie in dat traject actief adviseert of vergelijkt.",
      },
      { type: "h2", text: "Wanneer is een FSMA-registratie verplicht?" },
      {
        type: "p",
        text: "Wie verzekeringsbemiddeling als dienst aanbiedt, moet geregistreerd zijn bij de FSMA als verzekeringstussenpersoon. Dat geldt ook als die partij daar zelf geen commissie voor ontvangt: het gaat om de activiteit zelf, niet om hoe ze eraan verdient.",
      },
      { type: "h2", text: "Hoe check je dat zelf?" },
      {
        type: "p",
        text: "Consumenten kunnen die registratie nakijken via het openbaar register op fsma.be, voor ze op een aanbeveling ingaan. Een registratie garandeert geen goedkoopste of beste polis, maar wel dat de partij onder toezicht staat.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Waarom dit meer is dan formaliteit",
        text: "Een niet-geregistreerde partij die toch verzekeringen aanbeveelt of vergelijkt, valt buiten het wettelijke toezichtskader. Dat betekent dat je bij een geschil minder houvast hebt dan bij een geregistreerde tussenpersoon.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Zelf vergelijken zonder op één aanbeveling te vertrouwen?",
        text: "De verzekeringsoffertes-vergelijker van FinEdu vergelijkt tot vier offertes op verwachte totale jaarkost, op basis van cijfers die je zelf invult: geen eigen polisdata en geen rangschikking van verzekeraars.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk verzekeringsadvies: FinEdu zelf is niet FSMA-geregistreerd en beveelt dus ook geen specifieke verzekeraar of polis aan. Twijfel je over een concreet aanbod? Check de registratie op fsma.be of raadpleeg een erkende verzekeringstussenpersoon.",
      },
    ],
  },
  {
    slug: "beleggingsadvies-fsma-vergunning-checken",
    title: "Iemand geeft je beleggingsadvies? Check eerst of die persoon een FSMA-vergunning heeft",
    summary:
      "Een concrete, persoonlijke aanbeveling geven over te kopen of verkopen beleggingen, of voor jou beleggingsbeslissingen nemen, is in België een gereglementeerde dienst: wie dat aanbiedt heeft een FSMA-vergunning nodig. Controleer dat op fsma.be voor je op een aanbeveling ingaat.",
    categorySlug: "sparen-en-beleggen",
    publishedAt: "2026-08-23",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Krijg je van een kennis, iemand online, of iemand die zich voorstelt als 'beleggingsexpert' een concreet advies over welk aandeel of fonds je moet kopen? Voor je daarop ingaat, is er één simpele check die veel ellende kan voorkomen: is die persoon of dat bedrijf eigenlijk wel vergund om beleggingsadvies te geven?",
      },
      { type: "h2", text: "Wat telt als 'beleggingsadvies'?" },
      {
        type: "p",
        text: "Een concrete, persoonlijke aanbeveling geven over te kopen of verkopen financiële instrumenten — dat is wat de wet 'beleggingsadvies' noemt. Neemt iemand anders in jouw plaats beleggingsbeslissingen, dan heet dat 'vermogensbeheer'. Beide zijn in België gereglementeerde diensten, geen vrijblijvende babbel.",
      },
      { type: "h2", text: "Waarom een vergunning verplicht is" },
      {
        type: "p",
        text: "Wie beleggingsadvies of vermogensbeheer aanbiedt, heeft daarvoor een FSMA-vergunning nodig, en moet onder meer een geschiktheidstoets afnemen bij de klant: nagaan of een aanbeveling wel past bij jouw kennis, ervaring en risicobereidheid. Die verplichtingen bestaan net om je te beschermen tegen ondoordacht of zelfs frauduleus advies.",
      },
      { type: "h2", text: "Hoe check je dat zelf?" },
      {
        type: "p",
        text: "Controleer op fsma.be of een aanbieder vergund is, voor je op een aanbeveling ingaat. Een vergunning garandeert geen goed advies of gegarandeerd rendement, maar het betekent wel dat de aanbieder onder toezicht staat en aan wettelijke verplichtingen moet voldoen.",
      },
      {
        type: "list",
        items: [
          "Toezicht door de FSMA op de manier waarop de aanbieder werkt.",
          "Een verplichte geschiktheidstoets voor je een persoonlijk advies krijgt.",
          "Een aanbieder die je kan navragen en nakijken via het openbaar register op fsma.be.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Geen vergunning gevonden? Wees op je hoede",
        text: "Dat betekent dat je geen van de wettelijke beschermingen geniet die met een vergunning gepaard gaan. Twijfel je over de betrouwbaarheid van een aanbod, dan gaat FinEdu's leerstof over beleggingsfraude herkennen dieper in op veelvoorkomende signalen.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Liever zelf een indicatie berekenen dan op advies van derden vertrouwen?",
        text: "De beleggingsplan-simulator van FinEdu toont wat periodiek beleggen op termijn kan opleveren: een rekenmodel, geen advies.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk beleggingsadvies: FinEdu is zelf niet FSMA-vergund en geeft dus ook geen aanbevelingen over specifieke beleggingen. Twijfel je over een concreet aanbod? Check de vergunning op fsma.be of raadpleeg een erkend, vergund adviseur.",
      },
    ],
  },
  {
    slug: "wettelijk-erfdeel-testament-grenzen",
    title: "Je testament mag niet alles: het wettelijk erfdeel van je kinderen",
    summary:
      "Kinderen (en soms de partner) hebben altijd recht op een beschermd minimumdeel van een erfenis: de wettelijke reserve. Een testament kan dat deel niet wegnemen, ook niet als de overledene dat zou willen — enkel het beschikbaar deel dat overblijft, mag vrij verdeeld worden.",
    categorySlug: "erven",
    publishedAt: "2026-08-21",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Een testament laat je toe om zelf te bepalen wie wat erft. Toch is die vrijheid niet onbeperkt: heb je kinderen, dan kan je hen niet volledig onterven, hoe je testament ook is opgesteld. De wet beschermt hen met een minimumdeel dat altijd van hen blijft.",
      },
      { type: "h2", text: "De reserve: een beschermd minimum" },
      {
        type: "p",
        text: "Kinderen (en bij ontstentenis daarvan soms de partner) hebben altijd recht op een minimumdeel van de erfenis: de 'wettelijke reserve'. Een overledene kan dat deel niet wegschenken of via testament aan iemand anders toekennen, ook niet als hij of zij dat uitdrukkelijk zou willen.",
      },
      {
        type: "list",
        items: [
          "Kinderen van de overledene.",
          "Bij ontstentenis van kinderen, in bepaalde gevallen de partner.",
        ],
      },
      { type: "h2", text: "Het beschikbaar deel: hier heb je wel vrije keuze" },
      {
        type: "p",
        text: "Wat overblijft nadat de reserve is afgetrokken, heet het 'beschikbaar deel'. Dat deel mag wel vrij via testament worden verdeeld: aan een ander familielid, een goed doel, of wie je zelf kiest.",
      },
      { type: "h2", text: "Waarom dit ook als starter al meetelt" },
      {
        type: "p",
        text: "Erven en testamenten lijken ver weg als je net aan je carrière begint, maar de logica van de reserve speelt soms al vroeger mee: bijvoorbeeld wanneer ouders een schenking overwegen, of wanneer je zelf nadenkt over een testament bij een nieuw samengesteld gezin. De reserve geldt ongeacht hoe een testament is opgesteld.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Meer begrippen rond erven?",
        text: "Het financieel lexicon van FinEdu legt wettelijke reserve, legaat, nalatenschap en testament apart uit, en /wetgeving bundelt de wetgeving achter dit en andere FinEdu-onderwerpen.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen bindend advies over jouw concrete situatie: voor een testament, schenking of vraag over je eigen erfenis raadpleeg je een notaris.",
      },
    ],
  },
  {
    slug: "roerende-voorheffing-op-dividenden-en-interest",
    title: "Dividend of interest van je beleggingen? De roerende voorheffing is meestal al ingehouden",
    summary:
      "Krijg je dividenden of interest uit beleggingen, dan is de roerende voorheffing daar meestal al automatisch van afgehouden vóór het bedrag op je rekening komt. Voor de meeste particulieren is dat de eindbelasting: er moet dan niets meer in de belastingaangifte.",
    categorySlug: "sparen-en-beleggen",
    publishedAt: "2026-08-18",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Beleg je in aandelen, obligaties of fondsen en krijg je een keer dividend of interest uitgekeerd? Vaak valt op dat het bedrag dat op je rekening verschijnt, lager ligt dan wat je in de jaarcijfers van het bedrijf of fonds zag staan. Dat verschil is meestal de roerende voorheffing, die al werd ingehouden voor het bedrag bij jou terechtkwam.",
      },
      { type: "h2", text: "Wie houdt de roerende voorheffing in, en wanneer?" },
      {
        type: "p",
        text: "Op roerende inkomsten zoals dividenden en interest uit beleggingen houdt de uitkerende instelling — de bank, de broker of de fondsbeheerder — automatisch roerende voorheffing in, vóór ze het bedrag aan jou uitbetalen. Je hoeft daar zelf niets voor te doen: de inhouding gebeurt aan de bron, bij elke uitkering apart.",
      },
      { type: "h2", text: "Meestal de eindbelasting, maar niet altijd" },
      {
        type: "p",
        text: "Voor de meeste particulieren is de roerende voorheffing de eindbelasting op dat inkomen: er moet in de regel niets meer aangegeven worden in de personenbelasting. Er bestaan wel situaties en vrijstellingen waarbij dat verschilt, dus check je eigen situatie voor je ervan uitgaat dat een inkomen daarmee volledig is afgehandeld.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Tarief en vrijstellingen wijzigen soms",
        text: "FinEdu houdt zelf geen actueel tarief of overzicht van vrijstellingen bij. Check de actuele regels via FOD Financiën voor je cijfers baseert op wat je hier leest.",
      },
      { type: "h2", text: "Waar je dit concreet tegenkomt" },
      {
        type: "list",
        items: [
          "Dividend dat een onderneming uitkeert op aandelen die je aanhoudt.",
          "Interest die je ontvangt op obligaties in je portefeuille.",
          "Interest of dividend uitgekeerd door een beleggingsfonds waarin je belegt.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Begrippen of impact op langere termijn nog eens nalezen?",
        text: "Het financieel lexicon van FinEdu legt aandeel, obligatie, dividend en roerende voorheffing apart uit, en de beleggingsplan-simulator toont wat periodiek beleggen op termijn kan opleveren, inclusief de impact van kosten.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk fiscaal advies over jouw concrete situatie: voor een bindend antwoord over jouw beleggingsinkomsten raadpleeg je FOD Financiën of een erkend fiscalist.",
      },
    ],
  },
  {
    slug: "basisbankdienst-recht-op-een-rekening",
    title: "Je hebt recht op een bankrekening, ook zonder inkomen: de basisbankdienst uitgelegd",
    summary:
      "Iedereen die legaal in de EU verblijft, heeft het wettelijk recht om bij een Belgische bank een basisbankdienst te openen: een eenvoudige zichtrekening met betaalkaart, overschrijvingen en domiciliëringen, tegen een wettelijk begrensde jaarlijkse kost.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
    publishedAt: "2026-08-17",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "Een zichtrekening openen lijkt vanzelfsprekend, tot een bank je aanvraag weigert: geen vast inkomen, geen kredietgeschiedenis, of gewoon geen klant die de bank 'interessant' vindt. Toch hoef je hier niet zomaar bij neer te leggen: de wet verplicht Belgische banken om iedereen die legaal in de EU verblijft, minstens een basisbankdienst aan te bieden.",
      },
      { type: "h2", text: "Wat is een basisbankdienst precies?" },
      {
        type: "p",
        text: "De basisbankdienst is een eenvoudige zichtrekening met een beperkt maar functioneel pakket: een betaalkaart, de mogelijkheid om overschrijvingen te doen en te ontvangen, en domiciliëringen voor terugkerende facturen zoals energie of huur. Het is geen volwaardig pakket met alle extra's die een gewone zichtrekening kan hebben, maar wel genoeg om je dagelijkse geldzaken te regelen.",
      },
      { type: "h2", text: "Wanneer mag een bank weigeren?" },
      {
        type: "p",
        text: "Een bank mag je aanvraag voor een basisbankdienst niet zomaar afwijzen. Weigeren mag enkel in wettelijk bepaalde gevallen, bijvoorbeeld als je al een gelijkaardige rekening bij een andere bank hebt, of om redenen die te maken hebben met de antiwitwaswetgeving. Buiten die uitzonderingen heeft elke wettelijk in de EU verblijvende persoon recht op deze dienst.",
      },
      { type: "h2", text: "Wat mag het kosten?" },
      {
        type: "p",
        text: "Voor de basisbankdienst geldt een wettelijk begrensde jaarlijkse kost: een bank mag dus niet zomaar een willekeurig bedrag aanrekenen voor dit basispakket.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Het exacte maximumbedrag staat hier bewust niet",
        text: "FinEdu houdt zelf geen actueel maximumbedrag bij. Check het actuele bedrag en de aanvraagprocedure via Wikifin.be, de voorlichtingswebsite van de FSMA, voor je een aanvraag indient.",
      },
      {
        type: "list",
        items: [
          "Ga langs bij een Belgische bank naar keuze en vraag expliciet naar de 'basisbankdienst', niet naar een gewone zichtrekening.",
          "Neem een identiteitsbewijs mee waaruit blijkt dat je legaal in de EU verblijft.",
          "Wordt je aanvraag geweigerd zonder dat een van de wettelijke uitzonderingen van toepassing is? Vraag de bank naar de reden, en informeer je bij Wikifin.be of de FSMA over je vervolgstappen.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Weet je het verschil tussen een zichtrekening en de rest nog niet helemaal?",
        text: "Het financieel lexicon van FinEdu legt zichtrekening en gerelateerde begrippen apart uit.",
      },
      {
        type: "p",
        text: "Dit is algemene informatie op basis van de wet, geen persoonlijk advies over jouw concrete situatie: bij een geschil met een bank over een basisbankdienst kan je terecht bij de bank zelf, de Ombudsman in financiële geschillen, of voor duiding over je rechten bij Wikifin.be of de FSMA.",
      },
    ],
  },
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
