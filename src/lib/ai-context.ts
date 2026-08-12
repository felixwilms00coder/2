import { articles } from "./content/articles";
import { gidsen } from "./content/gidsen";
import { legislation } from "./content/legislation";
import { lexicon } from "./content/lexicon";
import { officialSources } from "./content/sources";
import { tools } from "./content/tools";
import { articleChunks, scoreTextAgainstTokens, tokenize } from "./search";
import type { ArticleBlock } from "./content/types";

/**
 * Groq's gratis tier beperkt openai/gpt-oss-120b tot 8.000 tokens per
 * minuut (bron: console.groq.com/docs/rate-limits). De volledige
 * FinEdu-kennisbank (alle artikels + lexicon + wetgeving ongefilterd) was
 * ~11.700 tokens op zich al: dat gaf een 413 (payload too large) bij élke
 * aanvraag. Daarom kiest onderstaande code per zoekvraag enkel de meest
 * relevante artikels/lexicontermen/wetgeving (dezelfde scoring als
 * search.ts), in plaats van telkens alles mee te sturen. Rekentools,
 * gidsen en officiële bronnen blijven wel altijd volledig: die lijsten
 * zijn klein genoeg om nooit een probleem te vormen, en missen anders een
 * relevante tool/gids puur omdat de bewoording niet overeenkomt zou zonde
 * zijn.
 */
const ARTICLE_LIMIT = 2;
const LEXICON_LIMIT = 8;
const LEGISLATION_LIMIT = 4;
/** Absolute noodrem, mocht een selectie toch nog te groot uitvallen: bij
 * deze limieten blijft een normale selectie hier ruim onder, dus dit
 * hoort zelden of nooit echt te knippen. */
const MAX_CONTEXT_CHARS = 17000;

function topByRelevance<T>(
  items: T[],
  score: (item: T) => number,
  limit: number,
): T[] {
  return items
    .map((item) => ({ item, score: score(item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

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

function buildArticleContext(tokens: string[]): string {
  const selected = topByRelevance(
    articles,
    (a) =>
      scoreTextAgainstTokens(a.title, tokens) * 4 +
      scoreTextAgainstTokens(a.summary, tokens) * 2 +
      articleChunks(a.blocks).reduce(
        (sum, chunk) => sum + scoreTextAgainstTokens(chunk, tokens),
        0,
      ),
    ARTICLE_LIMIT,
  );
  return selected
    .map(
      (a) =>
        `### "${a.title}" (/leerstof/${a.categorySlug}/${a.slug})\n${a.summary}\n${flattenBlocks(a.blocks)}`,
    )
    .join("\n\n");
}

function buildLexiconContext(tokens: string[]): string {
  const selected = topByRelevance(
    lexicon,
    (e) =>
      scoreTextAgainstTokens(e.term, tokens) * 4 +
      scoreTextAgainstTokens(e.uitleg, tokens),
    LEXICON_LIMIT,
  );
  return selected.map((e) => `- ${e.term}: ${e.uitleg}`).join("\n");
}

function buildToolsContext(): string {
  return tools
    .map((t) => `- "${t.title}" (/tools/${t.slug}): ${t.description}`)
    .join("\n");
}

function buildGidsenContext(): string {
  return gidsen
    .map(
      (g) =>
        `- "${g.title}" (/gids/${g.slug}), gratis pdf, ${g.pageCount} pagina's: ${g.description} Stappen: ${g.chapters.join("; ")}.`,
    )
    .join("\n");
}

function buildLegislationContext(tokens: string[]): string {
  const selected = topByRelevance(
    legislation,
    (l) =>
      scoreTextAgainstTokens(l.title, tokens) * 4 +
      scoreTextAgainstTokens(l.summary, tokens),
    LEGISLATION_LIMIT,
  );
  return selected
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
 * Kennisbank-context van FinEdu voor de systeemprompt van het AI-antwoord
 * (zie src/app/api/ai-answer/route.ts): een per-zoekvraag samengestelde
 * selectie van wat FinEdu zelf al publiceert, niet de volledige inhoud
 * (zie MAX_CONTEXT_CHARS-toelichting hierboven). Het model mag zich hier
 * vrij op baseren; het mag er nog steeds niets aan toevoegen dat er niet
 * in staat.
 */
export function buildKnowledgeContext(query: string): string {
  const tokens = tokenize(query);

  const context = `ARTIKELS op FinEdu (/leerstof), de meest relevante voor deze vraag: gebruik dit vrij en met vertrouwen, en verwijs naar de link tussen haakjes wanneer een artikel het onderwerp verder uitdiept:\n${buildArticleContext(tokens)}\n\nFINANCIEEL LEXICON (/lexicon), de meest relevante termen voor deze vraag:\n${buildLexiconContext(tokens)}\n\nREKENTOOLS (/tools): verwijs hiernaar wanneer de gebruiker zelf iets concreet wil berekenen:\n${buildToolsContext()}\n\nGRATIS DOWNLOADBARE GIDSEN (pdf): verwijs hiernaar wanneer een vraag beter past bij een volledige, stap-voor-stap cursus dan bij een kort antwoord:\n${buildGidsenContext()}\n\nWETGEVING, de meest relevante voor deze vraag, waarop je je mag baseren voor juridische duiding: citeer altijd de titel tussen aanhalingstekens wanneer je hiervan gebruikmaakt, en noem geen wetsartikel dat hier niet in staat. Staat de wet die je zoekt hier niet bij: zeg dan eerlijk dat je daar geen geverifieerde bron voor hebt, in plaats van een wetsartikel te verzinnen:\n${buildLegislationContext(tokens)}\n\nOFFICIËLE BRONNEN: noem en verwijs naar de relevante bron wanneer de vraag daarover gaat, of wanneer je een actueel cijfer niet zelf hebt:\n${buildSourcesContext()}`;

  return context.length > MAX_CONTEXT_CHARS
    ? context.slice(0, MAX_CONTEXT_CHARS)
    : context;
}
