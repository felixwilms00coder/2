# Automatiseringstools: wat kan, wat mag, en wat het kost

Dit document beschrijft wat er nodig is om de gevraagde automatisering écht
te bouwen, en waarom de huidige implementatie bewust binnen bepaalde grenzen
blijft. Het is geschreven op basis van de Belgische en Europese regelgeving
zoals die algemeen bekend is; **laat het juridische deel altijd toetsen door
een advocaat gespecialiseerd in financieel recht voor je iets lanceert.**

## Samenvatting

| Functie | Status vandaag | Opmerking |
| --- | --- | --- |
| Uitgaven analyseren via CSV-import | **Gebouwd** (`/tools/geldscan`) | Geen |
| Uitgaven analyseren via banktoegang | Niet gebouwd | PSD2/AIS-vergunning of licensed aggregator |
| Beleggingsplan simuleren | **Gebouwd** (`/tools/beleggingsplan`) | Geen |
| Zelfbeheerde aankoopagent | **Gebouwd** (`/agent`) | Werkt volledig in simulatie; Saxo-adapter ongetest |
| AI-antwoord op zoekvragen | **Gebouwd** (`/zoeken`) | Vrij LLM-antwoord (Groq, gpt-oss-120b), zie update in sectie 3 |
| Wetgeving uitleggen + toepassen op gebruikerssituatie | **Gebouwd** (`/zoeken`, `/wetgeving`) | Curated bronnenlijst, geen live overheids-API; juridische toetsing nog nodig, zie sectie 4 |
| Aankopen in naam van de gebruiker | Bewust niet gebouwd | Zou vermogensbeheer zijn |

## De zelfbeheerde agent: waarom deze vorm wél kan

`/agent` laat de gebruiker zijn eigen automatische aankopen instellen. De
regelgevende positie hangt volledig aan de architectuur, dus die is bewust zo
gebouwd:

- **De gebruiker bepaalt alles.** Instrument, bedrag, ritme en limieten worden
  door hem ingevuld. FinEdu stelt geen instrument voor, filtert of rangschikt
  niets, en beoordeelt niet of iets bij hem past. Zonder persoonlijke
  aanbeveling is er geen beleggingsadvies.
- **Geen discretie.** De agent voert uitsluitend uit wat de gebruiker vooraf
  letterlijk heeft vastgelegd. Er is geen enkele beslissing die FinEdu neemt,
  dus geen vermogensbeheer.
- **Geen orderstroom via FinEdu.** Orders gaan rechtstreeks van de browser van
  de gebruiker naar zijn eigen brokeraccount, met zijn eigen token. Er is geen
  FinEdu-server in dat pad. FinEdu ontvangt, bundelt of verstuurt geen orders,
  en houdt geen gelden of instrumenten aan.

In die vorm levert FinEdu **software**, en is de gebruiker zelf de
opdrachtgever tegenover zijn vergunde broker. Dat is dezelfde positie als
iemand die zijn eigen script tegen de API van zijn broker draait.

**Waar de grens ligt.** Deze redenering houdt alleen stand zolang aan élk van
die punten voldaan is. Zodra er iets bijkomt zoals: een server die orders in
naam van gebruikers verstuurt, een lijst met "aanbevolen" of voorgeselecteerde
ETF's, een standaardportefeuille, een geschiktheidsvraag met een uitkomst, of
het aanhouden van klantentokens aan jullie kant — dan verschuift het richting
een gereglementeerde beleggingsdienst. Laat de definitieve inschatting maken
door een advocaat financieel recht voordat dit live gaat met echte rekeningen.

### Wat er technisch nog moet gebeuren

- **De Saxo-adapter (`src/lib/agent/brokers/saxo.ts`) is nooit tegen de echte
  API getest.** Hij volgt de gedocumenteerde OpenAPI-vorm, maar moet eerst
  tegen Saxo's simulatie-omgeving gevalideerd worden.
- **Tokenbeheer is nu handmatig.** De gebruiker plakt zelf een access token,
  dat alleen in `sessionStorage` van dat tabblad staat. Voor productie hoort
  daar een OAuth 2.0-flow met PKCE en refresh-tokens bij, met een eigen
  geregistreerde applicatie bij Saxo.
- **Bolero blijft onmogelijk**: geen publieke API voor derden. Dat is een
  feitelijke beperking, geen keuze.
