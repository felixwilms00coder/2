import { getCookie, setCookie } from "./cookies";

/**
 * Bijhouden welke thema's iemand op FinEdu bekijkt, om de pop-up
 * (zie personalized-popup.tsx) te personaliseren. Dit is niet-essentiële
 * tracking: mag pas gebeuren na expliciete toestemming via de
 * cookiebanner (finedu_consent), conform de ePrivacy-regels. Zonder
 * toestemming registreert recordCategoryVisit niets.
 */

export const CONSENT_COOKIE = "finedu_consent";
const INTEREST_COOKIE = "finedu_interest";
const POPUP_LAST_SHOWN_COOKIE = "finedu_popup_last_shown";
const NEWSLETTER_SUBSCRIBED_COOKIE = "finedu_newsletter_subscribed";

const INTEREST_TTL_DAYS = 30;
const POPUP_COOLDOWN_DAYS = 4;

export type ConsentStatus = "accepted" | "rejected" | "unknown";

export function getConsent(): ConsentStatus {
  const value = getCookie(CONSENT_COOKIE);
  return value === "accepted" || value === "rejected" ? value : "unknown";
}

export function setConsent(status: "accepted" | "rejected"): void {
  setCookie(CONSENT_COOKIE, status, 365);
}

export function recordCategoryVisit(categorySlug: string): void {
  if (getConsent() !== "accepted") return;

  let counts: Record<string, number> = {};
  const raw = getCookie(INTEREST_COOKIE);
  if (raw) {
    try {
      counts = JSON.parse(raw);
    } catch {
      counts = {};
    }
  }
  counts[categorySlug] = (counts[categorySlug] ?? 0) + 1;
  setCookie(INTEREST_COOKIE, JSON.stringify(counts), INTEREST_TTL_DAYS);
}

export function getTopCategory(): string | null {
  const raw = getCookie(INTEREST_COOKIE);
  if (!raw) return null;
  try {
    const counts: Record<string, number> = JSON.parse(raw);
    const entries = Object.entries(counts);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  } catch {
    return null;
  }
}

export function popupOnCooldown(): boolean {
  const raw = getCookie(POPUP_LAST_SHOWN_COOKIE);
  if (!raw) return false;
  const last = Number(raw);
  if (!Number.isFinite(last)) return false;
  return Date.now() - last < POPUP_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
}

export function markPopupShown(): void {
  setCookie(POPUP_LAST_SHOWN_COOKIE, String(Date.now()), 30);
}

export function isNewsletterSubscribed(): boolean {
  return getCookie(NEWSLETTER_SUBSCRIBED_COOKIE) === "1";
}

export function markNewsletterSubscribed(): void {
  setCookie(NEWSLETTER_SUBSCRIBED_COOKIE, "1", 365);
}
