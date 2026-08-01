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
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
          isHero
            ? "left-5 h-5 w-5 text-white/50"
            : "left-3.5 h-4 w-4 text-muted"
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
            ? "w-full rounded-full border border-white/15 bg-white/[0.07] py-4 pl-14 pr-16 text-base text-white placeholder:text-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-colors focus:outline-none focus:border-white/30 focus:bg-white/10 sm:py-5 sm:text-lg"
            : "w-full rounded-full border border-border bg-surface py-2.5 pl-9 pr-12 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-light"
        }
      />
      <button
        type="submit"
        aria-label="Zoeken"
        className={
          isHero
            ? "absolute right-2.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-white/85"
            : "absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-light"
        }
      >
        <ArrowRight className={isHero ? "h-5 w-5" : "h-3.5 w-3.5"} />
      </button>
    </form>
  );
}
