import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-primary">
              Startgeld
            </p>
            <p className="mt-2 text-sm text-muted max-w-xs">
              Financieel wegwijs vanaf je eerste job. Onafhankelijke,
              praktische uitleg voor starters op de Vlaamse arbeidsmarkt.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Verkennen</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              <li>
                <Link href="/leerstof" className="hover:text-foreground">
                  Leerstof
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-foreground">
                  Rekentools
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-foreground">
                  Quiz
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Goed om te weten
            </p>
            <p className="mt-2 text-sm text-muted max-w-xs">
              Startgeld geeft algemene, educatieve informatie en is geen
              persoonlijk financieel advies. Bedragen, tarieven en
              belastingschijven wijzigen jaarlijks: controleer officiële
              bronnen zoals FOD Financiën, RSZ en{" "}
              <span className="whitespace-nowrap">mypension.be</span> voor
              actuele cijfers.
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Startgeld. Gemaakt als educatief
          platform, geïnspireerd door Wikifin.
        </p>
      </div>
    </footer>
  );
}
