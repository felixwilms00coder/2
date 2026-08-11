import { Container, PageHero, ButtonLink, Callout, EntityCard, SectionHeading } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Self-managed"
        title="Your own buy rules. Your own broker. Your own confirmation."
        description="Auto Broker is software you run yourself: write a rule, connect your own IBKR account, and every order still waits for you to confirm it. No server in the order path, not Auto Broker's or anyone else's."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/agent">Open the agent</ButtonLink>
        </div>
      </PageHero>

      <Container className="py-14">
        <Callout tone="warning" title="This is not a broker, adviser, or portfolio manager">
          Auto Broker never picks an instrument, never decides for you, and
          never holds your money or your broker token. You are the one
          giving the instructions to your own, licensed broker — the same
          legal position as running your own script against their API. See
          the README for the full reasoning, including where that stops
          being true.
        </Callout>

        <div className="mt-14">
          <SectionHeading
            kicker="How it works"
            title="Three things happen, in this order"
            description="Every rule follows the same shape, whether you're using the web dashboard or the MCP server."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-border bg-surface p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-accent">1. You write the rule</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Instrument, amount, cadence, per-order and per-month caps —
                all typed in by you. Nothing is pre-filled or suggested.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border bg-surface p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-accent">2. It waits for confirmation</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A preview shows the live price and quantity before anything
                is sent — you confirm, or you don&apos;t.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border bg-surface p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-accent">3. It goes straight to your broker</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                From your browser or your own MCP client straight to IBKR.
                Every attempt — sent, refused, or failed — lands in a local
                log you can read.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <EntityCard
            href="/agent"
            title="Agent"
            description="Set up rules against a paper broker or your own local IBKR Client Portal Gateway."
            meta="Open the agent"
          />
        </div>

        <div className="mt-14 rounded-[1.75rem] border border-border bg-surface-muted p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-accent">Also available as an MCP server</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            The same IBKR connection, reachable from an MCP client (Claude
            Desktop, Claude Code) instead of a browser tab — runs locally,
            uses only your own credentials, and still requires an explicit
            confirm step before anything is sent. See{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">mcp/README.md</code>{" "}
            in this repository.
          </p>
        </div>
      </Container>
    </>
  );
}
