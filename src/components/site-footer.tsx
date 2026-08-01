import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Logo markClassName="h-8 w-8 text-primary" />
            <p className="mt-3 text-sm text-muted max-w-xs">
              Financieel wegwijs vanaf je eerste job. Onafhankelijke,
              praktische uitleg voor starters op de Vlaamse arbeidsmarkt.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Thema&apos;s</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              <li>
                <Link href="/tools" className="hover:text-foreground">
                  Alle rekentools, tips en checklists
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/leerstof/${cat.slug}`}
                    className="hover:text-foreground"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
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
              FinEdu geeft algemene, educatieve informatie en is geen
              persoonlijk financieel advies. Bedragen, tarieven en
              belastingschijven wijzigen jaarlijks: controleer officiële
              bronnen zoals FOD Financiën, RSZ en{" "}
              <span className="whitespace-nowrap">mypension.be</span> voor
              actuele cijfers.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <li>
              <Link href="/over" className="hover:text-foreground">
                Over FinEdu
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-foreground">
                Disclaimer
              </Link>
            </li>
          </ul>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} FinEdu. Gemaakt als educatief
            platform, geïnspireerd door Wikifin.
          </p>
        </div>
      </div>
    </footer>
  );
}
