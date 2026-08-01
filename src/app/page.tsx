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
      <div className="bg-primary text-white">
        <Container className="flex flex-col items-center py-16 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Voor jouw vragen over geld
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Je eerste loon, je eerste keuzes. FinEdu legt het gewoon uit.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Duidelijke uitleg over budget, sparen, beleggen, verzekeren,
            wonen, pensioen en belastingen — geschreven voor wie net op de
            arbeidsmarkt is gestart.
          </p>
          <div className="mt-8 w-full max-w-2xl rounded-2xl bg-white/10 p-2">
            <SearchBox />
          </div>
          <div className="mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
            {homeSuggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm text-white/85 hover:bg-white/10 hover:text-white transition-colors"
              >
                {s.question}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/leerstof"
              className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-primary hover:bg-accent-dark transition-colors"
            >
              Begin met leren
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Bekijk rekentools
            </Link>
          </div>
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
