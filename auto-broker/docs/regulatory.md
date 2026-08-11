# Regulatory reasoning: why Auto Broker stays software, not a service

This document explains the legal position Auto Broker is deliberately built
around, and where that position stops holding. It is written from general
knowledge of EU financial regulation, not legal advice — **have this
reviewed by a lawyer specialized in financial services law before pointing
any part of this at a live account with real money, and before changing the
architecture in any of the ways described below as "where this breaks".**

## Summary

| Feature | Status | Note |
| --- | --- | --- |
| Self-managed buy-rule agent (`/agent`) | Built | Simulation broker fully working; IBKR adapter unverified against a live account |
| MCP broker server (`mcp/`) | Built | Same rules as `/agent`, reachable from an MCP client instead of a browser |
| Curated "copy this portfolio" marketplace with auto-execution for other users | **Not built, on purpose** | This is the part that needs an actual investment-adviser license — see below |

## Why the self-managed agent is not a regulated investment service

Placing orders on behalf of a user is **discretionary portfolio
management**. Recommending specific instruments to a specific person is
**investment advice**. Both are regulated activities under **MiFID II**
across the EU, enforced by each member state's national regulator (FSMA in
Belgium, BaFin in Germany, AMF in France, AFM in the Netherlands, and so
on — MiFID II passporting lets a firm authorized in one member state operate
across the rest once licensed). Operating either without authorization is a
criminal matter in most member states, not just a contractual risk.

`/agent` and the `mcp/` server both stay on the software side of that line
because of how they're built, not because of a disclaimer:

- **The user decides everything.** Instrument, amount, cadence, and limits
  are typed in by the user. Auto Broker suggests nothing, filters nothing,
  and does not judge whether anything fits the user.
- **No discretion.** The agent only ever executes what the user explicitly
  set up in advance. There is no decision Auto Broker itself makes, so
  there is no portfolio management.
- **No order flow through Auto Broker.** Orders go directly from the user's
  own browser (or their own MCP client process) to their own broker
  account, with their own credentials. There is no Auto Broker server
  anywhere in that path, and Auto Broker never holds funds or instruments.

In that shape, Auto Broker provides **software**, and the user is the
principal dealing directly with their own licensed broker — the same legal
position as someone running their own script against a broker's API.

**Where this stops holding.** This reasoning only survives if every one of
those points stays true. The moment any of the following gets added, the
position shifts toward a regulated investment service: a server that sends
orders on behalf of users, a list of "recommended" or preselected
instruments, a default/model portfolio, a suitability questionnaire with an
output, or Auto Broker holding user tokens on its own infrastructure. Get a
financial-law lawyer's sign-off before any of that goes live with real
accounts.

### What's still unverified

- **The IBKR adapter has never been run against a real IBKR account**
  (browser adapter or MCP client) — only against a mock gateway
  reproducing the Client Portal Web API's response shapes. Validate
  against a paper account first.
- **Token/session handling is manual.** IBKR relies entirely on the
  Client Portal Gateway's own session; there's no separate token to
  manage on Auto Broker's side.

## Why the MCP server (`mcp/`) doesn't change the analysis

The MCP server is the same self-managed idea, reachable from an MCP client
instead of a browser tab: it runs locally, uses only the operator's own
credentials, and requires an explicit `confirm_order` call — separate from
`preview_order` — before anything is sent to a broker. It is single-tenant
by construction: anyone who wants to use it runs their own copy with their
own credentials, and nothing here is designed to serve multiple end users
from one running instance. See `mcp/README.md` for the full safety model.

### DEGIRO — not supported

DEGIRO has no public API for third-party integrations. Rather than build
against DEGIRO's private app API, this was left unsupported. Revisit if
DEGIRO ever ships an official one.

## Recommended order of operations

1. Test everything against simulation/paper environments first: the
   built-in simulation broker and an IBKR paper account.
2. Validate the IBKR adapter's request/response shapes against IBKR's
   current reference documentation — API details change.
3. Get the self-managed architecture confirmed by a financial-services
   lawyer before flipping IBKR to live. Stay away from anything that
   drifts toward selection or recommendation — that's precisely where the
   distinction from a regulated investment service disappears.
