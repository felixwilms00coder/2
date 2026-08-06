import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container, PageHero, Callout } from "@/components/ui";
import { getPilot } from "@/lib/pilots/pilots";
import { fetchLatestFiling, filingIndexUrl } from "@/lib/pilots/sec-edgar";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const pilot = getPilot(slug);
    if (!pilot) return {};
    return {
      title: `${pilot.name} — laatste 13F-melding`,
      description: `Publiek gemelde Amerikaanse aandelenposities van ${pilot.name} (${pilot.manager}), rechtstreeks van SEC EDGAR.`,
      alternates: { canonical: `/pilots/${pilot.slug}` },
    };
  });
}

function usd(n: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function PilotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot) notFound();

  let filing: Awaited<ReturnType<typeof fetchLatestFiling>> | null = null;
  let fetchError: string | null = null;
  try {
    filing = await fetchLatestFiling(pilot.cik);
  } catch (err) {
    fetchError =
      err instanceof Error ? err.message : "Onbekende fout bij het ophalen.";
  }

  return (
    <>
      <PageHero
        eyebrow="Pilot"
        title={pilot.name}
        description={`${pilot.manager} — ${pilot.description}`}
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-8">
          <Link
            href="/pilots"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alle pilots
          </Link>

          {pilot.note && (
            <Callout tone="warning" title="Goed om te weten">
              {pilot.note}
            </Callout>
          )}

          <Callout tone="warning" title="Dit is informatie, geen aanbeveling">
            Formulier 13F toont alleen Amerikaanse long-posities in
            beursgenoteerde aandelen, gemeld tot 45 dagen na het einde van het
            kwartaal — geen short-posities, opties of niet-Amerikaanse
            holdings, en mogelijk al achterhaald. FinEdu rangschikt deze
            posities niet en zegt niet dat iets &quot;goed&quot; of
            &quot;slecht&quot; is. Wil je
            zelf iets vergelijkbaars instellen, doe dat in{" "}
            <Link href="/agent" className="font-semibold underline">
              je eigen agent
            </Link>{" "}
            — jij kiest en bevestigt daar zelf het juiste instrument bij je
            broker.
          </Callout>

          {fetchError ? (
            <Callout tone="warning" title="Kon de gegevens niet ophalen">
              SEC EDGAR gaf een fout terug: {fetchError}. Probeer het later
              opnieuw, of bekijk de melding rechtstreeks op{" "}
              <a
                href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${pilot.cik}&type=13F-HR`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                sec.gov
              </a>
              .
            </Callout>
          ) : filing ? (
            <section aria-labelledby="posities">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id="posities"
                  className="font-display text-xl font-extrabold text-foreground"
                >
                  Gemelde posities
                </h2>
                <a
                  href={filingIndexUrl(pilot.cik, filing.accessionNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  Bekijk op SEC EDGAR
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-1 text-sm text-muted">
                13F-HR ingediend op {formatDate(filing.filingDate)} · gesorteerd
                op gemelde waarde
              </p>

              {filing.holdings.length === 0 ? (
                <p className="mt-4 text-sm text-muted">
                  Geen posities gevonden in deze melding.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-muted text-left text-xs font-bold uppercase tracking-wide text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Uitgever
                        </th>
                        <th scope="col" className="px-4 py-3">
                          CUSIP
                        </th>
                        <th scope="col" className="px-4 py-3 text-right">
                          Aantal
                        </th>
                        <th scope="col" className="px-4 py-3 text-right">
                          Waarde
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Actie</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filing.holdings.slice(0, 25).map((h, i) => (
                        <tr key={`${h.cusip}-${i}`}>
                          <td className="px-4 py-3 font-semibold text-foreground">
                            {h.issuer}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted">
                            {h.cusip}
                          </td>
                          <td className="px-4 py-3 text-right text-muted">
                            {new Intl.NumberFormat("nl-BE").format(h.shares)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-foreground">
                            {usd(h.valueUsd)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              href={`/agent?ruleName=${encodeURIComponent(
                                `Zoals ${pilot.name}: ${h.issuer}`,
                              )}`}
                              className="whitespace-nowrap text-xs font-semibold text-accent hover:underline"
                            >
                              Start regel →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {filing.holdings.length > 25 && (
                <p className="mt-2 text-xs text-muted">
                  Getoond: top 25 van {filing.holdings.length} gemelde
                  posities, op waarde.
                </p>
              )}
              <p className="mt-2 text-xs text-muted">
                &quot;Start regel&quot; vult enkel een naam in bij een nieuwe,
                lege regel in je agent — geen ticker, geen bedrag en geen
                broker. Dat vul en bevestig je zelf.
              </p>
            </section>
          ) : null}

          <p className="text-xs text-muted">
            Bron: SEC EDGAR, formulier 13F-HR, CIK {pilot.cik}. Een CUSIP is
            geen tickersymbool — zoek het juiste instrument zelf op bij je
            broker voor je er iets mee doet.
          </p>
        </div>
      </Container>
    </>
  );
}
