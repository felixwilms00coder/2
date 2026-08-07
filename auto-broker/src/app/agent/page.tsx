import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, PageHero, Callout } from "@/components/ui";
import { AgentDashboard } from "@/components/agent/agent-dashboard";
import { AgentDashboardWithParams } from "@/components/agent/agent-dashboard-with-params";

export const metadata: Metadata = {
  title: "Agent — your rules, your broker",
  description:
    "Set up your own automatic buy rules and execute them through your own broker connection. You decide what, how much and when.",
  alternates: { canonical: "/agent" },
};

export default function AgentPage() {
  return (
    <>
      <PageHero
        eyebrow="Automation"
        title="Your own agent"
        description="Write your own rules, set your own limits, and connect your own broker account. Start in simulation until you're sure."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          <Callout tone="tip" title="You are the one giving the instructions">
            Auto Broker picks no instrument, makes no recommendation, and
            does not manage your portfolio. Your rules stay in your browser,
            orders go straight from your device to your broker, and there is
            no Auto Broker server in that path. What you build here is your
            instruction — we only provide the tool.
          </Callout>

          <Suspense fallback={<AgentDashboard />}>
            <AgentDashboardWithParams />
          </Suspense>

          <section aria-labelledby="good-to-know">
            <h2
              id="good-to-know"
              className="font-display text-xl font-extrabold text-foreground"
            >
              Good to know
            </h2>
            <div className="prose-article mt-4 space-y-6 text-sm leading-relaxed text-muted">
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  The agent runs when you open the page
                </h3>
                <p className="mt-2">
                  There is deliberately no server that keeps running on your
                  behalf. Open this page, and the agent checks which of your
                  rules are due. Miss a day, and the rule still runs the next
                  time you open it — it never silently skips a month.
                </p>
                <p className="mt-2">
                  Want execution that keeps going without you? Use your
                  broker&apos;s own recurring investment plan. That&apos;s the same
                  automation, carried out by the licensed party your account
                  is with.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Always start in simulation
                </h3>
                <p className="mt-2">
                  The simulation broker places paper orders at reproducible
                  prices. Let your rules run a few cycles there and check the
                  log before you activate a real connection.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  About your tokens
                </h3>
                <p className="mt-2">
                  A broker token is only kept in this tab&apos;s memory and
                  disappears once you close it. It never goes to Auto Broker.
                  Use a token with as few permissions as possible, and revoke
                  it at your broker once you stop testing.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Interactive Brokers
                </h3>
                <p className="mt-2">
                  For IBKR this page talks straight to the Client Portal
                  Gateway you run locally yourself and log into at{" "}
                  <code>https://localhost:5000</code> — there&apos;s no token to
                  paste and no Auto Broker server in between. Start with a
                  paper account: which account you get depends entirely on
                  what you log into the gateway with, not on a setting here.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  Robinhood
                </h3>
                <p className="mt-2">
                  Robinhood isn&apos;t in the broker picker above — it
                  doesn&apos;t need to be. Robinhood runs its own official
                  Agentic Trading MCP server, and you connect your AI agent
                  (Claude Code, Claude Desktop, ChatGPT, etc.) to it
                  directly, sanctioned by Robinhood itself, with no Auto
                  Broker involved at all. See{" "}
                  <a
                    href="https://robinhood.com/us/en/support/articles/agentic-trading-overview/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    Robinhood&apos;s own setup guide
                  </a>{" "}
                  for the connection steps and required risk disclosures.
                </p>
              </div>
            </div>
          </section>

          <Callout tone="warning" title="What this is not">
            Not investment advice and not portfolio management. Auto Broker
            does not judge whether an instrument fits you, whether you have
            enough of a buffer, or whether the timing is right. That stays
            your own judgement — and that of a licensed adviser if you need
            one.
          </Callout>
        </div>
      </Container>
    </>
  );
}
