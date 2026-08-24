# Auto Broker MCP server

A self-managed [MCP](https://modelcontextprotocol.io) server that connects
**your own** IBKR and (experimental, unofficial) Robinhood accounts to an
MCP client such as Claude Desktop or Claude Code. It is the same
"software, not a service" architecture as the web app's own
[`/agent`](../src/app/agent) feature (see
[`docs/regulatory.md`](../docs/regulatory.md)), just reachable from an MCP
client instead of a browser tab:

- **Runs on your machine only.** You start this process yourself; it is not
  hosted by Auto Broker and Auto Broker never sees it run.
- **Your own credentials only.** Every gateway session or login belongs to
  you, never stored anywhere but this process's memory and (for the audit
  log only) a local file under `~/.auto-broker-mcp`.
- **No server in the order path.** Requests go straight from this process
  to each broker's own API. There is nothing multi-tenant here — if you
  want someone else to use this, they run their own copy against their own
  account, they don't connect to yours.

**This is not a broker, an investment adviser, or a portfolio manager.** It
is software you run yourself against your own account, the same legal
position as writing your own script against a broker's API. See
[`docs/regulatory.md`](../docs/regulatory.md) for why that
distinction matters under EU financial regulation (MiFID II) and
where the line would move if this were ever turned into a hosted,
multi-user, or fully-discretionary service — none of which this ships.
**Robinhood specifically carries a second, separate risk on top of all
that** — see its own section below before touching it.

## Safety model

1. **`preview_order` never sends anything.** It fetches a live quote,
   computes the resulting quantity — from the live price for a market order,
   or from your own `limitPrice` for a limit order — checks your euro
   guardrails, and returns a `previewId` that expires in 5 minutes.
2. **`confirm_order` is a separate, required second call.** Only a
   `previewId` from step 1 can be confirmed, and each one can only be used
   once. This is the confirm-before-send gate — nothing reaches a broker on
   the first tool call.
3. **The server starts disarmed on every launch.** `confirm_order` refuses
   until you call `set_armed` with `armed: true` in the current session —
   deliberately not persisted to disk, so a forgotten "armed" state from a
   previous session can never carry into a new one.
4. **Hard euro guardrails**, checked at both preview and confirm time:
   `AUTOBROKER_MAX_PER_ORDER_EUR` (default 250) and `AUTOBROKER_MAX_PER_MONTH_EUR`
   (default 1000, tracked against the local audit log).
5. **Everything is logged locally.** Every preview, fill, rejection,
   failure and cancellation is appended to
   `~/.auto-broker-mcp/orders.log.jsonl` — nothing is sent to Auto Broker.
6. **Autonomous, no-human-in-the-loop execution was deliberately not
   built.** `confirm_order` always requires its own explicit tool call; there
   is no mode where `preview_order` alone can result in a placed order.

## Setup

```bash
cd mcp
npm install
npm run build
```

All configuration is via environment variables — either a local `.env` you
load yourself (`node --env-file=.env dist/index.js`), or (recommended) the
`env` block of this server's entry in your MCP client's config, so
credentials never touch a file inside this repo at all. See
[`.env.example`](.env.example) for the full list.

### Interactive Brokers (Client Portal API) — officially supported

**IBKR now also has its own official Trading MCP — consider that first.**
IBKR hosts `https://api.ibkr.com/v1/api/mcp-public` directly: no local
gateway to run, connects to your existing account with no extra setup,
and its agent can only draft trade instructions — you still have to open
IBKR's own app to turn one into a real order, a stronger gate than even
this server's own preview/confirm flow. See
[`docs/ibkr-agentic-trading.md`](../docs/ibkr-agentic-trading.md).
Everything below is this repo's own self-hosted alternative, useful if
you specifically want a local-only setup with no third-party-hosted
server in the picture at all.

1. Download IBKR's **Client Portal Gateway** from IBKR and run it yourself
   (`bin/run.sh root/conf.yaml` or the Windows equivalent).
2. Open `https://localhost:5000` in a browser and log in with your own IBKR
   credentials — the gateway holds that session, this server never sees your
   IBKR password.
3. Leave `IBKR_MODE=paper` (the default) and log the gateway into a **paper**
   account first. Only switch to `IBKR_MODE=live` once you've validated
   behaviour there, per the recommended order of operations in
   `docs/regulatory.md`.
4. `IBKR_GATEWAY_URL` defaults to `https://localhost:5000/v1/api`; only
   change it if you've reconfigured the gateway's port.

