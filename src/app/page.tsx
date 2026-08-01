import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/content/categories";
import { tools } from "@/lib/content/tools";
import { quizzes } from "@/lib/content/quizzes";
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
import { LogoMark } from "@/components/logo";
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
      <div className="on-dark relative overflow-hidden bg-[#0e0d0b] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/hero-skyline.svg')] bg-cover bg-bottom bg-no-repeat"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_36%,rgba(10,10,9,0.9),rgba(10,10,9,0.6)_58%,rgba(10,10,9,0.18))]"
        />
        <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-16 text-center">
          <LogoMark className="h-12 w-12 text-white/[0.14]" />

          <h1 className="mt-6 max-w-2xl font-display text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
            Wat wil je weten over je geld?
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/65 sm:text-base">
            Budget, sparen, beleggen, verzekeren, wonen, pensioen en
            belastingen — uitgelegd voor starters.
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <SearchBox variant="hero" />
          </div>

          <p className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Veelgestelde vragen
          </p>
          <ul className="mt-3 flex max-w-2xl flex-wrap justify-center gap-2">
            {homeSuggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex min-h-11 items-center rounded-full border border-white/15 bg-black/40 px-4 text-sm text-white/80 backdrop-blur-sm transition-colors hover:border-accent-bright/60 hover:bg-black/65 hover:text-white"
                >
                  {s.question}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/leerstof"
            className="mt-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.85)] transition-colors hover:text-white"
          >
            of blader door alle thema&apos;s
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </div>

      {/* ---- Promises ---- */}
      <div className="border-b border-border bg-accent-soft/60">
        <Container className="grid gap-6 py-8 sm:grid-cols-3">
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
      <Container className="py-16">
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
        <Container className="py-16">
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
              />
            ))}
          </div>
        </Container>
      </div>

      {/* ---- Themes ---- */}
      <Container className="py-16">
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
            />
          ))}
        </div>
      </Container>

      {/* ---- Quiz CTA ---- */}
      <div className="bg-surface-muted">
        <Container className="py-16">
          <div className="on-dark relative overflow-hidden rounded-3xl bg-primary p-8 text-white sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent-bright">
                  Test jezelf
                </p>
                <h2 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {quizzes[0].title}
                </h2>
                <p className="mt-3 text-white/80">{quizzes[0].description}</p>
              </div>
              <ButtonLink
                href={`/quiz/${quizzes[0].slug}`}
                variant="accent"
                className="shrink-0"
              >
                Start de quiz
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {/* ---- Newsletter ---- */}
      <Container className="py-16">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <SectionHeading
            kicker="Nieuwsbrief"
            title="Blijf op de hoogte"
            description="Af en toe een mail met nieuwe artikels, tools en tips over geld."
          />
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </>
  );
}
