"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const links = [
  { href: "/agent", label: "Agent" },
  { href: "/pilots", label: "Pilots" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/95 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Auto Broker — naar de startpagina">
          <Logo markClassName="h-9 w-9 text-primary" />
        </Link>
        <nav aria-label="Hoofdnavigatie" className="flex items-center gap-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`ease-smooth relative flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-accent"
                  : "text-foreground/75 hover:bg-surface-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