**Verified against a mock gateway, not yet against a real one.** The full
tool flow (`list_brokers` → `get_account` → `get_positions` → `get_quote`
→ `preview_order` → disarmed refusal → `set_armed` → `confirm_order` →
duplicate-previewId refusal → guardrail rejection → `cancel_order` →
`get_order_history`) was run end-to-end through a local HTTPS server that
reproduces the Client Portal Web API's actual response shapes for
`/iserver/auth/status`, `/iserver/accounts`, `/portfolio/{id}/summary`,
`/portfolio/{id}/positions/0`, `/iserver/secdef/search`,
`/iserver/marketdata/snapshot` (including the "first call returns no
price" retry behaviour `snapshotPrice()` handles), and the order-placement
"question/reply" confirmation dance IBKR's own gateway does before an
order reaches the exchange. Every step passed. What this does **not**
prove: real auth/2FA behaviour, real market data entitlements, or
anything about your actual account — that only a real paper account run
locally against the real gateway can confirm. Do that before trusting
this with `IBKR_MODE=live`.

### Robinhood — UNOFFICIAL, EXPERIMENTAL, read this before using it

**Robinhood now has an official path — check that first.** Robinhood hosts
its own Agentic Trading MCP server (`https://agent.robinhood.com/mcp/trading`),
sanctioned by the broker, no unofficial API involved. As of mid-2026 it was
rolling out in a phased, US-first beta, and it's unconfirmed whether it
extends to Robinhood Europe accounts. If it's available to you, it's the
safer choice — see [Robinhood's own overview](https://robinhood.com/us/en/support/articles/agentic-trading-overview/).
Everything below is this repo's own unofficial adapter, for when it isn't.

Robinhood has never published a public trading API for third-party
developers, in the US, EU or UK. This integration talks to the same
private endpoints the classic Robinhood app uses, reverse-engineered by
the open-source community. Concretely, that means:

- **It violates Robinhood's Terms of Service.** Unlike IBKR, there is no
  legitimate integration path here.
- **It can break at any time**, without notice, whenever Robinhood changes
  its app — there is no versioned contract to rely on.
- **It risks the account it's connected to.** Automated access from an
  unrecognised client is exactly the pattern brokerages' fraud/abuse
  systems flag; accounts have been restricted or closed for this.
- **There is no paper/simulation mode.** Every order placed through this
  client is real.
- **It's unverified against Robinhood Europe specifically.** Every known
  reverse-engineering of this API (including the endpoints this client
  uses) documents Robinhood's US mobile app. Robinhood Europe UAB is a
  separate, Lithuania-regulated entity — nobody has published confirmation
  it authenticates against the same backend. Test with `get_account` /
  `get_positions` (read-only) before ever previewing an order.

Because of that, this client refuses to run at all unless you set
`ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API=true` in addition to
`ROBINHOOD_USERNAME` / `ROBINHOOD_PASSWORD` — a deliberate second opt-in on
top of just having credentials configured. Robinhood's login flow has
changed multiple times over the years (SMS challenge, device-verification
workflow, in-app approval); `src/brokers/robinhood.ts` implements the
classic `mfa_code` case (set `ROBINHOOD_MFA_CODE` if prompted). If your
account uses a different challenge type, this will need updating — that
instability is exactly why this stays labeled experimental rather than
"beta".

## Wiring this into an MCP client

Add an entry to your MCP client's config (e.g. Claude Desktop's
`claude_desktop_config.json`, or Claude Code's `mcp.json`) pointing at the
built server, with credentials in `env` rather than a checked-in file:

```json
{
  "mcpServers": {
    "auto-broker": {
      "command": "node",
      "args": ["/absolute/path/to/mcp/dist/index.js"],
      "env": {
        "IBKR_MODE": "paper",
        "AUTOBROKER_MAX_PER_ORDER_EUR": "250",
        "AUTOBROKER_MAX_PER_MONTH_EUR": "1000"
      }
    }
  }
}
```

Only add `ROBINHOOD_USERNAME`, `ROBINHOOD_PASSWORD`, and
`ROBINHOOD_ACKNOWLEDGE_UNOFFICIAL_API` to that same `env` block if you're
deliberately enabling Robinhood — read its section above first.

## Tools

| Tool | Sends an order? | Notes |
| --- | --- | --- |
| `list_brokers` | No | Configuration + live connection status. |
| `get_status` | No | Whether the session is armed. |
| `set_armed` | No | Must be called with `armed: true` before any `confirm_order`. |
| `get_account` | No | Cash / total value. |
| `get_positions` | No | Current holdings. |
| `get_quote` | No | Live price for one instrument. |
| `preview_order` | **No** | Step 1 — quote + quantity + guardrail check + `previewId`. Defaults to a market order; pass `orderType: "limit"` with `limitPrice` for a limit order. |
| `confirm_order` | **Yes** | Step 2 — the only tool that can place a real (or paper) order. |
| `cancel_order` | No | Cancels an existing order by broker order id. |
| `get_order_history` | No | Local audit log from `~/.auto-broker-mcp`. |

## Known limitations

- **Currency is not converted.** `amountEur` is treated as an amount in
  whatever currency the account actually trades in (IBKR and Robinhood
  both default to USD). Do not assume a euro amount buys exactly that many
  euros of stock on a USD account.
- **Fractional shares are not supported**; the client rounds down to whole
  units.
- **No live-market validation was performed** as part of building this —
  the client needs to be run against a real paper account by you before
  trusting it with real money.
