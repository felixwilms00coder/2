# Automatiseringstools: wat kan, wat mag, en wat het kost

Dit document beschrijft wat er nodig is om de gevraagde automatisering écht
te bouwen, en waarom de huidige implementatie bewust binnen bepaalde grenzen
blijft. Het is geschreven op basis van de Belgische en Europese regelgeving
zoals die algemeen bekend is; **laat het juridische deel altijd toetsen door
een advocaat gespecialiseerd in financieel recht voor je iets lanceert.**

## Samenvatting

| Functie | Status vandaag | Blokkade |
| --- | --- | --- |
| Uitgaven analyseren via CSV-import | **Gebouwd** (`/tools/geldscan`) | Geen |
| Uitgaven analyseren via banktoegang | Niet gebouwd | PSD2/AIS-vergunning of licensed aggregator |
| Beleggingsplan simuleren | **Gebouwd** (`/tools/beleggingsplan`) | Geen |
| Automatisch orders plaatsen | Niet gebouwd | MiFID II-vergunning FSMA + geen bruikbare API bij Bolero |

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

---

## 4. Aanbevolen volgorde

1. Houd de Geldscan gratis en client-side. Dat is vandaag al de meeste waarde
   voor de gebruiker, zonder juridische last.
2. Verbeter de categorisatie op basis van echte feedback (een "klopt dit
   niet?"-knop per transactie kost weinig en maakt de regels beter).
3. Beslis pas daarna of banktoegang de kost en de compliance waard is.
4. Beschouw automatisch beleggen als een apart bedrijf met een eigen
   vergunning, niet als een feature van het educatieve platform.
