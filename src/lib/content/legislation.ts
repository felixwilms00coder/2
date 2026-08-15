import { LegislationEntry } from "./types";

/**
 * Curated, in gewone taal herschreven samenvattingen van wetgeving die
 * relevant is voor de onderwerpen op FinEdu. Dit zijn GEEN volledige of
 * juridisch sluitende weergaves van de wet — enkel de kernstructuur, met
 * telkens een link naar de officieel geconsolideerde tekst (Justel of de
 * Vlaamse Codex) voor wie de precieze bepaling wil nalezen.
 *
 * Cijfers, tarieven, drempels en termijnen die jaarlijks of vaak wijzigen
 * (belastingschijven, RSZ-percentages, erfbelastingtarieven per schijf...)
 * staan hier bewust NIET in absolute bedragen — enkel de structuur van de
 * regel. Voor exacte, actuele cijfers verwijst elke samenvatting naar de
 * officiële bron.
 *
 * Onderhoud: `lastVerified` is de datum waarop een redacteur de
 * samenvatting laatst tegen de officiële tekst aflegde. Dit gebeurt
 * handmatig — er is geen geautomatiseerde monitoring van wetswijzigingen.
 * Herlees deze lijst minstens jaarlijks en telkens na een bekende
 * wetswijziging in een van de onderwerpen.
 */
