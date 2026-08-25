"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cookie } from "lucide-react";
import { getConsent, setConsent } from "@/lib/interest-tracking";
import { useMounted } from "@/lib/use-mounted";
import { springDrawer, reducedMotionTransition } from "@/lib/motion";

export function CookieConsentBanner() {
  const mounted = useMounted();
  const [visible, setVisible] = useState(() => getConsent() === "unknown");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function openSettings() {
      setVisible(true);
    }
    window.addEventListener("finedu:open-cookie-settings", openSettings);
    return () =>
      window.removeEventListener("finedu:open-cookie-settings", openSettings);
  }, []);

  function decide(status: "accepted" | "rejected") {
    setConsent(status);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("finedu:consent-changed", {
        detail: { accepted: status === "accepted" },
      }),
    );
  }

  return (
    <AnimatePresence>
      {mounted && visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={prefersReducedMotion ? reducedMotionTransition : springDrawer}
          className="pointer-events-auto w-full border-t border-border bg-surface/90 px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:px-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Cookie
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <p className="text-sm text-foreground">
                FinEdu toont soms een nieuwsbrief-pop-up en gebruikt daarvoor een
                functionele cookie (zodat je ze niet te vaak te zien krijgt).
                Geef je toestemming, dan personaliseren we die pop-up bovendien op
                basis van welke onderwerpen je op FinEdu bekijkt. Optioneel: dat
                werkt ook prima zonder. Zie ons{" "}
                <Link
                  href="/privacybeleid"
                  className="underline hover:text-accent"
                >
                  privacybeleid
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => decide("rejected")}
                className="ease-smooth inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-all hover:bg-surface-muted active:scale-[0.97]"
              >
                Enkel noodzakelijke
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="ease-smooth inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast transition-all hover:bg-accent-strong active:scale-[0.97]"
              >
                Cookies accepteren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
