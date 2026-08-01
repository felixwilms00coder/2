"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/content/categories";
import { getArticle } from "@/lib/content/articles";
import { featuredArticleByCategory } from "@/lib/content/featured";
import { Container, ContentCard } from "@/components/ui";
import { SearchBox } from "@/components/search-box";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openCategorySlug, setOpenCategorySlug] = useState<string | null>(
    null,
  );
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function closeAll() {
    setMenuOpen(false);
    setSearchOpen(false);
    setOpenCategorySlug(null);
  }

  return (
    <header
      ref={headerRef}
      className="border-b border-border bg-surface sticky top-0 z-40"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" onClick={closeAll} aria-label="FinEdu — naar home">
            <Logo markClassName="h-8 w-8 text-primary" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchOpen((v) => !v);
                setMenuOpen(false);
              }}
              aria-expanded={searchOpen}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-muted hover:text-foreground transition-colors"
            >
              Zoeken
            </button>
            <button
              onClick={() => {
                setMenuOpen((v) => !v);
                setSearchOpen(false);
                setOpenCategorySlug(null);
              }}
              aria-expanded={menuOpen}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-muted hover:text-foreground transition-colors"
            >
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
              Menu
            </button>
            <Link
              href="/quiz"
              onClick={closeAll}
              className="hidden sm:inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary hover:bg-accent-dark transition-colors"
            >
              Doe de quiz
            </Link>
          </div>
        </div>
      </Container>

      {searchOpen && (
        <div className="border-t border-border bg-surface-muted">
          <Container className="py-5">
            <SearchBox autoFocus />
          </Container>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-border bg-surface max-h-[75vh] overflow-y-auto">
          <Container className="py-6">
            <ul className="divide-y divide-border">
              {categories.map((cat) => {
                const isOpen = openCategorySlug === cat.slug;
                const featuredSlug = featuredArticleByCategory[cat.slug];
                const featured = featuredSlug
                  ? getArticle(cat.slug, featuredSlug)
                  : undefined;
                return (
                  <li key={cat.slug} className="py-2">
                    <button
                      onClick={() =>
                        setOpenCategorySlug((s) =>
                          s === cat.slug ? null : cat.slug,
                        )
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 rounded-lg px-2 py-3 text-left hover:bg-surface-muted transition-colors"
                    >
                      <span className="font-semibold text-foreground">
                        {cat.title}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="grid gap-8 px-2 pb-6 pt-2 lg:grid-cols-[1.3fr_1fr]">
                        <div>
                          <Link
                            href={`/leerstof/${cat.slug}`}
                            onClick={closeAll}
                            className="text-sm font-semibold text-primary-light hover:underline"
                          >
                            Bekijk het volledige thema →
                          </Link>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {cat.subcategories.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  href={`/leerstof/${cat.slug}#${sub.slug}`}
                                  onClick={closeAll}
                                  className="text-sm text-muted hover:text-foreground"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {featured && (
                          <ContentCard
                            href={`/leerstof/${cat.slug}/${featured.slug}`}
                            kind={featured.kind}
                            title={featured.title}
                            description={featured.summary}
                          />
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4">
              <Link
                href="/tools"
                onClick={closeAll}
                className="text-sm font-semibold text-primary-light hover:underline"
              >
                Alle rekentools, tips en checklists →
              </Link>
              <Link
                href="/quiz"
                onClick={closeAll}
                className="text-sm font-semibold text-primary-light hover:underline"
              >
                Doe de quiz →
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
