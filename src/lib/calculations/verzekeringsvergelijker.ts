export type VerzekeringOfferteInput = {
  naam: string;
  /** Jaarpremie, in euro. */
  jaarpremie: number;
  /** Vrijstelling (franchise) per schadegeval, in euro. */
  vrijstelling: number;
  /** Verwacht aantal schadegevallen per jaar (mag een decimaal zijn, bv. 0,5). */
  verwachteSchadegevallen: number;
};

export type VerzekeringOfferteResultaat = {
  naam: string;
  jaarpremie: number;
  verwachteVrijstellingskost: number;
  /** Totale verwachte jaarkost: premie + (vrijstelling × verwachte schadegevallen). */
  totaleVerwachteKost: number;
};

/**
 * Vergelijkt verzekeringsoffertes op meer dan enkel de premie — de vrijstelling
 * telt mee zodra je een schadegeval verwacht. Cijfers komen van offertes die
 * de gebruiker zelf al heeft (van een verzekeraar of erkende makelaar);
 * FinEdu levert of rangschikt geen eigen polissen.
 */
export function vergelijkVerzekeringsoffertes(
  offertes: VerzekeringOfferteInput[],
): VerzekeringOfferteResultaat[] {
  return offertes.map((offerte) => {
    const verwachteVrijstellingskost =
      offerte.vrijstelling * offerte.verwachteSchadegevallen;
    return {
      naam: offerte.naam,
      jaarpremie: offerte.jaarpremie,
      verwachteVrijstellingskost,
      totaleVerwachteKost: offerte.jaarpremie + verwachteVrijstellingskost,
    };
  });
}
