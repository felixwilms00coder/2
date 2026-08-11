export type Regel72Resultaat = {
  vuistregelJaren: number;
  exacteJaren: number;
};

/**
 * De 72-regel: 72 gedeeld door het jaarlijkse rendementspercentage geeft een
 * snelle schatting van het aantal jaren tot je geld verdubbelt bij
 * samengestelde interest. `exacteJaren` toont de werkelijke, wiskundig
 * exacte waarde (ln 2 / ln(1 + rendement)) ter vergelijking.
 */
export function berekenRegel72(jaarlijksRendement: number): Regel72Resultaat {
  if (jaarlijksRendement <= 0) {
    return { vuistregelJaren: Infinity, exacteJaren: Infinity };
  }

  const vuistregelJaren = 72 / jaarlijksRendement;
  const exacteJaren = Math.log(2) / Math.log(1 + jaarlijksRendement / 100);

  return { vuistregelJaren, exacteJaren };
}
