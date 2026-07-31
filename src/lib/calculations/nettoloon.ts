// Vereenvoudigd, indicatief model om van een brutomaandloon een schatting
// van het nettoloon te maken. Dit is GEEN officiële berekening van de
// bedrijfsvoorheffing (die werkt met eigen schalen per gezinssituatie) en
// houdt geen rekening met dertiende maand, vakantiegeld, extralegale
// voordelen, fiscale aftrekken of gezinslasten. Bedragen en tarieven worden
// jaarlijks geïndexeerd: gebruik dit enkel als ruwe indicatie.

const RSZ_RATE = 0.1307;

// Richtcijfers gebaseerd op de progressieve schijven van de Belgische
// personenbelasting (afgerond, jaarlijks geïndexeerd).
const TAX_BRACKETS = [
  { upTo: 15200, rate: 0.25 },
  { upTo: 26830, rate: 0.4 },
  { upTo: 46440, rate: 0.45 },
  { upTo: Infinity, rate: 0.5 },
];

const BELASTINGVRIJE_SOM = 10570;
const FORFAITAIRE_KOSTEN_PERCENTAGE = 0.3;
const FORFAITAIRE_KOSTEN_MAX = 5750;

function calculateProgressiveTax(taxableIncome: number): number {
  let remaining = taxableIncome;
  let previousThreshold = 0;
  let tax = 0;

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const bracketSize = bracket.upTo - previousThreshold;
    const amountInBracket = Math.min(remaining, bracketSize);
    tax += amountInBracket * bracket.rate;
    remaining -= amountInBracket;
    previousThreshold = bracket.upTo;
  }

  return tax;
}

export type NettoloonResult = {
  bruto: number;
  rszBijdrage: number;
  belastbaarNaRsz: number;
  forfaitaireKosten: number;
  geschatteBedrijfsvoorheffing: number;
  netto: number;
  nettoPercentage: number;
};

export function calculateNettoloon(brutoMaandloon: number): NettoloonResult {
  const bruto = Math.max(0, brutoMaandloon);
  const rszBijdrage = bruto * RSZ_RATE;
  const belastbaarNaRsz = bruto - rszBijdrage;

  const belastbaarJaarlijks = belastbaarNaRsz * 12;
  const forfaitaireKostenJaarlijks = Math.min(
    belastbaarJaarlijks * FORFAITAIRE_KOSTEN_PERCENTAGE,
    FORFAITAIRE_KOSTEN_MAX,
  );

  const belastbaarNaKosten = Math.max(
    0,
    belastbaarJaarlijks - forfaitaireKostenJaarlijks - BELASTINGVRIJE_SOM,
  );

  const belastingJaarlijks = calculateProgressiveTax(belastbaarNaKosten);
  const geschatteBedrijfsvoorheffing = belastingJaarlijks / 12;

  const netto = Math.max(0, belastbaarNaRsz - geschatteBedrijfsvoorheffing);

  return {
    bruto,
    rszBijdrage,
    belastbaarNaRsz,
    forfaitaireKosten: forfaitaireKostenJaarlijks / 12,
    geschatteBedrijfsvoorheffing,
    netto,
    nettoPercentage: bruto > 0 ? (netto / bruto) * 100 : 0,
  };
}
