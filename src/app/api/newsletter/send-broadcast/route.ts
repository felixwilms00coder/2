import { NextResponse } from "next/server";
import { getBlogPost } from "@/lib/content/blog";
import { getResendClient, newsletterConfigured } from "@/lib/newsletter";
import { SITE_URL } from "@/lib/site";
import type { ArticleBlock } from "@/lib/content/types";

export const runtime = "nodejs";

/**
 * Verstuurt de tweewekelijkse nieuwsbrief: een Resend Broadcast naar de
 * volledige (bevestigde) Audience, op basis van één blogpost uit blog.ts.
 *
 * Beveiligd met een apart NEWSLETTER_ADMIN_SECRET (niet de Resend-key
 * zelf): enkel bedoeld om vanuit de tweewekelijkse agent-sessie aangeroepen
 * te worden, en pas na expliciete goedkeuring door de gebruiker. Dit
 * eindpunt stuurt onmiddellijk en onomkeerbaar mail naar iedereen op de
 * lijst: er is met opzet geen "automatisch elke 14 dagen" cron die dit
 * rechtstreeks aanroept.
 */
function blocksToHtml(blocks: ArticleBlock[]): string {
  const parts: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        parts.push(`<h2 style="font-size:20px;margin:24px 0 8px;">${block.text}</h2>`);
        break;
      case "p":
        parts.push(`<p style="margin:0 0 12px;line-height:1.6;">${block.text}</p>`);
        break;
      case "list":
      case "steps":
        parts.push(
          `<ul style="margin:0 0 12px;padding-left:20px;">${block.items
            .map((item) => `<li style="margin-bottom:4px;">${item}</li>`)
            .join("")}</ul>`,
        );
        break;
      case "callout":
        parts.push(
          `<p style="margin:0 0 12px;padding:12px 16px;background:#f5f2ec;border-left:3px solid #0369a1;"><strong>${block.title}</strong><br/>${block.text}</p>`,
        );
        break;
      case "figure":
        parts.push(
          `<p style="margin:0 0 12px;"><strong>${block.value}</strong>: ${block.label}</p>`,
        );
        break;
      case "check":
      case "reveal":
        // Interactieve blokken slaan we over in de mail: die werken enkel op de site zelf.
        break;
    }
  }
  return parts.join("\n");
}

export async function POST(request: Request) {
  const adminSecret = process.env.NEWSLETTER_ADMIN_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Niet geautoriseerd." }, { status: 401 });
  }

  if (!newsletterConfigured()) {
    return NextResponse.json(
      { error: "Nieuwsbrief is niet geconfigureerd (ontbrekende RESEND_*-variabelen)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const slug = (body as { blogSlug?: unknown } | null)?.blogSlug;
  if (typeof slug !== "string" || !slug) {
    return NextResponse.json({ error: "blogSlug ontbreekt." }, { status: 400 });
  }

  const post = getBlogPost(slug);
  if (!post) {
    return NextResponse.json({ error: `Geen blogpost gevonden voor slug "${slug}".` }, { status: 404 });
  }

  const resend = getResendClient()!;
  const segmentId = process.env.RESEND_SEGMENT_ID!;
  const fromEmail = process.env.RESEND_FROM_EMAIL!;
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  const html = `
    <div style="font-family:sans-serif;color:#1c1a17;max-width:600px;margin:0 auto;">
      <p style="font-size:13px;color:#78716c;">FinEdu-nieuwsbrief</p>
      <h1 style="font-size:26px;margin:0 0 16px;">${post.title}</h1>
      <p style="font-size:15px;color:#57534e;margin:0 0 20px;">${post.summary}</p>
      ${blocksToHtml(post.blocks)}
      <p style="margin:24px 0;">
        <a href="${articleUrl}" style="color:#0369a1;font-weight:600;">Lees het volledige artikel op FinEdu &rarr;</a>
      </p>
      <hr style="border:none;border-top:1px solid #e7e2d9;margin:32px 0 16px;" />
      <p style="font-size:12px;color:#a8a29e;">
        Je ontvangt dit omdat je je inschreef op de FinEdu-nieuwsbrief.
        <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#a8a29e;">Uitschrijven</a>.
      </p>
    </div>
  `;

  try {
    const broadcast = await resend.broadcasts.create({
      segmentId,
      from: fromEmail,
      subject: post.title,
      html,
      name: `Nieuwsbrief: ${post.title}`,
    });

    if (!broadcast.data?.id) {
      return NextResponse.json({ error: "Broadcast aanmaken is niet gelukt." }, { status: 502 });
    }

    await resend.broadcasts.send(broadcast.data.id);

    return NextResponse.json({ ok: true, broadcastId: broadcast.data.id });
  } catch {
    return NextResponse.json({ error: "Versturen is niet gelukt." }, { status: 502 });
  }
}
