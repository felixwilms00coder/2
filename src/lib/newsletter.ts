import { createHmac, timingSafeEqual } from "crypto";
import { Resend } from "resend";

/**
 * Nieuwsbrief-inschrijving via Resend (Segments + Contacts + Broadcasts).
 * Resend noemde dit vroeger "Audiences"; sinds de migratie naar Segments
 * gebruiken nieuwe contacten/broadcasts `segmentId` in plaats van het
 * verouderde `audienceId`. Geen eigen database: bevestigingslinks zijn een
 * zelfondertekend token (HMAC met NEWSLETTER_CONFIRM_SECRET), en de
 * "pending vs. bevestigd"-status leeft in Resend zelf via het
 * `unsubscribed`-veld op de contact (true = nog niet bevestigd/ontvangt
 * niets, false = actief ingeschreven).
 *
 * Vereiste env-variabelen (Vercel): RESEND_API_KEY, RESEND_SEGMENT_ID,
 * RESEND_FROM_EMAIL (een adres op een in Resend geverifieerd domein),
 * NEWSLETTER_CONFIRM_SECRET (een willekeurige lange string).
 */

const CONFIRM_TOKEN_TTL_MS = 1000 * 60 * 60 * 48; // 48 uur geldig

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function newsletterConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_SEGMENT_ID &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.NEWSLETTER_CONFIRM_SECRET,
  );
}

function sign(payload: string): string {
  const secret = process.env.NEWSLETTER_CONFIRM_SECRET;
  if (!secret) throw new Error("NEWSLETTER_CONFIRM_SECRET ontbreekt");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Maakt een bevestigingstoken: base64url(email.verlooptijd.handtekening). */
export function createConfirmToken(email: string): string {
  const expires = Date.now() + CONFIRM_TOKEN_TTL_MS;
  const payload = `${email}.${expires}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`, "utf8").toString("base64url");
}

/** Controleert een bevestigingstoken en geeft het e-mailadres terug indien geldig. */
export function verifyConfirmToken(token: string): string | null {
  let decoded: string;
  try {
    decoded = Buffer.from(token, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const parts = decoded.split(".");
  if (parts.length !== 3) return null;
  const [email, expiresStr, signature] = parts;
  const expires = Number(expiresStr);
  if (!email || !Number.isFinite(expires)) return null;
  if (Date.now() > expires) return null;

  const expectedSignature = sign(`${email}.${expiresStr}`);
  const expectedBuf = Buffer.from(expectedSignature, "hex");
  const actualBuf = Buffer.from(signature, "hex");
  if (
    expectedBuf.length !== actualBuf.length ||
    !timingSafeEqual(expectedBuf, actualBuf)
  ) {
    return null;
  }
  return email;
}

/**
 * Uitschrijflink: geen vervaltijd (moet jarenlang blijven werken, elke
 * verstuurde nieuwsbrief bevat deze link) en een apart "vak" (prefix) in de
 * handtekening, zodat een bevestigingstoken nooit ook als uitschrijflink
 * bruikbaar is of omgekeerd.
 */
export function createUnsubscribeToken(email: string): string {
  const payload = `unsub.${email}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`, "utf8").toString("base64url");
}

export function verifyUnsubscribeToken(token: string): string | null {
  let decoded: string;
  try {
    decoded = Buffer.from(token, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const parts = decoded.split(".");
  if (parts.length !== 3 || parts[0] !== "unsub") return null;
  const [, email, signature] = parts;
  if (!email) return null;

  const expectedSignature = sign(`unsub.${email}`);
  const expectedBuf = Buffer.from(expectedSignature, "hex");
  const actualBuf = Buffer.from(signature, "hex");
  if (
    expectedBuf.length !== actualBuf.length ||
    !timingSafeEqual(expectedBuf, actualBuf)
  ) {
    return null;
  }
  return email;
}
