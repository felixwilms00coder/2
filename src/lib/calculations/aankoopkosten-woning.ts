export type AankoopkostenInput = {
  aankoopprijs: number;
  registratierechtenPercentage: number;
  notariskosten: number;
  hypotheekkosten: number;
  andereKosten: number;
};

export type AankoopkostenResultaat = {
  registratierechtenBedrag: number;
  totaleBijkomendeKosten: number;
  totalePrijs: number;
  bijkomendeKostenPercentage: number;
};

/**
 * Telt bijkomende aankoopkosten van een woning simpelweg op. Registratie-
 * rechten worden hier als percentage van de aankoopprijs ingegeven door de
 * gebruiker zelf: het tarief hangt af van gewest en persoonlijke situatie
 * (bv. enige eigen woning) en wijzigt soms, dus geen eigen tarieventabel.
 * Notaris-, hypotheek- en andere kosten zijn eveneens eigen cijfers van de
 * gebruiker (offerte of raming), geen schatting door FinEdu.
 */
export function berekenAankoopkosten(
  input: AankoopkostenInput,
): AankoopkostenResultaat {
  const registratierechtenBedrag =
    input.aankoopprijs * (input.registratierechtenPercentage / 100);
  const totaleBijkomendeKosten =
    registratierechtenBedrag +
    input.notariskosten +
    input.hypotheekkosten +
    input.andereKosten;
  const totalePrijs = input.aankoopprijs + totaleBijkomendeKosten;
  const bijkomendeKostenPercentage =
    input.aankoopprijs > 0
      ? (totaleBijkomendeKosten / input.aankoopprijs) * 100
      : 0;

  return {
    registratierechtenBedrag,
    totaleBijkomendeKosten,
    totalePrijs,
    bijkomendeKostenPercentage,
  };
}
