"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { categories } from "@/lib/content/categories";
import { useMounted } from "@/lib/use-mounted";
import {
  recordCategoryVisit,
  getTopCategory,
  popupOnCooldown,
  markPopupShown,
  isNewsletterSubscribed,
  markNewsletterSubscribed,
} from "@/lib/interest-tracking";

/** Pagina's waar een nieuwsbrief-pop-up misplaatst is. */
const EXCLUDED_PREFIXES = ["/privacybeleid", "/disclaimer", "/nieuwsbrief", "/agent"];

type Copy = { eyebrow: string; title: string; description: string };

/** Aan het meest bekeken thema aangepaste pitch (enkel gekend na toestemming voor finedu_interest). */
const CATEGORY_COPY: Record<string, Copy> = {
  "budget-betalen-lenen-en-verzekeren": {
    eyebrow: "Budget en lenen",
    title: "Grip op je dagelijkse geld",
    description:
      "Om de twee weken tips over budgetteren, verantwoord lenen en de juiste verzekeringen, rechtstreeks in je mailbox.",
  },
  familie: {
    eyebrow: "Familie",
    title: "Financieel voorbereid op grote stappen",
    description:
      "Om de twee weken tips over studeren, samenwonen en de kosten van een gezin.",
  },
  "sparen-en-beleggen": {
    eyebrow: "Sparen en beleggen",
    title: "Bouw slim aan je spaarpot",
    description:
      "Om de twee weken praktische tips over sparen en je eerste stappen in beleggen.",
  },
  erven: {
    eyebrow: "Erven en schenken",
    title: "Ook dit raakt je financiën",
    description:
      "Om de twee weken duidelijke uitleg over erven, schenken en wat het je kost.",
  },
  "pensioen-en-pensioenvoorbereiding": {
    eyebrow: "Pensioen",
    title: "Later begint nu",
    description:
      "Om de twee weken tips over waarom vroeg beginnen met pensioensparen zoveel verschil maakt.",
  },
  "belasting-werk-en-inkomen": {
    eyebrow: "Belasting en werk",
    title: "Snap je loonstrookje en aangifte",
    description:
      "Om de twee weken praktische uitleg over belastingen, je loon en je eerste job.",
  },
  "woning-en-hypothecaire-lening": {
    eyebrow: "Wonen",
    title: "Van huren naar kopen",
    description:
      "Om de twee weken tips over huren, hypotheken en de kosten van een woning.",
  },
};

/** Zonder herkend thema (nog geen toestemming, of nog te weinig bezochte pagina's): kies willekeurig uit deze algemene varianten. */
const GENERIC_COPY: Copy[] = [
  {
    eyebrow: "Nieuwsbrief",
    title: "Blijf op de hoogte",
    description:
      "Om de twee weken een gratis artikel voor starters: budget, sparen, beleggen, wonen, pensioen en belastingen.",
  },
  {
    eyebrow: "Nieuwsbrief",
    title: "Financieel wegwijs, zonder gedoe",
    description:
      "Praktische tips voor jonge starters, rechtstreeks in je mailbox. Geen spam, geen verkooppraatjes.",
  },
  {
    eyebrow: "Nieuwsbrief",
    title: "Mis geen enkele tip",
    description:
      "Om de twee weken de beste artikels en rekentools van FinEdu, verzameld in één mail.",
  },
];

function categorySlugFromPath(pathname: string): string | null {
  const slug = pathname.match(/^\/leerstof\/([^/]+)/)?.[1];
  if (!slug) return null;
  return categories.some((c) => c.slug === slug) ? slug : null;
}

function pickCopy(): Copy {
  const topCategory = getTopCategory();
  const categoryCopy = topCategory ? CATEGORY_COPY[topCategory] : undefined;
  if (categoryCopy) return categoryCopy;
  return GENERIC_COPY[Math.floor(Math.random() * GENERIC_COPY.length)];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "loading" | "sent" | "error";

/**
 * Toont na ongeveer 10 seconden op het platform een pop-up die om een
 * e-mailadres vraagt voor de nieuwsbrief. De pitch is gepersonaliseerd op
 * het thema dat iemand het meest bekijkt (bijgehouden via een cookie,
 * enkel na toestemming via CookieConsentBanner); zonder die toestemming
 * (of nog te weinig geschiedenis) toont de pop-up een willekeurige
 * algemene variant in plaats van niets. Verschijnt niet nogmaals als je al
 * ingeschreven bent, en niet vaker dan om de paar dagen.
 */
export function PersonalizedPopup() {
  const pathname = usePathname();
  const mounted = useMounted();
  const [copy, setCopy] = useState<Copy | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const shownThisSession = useRef(false);

  useEffect(() => {
    const categorySlug = categorySlugFromPath(pathname);
    if (categorySlug) recordCategoryVisit(categorySlug);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shownThisSession.current) return;
      if (isNewsletterSubscribed()) return;
      if (popupOnCooldown()) return;
      if (
        EXCLUDED_PREFIXES.some((prefix) =>
          window.location.pathname.startsWith(prefix),
        )
      ) {
        return;
      }
      shownThisSession.current = true;
      markPopupShown();
      setCopy(pickCopy());
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErrorMessage(data?.error ?? "Er ging iets mis. Probeer het later opnieuw.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      markNewsletterSubscribed();
    } catch {
      setErrorMessage("Kon geen verbinding maken. Probeer het later opnieuw.");
      setStatus("error");
    }
  }

  if (!mounted || !copy) return null;

  return (
    <div className="pointer-events-auto relative w-full max-w-sm rounded-2xl border border-border bg-surface p-4 shadow-lg">
      <button
        type="button"
        onClick={() => setCopy(null)}
        aria-label="Sluiten"
        className="absolute right-3 top-3 rounded-full p-1 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      {status === "sent" ? (
        <div className="flex items-start gap-2.5 pr-6">
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground">
            Check je inbox: klik op de link in de mail om je inschrijving te
            bevestigen.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2 pr-6">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {copy.eyebrow}
            </p>
          </div>
          <p className="mt-1.5 font-display text-sm font-bold text-foreground">
            {copy.title}
          </p>
          <p className="mt-1 text-sm text-muted">{copy.description}</p>
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
            <label htmlFor="popup-newsletter-email" className="sr-only">
              E-mailadres
            </label>
            <input
              id="popup-newsletter-email"
              type="email"
              required
              disabled={status === "loading"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.be"
              className="min-h-10 w-full rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading" || !EMAIL_RE.test(email)}
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {status === "loading" && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              Schrijf je in
            </button>
          </form>
          {status === "error" && (
            <p className="mt-2 text-xs font-medium text-warning" role="alert">
              {errorMessage}
            </p>
          )}
          <p className="mt-2 text-[11px] text-muted">
            Je kan je altijd uitschrijven. Zie ons{" "}
            <Link href="/privacybeleid" className="underline hover:text-foreground">
              privacybeleid
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
