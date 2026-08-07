import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container, Callout } from "@/components/ui";
import { getPilot, pilots } from "@/lib/pilots/pilots";
import { fetchPilotHistory, filingIndexUrl } from "@/lib/pilots/sec-edgar";
import { diffFilings } from "@/lib/pilots/diff";
import { ValueChart } from "@/components/pilots/value-chart";
import { PositionChanges } from "@/components/pilots/position-changes";

// Required for static export (Capacitor build): every dynamic route needs
// its params known at build time there. For the normal live web build this
// just pre-warms these 3 pages; new Pilots still need adding here to be
// reachable at all once CAPACITOR_BUILD is set.
export function generateStaticParams() {
  return pilots.map((p) => ({ slug: p.slug }));
}

// Static export can't serve params outside generateStaticParams (there's no
// server left to fall back to), so pin this rather than leave the default.
export const dynamicParams = false;

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

  let history: Awaited<ReturnType<typeof fetchPilotHistory>> = [];
  let fetchError: string | null = null;
  try {
    history = await fetchPilotHistory(pilot.cik, 6);
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Unknown error while fetching.";
  }

  const latest = history[0] ?? null;
  const previous = history[1];
  const changes = latest ? diffFilings(latest, previous) : [];
  const chartPoints = [...history].reverse().map((h) => ({
    filingDate: h.filingDate,
    totalValueUsd: h.totalValueUsd,
  }));

  return (
    <>
      <Container className="py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/pilots"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All pilots
          </Link>

          {/* Hero: gradient card, no photo — a real person's likeness isn't
              ours to reproduce, and the point here is the public filing data,
              not a portrait. */}
          <div className="relative mt-4 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-strong via-accent to-accent-bright p-8 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="bg-dot-grid pointer-events-none absolute inset-0 text-white/10"
            />
            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                Pilot
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {pilot.name}
              </h1>
              <p className="mt-2 text-white/85">{pilot.manager}</p>

              {latest && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    Latest reported portfolio value
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tabular-nums">
                    {usd(latest.totalValueUsd)}
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    13F-HR filed {formatDate(latest.filingDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {pilot.note && (
              <Callout tone="warning" title="Good to know">
                {pilot.note}
              </Callout>
            )}

            <Callout tone="warning" title="This is information, not a recommendation">
              &quot;Reported portfolio value&quot; is the sum of what this
              filer told the SEC it held — it moves with new filings, market
              price, and money in or out, so it is <strong>not</strong>{" "}
              a performance or return figure. Form 13F also only shows US
              long positions in publicly traded stocks, reported up to 45 days
              after quarter-end — no short positions, options or non-US
              holdings, and possibly already outdated. Auto Broker
              doesn&apos;t rank these positions or say anything is
              &quot;good&quot; or &quot;bad&quot;. If you want to set up
              something similar yourself, do it in{" "}
              <Link href="/agent" className="font-semibold underline">
                your own agent
              </Link>{" "}
              — you choose and confirm the actual instrument at your broker
              there.
            </Callout>

            {fetchError ? (
              <Callout tone="warning" title="Couldn't fetch the data">
                SEC EDGAR returned an error: {fetchError}. Try again later,
                or view the filing directly on{" "}
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
            ) : latest ? (
              <>
                <section aria-labelledby="value-history" className="rounded-3xl border border-border bg-surface p-6">
                  <h2
                    id="value-history"
                    className="font-display text-lg font-bold text-foreground"
                  >
                    Value over time
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Reported total across the last {history.length} 13F-HR
                    filings.
                  </p>
                  <div className="mt-4">
                    <ValueChart points={chartPoints} />
                  </div>
                </section>

                <section aria-labelledby="changes" className="rounded-3xl border border-border bg-surface p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                      id="changes"
                      className="font-display text-lg font-bold text-foreground"
                    >
                      What changed since the last filing
                    </h2>
                    {previous && (
                      <span className="text-xs text-muted">
                        vs. {formatDate(previous.filingDate)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Grouped by share count, not price — a position only moves
                    category here if the filer actually traded it.
                  </p>
                  <div className="mt-4">
                    <PositionChanges changes={changes} />
                  </div>
                </section>

                <section aria-labelledby="positions">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                      id="positions"
                      className="font-display text-xl font-extrabold text-foreground"
                    >
                      All reported positions
                    </h2>
                    <a
                      href={filingIndexUrl(pilot.cik, latest.accessionNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                    >
                      View on SEC EDGAR
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    13F-HR filed on {formatDate(latest.filingDate)} · sorted
                    by reported value
                  </p>

                  {latest.holdings.length === 0 ? (
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
                          {latest.holdings.slice(0, 25).map((h, i) => (
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
                  {latest.holdings.length > 25 && (
                    <p className="mt-2 text-xs text-muted">
                      Showing top 25 of {latest.holdings.length} reported
                      positions, by value.
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted">
                    &quot;Start rule&quot; only fills in a name on a new,
                    empty rule in your agent — no ticker, no amount, no
                    broker. You fill in and confirm the rest yourself.
                  </p>
                </section>
              </>
            ) : null}

            <section aria-labelledby="methodology" className="rounded-3xl border border-border bg-surface-muted p-6">
              <h2
                id="methodology"
                className="font-display text-base font-bold text-foreground"
              >
                Where do we get these positions?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every figure on this page comes from {pilot.name}&apos;s own
                Form 13F-HR filings with the SEC — the same quarterly
                disclosure every large institutional manager is legally
                required to make. We fetch it directly from SEC EDGAR at
                render time, parse the information table, and total it up;
                nothing is entered by hand and nothing is sourced from a
                third party.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pilot.description}
              </p>
            </section>

            <p className="text-xs text-muted">
              Source: SEC EDGAR, Form 13F-HR, CIK {pilot.cik}. A CUSIP is
              not a ticker symbol — look up the correct instrument yourself
              at your broker before doing anything with it.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
