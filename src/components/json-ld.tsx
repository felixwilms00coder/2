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

export function ArticleJsonLd({
  title,
  description,
  href,
  readMinutes,
}: {
  title: string;
  description: string;
  href: string;
  readMinutes: number;
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
        publisher: {
          "@type": "Organization",
          name: "FinEdu",
        },
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
