import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, EntityCard, Callout } from "@/components/ui";
import { pilots } from "@/lib/pilots/pilots";

export const metadata: Metadata = {
  title: "Pilots — public positions of well-known investors",
  description:
    "See the US equity positions well-known investors are legally required to disclose via SEC Form 13F. Purely informational: no recommendation, no brokerage connection.",
  alternates: { canonical: "/pilots" },
};

export default function PilotsPage() {
  return (
    <>
      <PageHero
        eyebrow="Public data"
        title="Pilots: what well-known investors publicly disclose"
        description="US law requires large fund managers to report their equity positions to the SEC every quarter. This shows those filings, straight from the source."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <Callout tone="warning" title="This is information, not a recommendation">
            Auto Broker doesn&apos;t pick these names because they&apos;re &quot;good,&quot; and
            doesn&apos;t rank them. Form 13F also only shows part of the picture:
            US long positions in publicly traded stocks only, reported up to
            45 days after quarter-end, with no short positions, options or
            non-US holdings. What you see may already be out of date. Want to
            build something similar in your own agent? You choose and
            confirm the actual instrument at your own broker — see{" "}
            <Link href="/agent" className="font-semibold underline">
              /agent
            </Link>
            .
          </Callout>
        </div>

        <h2 className="sr-only">All pilots</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pilots.map((pilot) => (
            <EntityCard
              key={pilot.slug}
              href={`/pilots/${pilot.slug}`}
              title={pilot.name}
              description={`${pilot.manager} — ${pilot.description}`}
              meta="View positions"
            />
          ))}
        </div>
      </Container>
    </>
  );
}
