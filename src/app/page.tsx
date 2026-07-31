import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { tools } from "@/lib/content/tools";
import { quizzes } from "@/lib/content/quizzes";
import { Container, EntityCard, SectionHeading } from "@/components/ui";
import { CategoryIcon } from "@/components/icon";

export default function Home() {
  const featuredCategories = categories.slice(0, 6);

  return (
    <>
      <div className="bg-primary text-white">
        <Container className="py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Financiële educatie voor Vlaamse starters
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold max-w-2xl leading-tight">
            Je eerste loon, je eerste keuzes. Startgeld legt het gewoon uit.
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-xl">
            Duidelijke uitleg over loon, sparen, beleggen, verzekeringen,
            lenen, pensioen en belastingen — geschreven voor wie net op de
            arbeidsmarkt is gestart. Geen jargon, wel praktische rekentools en
            een quiz om je kennis te testen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
            kicker="Leerstof"
            title="Leer de basis, onderwerp per onderwerp"
            description="Korte, praktische artikels rond de financiële thema's waar starters het eerst mee te maken krijgen."
          />
          <Link
            href="/leerstof"
            className="text-sm font-semibold text-primary-light hover:underline whitespace-nowrap"
          >
            Alle onderwerpen →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((cat) => (
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
          <SectionHeading
            kicker="Rekentools"
            title="Reken het na voor je eigen situatie"
            description="Van je nettoloon tot je spaardoel: onze tools geven je meteen een concreet, persoonlijk antwoord."
          />
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
      </div>

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
              Startgeld verkoopt geen financiële producten en werkt niet
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
