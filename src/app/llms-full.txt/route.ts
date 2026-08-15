import { articles } from "@/lib/content/articles";
import { lexicon } from "@/lib/content/lexicon";
import { legislation } from "@/lib/content/legislation";
import { flattenBlocks } from "@/lib/content/flatten";
import { SITE_URL } from "@/lib/site";

/**
 * Volledige machine-leesbare export van artikel-, lexicon- en
 * wetgevingsinhoud (opkomende llms-full.txt-conventie, naast llms.txt).
 * Hergebruikt dezelfde flattenBlocks-transformatie als de AI-antwoord-
 * context (src/lib/ai-context.ts), zodat er maar één plek is die
 * ArticleBlock[] naar platte tekst omzet.
 */
export async function GET() {
  const articleSections = articles
    .map(
      (a) =>
        `## ${a.title}\n${SITE_URL}/leerstof/${a.categorySlug}/${a.slug}\n\n${a.summary}\n\n${flattenBlocks(a.blocks)}`,
    )
    .join("\n\n---\n\n");

  const lexiconSection = lexicon
    .map((e) => `- ${e.term}: ${e.uitleg}`)
    .join("\n");

  const legislationSection = legislation
    .map(
      (l) =>
        `- ${l.title} — ${l.officialTitle} (${l.sourceUrl}, laatst nagekeken ${l.lastVerified})\n  ${l.summary}`,
    )
    .join("\n");

  const body = `# FinEdu — volledige content-export

> Machine-leesbare export van alle FinEdu-leerstofartikels, het financieel
> lexicon en de wetgevingssamenvattingen, voor AI-antwoordmachines en
> andere geautomatiseerde consumenten. Nederlandstalig (nl-BE). Geen
> persoonlijk financieel, fiscaal of juridisch advies — zie
> ${SITE_URL}/disclaimer. Zie ${SITE_URL}/llms.txt voor een beknopt overzicht
> van de volledige site.

# Artikels (/leerstof)

${articleSections}

# Financieel lexicon (/lexicon)

${lexiconSection}

# Wetgeving (/wetgeving)

${legislationSection}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
