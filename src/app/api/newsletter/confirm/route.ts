import { NextResponse } from "next/server";
import {
  getResendClient,
  newsletterConfigured,
  verifyConfirmToken,
} from "@/lib/newsletter";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token || !newsletterConfigured()) {
    return NextResponse.redirect(`${SITE_URL}/nieuwsbrief/ongeldig`);
  }

  const email = verifyConfirmToken(token);
  if (!email) {
    return NextResponse.redirect(`${SITE_URL}/nieuwsbrief/ongeldig`);
  }

  const resend = getResendClient()!;

  try {
    await resend.contacts.update({
      email,
      unsubscribed: false,
    });
  } catch {
    return NextResponse.redirect(`${SITE_URL}/nieuwsbrief/ongeldig`);
  }

  return NextResponse.redirect(`${SITE_URL}/nieuwsbrief/bevestigd`);
}