- **Uitvoering vereist een open tabblad.** Er draait bewust geen achtergrond-
  proces. Wie uitvoering wil die ook zonder hem doorloopt, gebruikt het
  periodieke beleggingsplan van de broker zelf.

---

## 1. Automatisch beleggen via Bolero of Saxo

### Het juridische probleem

Orders plaatsen in naam van een gebruiker is **discretionair
vermogensbeheer**. Concrete beleggingssuggesties geven aan een specifieke
persoon is **beleggingsadvies**. Beide zijn in België gereglementeerde
beleggingsdiensten onder MiFID II, en vereisen een vergunning van de FSMA.
Zonder vergunning is dit een strafbare activiteit, niet alleen een
contractuele kwestie.

Wat een vergunning praktisch inhoudt:

- Vergunningsaanvraag bij de FSMA, met een dossier over governance,
  organisatie en risicobeheer.
- Minimumkapitaalvereisten.
- Geschiktheidstoets van bestuurders ("fit and proper").
- Voor elke klant een verplichte geschiktheidsbeoordeling (kennis, ervaring,
  financiële draagkracht, risicobereidheid, duurzaamheidsvoorkeuren).
- Doorlopende verplichtingen: rapportering, belangenconflictenbeleid,
  bewaarplicht van communicatie, klachtenbehandeling, jaarlijkse controle.

Dit is realistisch een traject van maanden tot meer dan een jaar, met
substantiële vaste kosten. Het is een bedrijfsmodelbeslissing, geen feature.

### Het technische probleem

- **Bolero (KBC)** biedt geen publieke API voor derde partijen aan. Er is dus
  geen legitieme integratieweg zonder een commercieel partnerschap met KBC.
- **Saxo Bank** heeft wel een OpenAPI met een gedocumenteerd
  ontwikkelaarsportaal en een simulatieomgeving. Voor productiegebruik met
  echte klantrekeningen is een goedgekeurde applicatie en een commerciële
  overeenkomst met Saxo nodig. Saxo verwacht daarbij dat je zelf de juiste
  vergunningen hebt.

Beide sluiten "even snel koppelen" uit.

### Wat wél kan zonder vergunning

0. **Een zelfbeheerde agent leveren** — zie de sectie hierboven. Dit is de
   route die dit project gekozen heeft.
1. **Doorverwijzen naar de periodieke beleggingsplannen van de broker zelf.**
   De meeste Belgische brokers laten gebruikers zelf een terugkerende order
   instellen. De automatisering gebeurt dan bij de vergunde partij, en de
   gebruiker blijft opdrachtgever. Dit is wat `/tools/beleggingsplan` uitlegt.
2. **Simuleren en informeren**, zolang het algemeen en niet-persoonlijk
   blijft. De grens is dun: "een gespreide tracker heeft doorgaans lagere
   kosten" is informatie, "jij zou tracker X moeten kopen" is advies.
3. **Samenwerken met een vergunde partij** die de dienst levert, waarbij
   FinEdu enkel de educatieve laag blijft. Let op: ook bemiddelen of
   aanbrengen kan onder het statuut van tussenpersoon vallen.

---

## 2. Inkomsten en uitgaven automatisch inlezen

### Wat er nu gebouwd is

`/tools/geldscan` leest een CSV-export van de bankrekening, categoriseert de
transacties op trefwoorden, detecteert terugkerende betalingen en genereert
bespaarsuggesties. Alles draait **client-side**: de gegevens verlaten het
toestel niet, er is geen server, geen opslag en geen verwerking door derden.

Dat is bewust: het vermijdt zowel de PSD2-vergunning als vrijwel het hele
GDPR-risico, omdat FinEdu de gegevens nooit verwerkt.

Relevante bestanden:

- `src/lib/analysis/parse-csv.ts` — tolerante parser voor Belgische
  bankexports (puntkomma/komma, Europese decimalen, aparte debet/credit-
  kolommen, meerdere datumformaten).
- `src/lib/analysis/categorise.ts` — trefwoordregels, inclusief Belgische
  handelsketens en dienstverleners.
- `src/lib/analysis/insights.ts` — aggregatie, 50/30/20-vergelijking,
  detectie van terugkerende betalingen en suggestieregels.

### De volgende stap: rechtstreekse banktoegang

