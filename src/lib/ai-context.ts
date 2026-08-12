import { articles } from "./content/articles";
import { legislation } from "./content/legislation";
import { lexicon } from "./content/lexicon";
import { officialSources } from "./content/sources";
import { tools } from "./content/tools";
import type { ArticleBlock } from "./content/types";

/** Plattekst-weergave van een artikel: elk bloktype wordt een regel, zodat
 * het model de inhoud kan gebruiken zonder de UI-structuur te kennen. */
function flattenBlocks(blocks: ArticleBlock[]): string {
  const lines: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        lines.push(`## ${block.text}`);
        break;
      case "p":
        lines.push(block.text);
        break;
      case "list":
      case "steps":
        lines.push(...block.items.map((item) => `- ${item}`));
        break;
      case "callout":
        lines.push(
          `(${block.tone === "tip" ? "Tip" : "Let op"}: ${block.title}) ${block.text}`,
        );
        break;
      case "check":
        lines.push(block.explanation);
        break;
      case "reveal":
        lines.push(`${block.prompt} ${block.answer}`);
        break;
      case "figure":
        lines.push(
          `Kerncijfer: ${block.label}: ${block.value}${block.source ? ` (bron: ${block.source})` : ""}`,
        );
        break;
    }
  }
  return lines.join("\n");
}

function buildArticleContext(): string {
  return articles
    .map(
      (a) =>
        `### "${a.title}" (/leerstof/${a.categorySlug}/${a.slug})\n${a.summary}\n${flattenBlocks(a.blocks)}`,
    )
    .join("\n\n");
}

function buildLexiconContext(): string {
  return lexicon.map((e) => `- ${e.term}: ${e.uitleg}`).join("\n");
}

function buildToolsContext(): string {
  return tools
    .map((t) => `- "${t.title}" (/tools/${t.slug}): ${t.description}`)
    .join("\n");
}

function buildLegislationContext(): string {
  return legislation
    .map(
      (l) =>
        `- "${l.title}": ${l.officialTitle} (bron: ${l.sourceUrl}, laatst nagekeken ${l.lastVerified}). ${l.summary}`,
    )
    .join("\n");
}

function buildSourcesContext(): string {
  return officialSources
    .map((s) => `- ${s.name} (${s.url}): ${s.description}`)
    .join("\n");
}

/**
 * Volledige kennisbank van FinEdu, samengevoegd tot vaste context voor de
 * systeemprompt van het AI-antwoord (zie src/app/api/ai-answer/route.ts).
 * Bevat alles wat FinEdu zelf al publiceert en dus al door een redacteur
 * geschreven/nagekeken is: artikels, lexicon, rekentools, wetgevings-
 * samenvattingen en officiële bronnen. Het model mag zich hier vrij op
 * baseren; het mag er nog steeds niets aan toevoegen dat er niet in staat.
 */
export function buildKnowledgeContext(): string {
  return `ARTIKELS op FinEdu (/leerstof): de volledige, door FinEdu geschreven leerstof. Gebruik dit vrij en met vertrouwen om vragen te beantwoorden, en verwijs naar de link tussen haakjes wanneer een artikel het onderwerp verder uitdiept:\n${buildArticleContext()}\n\nFINANCIEEL LEXICON (/lexicon): korte definities van jargon, gebruik dit voor elke "wat betekent"-vraag:\n${buildLexiconContext()}\n\nREKENTOOLS (/tools): verwijs hiernaar wanneer de gebruiker zelf iets concreet wil berekenen:\n${buildToolsContext()}\n\nWETGEVING waarop je je mag baseren voor juridische duiding: citeer altijd de titel tussen aanhalingstekens wanneer je hiervan gebruikmaakt, en noem geen wetsartikel dat hier niet in staat:\n${buildLegislationContext()}\n\nOFFICIËLE BRONNEN: noem en verwijs naar de relevante bron wanneer de vraag daarover gaat, of wanneer je een actueel cijfer niet zelf hebt:\n${buildSourcesContext()}`;
}
