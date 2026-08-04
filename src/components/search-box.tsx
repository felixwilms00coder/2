"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

export function SearchBox({
  initialValue = "",
  autoFocus = false,
  variant = "default",
  placeholder = "Stel je vraag over geld, bv. 'hoeveel noodbuffer heb ik nodig?'",
}: {
  initialValue?: string;
  autoFocus?: boolean;
  variant?: "default" | "hero";
  placeholder?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/zoeken?q=${encodeURIComponent(value)}`);
  }

  const isHero = variant === "hero";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        Zoeken
      </label>
      <Search
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
          isHero ? "left-5 h-5 w-5 text-muted" : "left-4 h-4 w-4 text-muted"
        }`}
      />
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={
          isHero
            ? "w-full rounded-full border border-border bg-surface py-4 pl-14 pr-16 text-base text-foreground placeholder:text-muted shadow-[0_12px_40px_-16px_rgba(28,26,23,0.18)] transition-colors hover:border-foreground/20 focus:border-accent sm:py-5 sm:text-lg"
            : "w-full min-h-11 rounded-full border border-border bg-surface py-2.5 pl-11 pr-14 text-sm text-foreground placeholder:text-muted transition-colors hover:border-foreground/25 focus:border-accent"
        }
      />
      <button
        type="submit"
        aria-label="Zoeken"
        className={`absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-contrast transition-colors hover:bg-accent-strong ${
          isHero ? "right-2.5 h-11 w-11" : "right-1.5 h-9 w-9"
        }`}
      >
        <ArrowRight className={isHero ? "h-5 w-5" : "h-4 w-4"} />
      </button>
    </form>
  );
}
