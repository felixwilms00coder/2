export type SpaarrekeningInput = {
  naam: string;
  /** Basisrente, als percentage per jaar (bv. 1.5 voor 1,5%). */
  basisrente: number;
  /** Getrouwheidspremie, als percentage per jaar — enkel verworven op geld dat een vol jaar blijft staan. */
  getrouwheidspremie: number;
};

export type SpaarvergelijkingInput = {
  rekeningen: SpaarrekeningInput[];
  startbedrag: number;
  jaren: number;
};

export type SpaarrekeningResultaat = {
  naam: string;
  effectieveRente: number;
  eindwaarde: number;
  interest: number;
};

/**
 * Vergelijkt spaarrekeningen op basis van cijfers die de gebruiker zelf
 * aanlevert (van eigen offertes/screenshots) — FinEdu levert of onderhoudt
 * geen eigen rentetabel. Simplificatie: gaat ervan uit dat de volledige
 * getrouwheidspremie elk jaar verworven wordt (geld blijft het hele jaar
 * staan, geen tussentijdse opnames), en houdt geen rekening met de
 * vrijstelling van roerende voorheffing (die wijzigt jaarlijks).
 */
export function vergelijkSpaarrekeningen(
  input: SpaarvergelijkingInput,
): SpaarrekeningResultaat[] {
  return input.rekeningen.map((rekening) => {
    const effectieveRente =
      (rekening.basisrente + rekening.getrouwheidspremie) / 100;
    const eindwaarde =
      input.startbedrag * Math.pow(1 + effectieveRente, input.jaren);
    return {
      naam: rekening.naam,
      effectieveRente: effectieveRente * 100,
      eindwaarde,
      interest: eindwaarde - input.startbedrag,
    };
  });
}
