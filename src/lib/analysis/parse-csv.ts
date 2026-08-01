export type Transaction = {
  date: Date | null;
  description: string;
  /** Negative for spending, positive for income. */
  amount: number;
};

export type ParseResult = {
  transactions: Transaction[];
  /** Rows we could not read, so the UI can be honest about coverage. */
  skipped: number;
  /** Which columns we think we used, for the "did we read this right?" panel. */
  detected: { date?: string; description?: string; amount?: string };
};

const DELIMITERS = [";", "\t", ","];

function detectDelimiter(headerLine: string): string {
  let best = ";";
  let bestCount = -1;
  for (const d of DELIMITERS) {
    const count = headerLine.split(d).length;
    if (count > bestCount) {
      bestCount = count;
      best = d;
    }
  }
  return best;
}

/** Splits a CSV line, honouring double quotes. */
function splitLine(line: string, delimiter: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

/**
 * Parses a European-or-US formatted money string.
 * Handles "1.234,56", "1 234,56", "1234.56", "-1.234,56", "1.234,56 EUR".
 */
export function parseAmount(raw: string): number | null {
  if (!raw) return null;
  let s = raw.replace(/\s/g, "").replace(/[A-Za-z€$]/g, "");
  if (!s) return null;

  const negative = s.startsWith("-") || /^\(.*\)$/.test(s);
  s = s.replace(/[-()]/g, "");

  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");

  if (lastComma > -1 && lastDot > -1) {
    // Whichever comes last is the decimal separator.
    if (lastComma > lastDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
  } else if (lastComma > -1) {
    // A single comma: decimal separator if it has 1-2 trailing digits.
    const after = s.length - lastComma - 1;
    s = after <= 2 ? s.replace(",", ".") : s.replace(/,/g, "");
  } else if (lastDot > -1) {
    const after = s.length - lastDot - 1;
    if (after === 3 && s.length > 4) s = s.replace(/\./g, ""); // thousands
  }

  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return negative ? -n : n;
}

export function parseDate(raw: string): Date | null {
  if (!raw) return null;
  const s = raw.trim();

  // dd/mm/yyyy or dd-mm-yyyy
  let m = s.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})$/);
  if (m) {
    const [, d, mo, y] = m;
    const year = y.length === 2 ? 2000 + Number(y) : Number(y);
    const date = new Date(year, Number(mo) - 1, Number(d));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  // yyyy-mm-dd
  m = s.match(/^(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})$/);
  if (m) {
    const [, y, mo, d] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

const DATE_KEYS = ["boekingsdatum", "datum", "date", "valuta", "uitvoeringsdatum"];
const AMOUNT_KEYS = ["bedrag", "amount", "montant", "som"];
const DESC_KEYS = [
  "omschrijving",
  "mededeling",
  "details",
  "description",
  "libelle",
  "communication",
  "naam tegenpartij",
  "tegenpartij",
  "begunstigde",
  "transactie",
];

function findColumn(headers: string[], keys: string[]): number {
  // Exact match first, then "contains".
  for (const key of keys) {
    const i = headers.findIndex((h) => h === key);
    if (i !== -1) return i;
  }
  for (const key of keys) {
    const i = headers.findIndex((h) => h.includes(key));
    if (i !== -1) return i;
  }
  return -1;
}

export function parseTransactionsCsv(text: string): ParseResult {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return { transactions: [], skipped: 0, detected: {} };
  }

  const delimiter = detectDelimiter(lines[0]);
  const rawHeaders = splitLine(lines[0], delimiter);
  const headers = rawHeaders.map((h) => h.toLowerCase());

  let dateCol = findColumn(headers, DATE_KEYS);
  let amountCol = findColumn(headers, AMOUNT_KEYS);
  let descCol = findColumn(headers, DESC_KEYS);

  // Some exports use separate debit/credit columns.
  const debetCol = headers.findIndex((h) => h === "debet" || h === "debit");
  const creditCol = headers.findIndex((h) => h === "credit" || h === "krediet");

  const hasHeader = dateCol !== -1 || amountCol !== -1 || descCol !== -1;
  const bodyStart = hasHeader ? 1 : 0;

  // No recognisable header: assume date, description, amount by position.
  if (!hasHeader) {
    dateCol = 0;
    descCol = 1;
    amountCol = 2;
  }

  const transactions: Transaction[] = [];
  let skipped = 0;

  for (let i = bodyStart; i < lines.length; i++) {
    const cells = splitLine(lines[i], delimiter);
    if (cells.length < 2) {
      skipped++;
      continue;
    }

    let amount: number | null = null;
    if (amountCol !== -1 && cells[amountCol] !== undefined) {
      amount = parseAmount(cells[amountCol]);
    }
    if (amount === null && debetCol !== -1 && creditCol !== -1) {
      const debet = parseAmount(cells[debetCol] ?? "");
      const credit = parseAmount(cells[creditCol] ?? "");
      if (debet) amount = -Math.abs(debet);
      else if (credit) amount = Math.abs(credit);
    }

    if (amount === null || amount === 0) {
      skipped++;
      continue;
    }

    const description =
      descCol !== -1 && cells[descCol] ? cells[descCol] : "(geen omschrijving)";
    const date = dateCol !== -1 ? parseDate(cells[dateCol] ?? "") : null;

    transactions.push({ date, description, amount });
  }

  return {
    transactions,
    skipped,
    detected: {
      date: dateCol !== -1 ? rawHeaders[dateCol] : undefined,
      description: descCol !== -1 ? rawHeaders[descCol] : undefined,
      amount:
        amountCol !== -1
          ? rawHeaders[amountCol]
          : debetCol !== -1
            ? `${rawHeaders[debetCol]}/${rawHeaders[creditCol]}`
            : undefined,
    },
  };
}
