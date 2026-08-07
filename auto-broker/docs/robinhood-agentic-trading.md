# Robinhood Agentic Trading (official)

This is different from everything else in this repo: it is **not** something
Auto Broker builds or hosts. Robinhood runs its own MCP server —
`https://agent.robinhood.com/mcp/trading` — and you connect your own AI
agent (Claude Code, Claude Desktop, ChatGPT, etc.) to it directly. There is
no broker adapter to write, because Robinhood is the one running the
server, not us.

This page exists to document that connection accurately and say how it
relates to the rest of Auto Broker. Source: [Robinhood's own "Agentic
Trading overview"](https://robinhood.com/us/en/support/articles/agentic-trading-overview/) —
that page is the source of truth; if anything here goes stale, trust it
over this file.

## What it is

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open
standard that lets an AI agent connect to external apps and take actions,
not just answer questions. Robinhood hosts an MCP server that exposes your
own Robinhood account to an AI agent you choose and control.

Per Robinhood's own examples, a connected agent can:

- **Ask about your account** — portfolio value, buying power, positions.
- **Place orders** using Robinhood's available order types.
- **Build portfolios** ("look through news and industry reports to build a
  portfolio that represents little-known tickers across the AI supply
  chain").
- **Automate trading strategies** ("buy $100 of ROAR every time the price
  decreases 2% or more in 1 day").
- **Adjust/rebalance a portfolio** to target allocations.
- **Analyze a portfolio or market data** ("what risks am I exposed to?",
  "why is ROAR up today?").

Robinhood's own page notes those examples are illustrative only, not a
recommendation or endorsement — the same posture Auto Broker takes toward
the rules you write in `/agent`.

## The confirmation step is optional — read this before Auto Broker's rest

This is the one point where Robinhood's Agentic Trading behaves
**differently** from everything else in Auto Broker, and it's the reason
this section exists rather than just linking out.

Every other broker connection in this repo (`/agent`, `mcp/`) hard-codes a
preview-then-confirm step: nothing is ever sent to a broker without you
separately approving the exact order first. Robinhood's own Risks section
says the opposite is possible here:

> You are ultimately responsible for the trades your AI agent places in
> your account. [...] Before your agent takes action, you can review what
> it's about to do. **Be aware that if you've asked your agent to take
> action without asking your approval, it can place trades without your
> confirmation.**

In other words, whether you get a confirmation prompt per trade depends on
how you instruct your agent, not on a control Robinhood enforces for you.
If you want the same "nothing executes without my explicit yes" guarantee
Auto Broker gives you elsewhere, you have to build that into your own
prompts/instructions to the agent — it isn't automatic here.

Robinhood's disclosures also state plainly: agentic trading risks the loss
of your entire investment, AI agents can misinterpret instructions or act
on outdated information, Robinhood does not guarantee agent output, and
**you assume all risk** for trades the agent executes and for how
third-party AI providers use your data.

### What your agent can access

Per Robinhood: once connected, your agent gets **read access** to more
than just the Agentic account —

- all your Robinhood accounts, including account numbers
- all details about your positions and balances
- all details about your transactions, including order history
- all details about your watchlists and scans

Trading is scoped tighter than reading: **your agent can only place trades
in your Robinhood Agentic account**, not your other Robinhood accounts —
but it can *see* all of them.

## Eligibility

- You need an existing Robinhood **primary individual investing account in
  good standing** first.
- Connecting an AI agent auto-opens a new **Agentic account** — a
  self-directed individual investing account (counts toward Robinhood's
  10-account limit for self-directed individual investing accounts).
- Onboarding for that account happens automatically the first time you
  authenticate your AI agent against the Robinhood Trading MCP.
- **Desktop only.** You can only open the Agentic account and authenticate
  your agent on a desktop device. If you're connecting from a mobile AI
  app, Robinhood has you copy the onboarding URL and finish it in a
  desktop browser instead.

## Connecting your AI agent

Pick the platform you're actually using and follow Robinhood's steps (each
one ends with your agent asking you to authenticate — that's you logging
into your own Robinhood account, not a credential Auto Broker ever sees):

**Claude Code**
```bash
claude mcp add robinhood-trading --transport http https://agent.robinhood.com/mcp/trading
```
Then run `/mcp` in Claude Code, select `robinhood-trading`, and authenticate.

**Claude Desktop**
Settings → Connectors → Add custom connector → add the MCP link
`https://agent.robinhood.com/mcp/trading`.

**ChatGPT**
Turn on Developer Mode → Settings → Apps → Create app → add the MCP link
`https://agent.robinhood.com/mcp/trading`.

**Codex**
Settings → MCP servers → Streamable HTTP → add the MCP link
`https://agent.robinhood.com/mcp/trading`.

**Codex CLI**
```bash
codex mcp add robinhood-trading --url https://agent.robinhood.com/mcp/trading
```
Then run `/mcp` in Codex CLI and select `robinhood-trading`.

**Cursor**
Give your agent the MCP link `https://agent.robinhood.com/mcp/trading`,
then Settings → Cursor Settings → Tools & MCPs → Connect.

**Grok**
Start a chat → `+` → Add connector → Custom → add the MCP link
`https://agent.robinhood.com/mcp/trading`.

**Any other MCP-capable platform**: point it at
`https://agent.robinhood.com/mcp/trading` directly.

## How this fits with the rest of Auto Broker

Auto Broker's `/agent` page and `mcp/` server exist because, until now,
IBKR and Saxo had real APIs you could build against yourself, and
Robinhood didn't — the Robinhood adapter in `mcp/src/brokers/robinhood.ts`
is a reverse-engineered, unofficial, ToS-violating stopgap for that gap
(see the warning in [`mcp/README.md`](../mcp/README.md#robinhood--unofficial-experimental-read-this-before-using-it)).

Robinhood's own Trading MCP removes the reason that adapter exists **for
Robinhood specifically**: it's sanctioned by the broker, doesn't touch
private endpoints, and you connect to it the same way you'd connect to any
other MCP server, with your own Robinhood login. If you trade through
Robinhood, connect to it directly using the steps above instead of using
this repo's unofficial adapter — it's the strictly safer option and
requires nothing from Auto Broker at all.

The unofficial adapter stays in this repo for now (IBKR/Saxo users
following the "one MCP config, one client" pattern may still reference it
as an example), but treat it as superseded for Robinhood accounts.
