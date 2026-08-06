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
| Self-managed buy-rule agent (`/agent`) | Built | Simulation broker fully working; Saxo and IBKR adapters unverified against live accounts |
| Public 13F position viewer (`/pilots`) | Built | Read-only, no execution, no ranking |
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

- **The Saxo adapter has never been run against Saxo's live API.** It
  follows their documented OpenAPI shape, but must be validated against
  Saxo's simulation environment first.
- **The IBKR adapter has never been run against a real IBKR account either**
  (browser adapter or MCP client). Validate against a paper account first.
- **Token/session handling is manual.** Saxo uses a pasted access token kept
  only in `sessionStorage`; IBKR relies entirely on the Client Portal
  Gateway's own session. Production use would want a real OAuth2/PKCE flow
  for Saxo and a properly managed gateway lifecycle for IBKR.

## Why `/pilots` is informational, not advice

Investment advice under MiFID II requires a **personal recommendation** to a
specific client. `/pilots` shows the same public SEC Form 13F data to
everyone, with no suitability assessment and no "this fits you" judgment —
the same legal position as a financial news site reporting on a 13F filing.
It doesn't rank the investors it shows, doesn't call any of them "best," and
the "Start rule" link on each holding only pre-fills a rule *name* in
`/agent` — never a ticker, amount, or broker. The user still has to choose
and confirm the actual instrument themselves.

Form 13F itself is also a limited, delayed picture: only US long positions
in publicly traded stocks, reported up to 45 days after quarter-end, no
short positions, options, or non-US holdings. What's shown may already be
outdated by the time it's read.

## Why the MCP server (`mcp/`) doesn't change the analysis

The MCP server is the same self-managed idea, reachable from an MCP client
instead of a browser tab: it runs locally, uses only the operator's own
credentials, and requires an explicit `confirm_order` call — separate from
`preview_order` — before anything is sent to a broker. It is single-tenant
by construction: anyone who wants to use it runs their own copy with their
own credentials, and nothing here is designed to serve multiple end users
from one running instance. See `mcp/README.md` for the full safety model.

### Robinhood — an added risk on top of the above

Robinhood has no public trading API for third-party developers. The
Robinhood integration in `mcp/` talks to the same private endpoints the
Robinhood app itself uses, reverse-engineered by the open-source community.
That's a **separate** risk from the regulatory question above: it violates
Robinhood's Terms of Service, can break without notice whenever Robinhood
changes its app, and risks the connected account being restricted or closed.
It requires an explicit `ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API=true` opt-in
on top of credentials for exactly that reason.

### DEGIRO — not supported

DEGIRO has no public API for third-party integrations. Rather than build
against DEGIRO's private app API, this was left unsupported. Revisit if
DEGIRO ever ships an official one.

## Recommended order of operations

1. Test everything against simulation/paper environments first: the
   built-in simulation broker, Saxo's SIM environment, and an IBKR paper
   account.
2. Validate the Saxo and IBKR adapters' request/response shapes against
   each broker's current reference documentation — API details change.
3. Replace Saxo's manually pasted token with a real OAuth2/PKCE flow before
   pointing it at a live account.
4. Get the self-managed architecture confirmed by a financial-services
   lawyer before flipping any broker to live. Stay away from anything that
   drifts toward selection or recommendation — that's precisely where the
   distinction from a regulated investment service disappears.
