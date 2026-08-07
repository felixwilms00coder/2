# Auto Broker MCP server

A self-managed [MCP](https://modelcontextprotocol.io) server that connects
**your own** IBKR, Saxo and (experimental, unofficial) Robinhood accounts to
an MCP client such as Claude Desktop or Claude Code. It is the same
"software, not a service" architecture as the web app's own
[`/agent`](../src/app/agent) feature (see [`docs/regulatory.md`](../docs/regulatory.md)),
just reachable from an MCP client instead of a browser tab:

- **Runs on your machine only.** You start this process yourself; it is not
  hosted by Auto Broker and Auto Broker never sees it run.
- **Your own credentials only.** Every token, password or gateway session
  belongs to you, passed in via environment variables, and never stored
  anywhere but this process's memory and (for the audit log only) a local
  file under `~/.auto-broker-mcp`.
- **No server in the order path.** Requests go straight from this process to
  each broker's own API. There is nothing multi-tenant here — if you want
  someone else to use this, they run their own copy with their own
  credentials, they don't connect to yours.

**This is not a broker, an investment adviser, or a portfolio manager.** It
is software you run yourself against your own accounts, the same legal
position as writing your own script against a broker's API. See
[`docs/regulatory.md`](../docs/regulatory.md) for why that
distinction matters under EU financial regulation (MiFID II) and
where the line would move if this were ever turned into a hosted,
multi-user, or fully-discretionary service — none of which this ships.

## Safety model

1. **`preview_order` never sends anything.** It fetches a live quote,
   computes the resulting quantity, checks your euro guardrails, and returns
   a `previewId` that expires in 5 minutes.
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
   (default 1000, tracked per broker against the local audit log).
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

Then configure only the brokers you actually want. All configuration is via
environment variables — either a local `.env` you load yourself
(`node --env-file=.env dist/index.js`), or (recommended) the `env` block of
this server's entry in your MCP client's config, so credentials never touch
a file inside this repo at all. See [`.env.example`](.env.example) for the
full list.

### Interactive Brokers (Client Portal API) — officially supported

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

### Saxo Bank (OpenAPI) — officially supported, adapter unverified live

1. Register your own app at [developer.saxo](https://www.developer.saxo) and
   obtain an access token for **Saxo's SIM (simulation) environment** —
   leave `SAXO_MODE=sim` (the default).
2. Set `SAXO_TOKEN` to that token.
3. ⚠️ Exactly like the browser adapter this is ported from
   (`src/lib/agent/brokers/saxo.ts`), **this has never been run against
   Saxo's live API in this project.** Validate thoroughly against SIM before
   ever setting `SAXO_MODE=live`, and re-check the request/response shapes
   against Saxo's current reference docs first — OpenAPI details do change.
4. Saxo identifies instruments by a numeric `Uic`, not a ticker — look it up
   in your Saxo account and pass it as `instrumentId` to `get_quote` /
   `preview_order`.

### Robinhood — UNOFFICIAL, EXPERIMENTAL, read this before using it

**Robinhood now has an official path — use that instead.** Robinhood hosts
its own Agentic Trading MCP server
(`https://agent.robinhood.com/mcp/trading`); you connect your AI agent to
it directly, sanctioned by the broker, with no unofficial API involved. See
[`docs/robinhood-agentic-trading.md`](../docs/robinhood-agentic-trading.md).
Everything below describes this repo's own unofficial adapter, which
predates that and should now be considered superseded for Robinhood
accounts.

Robinhood has never published a public trading API for third-party
developers, in the US, EU or UK. This integration talks to the same private
endpoints the Robinhood app uses, reverse-engineered by the open-source
community. Concretely, that means:

- **It violates Robinhood's Terms of Service.** Unlike IBKR and Saxo, there
  is no legitimate integration path here.
- **It can break at any time**, without notice, whenever Robinhood changes
  its app — there is no versioned contract to rely on.
- **It risks the account it's connected to.** Automated access from an
  unrecognised client is exactly the pattern brokerages' fraud/abuse systems
  flag; accounts have been restricted or closed for this.
- **There is no paper/simulation mode.** Every order placed through this
  client is real.

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

### DEGIRO — not supported

DEGIRO has no public API for third-party integrations. This was deliberately
left out rather than built against DEGIRO's private app API. Revisit if
DEGIRO ever ships an official one.

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
        "SAXO_MODE": "sim",
        "SAXO_TOKEN": "...",
        "AUTOBROKER_MAX_PER_ORDER_EUR": "250",
        "AUTOBROKER_MAX_PER_MONTH_EUR": "1000"
      }
    }
  }
}
```

Only include the env vars for brokers you actually use.

## Tools

| Tool | Sends an order? | Notes |
| --- | --- | --- |
| `list_brokers` | No | Configuration + live connection status for all three. |
| `get_status` | No | Whether the session is armed. |
| `set_armed` | No | Must be called with `armed: true` before any `confirm_order`. |
| `get_account` | No | Cash / total value for one broker. |
| `get_positions` | No | Current holdings for one broker. |
| `get_quote` | No | Live price for one instrument. |
| `preview_order` | **No** | Step 1 — quote + quantity + guardrail check + `previewId`. |
| `confirm_order` | **Yes** | Step 2 — the only tool that can place a real (or paper/sim) order. |
| `cancel_order` | No | Cancels an existing order by broker order id. |
| `get_order_history` | No | Local audit log from `~/.auto-broker-mcp`. |

## Known limitations

- **Currency is not converted.** `amountEur` is treated as an amount in
  whatever currency the broker/account actually trades in (e.g. IBKR and
  Robinhood default to USD) — same simplification the existing web `/agent`
  makes for Saxo. Do not assume a euro amount buys exactly that many euros
  of stock on a USD account.
- **Fractional shares are not supported**; every broker here rounds down to
  whole units.
- **No live-market validation was performed** for the Saxo and IBKR clients
  as part of building this — both need to be run against their sim/paper
  environments by you before trusting them with real money.
