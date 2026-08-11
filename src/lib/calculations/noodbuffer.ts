export type NoodbufferInput = {
  huidigSpaargeld: number;
  maandelijkseUitgaven: number;
};

export type NoodbufferNiveau = "onder" | "binnen" | "boven";

export type NoodbufferResultaat = {
  aantalMaanden: number;
  niveau: NoodbufferNiveau;
};

/** Wikifin en de meeste financiële-educatiebronnen noemen 3 tot 6 maanden
 * vaste uitgaven als vuistregel voor een noodbuffer. Geen wettelijke norm,
 * enkel een breed gedragen richtlijn. */
const AANBEVOLEN_MIN_MAANDEN = 3;
const AANBEVOLEN_MAX_MAANDEN = 6;

export function berekenNoodbuffer(input: NoodbufferInput): NoodbufferResultaat {
  const aantalMaanden =
    input.maandelijkseUitgaven <= 0
      ? 0
      : input.huidigSpaargeld / input.maandelijkseUitgaven;

  const niveau: NoodbufferNiveau =
    aantalMaanden < AANBEVOLEN_MIN_MAANDEN
      ? "onder"
      : aantalMaanden <= AANBEVOLEN_MAX_MAANDEN
        ? "binnen"
        : "boven";

  return { aantalMaanden, niveau };
}
