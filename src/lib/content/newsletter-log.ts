/**
 * Bijhoudt wanneer de laatste nieuwsbrief-uitzending gebeurde: geen
 * database, dus dit bestand wordt door de tweewekelijkse agent zelf
 * bijgewerkt (commit + push) net na een geslaagde verzending. De agent
 * checkt lastSentAt bij elke (wekelijkse) trigger-run om te bepalen of er
 * al ~14 dagen voorbij zijn, aangezien cron geen "elke 14 dagen" kent.
 */
export const newsletterLog: { lastSentAt: string | null; lastSentSlug: string | null } = {
  lastSentAt: null,
  lastSentSlug: null,
};
