export type AanvullendPensioenInput = {
  huidigeLeeftijd: number;
  pensioenleeftijd: number;
  huidigKapitaal: number;
  maandelijkseInleg: number;
  verwachtRendement: number;
};

export type AanvullendPensioenResultaat = {
  aantalJaren: number;
  ingelegd: number;
  eindkapitaal: number;
  rendementBedrag: number;
};

/**
 * Zuivere samengestelde-interestberekening voor wat je zelf opbouwt
 * (pensioensparen, VAPZ, of gewoon apart sparen voor later) — dit is NIET
 * een schatting van je wettelijk pensioen. Voor dat bedrag bestaat geen
 * betrouwbare vereenvoudigde formule (loonplafonds, gelijkgestelde
 * periodes, ...); daarvoor verwijst de toolpagina naar MyPension.be.
 */
export function berekenAanvullendPensioen(
  input: AanvullendPensioenInput,
): AanvullendPensioenResultaat {
  const aantalJaren = Math.max(0, input.pensioenleeftijd - input.huidigeLeeftijd);
  const maanden = Math.round(aantalJaren * 12);
  const maandelijkseRente = Math.pow(1 + input.verwachtRendement / 100, 1 / 12) - 1;

  let kapitaal = input.huidigKapitaal;
  let ingelegd = input.huidigKapitaal;

  for (let m = 0; m < maanden; m++) {
    kapitaal *= 1 + maandelijkseRente;
    kapitaal += input.maandelijkseInleg;
    ingelegd += input.maandelijkseInleg;
  }

  return {
    aantalJaren,
    ingelegd,
    eindkapitaal: kapitaal,
    rendementBedrag: kapitaal - ingelegd,
  };
}
