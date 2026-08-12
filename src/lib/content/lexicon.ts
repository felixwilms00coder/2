import { LexiconEntry } from "./types";

/**
 * Financieel lexicon: korte, feitelijke definities van jargon dat elders op
 * FinEdu gebruikt wordt. Bewust geen actuele bedragen, percentages of
 * belastingschijven — die wijzigen jaarlijks en horen thuis bij de officiële
 * bron (zie /wetgeving), niet in een woordenboek dat zelden herzien wordt.
 */
export const lexicon: LexiconEntry[] = [
  // Budget, betalen, lenen en verzekeren
  {
    slug: "nettoloon",
    term: "Nettoloon",
    uitleg:
      "Het bedrag dat op je rekening terechtkomt na aftrek van je RSZ-bijdrage en bedrijfsvoorheffing van je brutoloon.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "brutoloon",
    term: "Brutoloon",
    uitleg:
      "Het loon vóór aftrek van sociale bijdragen en belastingen — het bedrag dat in je arbeidscontract staat.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "rsz-bijdrage",
    term: "RSZ-bijdrage",
    uitleg:
      "De sociale zekerheidsbijdrage die automatisch van je brutoloon wordt afgehouden en dient voor onder meer pensioen, ziekteverzekering en werkloosheidsuitkeringen.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "bedrijfsvoorheffing",
    term: "Bedrijfsvoorheffing",
    uitleg:
      "Een voorschot op je uiteindelijke personenbelasting dat je werkgever elke maand van je loon inhoudt en doorstort aan de fiscus.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "debetrente",
    term: "Debetrente",
    uitleg:
      "De rente die je betaalt wanneer je geld leent, of wanneer je rekening in het rood staat.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "dossierkosten",
    term: "Dossierkosten",
    uitleg:
      "Eenmalige kosten die een bank of kredietgever aanrekent voor het opstellen en verwerken van een lening.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "schuldsaldoverzekering",
    term: "Schuldsaldoverzekering",
    uitleg:
      "Een verzekering die (een deel van) je resterende lening aflost als je overlijdt voor die volledig is terugbetaald — vaak verplicht bij een hypothecair krediet.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "vrijstelling-verzekering",
    term: "Vrijstelling (verzekering)",
    uitleg:
      "Het bedrag van een schadegeval dat je zelf betaalt, voor de verzekeraar de rest van de kosten op zich neemt. Een hogere vrijstelling betekent meestal een lagere premie.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "wachttijd",
    term: "Wachttijd",
    uitleg:
      "De periode net na het afsluiten van een verzekering waarin bepaalde schadegevallen nog niet gedekt zijn — vaak vermeld in de kleine lettertjes van de polis.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "opzegtermijn-verzekering",
    term: "Opzegtermijn (verzekering)",
    uitleg:
      "De periode die jij of de verzekeraar wettelijk in acht moet nemen om een verzekeringscontract stop te zetten, meestal geteld vanaf de jaarlijkse vervaldag.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "uitsluiting",
    term: "Uitsluiting",
    uitleg:
      "Een specifieke situatie of soort schade die een polis uitdrukkelijk niet dekt, ook al lijkt het schadegeval op het eerste zicht onder de algemene dekking te vallen. Staat in de algemene of bijzondere voorwaarden.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },
  {
    slug: "onderverzekering",
    term: "Onderverzekering",
    uitleg:
      "Wanneer het verzekerde bedrag lager ligt dan de werkelijke waarde van wat je verzekert. Bij een schadegeval kan de verzekeraar dan verhoudingsgewijs minder uitkeren dan de volledige schade.",
    categorySlug: "budget-betalen-lenen-en-verzekeren",
  },

  // Familie
  {
    slug: "feitelijk-samenwonen",
    term: "Feitelijk samenwonen",
    uitleg:
      "Samenwonen zonder dat te registreren bij de gemeente — de eenvoudigste vorm, maar met de minste wettelijke bescherming voor beide partners.",
    categorySlug: "familie",
  },
  {
    slug: "wettelijk-samenwonen",
    term: "Wettelijk samenwonen",
    uitleg:
      "Samenwonen met een officiële verklaring bij de burgerlijke stand, wat een aantal wettelijke rechten en plichten met zich meebrengt zonder te huwen.",
    categorySlug: "familie",
  },
  {
    slug: "huwelijksvermogensstelsel",
    term: "Huwelijksvermogensstelsel",
    uitleg:
      "De set regels die bepaalt welk vermogen van jou, van je partner, of gemeenschappelijk is tijdens en na een huwelijk.",
    categorySlug: "familie",
  },
  {
    slug: "voogdij",
    term: "Voogdij",
    uitleg:
      "De wettelijke verantwoordelijkheid over een minderjarig kind wanneer de ouders er zelf niet of niet meer voor kunnen zorgen.",
    categorySlug: "familie",
  },
  {
    slug: "groeipakket",
    term: "Groeipakket",
    uitleg:
      "De Vlaamse financiële ondersteuning voor gezinnen met kinderen, maandelijks uitbetaald per kind.",
    categorySlug: "familie",
  },

  // Sparen en beleggen
  {
    slug: "basisrente",
    term: "Basisrente",
    uitleg:
      "Het vaste rentepercentage dat je op een spaarrekening krijgt, ongeacht hoelang het geld al op de rekening staat.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "getrouwheidspremie",
    term: "Getrouwheidspremie",
    uitleg:
      "Een extra rentepercentage op spaargeld dat een volledig jaar ononderbroken op dezelfde rekening blijft staan.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "samengestelde-interest",
    term: "Samengestelde interest",
    uitleg:
      "Interest die je ook verdient op eerder verdiende interest, waardoor een bedrag steeds sneller aangroeit naarmate de tijd vordert.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "diversificatie",
    term: "Diversificatie",
    uitleg:
      "Je geld spreiden over verschillende beleggingen in plaats van alles in één aandeel of fonds te steken, om het risico te verlagen.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "etf-tracker",
    term: "ETF / tracker",
    uitleg:
      "Een beleggingsfonds dat een index (zoals de S&P 500) passief volgt, en dat je net als een aandeel op de beurs kan kopen en verkopen.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "lopende-kosten",
    term: "Lopende kosten (TER)",
    uitleg:
      "Het jaarlijkse percentage dat een beleggingsfonds inhoudt voor beheer, ongeacht of het fonds winst of verlies maakt.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "beurstaks",
    term: "Beurstaks",
    uitleg:
      "Een Belgische belasting op beursverrichtingen (TOB) die je betaalt bij de aan- of verkoop van bepaalde beleggingen.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "volatiliteit",
    term: "Volatiliteit",
    uitleg:
      "Hoe sterk de waarde van een belegging schommelt over een bepaalde periode — hoe hoger de volatiliteit, hoe onvoorspelbaarder de korte termijn.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "depositogarantiestelsel",
    term: "Depositogarantiestelsel",
    uitleg:
      "De Belgische regeling die spaargeld tot een bepaald bedrag per persoon per bank beschermt als die bank failliet gaat.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "instapkost",
    term: "Instapkost",
    uitleg:
      "Een eenmalige kost, uitgedrukt als percentage van je inleg, die je betaalt bij de aankoop van een beleggingsfonds — komt bovenop de lopende kosten.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "uitstapkost",
    term: "Uitstapkost",
    uitleg:
      "Een kost die sommige fondsen aanrekenen wanneer je verkoopt, soms enkel als dat binnen een bepaalde periode na aankoop gebeurt.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "kapitaalgarantie",
    term: "Kapitaalgarantie",
    uitleg:
      "De belofte dat je bij het einde van de looptijd minstens je ingelegd kapitaal terugkrijgt, ongeacht hoe de onderliggende belegging presteerde. Geldt meestal enkel op de eindvervaldag, niet bij tussentijdse verkoop.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "tak21",
    term: "Tak 21",
    uitleg:
      "Een levensverzekeringsproduct met een gewaarborgd rendement en kapitaalbescherming, door verzekeraars aangeboden als spaar- of beleggingsalternatief.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "tak23",
    term: "Tak 23",
    uitleg:
      "Een levensverzekeringsproduct waarbij je premie belegd wordt in onderliggende fondsen, zonder gewaarborgd rendement — de opbrengst (of het verlies) hangt volledig af van hoe die fondsen presteren.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "essentiele-informatiedocument",
    term: "Essentiële-informatiedocument (KID)",
    uitleg:
      "Een verplicht, gestandaardiseerd document dat de belangrijkste kenmerken, kosten en risico's van een verpakt beleggingsproduct samenvat, dat je vóór aankoop moet kunnen inkijken.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "risico-indicator",
    term: "Risico-indicator",
    uitleg:
      "Een cijfer, meestal van 1 tot 7, op het essentiële-informatiedocument dat aangeeft hoe risicovol een beleggingsproduct is ten opzichte van andere producten.",
    categorySlug: "sparen-en-beleggen",
  },
  {
    slug: "beheersvergoeding",
    term: "Beheersvergoeding",
    uitleg:
      "De jaarlijkse vergoeding voor wie het fonds of de portefeuille beheert — meestal al verrekend in de lopende kosten, niet apart aangerekend.",
    categorySlug: "sparen-en-beleggen",
  },

  // Erven
  {
    slug: "erfbelasting",
    term: "Erfbelasting",
    uitleg:
      "De belasting die een erfgenaam betaalt op wat hij of zij erft, met een tarief dat afhangt van de bloed- of aanverwantschap en het bedrag.",
    categorySlug: "erven",
  },
  {
    slug: "wettelijke-reserve",
    term: "Wettelijke reserve",
    uitleg:
      "Het deel van een nalatenschap dat wettelijk gereserveerd is voor bepaalde erfgenamen (zoals kinderen), ook als een testament anders zou bepalen.",
    categorySlug: "erven",
  },
  {
    slug: "legaat",
    term: "Legaat",
    uitleg:
      "Een specifiek goed of bedrag dat iemand in een testament nalaat aan een bepaalde persoon.",
    categorySlug: "erven",
  },
  {
    slug: "nalatenschap",
    term: "Nalatenschap",
    uitleg: "Alle bezittingen en schulden die iemand achterlaat bij overlijden.",
    categorySlug: "erven",
  },
  {
    slug: "verwerpen-van-een-erfenis",
    term: "Verwerpen van een erfenis",
    uitleg:
      "De keuze om een erfenis niet te aanvaarden — bijvoorbeeld omdat de schulden groter zijn dan de bezittingen.",
    categorySlug: "erven",
  },

  // Pensioen en pensioenvoorbereiding
  {
    slug: "wettelijk-pensioen",
    term: "Wettelijk pensioen",
    uitleg:
      "Het pensioen dat je opbouwt via de sociale zekerheid, op basis van je loopbaan als werknemer, zelfstandige of ambtenaar.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
  },
  {
    slug: "aanvullend-pensioen",
    term: "Aanvullend pensioen",
    uitleg:
      "Pensioenkapitaal dat je werkgever (tweede pijler) of jijzelf (derde pijler) apart opbouwt, bovenop het wettelijk pensioen.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
  },
  {
    slug: "pensioensparen",
    term: "Pensioensparen",
    uitleg:
      "Een vorm van sparen of beleggen met belastingvoordeel, bedoeld om een kapitaal op te bouwen tegen je pensioen (derde pijler).",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
  },
  {
    slug: "vapz",
    term: "VAPZ",
    uitleg:
      "Vrij Aanvullend Pensioen voor Zelfstandigen — een fiscaal voordelige manier voor zelfstandigen om een aanvullend pensioen op te bouwen.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
  },
  {
    slug: "loopbaanjaren",
    term: "Loopbaanjaren",
    uitleg:
      "Het aantal jaren dat je gewerkt hebt, bepalend voor de hoogte van je wettelijk pensioen.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
  },
  {
    slug: "gelijkgestelde-periodes",
    term: "Gelijkgestelde periodes",
    uitleg:
      "Periodes waarin je niet werkte (bijvoorbeeld tijdelijke werkloosheid of ziekte) maar die toch meetellen voor de berekening van je pensioen.",
    categorySlug: "pensioen-en-pensioenvoorbereiding",
  },

  // Belasting, werk en inkomen
  {
    slug: "personenbelasting",
    term: "Personenbelasting",
    uitleg:
      "De jaarlijkse belasting op het inkomen van particulieren, berekend via een belastingaangifte.",
    categorySlug: "belasting-werk-en-inkomen",
  },
  {
    slug: "belastingschijven",
    term: "Belastingschijven",
    uitleg:
      "Het progressieve systeem waarbij een hoger percentage van je inkomen belast wordt naarmate dat inkomen hoger is — enkel het deel boven een drempel valt in de hogere schijf.",
    categorySlug: "belasting-werk-en-inkomen",
  },
  {
    slug: "belastingvrije-som",
    term: "Belastingvrije som",
    uitleg: "Het deel van je inkomen waarop je geen personenbelasting betaalt.",
    categorySlug: "belasting-werk-en-inkomen",
  },
  {
    slug: "flexi-job",
    term: "Flexi-job",
    uitleg:
      "Een vorm van bijverdienen naast een hoofdjob of pensioen, met een gunstig belastingregime, in bepaalde sectoren zoals horeca en handel.",
    categorySlug: "belasting-werk-en-inkomen",
  },
  {
    slug: "fiscaal-voordeel",
    term: "Fiscaal voordeel",
    uitleg:
      "Een vermindering van je belastingen die je krijgt door bepaalde uitgaven te doen, zoals pensioensparen of een hypothecair krediet.",
    categorySlug: "belasting-werk-en-inkomen",
  },
  {
    slug: "eindejaarspremie",
    term: "Eindejaarspremie",
    uitleg:
      "Een extra premie die veel werknemers eind december bovenop hun normale loon krijgen, meestal geregeld via een sector- of bedrijfs-cao.",
    categorySlug: "belasting-werk-en-inkomen",
  },

  // Woning en hypothecaire lening
  {
    slug: "hypothecair-krediet",
    term: "Hypothecair krediet",
    uitleg:
      "Een lening om een woning te kopen, bouwen of verbouwen, waarbij de woning zelf als onderpand (hypotheek) dient.",
    categorySlug: "woning-en-hypothecaire-lening",
  },
  {
    slug: "registratierechten",
    term: "Registratierechten",
    uitleg:
      "De belasting die je betaalt bij de aankoop van een woning of grond, berekend op de aankoopprijs — in Vlaanderen ook wel het verkooprecht genoemd.",
    categorySlug: "woning-en-hypothecaire-lening",
  },
  {
    slug: "notariskosten",
    term: "Notariskosten",
    uitleg:
      "De kosten voor de notaris die de aankoopakte van een woning opstelt, bovenop de registratierechten.",
    categorySlug: "woning-en-hypothecaire-lening",
  },
  {
    slug: "vaste-vs-variabele-rente",
    term: "Vaste vs. variabele rente",
    uitleg:
      "Bij een vaste rente blijft je rentevoet gelijk over de hele looptijd; bij een variabele rente kan ze periodiek stijgen of dalen volgens een referentie-index.",
    categorySlug: "woning-en-hypothecaire-lening",
  },
  {
    slug: "quotiteit",
    term: "Quotiteit",
    uitleg:
      "De verhouding tussen het geleende bedrag en de waarde van de woning — hoe hoger de quotiteit, hoe meer risico de bank loopt en hoe hoger vaak de rente.",
    categorySlug: "woning-en-hypothecaire-lening",
  },
  {
    slug: "onroerende-voorheffing",
    term: "Onroerende voorheffing",
    uitleg:
      "Een jaarlijkse belasting op vastgoed dat je bezit, berekend op het kadastraal inkomen van de woning.",
    categorySlug: "woning-en-hypothecaire-lening",
  },
];

export function getLexiconEntry(slug: string): LexiconEntry | undefined {
  return lexicon.find((e) => e.slug === slug);
}