Transacties automatisch ophalen valt onder de PSD2-dienst **Account
Information Service (AIS)**. Twee routes:

1. **Zelf een AISP-vergunning aanvragen** bij de Nationale Bank van België.
   Vereist onder meer een beroepsaansprakelijkheidsverzekering, een
   beveiligingsbeleid en doorlopend toezicht.
2. **Via een vergunde aggregator werken** — de gebruikelijke keuze. Partijen
   die de Belgische markt dekken zijn onder meer Tink (Visa), GoCardless Bank
   Account Data (voorheen Nordigen), Salt Edge en Ponto (Isabel Group).
   Je bouwt dan tegen hun API en zij dragen de vergunning.

Zodra je die weg opgaat, verwerk je wél persoonsgegevens van financiële aard.
Dan komen erbij: een verwerkingsregister, een DPIA (financiële gegevens op
grote schaal is een waarschijnlijke trigger), een bewaartermijnbeleid,
versleuteling in rust en transport, en een duidelijke rechtsgrond
(toestemming). Reken op een backend, wat de huidige volledig statische
architectuur verandert.

### Kostenindicatie

Aggregators rekenen doorgaans per gekoppelde gebruiker per maand. Voor een
gratis educatief platform is dat een structurele kost die je business model
moet dragen — een reden te meer om de CSV-route als gratis basis te houden en
banktoegang eventueel als optionele, betalende laag te overwegen.

---

## 3. Een LLM-gebaseerde adviseur

Overwogen maar bewust niet gebouwd. De afwegingen:

- **Regelgeving.** Een model dat op iemands echte cijfers concrete financiële
  aanbevelingen doet, komt snel in de buurt van beleggings- of financieel
  advies. Dezelfde vergunningsvraag als hierboven.
- **Privacy.** Het zou betekenen dat rekeninggegevens naar een externe
  modelaanbieder gaan. Dat is precies de belofte die de huidige
  client-side-aanpak wél waarmaakt.
- **Betrouwbaarheid.** Een taalmodel kan bedragen en regels verkeerd
  weergeven. Bij belastingschijven en RSZ-percentages is dat schadelijk, en
  moeilijk te detecteren voor de gebruiker.

De huidige suggestie-engine is daarom **deterministisch en regelgebaseerd**:
elke suggestie is herleidbaar tot een regel in `insights.ts`, reproduceerbaar,
en kan door een redacteur nagekeken worden.

Wil je later toch een LLM inzetten, dan is de veiligste vorm: het model laat
de cijfers met rust en helpt enkel met *uitleg* van begrippen, met de
berekende cijfers als vaste context, en met een duidelijke bronvermelding
naar de leerstof.

### Update: er staat nu tóch een LLM op `/zoeken`

Op expliciet verzoek is er een open-weight taalmodel (gehost via Groq's API;
momenteel `openai/gpt-oss-120b`, na Groq's deprecatie van het oorspronkelijke
llama-3.3-70b-versatile op 17 juni 2026 — zie `src/app/api/ai-answer/route.ts`)
aan de zoekpagina toegevoegd, met **vrije** antwoorden — dus niet
beperkt tot herformulering van de bestaande leerstof zoals hierboven als
veiligste vorm werd aanbevolen. Dat is een bewuste afwijking van de eerdere
conclusie in dit document, dus met open kaart:

- **Wat wél is meegenomen.** De systeemprompt verbiedt het model expliciet om
  concrete producten, aandelen, fondsen of banken aan te bevelen, en dwingt
  het om bij Belgische cijfers (belastingschijven, RSZ, pensioenleeftijd)
  naar officiële bronnen te verwijzen in plaats van zelf een exact getal op
  te geven. Elk antwoord toont een vast label ("AI-antwoord, experimenteel")
  en een disclaimer dat het geen persoonlijk advies is.
- **Wat níét is opgelost.** Een systeemprompt is geen garantie, enkel een
  sterke aanwijzing — het model kan de instructie negeren of een verkeerd
  cijfer verzinnen zonder dat te melden. Er zit geen filter tussen de
  modeloutput en het scherm die dat detecteert.
