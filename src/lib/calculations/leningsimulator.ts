export type LeningScenario = {
  naam: string;
  jaarrente: number;
  looptijdJaren: number;
};

export type LeningInput = {
  scenarios: LeningScenario[];
  bedrag: number;
};

export type LeningResultaat = {
  naam: string;
  maandelijkseAflossing: number;
  totaleKost: number;
  totaleInterest: number;
};

/**
 * Standaard annuïteitsformule: vaste maandelijkse aflossing over de hele
 * looptijd. Gaat uit van een vaste rente (geen variabele rente, geen
 * herziening), en rekent geen dossier-, notaris- of verzekeringskosten mee.
 */
export function vergelijkLeningen(input: LeningInput): LeningResultaat[] {
  return input.scenarios.map((scenario) => {
    const maandrente = scenario.jaarrente / 100 / 12;
    const looptijdMaanden = Math.max(0, Math.round(scenario.looptijdJaren * 12));

    const maandelijkseAflossing =
      looptijdMaanden === 0
        ? 0
        : maandrente === 0
          ? input.bedrag / looptijdMaanden
          : (input.bedrag * maandrente * Math.pow(1 + maandrente, looptijdMaanden)) /
            (Math.pow(1 + maandrente, looptijdMaanden) - 1);

    const totaleKost = maandelijkseAflossing * looptijdMaanden;

    return {
      naam: scenario.naam,
      maandelijkseAflossing,
      totaleKost,
      totaleInterest: totaleKost - input.bedrag,
    };
  });
}
