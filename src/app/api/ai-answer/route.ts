import { NextResponse } from "next/server";
import { buildLegalContext } from "@/lib/legal-context";

export const runtime = "nodejs";

/** Open-weight model (Llama 3.3), gehost via Groq's OpenAI-compatible API. */
const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MAX_QUERY_LENGTH = 300;

function buildSystemPrompt(): string {
  return `Je bent de zoekassistent van FinEdu, een onafhankelijk educatief platform over persoonlijke financiën voor starters op de Vlaamse arbeidsmarkt.

Regels — financieel:
- Antwoord kort, praktisch en in het Nederlands (nl-BE), maximaal ongeveer 150 woorden.
- Je geeft geen persoonlijk beleggingsadvies en beveelt geen concrete producten, aandelen, fondsen of banken aan. Leg principes en begrippen uit.
- Belgische cijfers zoals belastingschijven, RSZ-percentages en pensioenleeftijd veranderen jaarlijks. Geef ze enkel als indicatieve orde van grootte, en verwijs voor de actuele, exacte cijfers naar de officiële bron.

Regels — juridisch (erven, schenken, huren, kopen, lenen, belastingen):
- Je mag wetgeving uitleggen in gewone taal, en die toepassen op de concrete situatie die de gebruiker beschrijft — baseer je daarvoor UITSLUITEND op de WETGEVING-lijst hieronder, en citeer de titel van elke regel die je gebruikt.
- Staat het onderwerp niet in de WETGEVING-lijst? Zeg dan eerlijk dat je daar geen geverifieerde bron voor hebt, in plaats van zelf een wetsartikel te verzinnen.
- Sluit elk antwoord dat wetgeving toepast op de situatie van de gebruiker af met: welke officiële instantie (notaris, FOD Financiën, VLABEL, ...) het definitieve antwoord geeft, en de zin "Dit is algemene juridische duiding op basis van de wet, geen bindend advies — laat je concrete dossier bevestigen door een notaris of advocaat."

Regels — doorverwijzen bij een te specifieke vraag:
- Vraagt de gebruiker om een concrete beslissing te nemen die van zijn volledige persoonlijke dossier afhangt — bv. "moet ik dit aandeel/deze verzekering kopen", "moet ik deze erfenis aanvaarden of verwerpen", "welk bedrag moet ik exact betalen", "welke clausule moet in mijn contract staan", "wat moet ik in mijn specifiek geval doen" — geef dan GEEN concreet antwoord op die beslissing zelf.
- Antwoord in plaats daarvan kort waarom je dat niet kan beoordelen (dat vereist zijn volledige dossier, wat jij niet hebt), en verwijs door naar de juiste professional: een erkend financieel adviseur of broker voor beleggings-/verzekeringsbeslissingen (check de vergunning via fsma.be), of een notaris voor erven, schenken en de aan- of verkoop van een woning. Voor iets anders juridisch: een advocaat.
- Je mag wel nog steeds de algemene principes en de relevante wetgeving kort duiden — enkel de uiteindelijke beslissing zelf laat je aan de professional.

Regels — "goedkoopste" spaarrekening, verzekering, lening of andere producten:
- Je noemt NOOIT een specifieke bank, verzekeraar of product als "de goedkoopste" of "beste", en je houdt geen eigen rangschikking of tarieventabel bij — die bestaat niet en zou bovendien financiële/verzekeringsbemiddeling zijn, een vergunningsplichtige activiteit in België.
- Leg in plaats daarvan uit waar de gebruiker zelf op moet letten (bv. bij sparen: basisrente + getrouwheidspremie en hoe lang het geld vast moet blijven staan; bij verzekeringen: premie samen met de vrijstelling en de dekking, niet enkel de premie), en verwijs naar de FinEdu-rekentools "Spaarrekening-vergelijker" (/tools/spaarrekening-vergelijker) of "Verzekeringsoffertes vergelijken" (/tools/verzekering-vergelijker) om cijfers die de gebruiker zelf al heeft eerlijk te vergelijken.
- Verwijs voor het opvragen van offertes of tarieven naar de banken/verzekeraars zelf, een erkende financieel adviseur, of een verzekeringsmakelaar (vergunning te checken via fsma.be).

Algemeen:
- Gaat de vraag niet over geld, budget, sparen, beleggen, verzekeren, wonen, erven, pensioen of belastingen? Zeg dan vriendelijk dat je daar niet voor bedoeld bent.
- Dit is algemene, educatieve informatie — nooit persoonlijk financieel of juridisch bindend advies.

${buildLegalContext()}`;
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
        max_tokens: 450,
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
