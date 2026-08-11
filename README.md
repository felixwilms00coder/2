# FinEdu

FinEdu is a financial education platform for young people starting their
first job in Flanders (Belgium), inspired by
[Wikifin](https://www.wikifin.be), the Belgian financial education website
run by the FSMA. It focuses on the topics first-time employees run into
first: their payslip, budgeting, saving, investing basics, borrowing
responsibly, insurance, pensions, and taxes — all in Dutch.

## What's in here

- **Leerstof (`/leerstof`)** — seven themes with short, practical articles
  written for starters. Articles are not walls of text: they carry
  interactive blocks (`check` for an inline multiple-choice question,
  `reveal` for a guess-then-answer card, `figure` for a pulled-out number)
  defined in `src/lib/content/types.ts`.
- **Rekentools (`/tools`)** — eleven interactive calculators:
  - Geldscan — paste or upload a bank CSV export; it categorises your
    transactions, spots recurring subscriptions, compares your split against
    50/30/20 and generates concrete savings suggestions. Runs **entirely in
    the browser**: nothing is uploaded, stored or sent anywhere.
  - Beleggingsplan-simulator — models periodic investing over a long horizon
    and shows what ongoing charges cost you. It is a calculator only: FinEdu
    places no orders and gives no recommendations (see
    `docs/automatisering.md` for why).
  - Bruto-nettoloon calculator — estimates net salary from a gross monthly
    salary (RSZ contribution + a simplified progressive-tax estimate).
  - 50/30/20 budgetplanner — splits net income into noden/wensen/sparen and
    lets you compare against your own spending.
  - Spaardoel-calculator — estimates how long it takes to reach a savings
    goal, or how much you need to save monthly for a target date.
  - Spaarrekening-vergelijker — compares up to four savings accounts on
    compound growth, using only the base rate and fidelity premium the user
    enters themselves. No rate table of its own, no recommended bank.
  - Verzekeringsoffertes vergelijken — compares up to four insurance quotes
    on expected total yearly cost (premium + deductible × expected claims),
    not premium alone. No policy data or insurer ranking of its own — see
    `docs/automatisering.md` (§5) for why this stayed a calculator instead
    of a price-comparison ranking.
  - Lening-vergelijker — compares up to four loan scenarios (rate + term)
    on monthly payment and total cost, using the standard annuity formula.
    Same "user supplies the rates" approach as the savings/insurance
    comparators.
  - Noodbuffer-calculator — shows how many months of fixed expenses your
    current savings cover, against the common 3–6 month rule of thumb.
  - 72-regel — the rule-of-72 shortcut for estimating how long it takes an
    amount to double at a given annual return, shown alongside the exact
    mathematical value.
  - Aanvullend-pensioen-simulator — projects only self-funded extra
    retirement savings (pensioensparen, VAPZ, or plain saving) via compound
    growth. Deliberately does **not** estimate the statutory Belgian
    pension — that formula (wage caps, credited periods, ...) is too
    complex to simplify reliably, so the page links to the official
    MyPension.be simulator instead.
- **Keuzespel (`/spel`)** — three interactive decision games
  (`src/lib/content/game.ts` + the shared `KeuzespelEngine` component): a
  seven-round game about the first year of working life, plus two shorter
  five-round games on an unexpected expense and renting a first apartment.
  Each choice affects an emergency buffer, monthly fixed costs and quality
  of life, scored 0-100 at the end. Score targets are per-game
  (`scoreConfig`) since a short game's euro swings are much smaller than a
  year-long one's — reusing one fixed scale would make short games nearly
  unscoreable.
- **Beleggingsagent (`/agent`)** — a self-managed automation agent. The user
  writes their own buy rules (instrument, amount, cadence, per-order and
  monthly caps), and the agent executes them against a broker of their
  choosing. Ships with a fully working paper-trading broker; the Saxo OpenAPI
  adapter is present but **has never been tested against the live API**.
  Rules, log and tokens stay on the user's device — there is no FinEdu server
  in the order path, which is what keeps this software rather than a
  regulated investment service. See `docs/automatisering.md`.
- **Quiz (`/quiz`)** — four quizzes with instant per-question explanations
  and a final score: a general 10-question starter quiz, plus focused
  8-question quizzes on housing/loans, saving/investing, and inheritance.
- **Zoeken (`/zoeken`)** — local keyword search across all content, plus an
  optional AI-generated answer from an open-weight model (gpt-oss-120b via
  Groq). The AI answer is clearly labeled as experimental and never
  personal advice; see "AI search answer" below to configure it, and
  `docs/automatisering.md` for the regulatory tradeoffs.
- **Wetgeving (`/wetgeving`)** — a curated, plain-language summary of the
  legislation behind FinEdu's topics (`src/lib/content/legislation.ts`),
  each entry linked to the official consolidated text and dated with when
  an editor last checked it. This is also what grounds the AI answer's
  legal explanations (`src/lib/legal-context.ts`) — there is no live feed
  from any Belgian or Flemish government source, so this list needs manual
  upkeep; see `docs/automatisering.md` section 4.
- **Financieel lexicon (`/lexicon`)** — a searchable, filterable glossary of
  ~45 financial terms (`src/lib/content/lexicon.ts`), each a short
  plain-language definition. Deliberately excludes current amounts, rates,
  or tax brackets — those go stale and belong in `/wetgeving` instead.
  Indexed in site search under the "begrip" result kind.

All calculators are clearly labeled as indicative estimates, not official
figures — tax brackets and social contributions are simplified and change
yearly, so the UI points users to official sources (FOD Financiën, RSZ,
mypension.be) for exact numbers.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons
- Content lives as typed data in `src/lib/content/` (categories, articles,
  tools, quizzes) rather than a CMS — easy to extend by adding entries to
  those files.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### AI search answer (optional)

`/zoeken` can show an AI-generated answer above the regular search results,
powered by an open-weight model (currently `openai/gpt-oss-120b`) hosted on
[Groq](https://console.groq.com). It's optional: without a key, the site
works exactly as before and the AI block shows a "not configured" message
instead of crashing. Groq periodically deprecates models (it dropped the
model this used to call, llama-3.3-70b-versatile, in June 2026) — if AI
answers start failing, check `GROQ_MODEL` in
`src/app/api/ai-answer/route.ts` against
[console.groq.com/docs/deprecations](https://console.groq.com/docs/deprecations)
before assuming the API key is wrong.

```bash
cp .env.example .env.local
# then fill in GROQ_API_KEY=... in .env.local
```

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/                 routes (home, leerstof, tools, quiz)
  components/          shared UI, calculators, quiz engine, logo
  lib/
    content/            typed content: categories, articles, tools, quizzes
    calculations/        pure calculation functions used by the tools
public/
  hero-skyline.svg     hero background artwork
```

## Branding and artwork

The logo mark (`src/components/logo.tsx`) is a silhouette that reads both as
a Flemish stepped gable (*trapgevel*) and as an ascending bar chart —
regional identity plus financial growth. The same shape is used for the
favicon (`src/app/icon.svg`) and the OG image
(`src/app/opengraph-image.tsx`); keep those three in sync if you change it.

`public/hero-skyline.svg` is a hand-built, monochrome dusk skyline used
behind the homepage hero and the page headers. It is original artwork, so
there are no stock-photo licensing constraints.

**Swapping in a real photograph:** drop your image in `public/` and change
the `bg-[url('/hero-skyline.svg')]` reference in `src/app/page.tsx`,
`src/components/ui.tsx` (`PageHero`), and
`src/app/leerstof/[category]/[slug]/page.tsx`. The dark scrim layer sitting
above it already guarantees text contrast, so a photo can be dropped in
without touching the type. Make sure you have the rights to the image.

## Extending the content

- Add a new article: append an entry to `src/lib/content/articles.ts`
  (category must exist in `categories.ts`).
- Add a new quiz question: append to the `questions` array in
  `src/lib/content/quizzes.ts`.
- Add a new tool: add calculation logic under `src/lib/calculations/`, a
  client component under `src/components/tools/`, and a route under
  `src/app/tools/<slug>/page.tsx`.

## Automation and regulation

`docs/automatisering.md` documents what would be required to go further:
FSMA/MiFID II licensing for automated investing, the PSD2/AIS route for
direct bank access, the API situation at Bolero versus Saxo, and why the
suggestion engine is deterministic rather than LLM-driven. Read it before
promising any broker integration.

## Disclaimer

FinEdu provides general, educational information and is not personal
financial advice. Amounts, tax brackets and rates are indexed annually —
always verify exact figures with official sources before making financial
decisions.
