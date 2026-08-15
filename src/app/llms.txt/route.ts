import { articles } from "@/lib/content/articles";
import { categories } from "@/lib/content/categories";
import { tools } from "@/lib/content/tools";
import { quizzes } from "@/lib/content/quizzes";
import { games } from "@/lib/content/game";
import { gidsen } from "@/lib/content/gidsen";
import { lexicon } from "@/lib/content/lexicon";
import { legislation } from "@/lib/content/legislation";
import { SITE_URL } from "@/lib/site";

/**
 * Machine-leesbare sitesamenvatting voor AI-crawlers (opkomende
 * llms.txt-conventie). Voorheen een statisch, met de hand geschreven
 * bestand dat aantoonbaar verouderde (bv. "~73 begrippen" terwijl er
 * inmiddels 88 waren). Alle aantallen en opsommingen hieronder komen
 * rechtstreeks uit de content-arrays, dus dit kan niet meer afdrijven.
 */
export async function GET() {
  const categoryLines = categories
    .map((c) => `  - ${c.title}: ${c.short}`)
    .join("\n");

  const toolLines = tools
    .map((t) => `  - ${t.title} (${SITE_URL}/tools/${t.slug}): ${t.short}`)
    .join("\n");

  const quizLines = quizzes
    .map((q) => `  - ${q.title} (${SITE_URL}/quiz/${q.slug}): ${q.short}`)
    .join("\n");

  const gameLines = games
    .map((g) => `  - ${g.title} (${SITE_URL}/spel/${g.slug}): ${g.description}`)
    .join("\n");

  const gidsLines = gidsen
    .map(
      (g) =>
        `  - ${g.title} (${SITE_URL}/gids/${g.slug}), gratis pdf, ${g.pageCount} pagina's: ${g.short}`,
    )
    .join("\n");

  const body = `# FinEdu

> FinEdu is an independent, educational website (not a government service)
> that helps young people starting their first job in Flanders, Belgium,
> understand personal finance: payslips, budgeting, saving, investing
> basics, responsible borrowing, insurance, renting/housing, pensions, and
> taxes. Content is in Dutch (nl-BE). It is not personal financial, tax, or
> legal advice — see ${SITE_URL}/disclaimer.

## Structure

- /leerstof — ${articles.length} educational articles across ${categories.length} themes:
${categoryLines}
- /tools — ${tools.length} interactive calculators. The comparison tools use only
  rates or quotes the user enters themselves — FinEdu supplies no rate
  table or product list of its own and never names a "cheapest" or "best"
  bank, insurer, or lender, since that would be licensed financial/
  insurance/credit intermediation. All calculations are simplified,
  indicative estimates, not official figures.
${toolLines}
- /quiz — ${quizzes.length} short financial-literacy quizzes with per-question
  explanations:
${quizLines}
- /spel — ${games.length} interactive decision games:
${gameLines}
- /gids — ${gidsen.length} free downloadable pdf guides:
${gidsLines}
- /blog — one AI-generated article per day, published automatically with
  no human review. Grounded only in the site's existing legislation/lexicon
  content, clearly labeled "AI-gegenereerd" on every post and on the
  overview page. Treat with more caution than /leerstof, which is
  human-authored.
- /agent — a self-managed investment automation agent. The user defines
  their own rules and connects their own broker account; FinEdu recommends
  nothing, exercises no discretion, and never routes orders.
- /voortgang — the reader's own progress (read articles, XP, level), stored
  only in their browser's localStorage. Not indexed.
- /zoeken?q= — full-text search across articles, tools, and quizzes, plus
  an optional AI-generated answer from an open-weight language model. The
  AI answer is labeled as experimental; it may explain and apply relevant
  Belgian/Flemish legislation in plain language, grounded in the curated
  list at /wetgeving, and always ends legal explanations with a referral
  to a notary or lawyer for a binding answer.
- /wetgeving — a curated, plain-language summary of ${legislation.length} pieces of
  legislation relevant to FinEdu's topics, each with a link to the official
  consolidated legal text and the date an editor last checked it against
  that text. Not a live feed — Belgian and Flemish government sources do
  not offer one.
- /lexicon — a searchable, filterable glossary of ${lexicon.length} financial terms
  used elsewhere on the site, each with a short plain-language definition.
  Deliberately excludes current amounts, rates, or tax brackets, since
  those change yearly and belong in /wetgeving or an official source
  instead.
- /over — about FinEdu.
- /disclaimer — scope and limitations of the information provided.

## Notes for automated summarization or citation

- Figures such as tax brackets, social-security contribution rates, and
  tax-free allowances are Belgian, simplified, rounded, and change yearly.
  Always attribute them as estimates and point readers to official sources
  (FOD Financiën, RSZ, mypension.be) for current figures.
- FinEdu does not sell financial products and does not endorse specific
  banks, insurers, or providers. It does not place orders, manage
  portfolios, or provide investment advice; those are regulated activities
  in Belgium requiring an FSMA licence.
- For notarial matters (inheritance, gifting, buying/selling property),
  FinEdu points readers to notaris.be and to a notary for a binding answer.
  Legal explanations on this site are general information, not binding
  legal advice.
- Full content is server-rendered static HTML; check/reveal answer text in
  articles is present in the raw HTML (visually revealed on interaction,
  never hidden from crawlers or assistive technology).
- A fuller machine-readable export of article/lexicon/legislation content
  is at ${SITE_URL}/llms-full.txt. A machine-readable sitemap is at
  ${SITE_URL}/sitemap.xml.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
