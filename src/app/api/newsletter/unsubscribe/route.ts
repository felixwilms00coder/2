import { NextResponse } from "next/server";
import {
  getResendClient,
  newsletterConfigured,
  verifyUnsubscribeToken,
} from "@/lib/newsletter";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

async function unsubscribe(token: string | null) {
  if (!token || !newsletterConfigured()) return false;
  const email = verifyUnsubscribeToken(token);
  if (!email) return false;

  const resend = getResendClient()!;
  try {
    await resend.contacts.update({ email, unsubscribed: true });
    return true;
  } catch {
    return false;
  }
}

/** Klassieke link in de mail: klik en je bent uitgeschreven. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const ok = await unsubscribe(url.searchParams.get("token"));
  return NextResponse.redirect(
    `${SITE_URL}/nieuwsbrief/${ok ? "uitgeschreven" : "ongeldig"}`,
  );
}

/** One-click unsubscribe (RFC 8058): mailproviders sturen dit automatisch
 * als "spam"/"unsubscribe" wordt aangeklikt, zonder de link te openen. */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const ok = await unsubscribe(url.searchParams.get("token"));
  return ok
    ? new NextResponse(null, { status: 200 })
    : new NextResponse(null, { status: 400 });
}
