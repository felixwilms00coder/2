"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { categories } from "@/lib/content/categories";
import { getArticle } from "@/lib/content/articles";
import { featuredArticleByCategory } from "@/lib/content/featured";
import { Container, ContentCard } from "@/components/ui";
import { SearchBox } from "@/components/search-box";
import { Logo } from "@/components/logo";
import { LevelPill } from "@/components/progress-widgets";

const directLinks = [
  { href: "/tools", label: "Rekentools" },
  { href: "/spel", label: "Keuzespel" },
  { href: "/agent", label: "Agent" },
  { href: "/pilots", label: "Pilots" },
  { href: "/quiz", label: "Quiz" },
];

export function SiteHeader() {
  const [themesOpen, setThemesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openCategorySlug, setOpenCategorySlug] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const closeAll = () => {
    setThemesOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenCategorySlug(null);
  };

  // Close every panel when navigating to a new page. Adjusting state during
  // render (rather than in an effect) avoids a cascading second render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setThemesOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenCategorySlug(null);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAll();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const themesActive = pathname.startsWith("/leerstof");

  const navLinkClass = (active: boolean) =>
    `ease-smooth relative flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold transition-colors duration-200 ${
      active
        ? "text-accent"
        : "text-foreground/75 hover:bg-surface-muted hover:text-foreground"
    }`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-border/70 bg-surface/95 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" aria-label="FinEdu — naar de startpagina">
            <Logo markClassName="h-9 w-9 text-primary" />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Hoofdnavigatie"
            className="hidden items-center gap-1 md:flex"
          >
            <button
              onClick={() => {
                setThemesOpen((v) => !v);
                setSearchOpen(false);
              }}
              aria-expanded={themesOpen}
              aria-controls="themes-panel"
              className={navLinkClass(themesActive)}
            >
              Thema&apos;s
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  themesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
              {themesActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                />
              )}
            </button>
            {directLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navLinkClass(isActive(item.href))}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/over"
              aria-current={isActive("/over") ? "page" : undefined}
              className={navLinkClass(isActive("/over"))}
            >
              Over
            </Link>
          </nav>

          <div className="flex items-center gap-1.5">
            <LevelPill />
            <button
              onClick={() => {
                setSearchOpen((v) => !v);
                setThemesOpen(false);
                setMobileOpen(false);
              }}
              aria-expanded={searchOpen}
              aria-controls="search-panel"
              aria-label="Zoeken openen"
              className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/75 transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/quiz"
              className="ease-smooth hidden min-h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast transition-all duration-200 hover:bg-accent-strong active:scale-[0.97] sm:inline-flex"
            >
              Doe de quiz
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                setMobileOpen((v) => !v);
                setSearchOpen(false);
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-panel"
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
              className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/75 transition-colors hover:bg-surface-muted hover:text-foreground md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {searchOpen && (
        <div id="search-panel" className="border-t border-border bg-surface-muted">
          <Container className="py-5">
            <SearchBox autoFocus />
          </Container>
        </div>
      )}

      {/* Desktop themes mega-panel */}
      {themesOpen && (
        <div
          id="themes-panel"
          className="hidden border-t border-border bg-surface shadow-lg md:block"
        >
          <Container className="py-8">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  Alle thema&apos;s
                </p>
                <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/leerstof/${cat.slug}`}
                        className="flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent-soft hover:text-accent"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  Uitgelicht
                </p>
                <div className="mt-4">
                  {(() => {
                    const slug = featuredArticleByCategory["sparen-en-beleggen"];
                    const a = getArticle("sparen-en-beleggen", slug);
                    return a ? (
                      <ContentCard
                        href={`/leerstof/sparen-en-beleggen/${a.slug}`}
                        kind={a.kind}
                        title={a.title}
                        description={a.summary}
                        readMinutes={a.readMinutes}
                      />
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          id="mobile-panel"
          className="max-h-[75vh] overflow-y-auto border-t border-border bg-surface md:hidden"
        >
          <Container className="py-4">
            <nav aria-label="Mobiele navigatie">
              <ul className="divide-y divide-border">
                {categories.map((cat) => {
                  const isOpen = openCategorySlug === cat.slug;
                  return (
                    <li key={cat.slug}>
                      <button
                        onClick={() =>
                          setOpenCategorySlug((s) =>
                            s === cat.slug ? null : cat.slug,
                          )
                        }
                        aria-expanded={isOpen}
                        className="flex min-h-12 w-full items-center justify-between gap-4 rounded-lg px-2 text-left text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
                      >
                        {cat.title}
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <ul className="pb-3 pl-2">
                          <li>
                            <Link
                              href={`/leerstof/${cat.slug}`}
                              className="flex min-h-11 items-center px-2 text-sm font-semibold text-accent"
                            >
                              Bekijk het volledige thema →
                            </Link>
                          </li>
                          {cat.subcategories.map((sub) => (
                            <li key={sub.slug}>
                              <Link
                                href={`/leerstof/${cat.slug}#${sub.slug}`}
                                className="flex min-h-11 items-center px-2 text-sm text-muted hover:text-foreground"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-3 flex flex-col border-t border-border pt-3">
                {[...directLinks, { href: "/voortgang", label: "Jouw voortgang" }, { href: "/over", label: "Over FinEdu" }].map(
                  (item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`flex min-h-12 items-center rounded-lg px-2 text-sm font-semibold ${
                          isActive(item.href)
                            ? "text-accent"
                            : "text-foreground hover:bg-surface-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
