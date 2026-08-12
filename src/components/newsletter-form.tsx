"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "sent" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage(
          data?.error ?? "Er ging iets mis. Probeer het later opnieuw.",
        );
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMessage("Kon geen verbinding maken. Probeer het later opnieuw.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        Check je inbox: klik op de link in de mail om je inschrijving te
        bevestigen.
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          E-mailadres
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          disabled={status === "loading"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.be"
          className="min-h-11 w-full max-w-xs rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted focus:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-70"
        >
          {status === "loading" && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Inschrijven
        </button>
      </form>
      <p className="mt-2.5 max-w-sm text-xs leading-relaxed text-muted">
        Om de twee weken een gratis artikel, niets anders. Je bevestigt via
        e-mail en kan je op elk moment uitschrijven. Zie ons{" "}
        <Link href="/privacybeleid" className="underline hover:text-foreground">
          privacybeleid
        </Link>
        .
      </p>
      {status === "error" && (
        <p className="mt-2 text-xs font-medium text-warning" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
