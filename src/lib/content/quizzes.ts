import { Quiz } from "./types";

export const quizzes: Quiz[] = [
  {
    slug: "financieel-fit-als-starter",
    title: "Ben jij financieel fit als starter?",
    short: "10 vragen over loon, sparen, lenen en verzekeren",
    description:
      "Test in een paar minuten hoeveel je al weet over je loonstrookje, budgetteren, sparen en verzekeren als starter op de arbeidsmarkt. Na elke vraag krijg je meteen uitleg.",
    questions: [
      {
        question:
          "Welk percentage van je brutoloon gaat er als werknemer ongeveer naar de sociale zekerheid (RSZ)?",
        options: [
          { text: "Ongeveer 3%", correct: false },
          { text: "Ongeveer 13%", correct: true },
          { text: "Ongeveer 25%", correct: false },
          { text: "Ongeveer 40%", correct: false },
        ],
        explanation:
          "Werknemers dragen ongeveer 13,07% van hun brutoloon af als RSZ-bijdrage. Dit financiert onder andere je pensioen, ziekteverzekering en werkloosheidsuitkering.",
      },
      {
        question:
          "Wat betekent 'bedrijfsvoorheffing' op je loonstrookje?",
        options: [
          {
            text: "Een boete voor te laat komen op het werk",
            correct: false,
          },
          {
            text: "Een voorschot op je uiteindelijke personenbelasting",
            correct: true,
          },
          { text: "Een verplichte bijdrage aan je vakbond", correct: false },
          { text: "De prijs van je maaltijdcheques", correct: false },
        ],
        explanation:
          "De bedrijfsvoorheffing is een voorschot dat je werkgever al inhoudt op je loon. Bij je jaarlijkse belastingaangifte wordt bekeken of dat voorschot klopte, te hoog of te laag was.",
      },
      {
        question:
          "Volgens de 50/30/20-regel: welk percentage van je nettoloon reserveer je richtlijn-gewijs voor sparen en schulden aflossen?",
        options: [
          { text: "5%", correct: false },
          { text: "20%", correct: true },
          { text: "50%", correct: false },
          { text: "80%", correct: false },
        ],
        explanation:
          "De 50/30/20-regel stelt voor om 50% van je nettoloon aan noden te besteden, 30% aan wensen, en 20% te sparen of schulden mee af te lossen. Het zijn richtpercentages, geen strikte regel.",
      },
      {
        question:
          "Hoeveel maanden aan noodzakelijke uitgaven wordt vaak als vuistregel gebruikt voor een noodbuffer?",
        options: [
          { text: "0,5 tot 1 maand", correct: false },
          { text: "3 tot 6 maanden", correct: true },
          { text: "12 tot 18 maanden", correct: false },
          { text: "24 tot 36 maanden", correct: false },
        ],
        explanation:
          "Een courante vuistregel is drie tot zes maanden aan noodzakelijke uitgaven als noodbuffer, afhankelijk van je persoonlijke situatie (vast contract, gezinslasten, zelfstandige activiteit...).",
      },
      {
        question: "Wat geeft het JKP (jaarlijks kostenpercentage) bij een lening weer?",
        options: [
          {
            text: "Enkel de rentevoet, zonder bijkomende kosten",
            correct: false,
          },
          {
            text: "De totale kostprijs van een krediet op jaarbasis, inclusief kosten",
            correct: true,
          },
          { text: "Het bedrag dat je maandelijks terugbetaalt", correct: false },
          {
            text: "De belasting die je betaalt op een lening",
            correct: false,
          },
        ],
        explanation:
          "Het JKP geeft de volledige kostprijs van een krediet weer op jaarbasis, rente én kosten inbegrepen. Het is de beste maatstaf om leningen van verschillende aanbieders te vergelijken.",
      },
      {
        question:
          "Welke verzekering wordt vaak als eerste prioriteit aanbevolen voor starters, ook al is ze niet overal wettelijk verplicht?",
        options: [
          {
            text: "Verzekering voor een nieuwe smartphone",
            correct: false,
          },
          { text: "Familiale verzekering (burgerlijke aansprakelijkheid)", correct: true },
          { text: "Annulatieverzekering voor reizen", correct: false },
          { text: "Verzekering tegen diefstal van een fiets", correct: false },
        ],
        explanation:
          "De familiale verzekering dekt schade die je per ongeluk aan anderen toebrengt, en dat kan om zeer hoge bedragen gaan. Ze is relatief goedkoop en dekt een groot financieel risico.",
      },
      {
        question:
          "Hoeveel pensioenpijlers kent het Belgische pensioensysteem?",
        options: [
          { text: "1", correct: false },
          { text: "2", correct: false },
          { text: "3", correct: true },
          { text: "5", correct: false },
        ],
        explanation:
          "België kent drie pensioenpijlers: het wettelijk pensioen (pijler 1), het aanvullend pensioen via je werkgever (pijler 2), en individueel pensioensparen (pijler 3).",
      },
      {
        question:
          "Waarom maakt vroeg beginnen met sparen of beleggen voor je pensioen zo'n groot verschil?",
        options: [
          {
            text: "Omdat de belastingvrije som dan hoger ligt",
            correct: false,
          },
          {
            text: "Door het rente-op-rente-effect krijgt je geld meer tijd om te groeien",
            correct: true,
          },
          {
            text: "Omdat werkgevers verplicht zijn extra bij te dragen bij jonge werknemers",
            correct: false,
          },
          { text: "Dat maakt eigenlijk geen verschil", correct: false },
        ],
        explanation:
          "Dankzij het rente-op-rente-effect groeit geld dat je vroeg opzij zet gedurende meer jaren. Daardoor kan een kleiner bedrag dat je jong inlegt, op termijn meer opbrengen dan een groter bedrag dat je later inlegt.",
      },
      {
        question:
          "Wat is over het algemeen waar over het verband tussen risico en verwacht rendement bij beleggen?",
        options: [
          {
            text: "Hoger risico betekent meestal een hoger verwacht rendement",
            correct: true,
          },
          {
            text: "Risico en rendement hebben niets met elkaar te maken",
            correct: false,
          },
          {
            text: "Een hoger risico levert altijd een lager rendement op",
            correct: false,
          },
          {
            text: "Beleggen kent geen enkel risico als je lang genoeg wacht",
            correct: false,
          },
        ],
        explanation:
          "Als vuistregel geldt: hoe hoger het verwachte rendement van een belegging, hoe hoger doorgaans ook het risico. Er bestaat geen belegging met hoog rendement en geen risico.",
      },
      {
        question:
          "Je hebt een noodbuffer nodig. Waar zet je dat geld het best opzij?",
        options: [
          {
            text: "In aandelen, voor het hoogste verwachte rendement",
            correct: false,
          },
          {
            text: "Op een gereglementeerde spaarrekening, apart van je zichtrekening",
            correct: true,
          },
          { text: "Cash thuis in een lade", correct: false },
          {
            text: "In een langetermijnbelegging die je pas na 10 jaar kan opnemen",
            correct: false,
          },
        ],
        explanation:
          "Een noodbuffer moet snel beschikbaar en veilig zijn. Een gereglementeerde spaarrekening, gescheiden van je zichtrekening, is daarvoor het meest geschikt. Beleggingen kunnen in waarde schommelen net wanneer je het geld nodig hebt.",
      },
    ],
  },
  {
    slug: "wonen-en-lenen",
    title: "Wonen en lenen: wat je vergeet mee te rekenen",
    short: "8 vragen over hypothecair krediet, rente en de kosten errond",
    description:
      "Test wat je al weet over een hypothecair krediet: quotiteit, vaste versus variabele rente, en de kosten die je makkelijk over het hoofd ziet.",
    questions: [
      {
        question: "Wat betekent 'quotiteit' bij een hypothecair krediet?",
        options: [
          { text: "De rente die je betaalt", correct: false },
          {
            text: "De verhouding tussen het geleende bedrag en de waarde van de woning",
            correct: true,
          },
          { text: "De duur van de lening in jaren", correct: false },
          { text: "De notariskosten bij de aankoop", correct: false },
        ],
        explanation:
          "Hoe hoger de quotiteit: hoe meer je leent in verhouding tot de woningwaarde: hoe meer risico de bank loopt, wat vaak resulteert in een hogere rente.",
      },
      {
        question:
          "Wat is het verschil tussen een vaste en een variabele rente?",
        options: [
          {
            text: "Bij een vaste rente verandert de rentevoet niet tijdens de looptijd; bij een variabele rente kan ze periodiek wijzigen volgens een index",
            correct: true,
          },
          { text: "Een vaste rente is in België wettelijk verboden", correct: false },
          {
            text: "Bij een variabele rente kies je zelf elk jaar een nieuw percentage",
            correct: false,
          },
          { text: "Er is geen echt verschil, enkel de naam varieert", correct: false },
        ],
        explanation:
          "Een vaste rente geeft zekerheid over je maandlast voor de hele looptijd. Een variabele rente kan lager starten, maar kan later stijgen of dalen.",
      },
      {
        question: "Wat dekt een schuldsaldoverzekering?",
        options: [
          {
            text: "Ze betaalt (een deel van) je resterende lening af als je overlijdt voor die volledig is terugbetaald",
            correct: true,
          },
          { text: "Ze vergoedt schade aan je woning bij brand", correct: false },
          {
            text: "Ze betaalt je aflossing verder als je je job verliest",
            correct: false,
          },
          { text: "Ze is enkel verplicht voor huurders", correct: false },
        ],
        explanation:
          "Een schuldsaldoverzekering beschermt je nabestaanden: bij overlijden voor het einde van de lening lost ze (een deel van) het resterende bedrag af. Banken vragen ze vaak verplicht bij een hypothecair krediet.",
      },
      {
        question: "Waarvoor dien je registratierechten te betalen bij de aankoop van een woning?",
        options: [
          {
            text: "Het is de belasting die je betaalt bij de aankoop, berekend op de aankoopprijs",
            correct: true,
          },
          { text: "Het is de vergoeding voor de vastgoedmakelaar", correct: false },
          { text: "Het is de verzekeringspremie voor de hypotheek", correct: false },
          { text: "Het is een boete bij te late aflossing", correct: false },
        ],
        explanation:
          "Registratierechten (in Vlaanderen ook het verkooprecht genoemd) zijn een belasting bovenop de aankoopprijs: een aparte kost naast de lening zelf en de notariskosten.",
      },
      {
        question:
          "Waarom kan een langere looptijd de totale interestkost verhogen, ook al daalt de maandelijkse aflossing?",
        options: [
          {
            text: "Omdat je langer rente betaalt op het nog openstaande bedrag",
            correct: true,
          },
          { text: "Omdat de rentevoet automatisch stijgt na verloop van tijd", correct: false },
          { text: "Dat klopt niet: een langere looptijd is altijd goedkoper", correct: false },
          { text: "Omdat de bank een boete aanrekent voor lange looptijden", correct: false },
        ],
        explanation:
          "Een lagere maandaflossing lijkt aantrekkelijk, maar een langere looptijd betekent meestal een hogere totale kost. Kijk daarom altijd naar beide cijfers samen, niet enkel de maandlast.",
      },
      {
        question:
          "Wat gebeurt er meestal met de rente als je een groter deel van de woningwaarde leent (hogere quotiteit)?",
        options: [
          {
            text: "De bank loopt meer risico, wat vaak resulteert in een hogere rente",
            correct: true,
          },
          { text: "De rente daalt automatisch", correct: false },
          { text: "Er verandert niets aan de rente", correct: false },
          { text: "Je moet dan geen registratierechten meer betalen", correct: false },
        ],
        explanation:
          "Een hogere quotiteit betekent meer risico voor de kredietgever, en dat risico wordt vaak (deels) doorgerekend in de rentevoet die je krijgt aangeboden.",
      },
      {
        question: "Wat is onroerende voorheffing?",
        options: [
          {
            text: "Een jaarlijkse belasting op vastgoed dat je bezit, berekend op het kadastraal inkomen",
            correct: true,
          },
          { text: "Een eenmalige belasting bij de aankoop van een woning", correct: false },
          { text: "Een korting op je hypothecaire lening", correct: false },
          { text: "Een verzekering tegen schade aan je woning", correct: false },
        ],
        explanation:
          "In tegenstelling tot registratierechten (eenmalig, bij aankoop) betaal je onroerende voorheffing elk jaar opnieuw, zolang je de woning bezit.",
      },
      {
        question:
          "Waarom is het slim om een lening van meerdere aanbieders te vergelijken op zowel maandaflossing als totale kost?",
        options: [
          {
            text: "Omdat een lagere maandaflossing (bv. door een langere looptijd) niet automatisch de goedkoopste lening betekent",
            correct: true,
          },
          { text: "Omdat de wet verplicht om minstens drie offertes op te vragen", correct: false },
          { text: "Omdat de rente elke maand verandert", correct: false },
          { text: "Omdat enkel de totale kost telt en de maandaflossing er niet toe doet", correct: false },
        ],
        explanation:
          "Beide cijfers vertellen een ander deel van het verhaal: de maandaflossing bepaalt of je budget het aankan nu, de totale kost bepaalt wat de lening je uiteindelijk kost.",
      },
    ],
  },
  {
    slug: "sparen-en-beleggen-de-basis",
    title: "Sparen en beleggen: de basis",
    short: "8 vragen over rente, risico en de begrippen errond",
    description:
      "Test wat je al weet over hoe spaarrekeningen en beleggen werken: basisrente versus getrouwheidspremie, diversificatie, en de 72-regel.",
    questions: [
      {
        question:
          "Wat is het verschil tussen basisrente en getrouwheidspremie op een spaarrekening?",
        options: [
          {
            text: "Basisrente krijg je altijd; getrouwheidspremie enkel op geld dat een vol jaar ononderbroken op de rekening blijft staan",
            correct: true,
          },
          { text: "Het zijn twee namen voor exact hetzelfde percentage", correct: false },
          { text: "Getrouwheidspremie krijg je enkel bij je allereerste storting", correct: false },
          { text: "Basisrente wordt maandelijks uitbetaald, getrouwheidspremie nooit", correct: false },
        ],
        explanation:
          "Kijk daarom niet enkel naar het hoogste totaalpercentage, maar ook naar hoe lang je het geld ongemoeid moet laten staan om de getrouwheidspremie te verdienen.",
      },
      {
        question: "Wat is samengestelde interest?",
        options: [
          {
            text: "Interest die je ook verdient op eerder verdiende interest, waardoor een bedrag sneller aangroeit",
            correct: true,
          },
          { text: "Een vast bedrag dat je bank je jaarlijks cadeau doet", correct: false },
          { text: "Interest die enkel bij beleggen bestaat, nooit bij sparen", correct: false },
          { text: "Interest die je aan de bank moet terugbetalen", correct: false },
        ],
        explanation:
          "Interest op interest is de kern van waarom vroeg beginnen met sparen of beleggen zo'n groot verschil maakt op lange termijn.",
      },
      {
        question: "Wat betekent diversificatie bij beleggen?",
        options: [
          {
            text: "Je geld spreiden over verschillende beleggingen in plaats van alles in één aandeel te steken",
            correct: true,
          },
          { text: "Zoveel mogelijk beleggen in één sterk presterend bedrijf", correct: false },
          { text: "Elke maand van broker veranderen", correct: false },
          { text: "Enkel in Belgische aandelen beleggen", correct: false },
        ],
        explanation:
          "Diversificatie verlaagt het risico: als één belegging het slecht doet, kan een andere dat (deels) compenseren.",
      },
      {
        question: "Wat is een ETF (tracker)?",
        options: [
          {
            text: "Een beleggingsfonds dat een index passief volgt, en dat je als een aandeel op de beurs kan kopen en verkopen",
            correct: true,
          },
          { text: "Een spaarrekening met een gegarandeerd hogere rente", correct: false },
          { text: "Een verzekering tegen beursverlies", correct: false },
          { text: "Een belasting die je betaalt op beleggingswinst", correct: false },
        ],
        explanation:
          "Een ETF volgt bijvoorbeeld een beursindex zoals de S&P 500, zonder dat een fondsbeheerder actief aandelen selecteert: vaak tegen lagere lopende kosten dan een actief beheerd fonds.",
      },
      {
        question: "Wat is volatiliteit?",
        options: [
          {
            text: "Hoe sterk de waarde van een belegging schommelt over een bepaalde periode",
            correct: true,
          },
          { text: "Het aantal keer dat je per jaar mag handelen", correct: false },
          { text: "De kost om een fonds aan te kopen", correct: false },
          { text: "Een ander woord voor dividend", correct: false },
        ],
        explanation:
          "Hoe hoger de volatiliteit, hoe onvoorspelbaarder de waarde op korte termijn: ook al kan het verwachte rendement op lange termijn hoog zijn.",
      },
      {
        question: "Wat beschermt het Belgisch depositogarantiestelsel?",
        options: [
          {
            text: "Spaargeld tot een bepaald bedrag per persoon per bank, als die bank failliet gaat",
            correct: true,
          },
          { text: "Verliezen op beleggingen in aandelen", correct: false },
          { text: "De rente die een bank je belooft", correct: false },
          { text: "Enkel geld op een zichtrekening, nooit op een spaarrekening", correct: false },
        ],
        explanation:
          "Dit is een wettelijke bescherming voor gereglementeerd spaargeld, beheerd door het Garantiefonds voor financiële diensten: niet iets dat voor beleggingen geldt.",
      },
      {
        question:
          "Waarom is het slim om bij een spaarrekening niet enkel naar het hoogste totale rentepercentage te kijken?",
        options: [
          {
            text: "Omdat de getrouwheidspremie pas na een vol jaar ononderbroken sparen wordt uitbetaald: heb je het geld eerder nodig, dan mis je dat deel",
            correct: true,
          },
          { text: "Omdat het totale percentage altijd fout wordt weergegeven", correct: false },
          { text: "Omdat spaarrekeningen wettelijk geen rente mogen tonen", correct: false },
          { text: "Omdat enkel de bank zelf dat cijfer correct kan berekenen", correct: false },
        ],
        explanation:
          "Het totaalpercentage (basisrente + getrouwheidspremie) is enkel haalbaar als het geld het hele jaar blijft staan. Heb je het geld sneller nodig, dan telt vooral de basisrente.",
      },
      {
        question: "Wat is de 72-regel?",
        options: [
          {
            text: "Een vuistregel om te schatten hoeveel jaar het duurt voor een bedrag verdubbelt: 72 gedeeld door het rendementspercentage",
            correct: true,
          },
          { text: "Een wettelijke minimumleeftijd om te mogen beleggen", correct: false },
          { text: "Het maximumbedrag dat je belastingvrij mag beleggen", correct: false },
          { text: "De 72 grootste bedrijven op de Brusselse beurs", correct: false },
        ],
        explanation:
          "Bij bijvoorbeeld 6% rendement duurt het volgens de 72-regel ongeveer 72 ÷ 6 = 12 jaar voor een bedrag verdubbelt bij samengestelde interest.",
      },
    ],
  },
  {
    slug: "erven-en-schenken",
    title: "Erven en schenken: wat gebeurt er met een nalatenschap?",
    short: "8 vragen over erfbelasting, testamenten en je opties als erfgenaam",
    description:
      "Test wat je al weet over erven: erfbelasting, de wettelijke reserve, een legaat, en wanneer je een erfenis kan verwerpen.",
    questions: [
      {
        question: "Wat is erfbelasting?",
        options: [
          { text: "De belasting die een erfgenaam betaalt op wat hij of zij erft", correct: true },
          { text: "Een belasting die de overledene vooraf zelf moet betalen", correct: false },
          {
            text: "Een vast percentage, gelijk voor iedereen ongeacht de band met de overledene",
            correct: false,
          },
          { text: "Een belasting die enkel verschuldigd is als er een testament bestaat", correct: false },
        ],
        explanation:
          "Erfbelasting is verschuldigd door de erfgenaam, niet door de overledene, en het tarief hangt onder meer af van de verwantschap.",
      },
      {
        question: "Waarvan hangt het tarief van de erfbelasting onder meer af?",
        options: [
          {
            text: "De bloed- of aanverwantschap tussen erfgenaam en overledene, en het geërfde bedrag",
            correct: true,
          },
          { text: "Enkel de leeftijd van de erfgenaam", correct: false },
          { text: "Enkel het beroep dat de overledene uitoefende", correct: false },
          { text: "Het is in heel België altijd exact hetzelfde vaste percentage", correct: false },
        ],
        explanation:
          "Hoe verder de verwantschap, hoe hoger het tarief doorgaans oploopt. De exacte tarieven en schijven verschillen bovendien per gewest.",
      },
      {
        question: "Wat is de wettelijke reserve?",
        options: [
          {
            text: "Het deel van een nalatenschap dat wettelijk gereserveerd is voor bepaalde erfgenamen, ook als een testament anders zou bepalen",
            correct: true,
          },
          { text: "Het bedrag dat de notaris mag aanrekenen voor zijn diensten", correct: false },
          { text: "Een spaarrekening die je moet openen voor je kan erven", correct: false },
          { text: "Het deel van de erfenis dat naar de Belgische staat gaat", correct: false },
        ],
        explanation:
          "De wettelijke reserve beschermt bepaalde erfgenamen (zoals kinderen) tegen een testament dat hen volledig zou onterven.",
      },
      {
        question: "Wat is een legaat?",
        options: [
          {
            text: "Een specifiek goed of bedrag dat iemand in een testament nalaat aan een bepaalde persoon",
            correct: true,
          },
          { text: "Een lening tussen familieleden", correct: false },
          { text: "Een verzekering die je moet afsluiten voor je kan erven", correct: false },
          { text: "Het volledige vermogen van een overledene", correct: false },
        ],
        explanation:
          "Een legaat is specifiek: bijvoorbeeld één bepaald huis of een vast bedrag aan één bepaalde persoon, vastgelegd in een testament.",
      },
      {
        question: "Wat is een nalatenschap?",
        options: [
          { text: "Alle bezittingen én schulden die iemand achterlaat bij overlijden", correct: true },
          { text: "Enkel het geld op de bankrekening van de overledene", correct: false },
          { text: "Enkel het onroerend goed van de overledene", correct: false },
          { text: "Het bedrag dat de erfgenamen samen aan belasting betalen", correct: false },
        ],
        explanation:
          "Een nalatenschap omvat zowel wat iemand bezat als wat die persoon nog verschuldigd was: schulden erf je in principe mee.",
      },
      {
        question: "Wanneer zou je overwegen om een erfenis te verwerpen?",
        options: [
          { text: "Als de schulden van de nalatenschap groter zijn dan de bezittingen", correct: true },
          { text: "Als je de overledene niet goed kende", correct: false },
          { text: "Als er toevallig een testament bestaat", correct: false },
          { text: "Dat kan wettelijk niet: aanvaarden is altijd verplicht", correct: false },
        ],
        explanation:
          "Omdat je een nalatenschap met haar schulden erft, kan verwerpen zinvol zijn als die schulden groter zijn dan wat er te verdelen valt.",
      },
      {
        question: "Bij wie ga je terecht voor een bindend antwoord over jouw concrete erfenissituatie?",
        options: [
          { text: "Een notaris", correct: true },
          { text: "Een willekeurige bank", correct: false },
          { text: "Een verzekeringsmakelaar", correct: false },
          { text: "Eender welke financiële website", correct: false },
        ],
        explanation:
          "Algemene uitleg over erven kan je op FinEdu vinden, maar een bindend antwoord op je eigen dossier: met alle details van jouw situatie: geeft enkel een notaris.",
      },
      {
        question: "Wat is het belangrijkste verschil tussen een schenking en een erfenis?",
        options: [
          { text: "Een schenking gebeurt tijdens het leven van de schenker, een erfenis pas na overlijden", correct: true },
          { text: "Een schenking is nooit belastbaar, een erfenis altijd", correct: false },
          { text: "Ze zijn juridisch exact hetzelfde", correct: false },
          { text: "Een schenking kan enkel via een testament gebeuren", correct: false },
        ],
        explanation:
          "Dat tijdstip: bij leven versus na overlijden: bepaalt welke regels en welke belasting van toepassing zijn. Beide kunnen, afhankelijk van hoe ze gebeuren, belast worden.",
      },
    ],
  },
];

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}
