import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Open-weight model (Llama 3.3), gehost via Groq's OpenAI-compatible API. */
const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MAX_QUERY_LENGTH = 300;

const SYSTEM_PROMPT = `Je bent de zoekassistent van FinEdu, een onafhankelijk educatief platform over persoonlijke financiën voor starters op de Vlaamse arbeidsmarkt.

Regels:
- Antwoord kort, praktisch en in het Nederlands (nl-BE), maximaal ongeveer 120 woorden.
- Je geeft geen persoonlijk financieel, beleggings- of belastingadvies over de specifieke situatie van de gebruiker. Leg principes en begrippen uit; beveel geen concrete producten, aandelen, fondsen of banken aan.
- Belgische cijfers zoals belastingschijven, RSZ-percentages en pensioenleeftijd veranderen jaarlijks. Geef ze enkel als indicatieve orde van grootte, en verwijs voor de actuele, exacte cijfers naar officiële bronnen zoals FOD Financiën, RSZ of mypension.be.
- Gaat de vraag niet over geld, budget, sparen, beleggen, verzekeren, wonen, pensioen of belastingen? Zeg dan vriendelijk dat je daar niet voor bedoeld bent.
- Dit is algemene, educatieve informatie, geen persoonlijk advies.`;

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
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: query },
        ],
        temperature: 0.3,
        max_tokens: 350,
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
