"use client";

/** Laat de cookiebanner opnieuw verschijnen, zodat een bezoeker zijn keuze kan herzien. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("finedu:open-cookie-settings"))
      }
      className="inline-flex min-h-9 items-center hover:text-accent"
    >
      Cookie-instellingen
    </button>
  );
}
