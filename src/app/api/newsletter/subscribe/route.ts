import { NextResponse } from "next/server";
import {
  createConfirmToken,
  getResendClient,
  newsletterConfigured,
} from "@/lib/newsletter";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const rawEmail = (body as { email?: unknown } | null)?.email;
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  if (!newsletterConfigured()) {
    return NextResponse.json(
      {
        error:
          "De nieuwsbrief is nog niet geconfigureerd op de server (ontbrekende RESEND_*-variabelen).",
      },
      { status: 503 },
    );
  }

  const resend = getResendClient()!;
  const segmentId = process.env.RESEND_SEGMENT_ID!;
  const fromEmail = process.env.RESEND_FROM_EMAIL!;

  // Contact aanmaken als "unsubscribed": pas na het klikken op de
  // bevestigingslink in de mail (double opt-in) zet /api/newsletter/confirm
  // dit om naar actief ingeschreven. Bestaat de contact al, dan overschrijft
  // dit gewoon dezelfde (niet-bevestigde of al bevestigde) staat opnieuw,
  // wat onschadelijk is.
  try {
    await resend.contacts.create({
      email,
      unsubscribed: true,
      segments: [{ id: segmentId }],
    });
  } catch {
    return NextResponse.json(
      { error: "Inschrijven is niet gelukt. Probeer het later opnieuw." },
      { status: 502 },
    );
  }

  const token = createConfirmToken(email);
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Bevestig je inschrijving op de FinEdu-nieuwsbrief",
      html: `
        <p>Hoi,</p>
        <p>Bevestig je e-mailadres om de FinEdu-nieuwsbrief te ontvangen: een gratis artikel om de twee weken, over budget, sparen, beleggen, wonen, pensioen of belastingen voor starters.</p>
        <p><a href="${confirmUrl}">Ja, ik wil de nieuwsbrief ontvangen</a></p>
        <p>Heb je dit niet aangevraagd? Negeer deze mail gerust, dan gebeurt er niets.</p>
        <p>Deze link is 48 uur geldig.</p>
        <p>FinEdu &middot; onafhankelijk financieel educatieplatform</p>
      `,
    });
  } catch {
    return NextResponse.json(
      { error: "Bevestigingsmail versturen is niet gelukt. Probeer het later opnieuw." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
