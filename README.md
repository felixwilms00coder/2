# FinEdu

FinEdu is a financial education platform for young people starting their
first job in Flanders (Belgium), inspired by
[Wikifin](https://www.wikifin.be), the Belgian financial education website
run by the FSMA. It focuses on the topics first-time employees run into
first: their payslip, budgeting, saving, investing basics, borrowing
responsibly, insurance, pensions, and taxes — all in Dutch.

## What's in here

- **Leerstof (`/leerstof`)** — eight categories with short, practical
  articles written for starters: loon, budgetteren, sparen, beleggen, lenen,
  verzekeringen, pensioen, belastingen.
- **Rekentools (`/tools`)** — three interactive calculators:
  - Bruto-nettoloon calculator — estimates net salary from a gross monthly
    salary (RSZ contribution + a simplified progressive-tax estimate).
  - 50/30/20 budgetplanner — splits net income into noden/wensen/sparen and
    lets you compare against your own spending.
  - Spaardoel-calculator — estimates how long it takes to reach a savings
    goal, or how much you need to save monthly for a target date.
- **Quiz (`/quiz`)** — a 10-question financial literacy quiz with instant
  per-question explanations and a final score.

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

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/                 routes (home, leerstof, tools, quiz)
  components/          shared UI, calculators, quiz engine
  lib/
    content/            typed content: categories, articles, tools, quizzes
    calculations/        pure calculation functions used by the tools
```

## Extending the content

- Add a new article: append an entry to `src/lib/content/articles.ts`
  (category must exist in `categories.ts`).
- Add a new quiz question: append to the `questions` array in
  `src/lib/content/quizzes.ts`.
- Add a new tool: add calculation logic under `src/lib/calculations/`, a
  client component under `src/components/tools/`, and a route under
  `src/app/tools/<slug>/page.tsx`.

## Disclaimer

FinEdu provides general, educational information and is not personal
financial advice. Amounts, tax brackets and rates are indexed annually —
always verify exact figures with official sources before making financial
decisions.
