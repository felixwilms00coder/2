"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { lexicon } from "@/lib/content/lexicon";
import { categories } from "@/lib/content/categories";

export function LexiconLijst() {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState<string | null>(null);

  const resultaten = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lexicon
      .filter((entry) => !categorySlug || entry.categorySlug === categorySlug)
      .filter(
        (entry) =>
          !q ||
          entry.term.toLowerCase().includes(q) ||
          entry.uitleg.toLowerCase().includes(q),
      )
      .sort((a, b) => a.term.localeCompare(b.term, "nl-BE"));
  }, [query, categorySlug]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <label htmlFor="lexicon-zoek" className="sr-only">
            Zoek een begrip
          </label>
          <input
            id="lexicon-zoek"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek een begrip, bv. “getrouwheidspremie”"
            className="min-h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm text-foreground focus:border-accent"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategorySlug(null)}
          aria-pressed={categorySlug === null}
          className={`ease-smooth inline-flex min-h-9 items-center rounded-full border px-3.5 text-xs font-semibold transition-all duration-200 ${
            categorySlug === null
              ? "border-accent bg-accent-soft text-accent"
              : "border-border text-muted hover:border-accent/40 hover:text-foreground"
          }`}
        >
          Alle thema&apos;s
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setCategorySlug(cat.slug)}
            aria-pressed={categorySlug === cat.slug}
            className={`ease-smooth inline-flex min-h-9 items-center rounded-full border px-3.5 text-xs font-semibold transition-all duration-200 ${
              categorySlug === cat.slug
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted" role="status">
        {resultaten.length} {resultaten.length === 1 ? "begrip" : "begrippen"}
      </p>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {resultaten.map((entry) => (
          <div
            key={entry.slug}
            id={entry.slug}
            className="scroll-mt-24 rounded-2xl border border-border bg-surface p-5"
          >
            <dt className="font-display font-bold text-foreground">
              {entry.term}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">
              {entry.uitleg}
            </dd>
          </div>
        ))}
      </dl>

      {resultaten.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">
          Geen begrip gevonden voor &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}
