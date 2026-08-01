import { Transaction } from "./parse-csv";
import { Bucket, CategoryKey, categorise, categoryMeta } from "./categorise";

export type CategoryTotal = {
  key: CategoryKey;
  label: string;
  bucket: Bucket;
  total: number;
  count: number;
};

export type Recurring = {
  label: string;
  amount: number;
  occurrences: number;
  category: CategoryKey;
};

export type Suggestion = {
  id: string;
  title: string;
  body: string;
  /** Rough monthly euro impact, when we can estimate one. */
  impact?: number;
  href?: string;
  linkLabel?: string;
};

export type Analysis = {
  monthsCovered: number;
  income: number;
  expenses: number;
  net: number;
  perMonth: { income: number; expenses: number; net: number };
  categories: CategoryTotal[];
  buckets: Record<Bucket, number>;
  bucketShare: { noden: number; wensen: number; sparen: number };
  recurring: Recurring[];
  suggestions: Suggestion[];
};

/** Strips card numbers, dates and reference codes so labels can be grouped. */
function normaliseLabel(description: string): string {
  return description
    .toLowerCase()
    .replace(/\d{2}[/\-.]\d{2}[/\-.]\d{2,4}/g, " ")
    .replace(/\b\d{4,}\b/g, " ")
    .replace(/[^a-z0-9&+ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 3)
    .join(" ");
}

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function countMonths(transactions: Transaction[]): number {
  const months = new Set<string>();
  for (const t of transactions) if (t.date) months.add(monthKey(t.date));
  return Math.max(1, months.size);
}

function detectRecurring(transactions: Transaction[]): Recurring[] {
  const groups = new Map<string, Transaction[]>();
  for (const t of transactions) {
    if (t.amount >= 0) continue;
    const label = normaliseLabel(t.description);
    if (!label) continue;
    const list = groups.get(label) ?? [];
    list.push(t);
    groups.set(label, list);
  }

  const out: Recurring[] = [];
  for (const [label, list] of groups) {
    if (list.length < 2) continue;

    // Charges that repeat at a roughly stable amount look like subscriptions.
    const amounts = list.map((t) => Math.abs(t.amount));
    const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const stable = amounts.every((a) => Math.abs(a - avg) <= Math.max(2, avg * 0.2));
    if (!stable) continue;

    // Only count it once per calendar month.
    const months = new Set(
      list.filter((t) => t.date).map((t) => monthKey(t.date as Date)),
    );
    if (list.some((t) => t.date) && months.size < 2) continue;

    out.push({
      label,
      amount: avg,
      occurrences: list.length,
      category: categorise(list[0].description),
    });
  }

  return out.sort((a, b) => b.amount - a.amount);
}

function euro(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function buildSuggestions(
  a: Omit<Analysis, "suggestions">,
): Suggestion[] {
  const out: Suggestion[] = [];
  const { perMonth, bucketShare, categories, recurring } = a;

  // 1. Spending more than you earn.
  if (perMonth.net < 0) {
    out.push({
      id: "tekort",
      title: "Je geeft meer uit dan er binnenkomt",
      body: `Over de geanalyseerde periode kwam er gemiddeld ${euro(
        perMonth.income,
      )} per maand binnen en ging er ${euro(
        perMonth.expenses,
      )} uit. Dat is een tekort van ${euro(
        Math.abs(perMonth.net),
      )} per maand. Begin bij je grootste categorie hieronder.`,
      impact: Math.abs(perMonth.net),
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/50-30-20-regel",
      linkLabel: "Een budget opstellen",
    });
  }

  // 2. Nothing set aside.
  if (bucketShare.sparen < 0.05 && perMonth.net > 0) {
    out.push({
      id: "geen-sparen",
      title: "Er gaat vrijwel niets automatisch opzij",
      body: `We zien geen of nauwelijks overschrijvingen naar spaar- of beleggingsrekeningen. Je houdt gemiddeld ${euro(
        perMonth.net,
      )} per maand over: zet daarvan een vast bedrag automatisch opzij op de dag na je loon.`,
      impact: Math.round(perMonth.net * 0.5),
      href: "/leerstof/sparen-en-beleggen/noodbuffer-hoeveel-sparen",
      linkLabel: "Hoeveel noodbuffer heb je nodig?",
    });
  } else if (bucketShare.sparen > 0 && Math.round(bucketShare.sparen * 100) < 20) {
    out.push({
      id: "sparen-onder-norm",
      title: `Je spaart ${Math.round(bucketShare.sparen * 100)}% in plaats van 20%`,
      body: `De 50/30/20-vuistregel mikt op 20% sparen. Om daar te komen zou je ongeveer ${euro(
        Math.max(0, perMonth.income * 0.2 - a.buckets.sparen / a.monthsCovered),
      )} per maand extra opzij moeten zetten.`,
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/50-30-20-regel",
      linkLabel: "De 50/30/20-regel",
    });
  }

  // 3. Subscriptions.
  const subs = recurring.filter(
    (r) => r.category === "abonnementen" || r.category === "telecom",
  );
  if (subs.length >= 2) {
    const monthly = subs.reduce((sum, r) => sum + r.amount, 0);
    out.push({
      id: "abonnementen",
      title: `${subs.length} terugkerende abonnementen gevonden`,
      body: `Samen goed voor ongeveer ${euro(
        monthly,
      )} per maand, of ${euro(
        monthly * 12,
      )} per jaar. Overloop ze even: abonnementen zijn de uitgave die het vaakst doorloopt zonder dat je ze nog gebruikt.`,
      impact: Math.round(monthly * 0.4),
    });
  }

  // 4. Needs above the norm.
  if (bucketShare.noden > 0.6) {
    out.push({
      id: "noden-hoog",
      title: `Je vaste lasten slokken ${Math.round(bucketShare.noden * 100)}% op`,
      body: "Boven de 60% wordt je budget krap: er blijft weinig ruimte om te sparen of iets op te vangen. Vaste lasten zijn moeilijk te verlagen, maar energie, telecom en verzekeringen zijn de drie waar overstappen het snelst iets oplevert.",
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/verzekeringen-voor-starters",
      linkLabel: "Checklist verzekeringen",
    });
  }

  // 5. Biggest "wensen" category.
  const wensen = categories
    .filter((c) => c.bucket === "wensen")
    .sort((x, y) => y.total - x.total);
  if (wensen.length > 0 && bucketShare.wensen > 0.35) {
    const top = wensen[0];
    out.push({
      id: "wensen-top",
      title: `${top.label} is je grootste vrije uitgave`,
      body: `Gemiddeld ${euro(
        top.total / a.monthsCovered,
      )} per maand, verspreid over ${top.count} transacties. Dit is meestal de makkelijkste plek om ruimte te vinden: je hoeft niets op te zeggen, alleen minder vaak.`,
      impact: Math.round(top.total / a.monthsCovered / 4),
    });
  }

  // 6. Expensive credit.
  const afbetaling = categories.find((c) => c.key === "afbetaling");
  if (afbetaling && afbetaling.total / a.monthsCovered > 100) {
    out.push({
      id: "krediet",
      title: "Je betaalt maandelijks af op krediet",
      body: `Gemiddeld ${euro(
        afbetaling.total / a.monthsCovered,
      )} per maand. Ga na welk krediet het duurste jaarlijks kostenpercentage heeft en los dat als eerste versneld af — dat levert meer op dan sparen tegen de huidige spaarrente.`,
      href: "/leerstof/budget-betalen-lenen-en-verzekeren/verantwoord-lenen",
      linkLabel: "Verantwoord lenen",
    });
  }

  // 7. Nothing alarming.
  if (out.length === 0) {
    out.push({
      id: "op-koers",
      title: "Je zit op koers",
      body: `Je houdt gemiddeld ${euro(
        perMonth.net,
      )} per maand over en er gaat structureel iets opzij. Volgende stap: controleer of je noodbuffer drie tot zes maanden aan noodzakelijke uitgaven dekt.`,
      href: "/leerstof/sparen-en-beleggen/noodbuffer-hoeveel-sparen",
      linkLabel: "Je noodbuffer",
    });
  }

  return out;
}

export function analyse(transactions: Transaction[]): Analysis {
  const monthsCovered = countMonths(transactions);

  const totals = new Map<CategoryKey, { total: number; count: number }>();
  let income = 0;
  let expenses = 0;

  for (const t of transactions) {
    const key = categorise(t.description);
    const entry = totals.get(key) ?? { total: 0, count: 0 };
    entry.total += Math.abs(t.amount);
    entry.count += 1;
    totals.set(key, entry);

    if (t.amount > 0) income += t.amount;
    else expenses += Math.abs(t.amount);
  }

  const categories: CategoryTotal[] = [...totals.entries()]
    .map(([key, v]) => ({
      key,
      label: categoryMeta[key].label,
      bucket: categoryMeta[key].bucket,
      total: v.total,
      count: v.count,
    }))
    .filter((c) => c.bucket !== "inkomen")
    .sort((a, b) => b.total - a.total);

  const buckets: Record<Bucket, number> = {
    noden: 0,
    wensen: 0,
    sparen: 0,
    inkomen: 0,
    overig: 0,
  };
  for (const c of categories) buckets[c.bucket] += c.total;

  const spendBase = buckets.noden + buckets.wensen + buckets.sparen;
  const bucketShare = {
    noden: spendBase > 0 ? buckets.noden / spendBase : 0,
    wensen: spendBase > 0 ? buckets.wensen / spendBase : 0,
    sparen: spendBase > 0 ? buckets.sparen / spendBase : 0,
  };

  const base: Omit<Analysis, "suggestions"> = {
    monthsCovered,
    income,
    expenses,
    net: income - expenses,
    perMonth: {
      income: income / monthsCovered,
      expenses: expenses / monthsCovered,
      net: (income - expenses) / monthsCovered,
    },
    categories,
    buckets,
    bucketShare,
    recurring: detectRecurring(transactions),
  };

  return { ...base, suggestions: buildSuggestions(base) };
}
