import { legislation } from "./content/legislation";
import { officialSources } from "./content/sources";

/**
 * Compacte tekstweergave van de curated wetgeving + officiële bronnen,
 * bedoeld om als vaste context in de systeemprompt van het AI-antwoord te
 * gaan (zie src/app/api/ai-answer/route.ts). Het model moet zich hierop
 * baseren voor juridische duiding, in plaats van zelf wetsartikelen te
 * verzinnen.
 */
export function buildLegalContext(): string {
  const lawLines = legislation
    .map(
      (l) =>
        `- "${l.title}": ${l.officialTitle} (bron: ${l.sourceUrl}, laatst nagekeken ${l.lastVerified}). ${l.summary}`,
    )
    .join("\n");

  const sourceLines = officialSources
    .map((s) => `- ${s.name} (${s.url}): ${s.description}`)
    .join("\n");

  return `WETGEVING waarop je je mag baseren voor juridische duiding: citeer altijd de titel tussen aanhalingstekens wanneer je hiervan gebruik maakt, en noem geen wetsartikel dat hier niet in staat:\n${lawLines}\n\nOFFICIËLE BRONNEN: noem en verwijs naar de relevante bron wanneer je vraag daarover gaat:\n${sourceLines}`;
}
