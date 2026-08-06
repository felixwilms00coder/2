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
      title: `${pilot.name} — latest 13F filing`,
      description: `Publicly disclosed US equity positions of ${pilot.name} (${pilot.manager}), straight from SEC EDGAR.`,
      alternates: { canonical: `/pilots/${pilot.slug}` },
    };
  });
}

function usd(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
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
    fetchError = err instanceof Error ? err.message : "Unknown error while fetching.";
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
            All pilots
          </Link>

          {pilot.note && (
            <Callout tone="warning" title="Good to know">
              {pilot.note}
            </Callout>
          )}

          <Callout tone="warning" title="This is information, not a recommendation">
            Form 13F only shows US long positions in publicly traded stocks,
            reported up to 45 days after quarter-end — no short positions,
            options or non-US holdings, and possibly already outdated. Auto
            Broker doesn&apos;t rank these positions or say anything is &quot;good&quot; or
            &quot;bad&quot;. If you want to set up something similar yourself, do it in{" "}
            <Link href="/agent" className="font-semibold underline">
              your own agent
            </Link>{" "}
            — you choose and confirm the actual instrument at your broker
            there.
          </Callout>

          {fetchError ? (
            <Callout tone="warning" title="Couldn't fetch the data">
              SEC EDGAR returned an error: {fetchError}. Try again later, or
              view the filing directly on{" "}
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
            <section aria-labelledby="positions">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id="positions"
                  className="font-display text-xl font-extrabold text-foreground"
                >
                  Reported positions
                </h2>
                <a
                  href={filingIndexUrl(pilot.cik, filing.accessionNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  View on SEC EDGAR
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-1 text-sm text-muted">
                13F-HR filed on {formatDate(filing.filingDate)} · sorted by
                reported value
              </p>

              {filing.holdings.length === 0 ? (
                <p className="mt-4 text-sm text-muted">
                  No positions found in this filing.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-muted text-left text-xs font-bold uppercase tracking-wide text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Issuer
                        </th>
                        <th scope="col" className="px-4 py-3">
                          CUSIP
                        </th>
                        <th scope="col" className="px-4 py-3 text-right">
                          Shares
                        </th>
                        <th scope="col" className="px-4 py-3 text-right">
                          Value
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Action</span>
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
                            {new Intl.NumberFormat("en-GB").format(h.shares)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-foreground">
                            {usd(h.valueUsd)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              href={`/agent?ruleName=${encodeURIComponent(
                                `Like ${pilot.name}: ${h.issuer}`,
                              )}`}
                              className="whitespace-nowrap text-xs font-semibold text-accent hover:underline"
                            >
                              Start rule →
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
                  Showing top 25 of {filing.holdings.length} reported
                  positions, by value.
                </p>
              )}
              <p className="mt-2 text-xs text-muted">
                &quot;Start rule&quot; only fills in a name on a new, empty
                rule in your agent — no ticker, no amount, no broker. You
                fill in and confirm the rest yourself.
              </p>
            </section>
          ) : null}

          <p className="text-xs text-muted">
            Source: SEC EDGAR, Form 13F-HR, CIK {pilot.cik}. A CUSIP is not a
            ticker symbol — look up the correct instrument yourself at your
            broker before doing anything with it.
          </p>
        </div>
      </Container>
    </>
  );
}
