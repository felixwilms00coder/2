import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gamepad2, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { categories, getCategory } from "@/lib/content/categories";
import { tools } from "@/lib/content/tools";
import { quizzes } from "@/lib/content/quizzes";
import { games } from "@/lib/content/game";
import { getArticle } from "@/lib/content/articles";
import {
  ButtonLink,
  Container,
  ContentCard,
  EntityCard,
  SectionHeading,
} from "@/components/ui";
import { CategoryIcon } from "@/components/icon";
import { SearchBox } from "@/components/search-box";
import { NewsletterForm } from "@/components/newsletter-form";
import { homeSuggestions } from "@/lib/content/suggestions";
import { HomeFaqJsonLd } from "@/components/json-ld";

const featuredSlugs: [string, string][] = [
  ["budget-betalen-lenen-en-verzekeren", "verzekeringen-voor-starters"],
  ["woning-en-hypothecaire-lening", "eerste-keer-huren"],
  ["erven", "erven-als-starter"],
];

const promises = [
  {
    icon: "wallet",
    title: "100% gratis",
    text: "Geen registratie, geen verborgen kosten. Alles is vrij toegankelijk.",
  },
  {
    icon: "shield",
    title: "Onafhankelijk",
    text: "We verkopen geen financiële producten en werken niet samen met banken.",
  },
  {
    icon: "clock",
    title: "In 5 minuten wijzer",
    text: "Korte stukken in gewone taal, geschreven voor de Belgische context.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "FinEdu: financieel wegwijs vanaf je eerste job",
  description:
    "FinEdu helpt jonge starters op de Vlaamse arbeidsmarkt wegwijs te raken in budget, sparen, beleggen, verzekeringen, wonen, pensioen en belastingen. Duidelijke uitleg, handige rekentools en een korte quiz.",
  path: "",
  absoluteTitle: true,
});

export default function Home() {
  const featured = featuredSlugs
    .map(([categorySlug, slug]) => ({
      categorySlug,
      article: getArticle(categorySlug, slug),
    }))
    .filter((f) => f.article);

  return (
    <>
      <HomeFaqJsonLd suggestions={homeSuggestions} />

      {/* ---- Hero: search first ---- */}
      <div className="relative overflow-hidden bg-gradient-to-b from-accent-soft/70 via-surface to-surface">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 text-accent/[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-cat-rose/15 blur-[110px]"
        />
        <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Onafhankelijk &amp; 100% gratis
          </span>

          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-6xl">
            Wat wil je weten over{" "}
            <span className="text-accent italic">je geld?</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
            Budget, sparen, beleggen, verzekeren, wonen, pensioen en
            belastingen: uitgelegd voor starters.
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <SearchBox variant="hero" />
          </div>

          <p className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Veelgestelde vragen
          </p>
          <ul className="mt-3 flex max-w-2xl flex-wrap justify-center gap-2">
            {homeSuggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="ease-smooth flex min-h-11 items-center rounded-full border border-border bg-surface px-4 text-sm text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft hover:text-accent active:scale-[0.97]"
                >
                  {s.question}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/leerstof"
            className="ease-smooth mt-10 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-surface-muted active:scale-[0.97]"
          >
            Bekijk alle thema&apos;s
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </div>

      {/* ---- Promises ---- */}
      <div className="relative overflow-hidden border-b border-border bg-accent-soft/60">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 text-accent/[0.07]"
        />
        <Container className="relative grid gap-6 py-8 sm:grid-cols-3">
          {promises.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-contrast">
                <CategoryIcon name={p.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  {p.title}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </div>

      {/* ---- Tools ---- */}
      <Container className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Rekentools"
            title="Reken het na voor jouw situatie"
            description="Geen theorie, maar een concreet cijfer voor jouw loon, budget of spaardoel."
          />
          <Link
            href="/tools"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Alle rekentools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {tools.map((tool) => (
            <EntityCard
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              icon={tool.icon}
              title={tool.title}
              description={tool.short}
              meta="Bereken"
            />
          ))}
        </div>
      </Container>

      {/* ---- Featured content ---- */}
      <div className="bg-surface-muted">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            kicker="Uitgelicht"
            title="Net voor jou geschreven"
            description="De stukken waar starters het vaakst mee beginnen."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {featured.map(({ categorySlug, article }) => (
              <ContentCard
                key={article!.slug}
                href={`/leerstof/${categorySlug}/${article!.slug}`}
                kind={article!.kind}
                title={article!.title}
                description={article!.summary}
                readMinutes={article!.readMinutes}
                color={getCategory(categorySlug)?.color}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* ---- Themes ---- */}
      <Container className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Leerstof"
            title="Kies een thema"
            description="Zeven thema's rond geld, van je eerste loonstrookje tot later plannen."
          />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <EntityCard
              key={cat.slug}
              href={`/leerstof/${cat.slug}`}
              icon={cat.icon}
              title={cat.title}
              description={cat.short}
              meta="Lees meer"
              color={cat.color}
            />
          ))}
        </div>
      </Container>

      {/* ---- Learn by doing ---- */}
      <div className="bg-surface-muted">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            kicker="Leren door te doen"
            title="Niet alleen lezen"
            description="Maak keuzes, zie de gevolgen, en test wat je onthouden hebt."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {/* Game */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-accent/20 bg-accent-soft p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
              />
              <div className="relative flex h-full flex-col">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
                  <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                  Keuzespel
                </p>
                <h3 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-foreground">
                  {games[0].title}
                </h3>
                <p className="mt-3 text-foreground/80">{games[0].description}</p>
                <div className="mt-6 pt-2">
                  <ButtonLink href={`/spel/${games[0].slug}`} variant="accent">
                    Speel het spel
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-cat-violet/10 blur-3xl"
              />
              <p className="relative flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Quiz
              </p>
              <h3 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-foreground">
                {quizzes[0].title}
              </h3>
              <p className="mt-3 text-muted">{quizzes[0].description}</p>
              <div className="mt-6 pt-2">
                <ButtonLink
                  href={`/quiz/${quizzes[0].slug}`}
                  variant="outline"
                >
                  Start de quiz
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ---- Newsletter ---- */}
      <Container id="nieuwsbrief" className="scroll-mt-24 py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="bg-dot-grid pointer-events-none absolute inset-0 text-accent/[0.05]"
          />
          <div className="relative">
            <SectionHeading
              kicker="Nieuwsbrief"
              title="Blijf op de hoogte"
              description="Af en toe een mail met nieuwe artikels, tools en tips over geld."
            />
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
