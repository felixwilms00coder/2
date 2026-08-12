"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { categories } from "@/lib/content/categories";
import { gidsen } from "@/lib/content/gidsen";
import { useMounted } from "@/lib/use-mounted";
import {
  getConsent,
  recordCategoryVisit,
  getTopCategory,
  popupOnCooldown,
  markPopupShown,
  isNewsletterSubscribed,
} from "@/lib/interest-tracking";

/** Pagina's waar een promotionele pop-up misplaatst is. */
const EXCLUDED_PREFIXES = ["/privacybeleid", "/disclaimer", "/nieuwsbrief", "/agent"];

const CATEGORY_TOOL: Record<
  string,
  { slug: string; title: string; description: string }
> = {
  "budget-betalen-lenen-en-verzekeren": {
    slug: "budgetplanner",
    title: "Probeer de budgetplanner",
    description: "Zie in twee minuten waar je geld naartoe gaat.",
  },
  "sparen-en-beleggen": {
    slug: "beleggingsplan",
    title: "Stel je beleggingsplan op",
    description: "Simuleer hoe een periodieke inleg kan groeien.",
  },
  "pensioen-en-pensioenvoorbereiding": {
    slug: "aanvullend-pensioen",
    title: "Bereken je aanvullend pensioen",
    description: "Zie wat een tweede pensioenpijler je later kan opleveren.",
  },
  "belasting-werk-en-inkomen": {
    slug: "nettoloon",
    title: "Bereken je nettoloon",
    description: "Van brutoloon naar wat er echt op je rekening komt.",
  },
  "woning-en-hypothecaire-lening": {
    slug: "aankoopkosten-woning",
    title: "Bereken je aankoopkosten",
    description: "Registratierechten, notaris en andere kosten bij een woning kopen.",
  },
};

type Slot = {
  key: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  weight: number;
};

function categorySlugFromPath(pathname: string): string | null {
  const slug = pathname.match(/^\/leerstof\/([^/]+)/)?.[1];
  if (!slug) return null;
  return categories.some((c) => c.slug === slug) ? slug : null;
}

function buildSlots(topCategory: string | null): Slot[] {
  const slots: Slot[] = [];

  if (!isNewsletterSubscribed()) {
    slots.push({
      key: "newsletter",
      href: "/#nieuwsbrief",
      eyebrow: "Nieuwsbrief",
      title: "Om de twee weken een gratis artikel",
      description: "Praktische uitleg voor starters, rechtstreeks in je mailbox.",
      cta: "Schrijf je in",
      weight: 1,
    });
  }

  const tool = topCategory ? CATEGORY_TOOL[topCategory] : undefined;
  if (tool) {
    slots.push({
      key: `tool-${tool.slug}`,
      href: `/tools/${tool.slug}`,
      eyebrow: "Rekentool",
      title: tool.title,
      description: tool.description,
      cta: "Open de tool",
      weight: 3,
    });
  }

  const gids = topCategory
    ? gidsen.find((g) => g.categorySlug === topCategory)
    : undefined;
  if (gids) {
    slots.push({
      key: `gids-${gids.slug}`,
      href: `/gids/${gids.slug}`,
      eyebrow: "Gratis pdf",
      title: gids.title,
      description: gids.short,
      cta: "Download de gids",
      weight: 3,
    });
  }

  if (slots.length === 0) {
    slots.push({
      key: "tools-overzicht",
      href: "/tools",
      eyebrow: "Rekentools",
      title: "Alle rekentools op een rij",
      description: "Van budgetplanner tot leningsimulator.",
      cta: "Bekijk de tools",
      weight: 1,
    });
  }

  return slots;
}

function pickSlot(slots: Slot[]): Slot {
  const weighted = slots.flatMap((slot) => Array(slot.weight).fill(slot));
  return weighted[Math.floor(Math.random() * weighted.length)];
}

/**
 * Toont na 10 seconden op het platform een gerandomiseerde, aan het
 * surfgedrag aangepaste tip (nieuwsbrief, rekentool of gids). Volgt enkel
 * categorie-interesse op via een cookie als de bezoeker daarvoor
 * toestemming gaf via CookieConsentBanner; zonder toestemming gebeurt er
 * niets (geen tracking, geen pop-up).
 */
export function PersonalizedPopup() {
  const pathname = usePathname();
  const mounted = useMounted();
  const [slot, setSlot] = useState<Slot | null>(null);
  const timerElapsed = useRef(false);
  const shownThisSession = useRef(false);

  useEffect(() => {
    if (getConsent() === "accepted") {
      const categorySlug = categorySlugFromPath(pathname);
      if (categorySlug) recordCategoryVisit(categorySlug);
    }
  }, [pathname]);

  useEffect(() => {
    function maybeShow() {
      if (shownThisSession.current) return;
      if (getConsent() !== "accepted") return;
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
      setSlot(pickSlot(buildSlots(getTopCategory())));
    }

    const timer = setTimeout(() => {
      timerElapsed.current = true;
      maybeShow();
    }, 10000);

    function onConsentChanged(event: Event) {
      const detail = (event as CustomEvent<{ accepted: boolean }>).detail;
      if (detail?.accepted && timerElapsed.current) maybeShow();
    }
    window.addEventListener("finedu:consent-changed", onConsentChanged);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("finedu:consent-changed", onConsentChanged);
    };
  }, []);

  if (!mounted || !slot) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-surface p-4 shadow-lg sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => setSlot(null)}
        aria-label="Sluiten"
        className="absolute right-3 top-3 rounded-full p-1 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="flex items-start gap-2 pr-6">
        <Sparkles
          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
          aria-hidden="true"
        />
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {slot.eyebrow}
        </p>
      </div>
      <p className="mt-1.5 font-display text-sm font-bold text-foreground">
        {slot.title}
      </p>
      <p className="mt-1 text-sm text-muted">{slot.description}</p>
      <Link
        href={slot.href}
        onClick={() => setSlot(null)}
        className="mt-3 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        {slot.cta}
      </Link>
      <p className="mt-2 text-[11px] text-muted">
        Waarom zie ik dit?{" "}
        <Link href="/privacybeleid" className="underline hover:text-foreground">
          Meer info
        </Link>
        .
      </p>
    </div>
  );
}