export const legislation: LegislationEntry[] = [
  {
    slug: "wettelijk-erfdeel",
    title: "Iedereen met kinderen heeft een beschermd minimumdeel in de erfenis",
    officialTitle: "Burgerlijk Wetboek, Boek 4: Erfenissen, schenkingen en testamenten",
    jurisdiction: "federaal",
    topics: ["erven"],
    summary:
      "Kinderen (en bij ontstentenis daarvan soms de partner) hebben altijd recht op een minimumdeel van de erfenis, de 'reserve'. Dat deel kan een overledene niet wegschenken of via testament aan iemand anders geven, ook niet als hij dat zou willen. Wat overblijft na de reserve: het 'beschikbaar deel': mag wel vrij via testament worden verdeeld.",
    sourceUrl:
      "https://www.ejustice.just.fgov.be/eli/wet/1804/03/21/1804032150/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "vlaamse-erfbelasting-schijven",
    title: "Vlaamse erfbelasting werkt met schijven, en het tarief hangt af van de band met de overledene",
    officialTitle: "Vlaamse Codex Fiscaliteit, titel 2, hoofdstuk 8 (erfbelasting)",
    jurisdiction: "vlaams",
    topics: ["erven"],
    summary:
      "Wie erft in het Vlaamse Gewest, betaalt erfbelasting volgens een progressief schijvenstelsel: hoe groter het geërfde bedrag, hoe hoger het tarief op dat gedeelte. Het tarief hangt ook af van wie erft: partners en kinderen (rechte lijn) betalen minder dan broers/zussen, en zij weer minder dan anderen. De exacte schijfgrenzen en percentages wijzigen soms: check ze bij VLABEL voor je een concreet bedrag berekent.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/decreet/2013/12/13/2013036016/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "vlaamse-schenkbelasting",
    title: "Schenken tijdens het leven kan vaak voordeliger zijn dan erven, mits je de regels volgt",
    officialTitle: "Vlaamse Codex Fiscaliteit, titel 2, hoofdstuk 7 (schenkbelasting)",
    jurisdiction: "vlaams",
    topics: ["schenking", "erven"],
    summary:
      "Een schenking van roerende goederen (geld, effecten) via de notaris wordt belast tegen een vast, doorgaans laag tarief. Onroerend goed schenken (bv. een woning) gebeurt altijd via de notaris en volgt een apart, progressief tarief. Belangrijk: overlijdt de schenker binnen een bepaalde termijn na een niet-geregistreerde schenking (bv. een handgift), dan kan de fiscus die alsnog als erfenis belasten. De exacte termijn en tarieven wijzigen soms: laat dit door een notaris bevestigen voor je schenkt.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/decreet/2013/12/13/2013036016/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "opzegtermijn-woninghuur-vlaanderen",
    title: "Een huurcontract van 9 jaar opzeggen kan, maar met vaste termijnen en soms een vergoeding",
    officialTitle: "Vlaams Huurdecreet van 9 november 2018",
    jurisdiction: "vlaams",
    topics: ["woning"],
    summary:
      "Bij een standaard woninghuurcontract van 9 jaar in Vlaanderen gelden vaste opzegregels voor zowel huurder als verhuurder: een minimale opzegtermijn, en in sommige gevallen een opzegvergoeding als je vroeger dan een bepaald moment in de looptijd opzegt. De verhuurder kan bovendien alleen opzeggen om specifieke, wettelijk voorziene redenen (bv. zelf gaan wonen, renoveren). Kortlopende contracten (3 jaar of minder) volgen een ander, strenger regime. Check de exacte termijnen in je concrete situatie, want die verschillen per type contract.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/decreet/2018/11/09/2018014728/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "herroepingsrecht-consumentenkrediet",
    title: "Bij een consumentenkrediet heb je altijd 14 dagen bedenktijd",
    officialTitle: "Wetboek van Economisch Recht, Boek VII: Betalings- en kredietdiensten",
    jurisdiction: "federaal",
    topics: ["lenen"],
    summary:
      "Sluit je een consumentenkrediet af (bv. voor een auto of om schulden te herfinancieren), dan heb je wettelijk 14 kalenderdagen de tijd om zonder reden en zonder kosten van het contract af te zien. De kredietgever moet je voor het afsluiten ook een gestandaardiseerd informatieblad geven met onder meer het jaarlijkse kostenpercentage (JKP), zodat je aanbiedingen kan vergelijken.",
    sourceUrl:
      "https://www.ejustice.just.fgov.be/eli/wet/2013/03/19/2013011142/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "bedrijfsvoorheffing-personenbelasting",
    title: "Bedrijfsvoorheffing is een voorschot, geen definitieve belasting",
    officialTitle: "Wetboek van de Inkomstenbelastingen 1992 (WIB92)",
    jurisdiction: "federaal",
    topics: ["belasting", "werk"],
    summary:
      "Wat je werkgever maandelijks inhoudt als bedrijfsvoorheffing, is een voorschot op je uiteindelijke personenbelasting: niet het definitieve bedrag. Bij je jaarlijkse belastingaangifte wordt je échte belasting berekend op basis van je totale inkomen van het jaar (progressieve schijven) en vergeleken met wat al werd voorafbetaald: het verschil krijg je terug, of moet je bijbetalen. De schijfgrenzen en percentages worden jaarlijks geïndexeerd.",
    sourceUrl:
      "https://www.ejustice.just.fgov.be/eli/wet/1992/04/10/1992003308/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "rsz-werknemersbijdrage",
    title: "De RSZ-bijdrage financiert de hele sociale zekerheid, niet alleen je eigen pensioen",
    officialTitle: "Wet van 27 juni 1969 betreffende de sociale zekerheid der werknemers",
    jurisdiction: "federaal",
    topics: ["belasting", "werk", "pensioen"],
    summary:
      "De sociale zekerheidsbijdrage die op je brutoloon wordt ingehouden, gaat naar een gemeenschappelijke pot die onder meer het wettelijk pensioen, de ziekte- en invaliditeitsverzekering, de werkloosheidsuitkering en het kindergeld financiert. Het is geen individuele spaarpot op jouw naam: je bouwt wel pensioenrechten op naarmate je meer en langer bijdraagt.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/wet/1969/06/27/1969062702/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "roerende-voorheffing-beleggingsinkomsten",
    title: "Roerende voorheffing wordt automatisch ingehouden op dividenden en interest",
    officialTitle: "Wetboek van de Inkomstenbelastingen 1992 (WIB92)",
    jurisdiction: "federaal",
    topics: ["beleggen", "sparen"],
    summary:
      "Op roerende inkomsten zoals dividenden en interest uit beleggingen houdt de uitkerende instelling (de bank, de broker, de fondsbeheerder) automatisch roerende voorheffing in, vóór ze het bedrag aan jou uitbetaalt. Voor de meeste particulieren is dit doorgaans de eindbelasting op dat inkomen: er moet in de regel niets meer aangegeven worden in de personenbelasting, al bestaan er situaties en vrijstellingen waarbij dat verschilt. Het tarief en eventuele vrijstellingen wijzigen soms: check de actuele regels via FOD Financiën voor je cijfers baseert op wat je hier leest.",
    sourceUrl:
      "https://www.ejustice.just.fgov.be/eli/wet/1992/04/10/1992003308/justel",
    lastVerified: "2026-08-14",
  },
  {
    slug: "mifid-beleggingsadvies-vergunning",
    title: "Wie beleggingsadvies geeft of je portefeuille beheert, heeft daarvoor een FSMA-vergunning nodig",
    officialTitle: "Wet van 2 augustus 2002 betreffende het toezicht op de financiële sector (omzetting MiFID II)",
    jurisdiction: "eu",
    topics: ["sparen", "beleggen"],
    summary:
      "Een concrete, persoonlijke aanbeveling geven over te kopen of verkopen financiële instrumenten ('beleggingsadvies'), of voor iemand anders beleggingsbeslissingen nemen ('vermogensbeheer'), zijn in België gereglementeerde diensten. Wie dat aanbiedt, heeft een FSMA-vergunning nodig en moet onder meer een geschiktheidstoets afnemen bij de klant. Controleer op fsma.be of een aanbieder vergund is voor je erop ingaat.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/wet/2002/08/02/2002003392/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "depositogarantiestelsel",
    title: "Je spaargeld is beschermd tot een bepaald bedrag per bank, mocht die omvallen",
    officialTitle:
      "Wet van 25 april 2014 op het statuut van en het toezicht op kredietinstellingen (omzetting EU-richtlijn depositogarantiestelsels)",
    jurisdiction: "eu",
    topics: ["sparen"],
    summary:
      "Geld op een spaar- of zichtrekening bij een bank met een Belgische of Europese vergunning is via het depositogarantiestelsel beschermd tot een vast bedrag per persoon per bank, mocht de bank failliet gaan. Heb je spaargeld verspreid over meerdere banken, dan geldt die bescherming per bank apart: bij dezelfde bank stapelt het niet op als je er meerdere rekeningen hebt. Het exacte beschermde bedrag ligt wettelijk vast maar wijzigt zelden; controleer het actuele bedrag bij het Garantiefonds voor financiële diensten.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/wet/2014/04/25/2014003195/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "verzekeringsbemiddeling-vergunning",
    title: "Wie verzekeringen voorstelt, aanbeveelt of vergelijkt als dienst, heeft daarvoor een FSMA-registratie nodig",
    officialTitle: "Wet van 4 april 2014 betreffende de verzekeringen (omzetting IDD: Insurance Distribution Directive)",
    jurisdiction: "eu",
    topics: ["verzekeren"],
    summary:
      "Verzekeringsbemiddeling: het voorstellen, aanbevelen, vergelijken of voorbereidend werk doen richting het afsluiten van een verzekeringscontract: is in België een gereglementeerde activiteit. Wie dat als dienst aanbiedt, ook zonder commissie te ontvangen, moet geregistreerd zijn bij de FSMA als verzekeringstussenpersoon. Consumenten kunnen die registratie nakijken via het openbaar register op fsma.be voor ze op een aanbeveling ingaan.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/wet/2014/04/04/2014011240/justel",
    lastVerified: "2026-08-04",
  },
  {
    slug: "ouderschapsverlof-thematisch-verlof",
    title: "Ouderschapsverlof is een recht op tijdelijk minder werken, met een vervangingsuitkering via de RVA",
    officialTitle:
      "Herstelwet van 22 januari 1985 houdende sociale bepalingen, hoofdstuk IV bis (ouderschapsverlof en andere thematische verloven)",
    jurisdiction: "federaal",
    topics: ["familie", "werk"],
    summary:
      "Ouderschapsverlof behoort tot de 'thematische verloven': een werknemer met voldoende anciënniteit kan voor een jong kind tijdelijk volledig stoppen met werken, deeltijds gaan werken, of het arbeidsritme verminderen, met behoud van de band met de werkgever en een wettelijk recht om nadien terug te keren naar dezelfde of een gelijkwaardige functie. Voor het inkomen dat je tijdens die periode misloopt, kan je een vervangingsuitkering aanvragen bij de RVA; die dekt het gemiste loon in de regel niet volledig. De precieze voorwaarden (leeftijdsgrens van het kind, minimale anciënniteit, mogelijke opnamevormen) en het uitkeringsbedrag wijzigen geregeld: check de actuele regels bij de RVA voor je plannen maakt.",
    sourceUrl:
      "https://www.ejustice.just.fgov.be/eli/wet/1985/01/22/1985012230/justel",
    lastVerified: "2026-08-15",
  },
  {
    slug: "pensioenberekening-loopbaanjaren-werknemers",
    title: "Je wettelijk pensioen wordt jaar per jaar opgebouwd, niet als vast bedrag",
    officialTitle:
      "Koninklijk besluit nr. 50 van 24 oktober 1967 betreffende het rust- en overlevingspensioen voor werknemers",
    jurisdiction: "federaal",
    topics: ["pensioen", "werk"],
    summary:
      "Het wettelijk pensioen van werknemers wordt niet als één vast percentage van je laatste loon berekend, maar loopbaanjaar per loopbaanjaar opgebouwd: voor elk jaar telt het toenmalige loon mee, tot een wettelijk plafond. Naast effectief gewerkte jaren erkent de wet ook 'gelijkgestelde periodes', zoals bepaalde vormen van werkloosheid, ziekte of invaliditeit, die onder voorwaarden meetellen alsof je gewerkt had. Hoeveel loopbaanjaren nodig zijn voor een volledig pensioen en welke periodes precies gelijkgesteld worden, ligt vast in uitvoeringsbesluiten die kunnen wijzigen: check de actuele regels en je eigen loopbaanoverzicht via mypension.be of de Federale Pensioendienst.",
    sourceUrl:
      "https://www.ejustice.just.fgov.be/eli/besluit/1967/10/24/1967102401/justel",
    lastVerified: "2026-08-15",
  },
  {
    slug: "wap-minimumrendement-aanvullend-pensioen",
    title: "Bij een groepsverzekering garandeert de wet een minimumrendement op de bijdragen",
    officialTitle:
      "Wet van 28 april 2003 betreffende de aanvullende pensioenen en het belastingstelsel van die pensioenen en van sommige aanvullende voordelen inzake sociale zekerheid (WAP)",
    jurisdiction: "federaal",
    topics: ["pensioen", "werk"],
    summary:
      "De Wet Aanvullende Pensioenen (WAP) legt de spelregels vast voor het aanvullend pensioen dat een werkgever voor werknemers opbouwt (tweede pijler), zoals een groepsverzekering. Eén van die regels: de werkgever of inrichter moet op de gestorte bijdragen een wettelijk minimumrendement garanderen, ongeacht het werkelijke beleggingsresultaat van de verzekeraar of het pensioenfonds. Het percentage van dat minimumrendement staat niet vast in de wet zelf en kan wijzigen: de actuele stand vraag je na bij je pensioeninstelling of vind je bij de FSMA.",
    sourceUrl: "https://www.ejustice.just.fgov.be/eli/wet/2003/04/28/2003022481/justel",
    lastVerified: "2026-08-15",
  },
];

export function getLegislationForTopics(topics: string[]): LegislationEntry[] {
  return legislation.filter((entry) =>
    entry.topics.some((t) => topics.includes(t)),
  );
}
