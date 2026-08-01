import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { tools } from "@/lib/content/tools";
import { quizzes } from "@/lib/content/quizzes";
import { getArticle } from "@/lib/content/articles";
import {
  Container,
  EntityCard,
  ContentCard,
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
      <div className="relative overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[38%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl"
        />
        <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-16 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold">
            FE
          </span>
          <h1 className="mt-6 max-w-xl font-display text-2xl font-bold leading-tight sm:text-4xl">
            Wat wil je weten over je geld?
          </h1>
          <p className="mt-3 max-w-md text-sm text-white/50 sm:text-base">
            Budget, sparen, beleggen, verzekeren, wonen, pensioen en
            belastingen — uitgelegd voor starters.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <SearchBox variant="hero" autoFocus />
          </div>
          <div className="mt-5 flex max-w-2xl flex-wrap justify-center gap-2">
            {homeSuggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white transition-colors"
              >
                {s.question}
              </Link>
            ))}
          </div>
          <Link
            href="/leerstof"
            className="mt-10 text-sm font-medium text-white/40 hover:text-white/80 transition-colors"
          >
            of blader door alle thema&apos;s →
          </Link>
        </Container>
      </div>

      <Container className="py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading
            kicker="Rekentools"
            title="Populaire rekentools"
            description="Reken het meteen na voor je eigen situatie."
          />
          <Link
            href="/tools"
            className="text-sm font-semibold text-primary-light hover:underline whitespace-nowrap"
          >
            Alle rekentools, tips en checklists →
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
            />
          ))}
        </div>
      </Container>

      <div className="bg-surface-muted">
        <Container className="py-16">
          <SectionHeading kicker="Uitgelicht" title="Net voor jou geschreven" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {featured.map(({ categorySlug, article }) => (
              <ContentCard
                key={article!.slug}
                href={`/leerstof/${categorySlug}/${article!.slug}`}
                kind={article!.kind}
                title={article!.title}
                description={article!.summary}
              />
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading
            kicker="Leerstof"
            title="Kies een thema"
            description="Zeven thema's rond geld, van je eerste loon tot later plannen."
          />
          <Link
            href="/leerstof"
            className="text-sm font-semibold text-primary-light hover:underline whitespace-nowrap"
          >
            Alle thema&apos;s →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <EntityCard
              key={cat.slug}
              href={`/leerstof/${cat.slug}`}
              icon={cat.icon}
              title={cat.title}
              description={cat.short}
            />
          ))}
        </div>
      </Container>

      <div className="bg-surface-muted">
        <Container className="py-16">
          <div className="rounded-3xl bg-primary text-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Test jezelf
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
                {quizzes[0].title}
              </h2>
              <p className="mt-3 text-white/80">{quizzes[0].description}</p>
            </div>
            <Link
              href={`/quiz/${quizzes[0].slug}`}
              className="inline-flex shrink-0 items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary hover:bg-accent-dark transition-colors"
            >
              Start de quiz
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="rounded-2xl border border-border p-8 sm:p-10">
          <SectionHeading
            kicker="Nieuwsbrief"
            title="Blijf op de hoogte"
            description="Schrijf je in voor updates met nieuwe artikels, tools en tips over geld."
          />
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <CategoryIcon name="wallet" className="h-6 w-6 text-primary-light" />
            <p className="font-semibold">100% gratis</p>
            <p className="text-sm text-muted">
              Geen registratie, geen verborgen kosten. Educatieve inhoud,
              vrij toegankelijk voor iedereen.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2">
            <CategoryIcon name="shield" className="h-6 w-6 text-primary-light" />
            <p className="font-semibold">Onafhankelijk</p>
            <p className="text-sm text-muted">
              FinEdu verkoopt geen financiële producten en werkt niet
              samen met banken of verzekeraars.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2">
            <CategoryIcon name="clock" className="h-6 w-6 text-primary-light" />
            <p className="font-semibold">Voor Vlaamse starters</p>
            <p className="text-sm text-muted">
              Geschreven vanuit de Belgische context: RSZ, personenbelasting,
              pensioenpijlers en Belgische spaarproducten.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
