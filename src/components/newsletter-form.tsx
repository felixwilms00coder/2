"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium text-foreground">
        Bedankt voor je interesse! De nieuwsbrief is nog niet actief in deze
        demo-versie van FinEdu.
      </p>
    );
  }

  return (
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="jouw@email.be"
        className="min-h-11 w-full max-w-xs rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted focus:border-accent"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        Inschrijven
      </button>
    </form>
  );
}
