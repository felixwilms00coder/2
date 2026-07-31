import Link from "next/link";

const navItems = [
  { href: "/leerstof", label: "Leerstof" },
  { href: "/tools", label: "Rekentools" },
  { href: "/quiz", label: "Quiz" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 font-display">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-accent font-bold text-sm">
              SG
            </span>
            <span className="text-lg font-bold tracking-tight text-primary">
              Startgeld
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/quiz"
            className="hidden sm:inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary hover:bg-accent-dark transition-colors"
          >
            Doe de quiz
          </Link>
        </div>
        <nav className="flex sm:hidden items-center gap-1 pb-3 -mt-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 hover:bg-surface-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
