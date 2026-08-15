import { Suggestion } from "@/lib/content/suggestions";
import { SITE_URL } from "@/lib/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomeFaqJsonLd({
  suggestions,
}: {
  suggestions: Suggestion[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: suggestions.map((s) => ({
          "@type": "Question",
          name: s.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: s.answer,
          },
        })),
      }}
    />
  );
}

export function ArticleFaqJsonLd({
  pairs,
}: {
  pairs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pairs.map((p) => ({
          "@type": "Question",
          name: p.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: p.answer,
          },
        })),
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "FinEdu",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/zoeken?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "FinEdu",
        url: SITE_URL,
        description:
          "FinEdu helpt jonge starters op de Vlaamse arbeidsmarkt wegwijs te raken in budget, sparen, beleggen, verzekeringen, wonen, pensioen en belastingen.",
      }}
    />
  );
}

const publisher = { "@type": "Organization", name: "FinEdu" };

export function ArticleJsonLd({
  title,
  description,
  href,
  readMinutes,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  href: string;
  readMinutes: number;
  datePublished?: string;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE_URL}${href}`,
        inLanguage: "nl-BE",
        isAccessibleForFree: true,
        timeRequired: `PT${readMinutes}M`,
        publisher,
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
      }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  href,
  datePublished,
}: {
  title: string;
  description: string;
  href: string;
  datePublished: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: `${SITE_URL}${href}`,
        inLanguage: "nl-BE",
        isAccessibleForFree: true,
        datePublished,
        publisher,
      }}
    />
  );
}

export function LexiconJsonLd({
  terms,
}: {
  terms: { term: string; definition: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "FinEdu Financieel Lexicon",
        url: `${SITE_URL}/lexicon`,
        hasDefinedTerm: terms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.definition,
        })),
      }}
    />
  );
}

export function LegislationJsonLd({
  entries,
}: {
  entries: {
    slug: string;
    title: string;
    officialTitle: string;
    summary: string;
    sourceUrl: string;
    lastVerified: string;
  }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": entries.map((entry) => ({
          "@type": "Legislation",
          "@id": `${SITE_URL}/wetgeving#${entry.slug}`,
          legislationIdentifier: entry.officialTitle,
          name: entry.title,
          description: entry.summary,
          url: entry.sourceUrl,
          legislationDate: entry.lastVerified,
          inLanguage: "nl-BE",
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  );
}