- **Architectuurwijziging.** Dit voegt een server-route toe
  (`src/app/api/ai-answer/route.ts`) die de FinEdu-server nu wél laat
  communiceren met een externe partij (Groq) — de eerdere belofte
  "alles blijft client-side" geldt dus niet meer voor deze specifieke
  functie (de rest van de site, inclusief Geldscan, blijft dat wel).
  De zoekvraag zelf wordt doorgestuurd; er gaan geen rekeninggegevens mee,
  want die verzamelt de site nergens.
- **Kost.** Elke aanroep kost geld bij Groq (te configureren via de
  `GROQ_API_KEY`-omgevingsvariabele). Er zit geen rate limiting op de route;
  bij publieke lancering is dat de eerste hardening die nog moet gebeuren.
- **Onderhoud: modellen bij Groq worden gedeprecateerd.** Op 5 augustus 2026
  bleek de site al een tijdje stuk te staan omdat Groq het oorspronkelijke
  model (llama-3.3-70b-versatile) op 17 juni 2026 had gedeprecateerd — de
  `GROQ_API_KEY` zelf was in orde, maar het model bestond niet meer. Er is
  geen alarm dat dit meldt; de enige zichtbare fout is de generieke "Het
  model gaf een fout terug"-boodschap in de zoekbalk. Check periodiek
  https://console.groq.com/docs/deprecations tegen `GROQ_MODEL` in
  `src/app/api/ai-answer/route.ts`.

**Advies ongewijzigd:** laat een advocaat financieel recht dit expliciet mee
beoordelen voor dit met een echt publiek live gaat. Vrije LLM-antwoorden over
"wat moet ik met mijn geld doen"-achtige vragen liggen dichter bij de grens
met financieel advies dan de rest van dit platform, en die grens hangt af van
hoe het antwoord in de praktijk klinkt — iets wat een systeemprompt niet met
zekerheid afdwingt.

---

## 4. Wetgeving uitleggen — en toepassen op de situatie van de gebruiker

