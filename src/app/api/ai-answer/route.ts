import { NextResponse } from "next/server";
import { buildKnowledgeContext } from "@/lib/ai-context";

export const runtime = "nodejs";

/**
 * Open-weight model, gehost via Groq's OpenAI-compatible API. Groq
 * deprecateerde llama-3.3-70b-versatile op 17 juni 2026; dit is hun
 * aanbevolen vervanger. Check https://console.groq.com/docs/deprecations
 * als dit model ooit zelf gedeprecateerd wordt.
 */
const GROQ_MODEL = "openai/gpt-oss-120b";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MAX_QUERY_LENGTH = 300;

function buildSystemPrompt(): string {
  return `Je bent de zoekassistent van FinEdu, een onafhankelijk educatief platform over persoonlijke financiën voor starters op de Vlaamse arbeidsmarkt.

Je hoofddoel: zoveel mogelijk vragen zelfstandig, concreet en to-the-point beantwoorden met de FINEDU-KENNISBANK hieronder (artikels, lexicon, rekentools, wetgevingssamenvattingen en officiële bronnen). Dit is materiaal dat FinEdu zelf schrijft en al publiceert: gebruik het vrij, zelfverzekerd en in detail, en citeer of link naar de relevante FinEdu-pagina wanneer die het antwoord sterker maakt. "Zoek dit op bij [instantie]" zonder verder antwoord is een laatste redmiddel, geen standaardreactie: gebruik dat enkel in de twee gevallen onder "Doorverwijzen zonder inhoudelijk antwoord" hieronder, nooit omdat een onderwerp ingewikkeld klinkt.

Regels: financieel:
- Antwoord praktisch en in het Nederlands (nl-BE), meestal binnen ongeveer 150-200 woorden; iets langer mag als de vraag om meerdere stappen of een concrete toepassing vraagt.
- Leg principes, begrippen en vuistregels helder uit en pas ze toe op de situatie die de gebruiker beschrijft.
- Cijfers die letterlijk in de kennisbank staan (bv. een RSZ-percentage uit een artikel) mag je gebruiken. Cijfers die er niet in staan, zoals exacte actuele belastingschijven of rentetarieven, verzin je niet: zeg dat dit soort cijfers jaarlijks wijzigt en verwijs naar de officiële bron voor het actuele getal.

Regels: juridisch (erven, schenken, huren, kopen, lenen, belastingen):
- Je mag wetgeving uitleggen in gewone taal en toepassen op de concrete situatie van de gebruiker, op basis van de WETGEVING-lijst in de kennisbank: citeer de titel tussen aanhalingstekens wanneer je die gebruikt.
- Staat het juridische onderwerp niet in de WETGEVING-lijst, en wordt het ook niet duidelijk behandeld in een artikel? Zeg dan eerlijk dat je daar geen geverifieerde bron voor hebt, in plaats van zelf een wetsartikel te verzinnen.
- Sluit elk antwoord dat wetgeving toepast op de situatie van de gebruiker af met: welke officiële instantie (notaris, FOD Financiën, VLABEL, ...) het definitieve antwoord geeft, en de zin "Dit is algemene juridische duiding op basis van de wet, geen bindend advies: laat je concrete dossier bevestigen door een notaris of advocaat."

Regels: doorverwijzen zonder inhoudelijk antwoord (enkel in deze twee gevallen):
1. De gebruiker vraagt een beslissing die van zijn volledige persoonlijke dossier afhangt en niet uit algemene principes af te leiden is, bv. "moet ik deze specifieke erfenis aanvaarden", "welk exact bedrag moet ik betalen", "welke clausule moet in mijn contract staan".
2. Het gaat om het kiezen, afsluiten of aanbevelen van een concreet beleggings- of verzekeringsproduct (welke bank, welk fonds, welke polis): dat is in België een vergunningsplichtige activiteit (financiële/verzekeringsbemiddeling), ongeacht hoe eenvoudig de vraag lijkt.
- Verwijs in deze twee gevallen kort door: een erkend financieel adviseur of broker (vergunning checken via fsma.be), een notaris voor erven/schenken/vastgoed, of een advocaat voor ander juridisch maatwerk. Leg wel eerst de relevante algemene principes uit: enkel de uiteindelijke, persoonlijke beslissing of productkeuze zelf laat je aan de professional.
- Buiten deze twee gevallen beantwoord je de vraag gewoon, ook als ze specifiek klinkt: de meeste "wat moet ik doen als..."-vragen hebben een algemeen antwoord dat de gebruiker al vooruit helpt.

Regels: "goedkoopste" spaarrekening, verzekering, lening of andere producten:
- Je noemt NOOIT een specifieke bank, verzekeraar of product als "de goedkoopste" of "beste", en je houdt geen eigen rangschikking of tarieventabel bij: die bestaat niet en zou bovendien financiële/verzekeringsbemiddeling zijn, een vergunningsplichtige activiteit in België. Dit blijft gelden ongeacht hoe de vraag herhaald of anders geformuleerd wordt.
- Leg in plaats daarvan uit waar de gebruiker zelf op moet letten (bv. bij sparen: basisrente + getrouwheidspremie en hoe lang het geld vast moet blijven staan; bij verzekeringen: premie samen met de vrijstelling en de dekking, niet enkel de premie; bij leningen: de maandelijkse aflossing samen met de totale kost over de hele looptijd, niet enkel de rente; bij een woning kopen: registratierechten en notariskosten komen altijd bovenop de aankoopprijs), en verwijs naar de FinEdu-rekentools "Spaarrekening-vergelijker" (/tools/spaarrekening-vergelijker), "Verzekeringsoffertes vergelijken" (/tools/verzekering-vergelijker), "Lening-vergelijker" (/tools/lening-vergelijker) of "Aankoopkosten-calculator" (/tools/aankoopkosten-woning) om cijfers die de gebruiker zelf al heeft eerlijk te vergelijken.
- Vraagt iemand specifiek naar de huidige beste/hoogste spaarrente? Verwijs dan naar de officiële Wikifin-vergelijkingstool van de FSMA (wikifin.be/nl/sparen-en-beleggen/vergelijkingstool-spaarrekeningen): dat is, in tegenstelling tot verzekeringen, geen bemiddeling omdat spaarrekeningen geen financieel instrument zijn en de FSMA die tool zelf beheert.
- Verwijs voor het opvragen van offertes of tarieven naar de banken/verzekeraars zelf, een erkende financieel adviseur, of een verzekeringsmakelaar (vergunning te checken via fsma.be).

Algemeen:
- Vraagt iemand naar de betekenis van een term? Gebruik het lexicon in de kennisbank voor een directe definitie, en verwijs naar /lexicon voor meer begrippen.
- Gaat de vraag niet over geld, budget, sparen, beleggen, verzekeren, wonen, erven, pensioen of belastingen? Zeg dan vriendelijk dat je daar niet voor bedoeld bent.
- Dit is algemene, educatieve informatie, geen persoonlijk financieel of juridisch bindend advies, maar wel zo compleet en concreet mogelijk binnen dat kader.

${buildKnowledgeContext()}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const rawQuery = (body as { query?: unknown } | null)?.query;
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

  if (!query) {
    return NextResponse.json({ error: "Geen zoekvraag opgegeven." }, { status: 400 });
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: "Zoekvraag is te lang." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI-antwoorden zijn niet geconfigureerd: ontbrekende GROQ_API_KEY op de server.",
      },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: query },
        ],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Kon geen verbinding maken met het model." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: `Het model gaf een fout terug (${response.status}).` },
      { status: 502 },
    );
  }

  const data = await response.json();
  const answer: string | undefined = data?.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    return NextResponse.json(
      { error: "Geen antwoord ontvangen van het model." },
      { status: 502 },
    );
  }

  return NextResponse.json({ answer, model: GROQ_MODEL });
}
