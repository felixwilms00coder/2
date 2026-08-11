# Interactive Brokers AI integrations (official)

This is **not** something Auto Broker builds or hosts. IBKR runs its own MCP
server — `https://api.ibkr.com/v1/api/mcp-public` — and you connect your own
AI agent (Claude, ChatGPT, Grok, Claude Code, Cursor, etc.) to it directly.
There is no broker adapter to write.

Source: [IBKR's own "Your Portfolio. Your AI. Connected."
page](https://interactivebrokers.com/en/trading/ai-integrations.php) —
that page is the source of truth; if anything here goes stale, trust it
over this file.

## The key difference from Robinhood: instructions are not orders

This is the most important fact on the whole page, stated in IBKR's own
words:

> The AI analyzes your portfolio and drafts trade instructions. You review
> and submit every order across global markets, multiple asset classes and
> currencies. [...] **Instructions never become orders automatically.**

Concretely, the flow is:

1. You ask your AI agent (in Claude, ChatGPT, etc.) to analyze your
   portfolio or draft a trade — it can read your account but **cannot
   place an order**.
2. The agent's output is a *drafted instruction*, not an order.
3. You separately open the **"AI Instructions" tab** in an actual IBKR
   platform (mobile app, web, or desktop) — not the AI chat — where the
   drafted instruction is waiting.
4. You review it there and press **"Create Order"** yourself (or delete
   it) to turn it into a real order.

That's a stronger gate than Robinhood's: Robinhood's agent *can* place an
order directly unless you've told it to always ask first. IBKR's agent
architecturally cannot place an order at all — the only path to a real
order runs through you opening IBKR's own platform and acting on it
there, in a different application than the one you talked to the agent
in.

You also control, per IBKR's own list:
- What your AI can access in your IBKR account
- Which trade instructions become orders
- When orders are submitted

## What it is

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open
standard that lets an AI agent connect to external apps and take actions,
not just answer questions. IBKR's MCP server exposes your own IBKR account
to an AI agent you choose — without sharing API keys or passwords with
that agent or its provider.

Your AI gets access to *authorized account information*, per IBKR:
positions and cash balances, margin availability, realized and unrealized
P&L, historical transactions, option chains, risk exposures,
multi-currency balances, linked accounts, and portfolio structures.

Example prompts IBKR itself gives: "Show me the possible options
strategies that can help protect the gains on my five largest stock
positions and generate the order instructions for each," "Show me the
currency impact if the USD weakens 10% against my largest foreign
exposures," "Create sell instructions for [a] holding with 30-day
history."

## Eligibility

Unlike Robinhood, there's no separate account to open:

- **No additional costs. No technical configuration. No separate AI
  broker account.** — IBKR's own words. You connect your existing IBKR
  account directly.
- Available on IBKR's mobile, web, and desktop platforms.

## Connecting your AI agent

**Via a certified connector marketplace** (ChatGPT, Claude, Grok): link
your IBKR account through that platform's own connector marketplace in a
few minutes.

**Directly, for any MCP-capable tool** (Claude Code, ChatGPT Codex,
Cursor, and more): in your AI application, look for **"Add MCP Server"**
or **"Custom Connector"**, then enter:

```
https://api.ibkr.com/v1/api/mcp-public
```

For Claude Code specifically, that's the same pattern as Robinhood:
```bash
claude mcp add ibkr-trading --transport http https://api.ibkr.com/v1/api/mcp-public
```
Then run `/mcp` in Claude Code, select it, and authenticate with your own
IBKR login.

## How this fits with the rest of Auto Broker

Auto Broker's `/agent` page and `mcp/` server exist because, until now,
building against IBKR meant running IBKR's Client Portal Gateway locally
and calling its Web API yourself — legitimate (it's IBKR's own documented
API, unlike the old unofficial Robinhood workaround) but more setup than
most people want, and it needed a self-hosted MCP server to be reachable
from an AI agent at all (`mcp/src/brokers/ibkr.ts` in this repo, verified
end-to-end against a mock gateway).

IBKR's own Trading MCP removes that setup **for IBKR specifically**: no
local gateway, no self-hosted server, sanctioned by the broker, and with a
stronger confirmation gate than this repo's own preview/confirm flow —
the agent literally cannot place an order, only draft an instruction you
act on inside IBKR's own app. If you trade through IBKR, connect to it
directly using the steps above instead of running this repo's local
gateway + MCP server — less to set up and run, and the safer default.

The self-hosted adapter in `mcp/` stays in this repo as a working,
verified example (and for anyone who specifically wants a local-only,
no-third-party-hosted-server setup), but treat IBKR's own Trading MCP as
the option to reach for first.