Op expliciet verzoek gaat het AI-antwoord op `/zoeken` nu verder dan enkel
financiële uitleg: het mag ook wetgeving uitleggen én toepassen op de
concrete situatie die de gebruiker beschrijft (bv. "ik erf samen met mijn
broer een huis, wat betekent dat voor de erfbelasting?"). Dat is een nieuw
regelgevingsdomein bovenop het financiële-advies-vraagstuk hierboven:
**onbevoegde rechtspraktijk / juridisch advies geven** is in België een apart
afgebakend domein, los van de FSMA-vergunningsplicht voor beleggingsadvies.

### Wat er gebouwd is

- **`src/lib/content/legislation.ts`** — een curated lijst van acht
  wetgevende kaders (erven, schenken, huren, consumentenkrediet,
  personenbelasting, RSZ, MiFID II) in gewone taal samengevat, telkens met
  de officiële titel, een link naar de geconsolideerde tekst op Justel/de
  Vlaamse Codex, en een `lastVerified`-datum.
- **`src/lib/content/sources.ts`** — geverifieerde officiële instanties
  (notaris.be, FOD Financiën, RSZ, VLABEL, FSMA, MyPension.be, Justel,
  Vlaanderen.be Wonen) met url en onderwerp. **Geen van deze partijen biedt
  een publieke API voor derden aan** — "integratie" betekent hier dus
  bronvermelding en doorverwijzing, geen live datakoppeling.
- **`src/lib/legal-context.ts`** — vouwt beide lijsten samen tot een vaste
  contextblok in de systeemprompt van `/api/ai-answer`. Het model krijgt de
  instructie om zich uitsluitend op deze lijst te baseren voor juridische
  claims, de titel te citeren, en eerlijk te zeggen wanneer een onderwerp er
  niet in staat — in plaats van zelf een wetsartikel te verzinnen.
- **`/wetgeving`** — een publieke pagina die dezelfde lijst toont, zodat een
  gebruiker kan nalezen waarop het AI-antwoord zich baseert zonder eerst een
  vraag te moeten stellen.
- Elk antwoord dat wetgeving toepast op de situatie van de gebruiker moet
  van het model zelf eindigen met een verwijzing naar de bevoegde instantie
  (notaris, FOD Financiën, VLABEL, ...) en de zin "Dit is algemene
  juridische duiding op basis van de wet, geen bindend advies — laat je
  concrete dossier bevestigen door een notaris of advocaat."

### Wat dit niet oplost

- **De curated lijst is klein en handmatig.** Er is geen automatische
  monitoring van wetswijzigingen — geen enkele Belgische overheidsbron biedt
  daar een feed of API voor. `lastVerified` is een datum waarop een
  redacteur de samenvatting naast de officiële tekst legde, niet een
  garantie dat de wet sindsdien niet gewijzigd is. Dit moet minstens
  jaarlijks herhaald worden, en telkens na een bekende wetswijziging in een
  van de onderwerpen.
- **Grondig ≠ onfeilbaar.** De systeemprompt dwingt het model om zich op de
  lijst te baseren, maar kan niet garanderen dat het model nooit toch een
  detail verkeerd samenvat of de grens tussen "uitleg" en "advies" verkeerd
  inschat. Er zit geen filter tussen modeloutput en scherm die dat
  detecteert — zelfde beperking als bij het financiële AI-antwoord hierboven.
- **De schade bij een fout kan groter zijn dan bij financiële uitleg.** Een
  verkeerd begrepen opzegtermijn, schenkingstermijn of erfrechtelijke regel
  kan tot een gemist deadline of een dure vergissing leiden — dat weegt
  zwaarder dan een te optimistisch rendementsvoorbeeld.

**Advies:** laat dit specifieke onderdeel (wetgeving toepassen op de
situatie van de gebruiker) door een advocaat beoordelen voor het met een
echt publiek live gaat — dit is een nieuwe, aparte risicocategorie
bovenop de FSMA-kwestie uit sectie 3, en verdient een eigen juridische
toetsing, niet enkel een verwijzing naar het advies daarboven.

---

## 5. "Goedkoopste" spaarrekening of verzekering — waarom dit een rekentool werd, geen ranking

Er kwam een expliciet verzoek om spaarrekeningen en verzekeringen per tak te
laten vergelijken op prijs, inclusief dagelijkse updates, met FinEdu die zelf
aangeeft welke het goedkoopst is. Dat is bewust **niet** gebouwd — ook niet in
een afgezwakte vorm — en het is de moeite waard om hier vast te leggen waarom,
want het onderscheid met de rekentools die er wél kwamen is smal.

### Waarom een rankingfunctie niet kan

- **Financiële/verzekeringsbemiddeling is in België een vergunningsplichtige
  activiteit** (Wet van 4 april 2014 betreffende de verzekeringen, boek II;
  MiFID II voor beleggingsproducten — zie sectie 3). Een derde partij die
  producten van verschillende aanbieders naast elkaar zet en er een "beste"
  of "goedkoopste" uit aanwijst, oefent daarmee bemiddeling uit, ongeacht of
  er geld voor de vergelijking zelf gevraagd wordt. FinEdu heeft geen FSMA-
  vergunning en positioneert zich uitdrukkelijk als "geen advies, geen
  productverkoop" (zie Samenvatting hierboven) — een rankingfunctie zou die
  positionering rechtstreeks tegenspreken.
- **Er is geen brondata.** Geen enkele Belgische bank of verzekeraar biedt een
  publieke API met actuele tarieven aan (dezelfde beperking als bij de
  officiële bronnen in sectie 4). "Dagelijkse updates" zou ofwel handmatige
  invoer door FinEdu zijn — met alle aansprakelijkheid van een foutieve of
  verouderde "goedkoopste"-claim — ofwel scraping van bankwebsites, wat tegen
  de gebruiksvoorwaarden van die sites ingaat en evengoed geen vergunning
  omzeilt.
- **Dit weegt zwaarder dan bij de andere onderdelen van dit document.** Een
  fout in een rendementsvoorbeeld (sectie 3) of een verkeerd samengevatte
  wetstekst (sectie 4) is een risico op misleiding. Een expliciete
  "goedkoopste"-aanduiding zonder vergunning is een direct strafbaar feit,
  los van of het model gelijk had.

### Wat er in de plaats kwam

- **`src/lib/calculations/spaarvergelijker.ts`** en
  **`src/lib/calculations/verzekeringsvergelijker.ts`** — pure rekenfuncties
  zonder enige productdata. De gebruiker vult zelf de tarieven of offertes in
  die hij al ergens anders vond; FinEdu rekent enkel na (samengestelde
  interest met basisrente + getrouwheidspremie; totale verwachte jaarkost als
  premie + vrijstelling × verwacht aantal schadegevallen).
- **`/tools/spaarrekening-vergelijker`** en **`/tools/verzekering-vergelijker`**
  — de bijbehorende pagina's, met dezelfde disclaimer-opbouw als de
  Beleggingsplan-simulator (sectie hierboven, "plant, voert niet uit"): een
  waarschuwing vóór de tool dat dit geen eigen rentetabel of polissenlijst is,
  en een "Wat deze tool niet doet"-blok erna.
  Geen enkel bank- of verzekeraarsnaam komt uit FinEdu zelf; het label
  "beste van deze vergelijking" verschijnt enkel op basis van cijfers die de
  gebruiker net zelf intikte, over de opties die de gebruiker zelf toevoegde.
- **`/api/ai-answer`** kreeg een aparte regel (zie `buildSystemPrompt` in
  `src/app/api/ai-answer/route.ts`) die het model verbiedt om ooit een
  concrete bank, verzekeraar of product als "goedkoopst" of "beste" te
  noemen, en die in plaats daarvan doorverwijst naar deze twee rekentools en
  naar fsma.be om de vergunning van een tussenpersoon te checken.

### Nuance: spaarrekeningen zijn geen bemiddeling, maar kregen toch geen eigen tarieventabel

Bovenstaande vergunningsredenering (Wet 4 april 2014 / MiFID II) geldt voor
verzekeringen en beleggingsproducten, maar **niet** op dezelfde manier voor
gereglementeerde spaarrekeningen: een spaardeposito is expliciet geen
"financieel instrument" onder MiFID II, en er bestaat geen equivalent van
verzekerings- of kredietbemiddeling voor spaarrekeningen. De FSMA beheert
zelf een publieke "Vergelijkingstool spaarrekeningen" op wikifin.be die
rekeningen rangschikt op basisrente en getrouwheidspremie — als de
toezichthouder dat zelf doet, is een rangschikking van spaartarieven op zich
dus geen vergunningsplichtige activiteit.

Er kwam voor spaarrekeningen dan ook **geen eigen FinEdu-tarieventabel**, maar
om een andere, praktische reden: FinEdu heeft geen technische manier om
bankrentes zelf op te halen of te verifiëren (geen API, en het scrapen van
vergelijkingssites zoals spaargids.be wordt door hun eigen bot-bescherming
geblokkeerd — dat is ook expliciet getest). Een handmatig ingevulde tabel zou
dus ofwel snel verouderen, ofwel het risico lopen op foutieve cijfers waarop
een gebruiker zich baseert. In plaats daarvan verwijst
`/tools/spaarrekening-vergelijker` nu prominent door naar twee externe
bronnen (toegevoegd aan `src/lib/content/sources.ts`):

- de officiële **Wikifin-vergelijkingstool** (FSMA) — altijd actueel, want
  door de toezichthouder zelf beheerd;
- **Spaargids.be** (DPG Media) — een gevestigd, privaat vergelijkingsplatform
  sinds 2006, met het voorbehoud dat het in de loop van 2026 geleidelijk
  overgeheveld wordt naar Mijnvergelijker.be en dat FinEdu de cijfers erop
  niet zelf verifieert.

De FinEdu-rekentool blijft daarna bruikbaar om de cijfers die een gebruiker
op een van die twee sites vindt, na te rekenen voor zijn eigen bedrag en
termijn — precies zoals bij de verzekeringstool, maar dan met een duidelijke
eerste-stap-verwijzing voor wie nog geen cijfers heeft.

### Wat dit niet oplost

- Dit lost het achterliggende gebruikersprobleem niet volledig op: de
  gebruiker moet nog altijd zelf tarieven of offertes verzamelen, FinEdu doet
  dat niet voor hem. Dat is een bewuste keuze, geen tussenstap naar een
  toekomstige rankingfunctie — zie hierboven waarom die grens niet
  verschuift naarmate de tool "beter" wordt.
- De Spaargids.be-link kan tijdens 2026 breken of verhuizen door de
  aangekondigde migratie naar Mijnvergelijker.be — dit moet opnieuw
  gecontroleerd worden zodra die migratie de spaarrekeningtool bereikt.

---

## 6. Vier extra rekentools: lening, noodbuffer, 72-regel, aanvullend pensioen

Vier nieuwe rekentools onder `/tools`, zelfde aanpak als de rest van dit
document: zuivere rekenmodellen zonder eigen productdata, geen advies.

- **Lening-vergelijker** (`src/lib/calculations/leningsimulator.ts`) —
  standaard annuïteitsformule, geen wetgevingskwestie: dit rekent enkel na
  met een bedrag, rente en looptijd die de gebruiker zelf invult. Dossier-,
  notaris- en verzekeringskosten zitten er bewust niet in.
- **Noodbuffer-calculator** — spaargeld gedeeld door maandelijkse uitgaven,
  afgezet tegen de gangbare (niet-wettelijke) vuistregel van 3 tot 6
  maanden.
- **72-regel** — de bekende `72 ÷ rendement`-vuistregel, met daarnaast de
  wiskundig exacte waarde ter vergelijking.
- **Aanvullend-pensioen-simulator** — **bewust geen** schatting van het
  wettelijk Belgisch pensioen. Die formule (loonplafonds, gelijkgestelde
  periodes, ...) is te complex om betrouwbaar te vereenvoudigen, en een
  verkeerde schatting hier zou iemands pensioenverwachting kunnen
  vertekenen. In plaats daarvan simuleert deze tool enkel wat je er zelf
  bovenop opbouwt (pensioensparen, VAPZ, apart sparen) via samengestelde
  interest, en verwijst voor het wettelijk pensioen naar de officiële
  simulatie op MyPension.be — zelfde patroon als de spaarrente-doorverwijzing
  in sectie 5.

---

## 7. Financieel lexicon (`/lexicon`)

Een doorzoekbaar, filterbaar woordenboek van ~57 financiële termen
(`src/lib/content/lexicon.ts`), verdeeld over de 7 thema's. In tegenstelling
tot de rest van dit document speelt hier geen vergunnings- of
aansprakelijkheidsvraagstuk: het zijn definities, geen advies, geen
productdata, geen bedragen. De enige regel die hier wél telt: **geen actuele
bedragen, percentages of belastingschijven** in de definities zelf, want die
wijzigen jaarlijks en horen thuis in `/wetgeving` of bij een officiële bron
— een woordenboek dat zelden herzien wordt, is de verkeerde plek daarvoor.

Geïntegreerd in de bestaande zoekfunctie (`src/lib/search.ts`, resultaat-kind
`"begrip"`) en in de systeemprompt van `/api/ai-answer`, zodat een vraag naar
enkel de betekenis van een term kort beantwoord wordt met een verwijzing naar
`/lexicon` voor meer.

### Uitbreiding: "kleine lettertjes"-termen (instapkost, tak21/tak23, KID, ...)

Op verzoek om transparantie te bieden over de voorwaarden van beleggings- en
verzekeringsproducten ("de kleine lettertjes, vóór je op gesprek moet"), is
het lexicon uitgebreid met veelvoorkomende clausules en begrippen uit die
kleine lettertjes: instapkost, uitstapkost, kapitaalgarantie, tak21/tak23,
het essentiële-informatiedocument (KID), de risico-indicator, wachttijd,
uitsluiting, onderverzekering, enzovoort.

Dit is bewust **generiek** gehouden — uitleg van wat een clausule betekent,
gekoppeld aan geen enkel specifiek product van geen enkele naamgenoemde
aanbieder. Het oorspronkelijke verzoek ging verder: een databank van de
kleine lettertjes per specifiek product en aanbieder, wat neerkomt op de
"goedkoopste spaarrekening/verzekering"-discussie uit sectie 5, maar dan
voor productvoorwaarden in plaats van prijs. Volgens een — niet zelf
geverifieerd, want fsma.be is in deze sessie op netwerkniveau ontoegankelijk
gebleken — FSMA-standpunt over vergelijkingswebsites zou dat mogelijk buiten
de vergunningsplicht kunnen vallen als er geen vergoeding is én geen
mogelijkheid om het product via het platform af te sluiten. Zonder die
brontekst zelf te kunnen nalezen, en zonder een gelijkaardige uitzondering
gevonden te hebben voor beleggingsproducten (MiFID II), is beslist om dat
niet te bouwen zonder bevestiging door een advocaat of de FSMA zelf — ook al
bood de gebruiker aan om productdata via screenshots aan te leveren. Dat
lost enkel het datatoegangsprobleem op, niet de openstaande juridische
vraag.

---

## 8. Blog (`/blog`) — een dagelijkse agent die zelf publiceert, zonder redactie

Op expliciet verzoek publiceert een dagelijkse agent één nieuw artikel per
dag onder `/blog`, automatisch — géén menselijke goedkeuring vooraf. Dat is
een principieel andere risicocategorie dan de rest van dit document: overal
elders is een mens (ikzelf, tijdens deze sessie) de content aan het
schrijven en een geautomatiseerde pijplijn aan het draaien vóór het live
gaat. Hier schrijft en publiceert de agent zelf, zonder die stap.

### Wat de opzet doet om dat risico te beperken

- **Verplichte gronding.** De agent mag zich uitsluitend baseren op wat al
  in `legislation.ts` en `lexicon.ts` staat — dezelfde regel als het
  AI-antwoord op `/zoeken` (sectie 3-4). Geen vrij verzonnen wetsartikelen,
  bedragen of percentages. Staat het onderwerp er niet in, dan schrijft de
  agent er niet over.
- **Zichtbaar gelabeld.** Elke post toont een "AI-gegenereerd"-badge en de
  publicatiedatum, en de `/blog`-overzichtspagina opent met een expliciete
  waarschuwing dat niemand het artikel vooraf las. Dit is bewust
  prominenter dan het "experimenteel"-label bij het AI-antwoord, net omdat
  hier geen enkele menselijke stap meer tussen generatie en publicatie zit.
- **Vaste structuur, geen vrije vorm.** Elke post gebruikt hetzelfde
  `ArticleBlock[]`-formaat als de leerstof-artikelen
  (`src/components/article-body.tsx`) — de agent vult een sjabloon in, hij
  verzint geen eigen lay-out of nieuwe blokstructuur.
- **Zelfde verificatiepijplijn als elke andere wijziging in deze sessie.**
  De trigger-instructie verplicht de agent om `next build` en `eslint` te
  draaien vóór commit — een artikel dat de build breekt gaat niet live,
  ook al is er verder niemand die het naleest.

### Wat dit niet oplost

- **Inhoudelijke fouten worden niet gevangen.** De build- en lintstap
  controleert code, niet feiten. Een subtiel verkeerd samengevatte
  wetsregel — zelfs binnen de toegestane bronnen — kan alsnog gepubliceerd
  worden. Dat is de kern van het risico dat "geen menselijke redactie"
  bewust aanvaardt.
- **Er is geen automatische controle die een slechte dag detecteert** (bv.
  een artikel dat toch buiten de toegestane bronnen gaat, of de
  disclaimer-regels niet volgt). De enige waarborg is de instructie in de
  trigger-prompt zelf.
- **Dit blijft educatieve informatie, geen advies** — dezelfde grens als de
  rest van het platform, maar met minder menselijke controle erachter dan
  ooit eerder in dit document. Een periodieke steekproef door een mens
  wordt aanbevolen, ook al is dat geen ingebouwde technische waarborg.

### Hoe de dagelijkse uitvoering werkt

Een Routine (cron, dagelijks) start een nieuwe sessie met een
zelfstandige instructie: kies een thema, schrijf één artikel volgens
bovenstaand format gegrond op de bestaande content, voeg het toe aan
`src/lib/content/blog.ts`, draai build + lint, commit en push naar `main`.
Geen aparte goedkeuringsstap — de push naar `main` ís de publicatie, via
Vercel's auto-deploy.

---

## 9. Aanbevolen volgorde

1. Houd de Geldscan gratis en client-side. Dat is vandaag al de meeste waarde
   voor de gebruiker, zonder juridische last.
2. Verbeter de categorisatie op basis van echte feedback (een "klopt dit
   niet?"-knop per transactie kost weinig en maakt de regels beter).
3. Beslis pas daarna of banktoegang de kost en de compliance waard is.
4. Valideer de Saxo-adapter tegen hun simulatie-omgeving en vervang het
   handmatige token door een echte OAuth-flow voor je iemand met een live
   rekening laat koppelen.
5. Laat de zelfbeheerde opzet juridisch bevestigen voor de live-schakelaar
   aangaat. Blijf weg van alles wat naar selectie of aanbeveling neigt: dat is
   precies waar het onderscheid met vergunningsplichtige dienstverlening
   verdwijnt.
