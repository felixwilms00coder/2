"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryIcon } from "@/components/icon";

export function SearchBox({
  initialValue = "",
  autoFocus = false,
}: {
  initialValue?: string;
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/zoeken?q=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label htmlFor="site-search" className="sr-only">
        Zoeken
      </label>
      <div className="relative flex-1">
        <CategoryIcon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          id="site-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Zoek op onderwerp, bv. 'noodbuffer' of 'nettoloon'"
          autoFocus={autoFocus}
          className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
      >
        Zoeken
      </button>
    </form>
  );
}
