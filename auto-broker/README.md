# Auto Broker

Self-managed broker automation: write your own buy rules, connect your own
IBKR or Saxo account, and confirm every order yourself. Auto Broker is
software you run — not a broker, an investment adviser, or a portfolio
manager. See [`docs/regulatory.md`](docs/regulatory.md) for the reasoning
behind that distinction, and where it stops holding.

## What's in here

- **Agent (`/agent`)** — set up your own automatic buy rules (instrument,
  amount, cadence, per-order and per-month caps) and run them against a
  broker of your choosing. Ships with a fully working paper-trading broker;
  the Saxo OpenAPI adapter and the IBKR Client Portal adapter are both
  present but **have never been tested against a live account**. Rules, log
  and tokens stay on your device — there is no Auto Broker server in the
  order path.
- **Pilots (`/pilots`)** — read-only display of the US equity positions
  well-known investors are legally required to disclose (SEC Form 13F),
  fetched live from SEC EDGAR. No brokerage connection, no execution, no
  ranking of "best" investors. A "Start rule" link on each holding
  pre-fills only a rule *name* in `/agent` — you still pick and confirm the
  actual instrument yourself.
- **Broker MCP server (`mcp/`)** — the same self-managed idea, reachable
  from an MCP client (Claude Desktop, Claude Code) instead of a browser
  tab. Runs locally against your own IBKR (Client Portal API) and Saxo
  (OpenAPI) accounts, with a mandatory preview-then-confirm step before
  anything is sent, hard guardrails, and a disarmed-by-default master
  switch. See [`mcp/README.md`](mcp/README.md). DEGIRO has no public API
  and is not supported.
- **Robinhood** — Robinhood now runs its own official Agentic Trading MCP
  server (`https://agent.robinhood.com/mcp/trading`); connect your AI
  agent to it directly rather than using this repo's unofficial adapter.
  See [`docs/robinhood-agentic-trading.md`](docs/robinhood-agentic-trading.md).
- **Interactive Brokers** — IBKR also runs its own official Trading MCP
  server (`https://api.ibkr.com/v1/api/mcp-public`) against your existing
  account, no local gateway required. Its agent can only draft trade
  *instructions* — turning one into a real order requires opening IBKR's
  own app and confirming it there, a stronger gate than this repo's own
  preview/confirm flow. See
  [`docs/ibkr-agentic-trading.md`](docs/ibkr-agentic-trading.md).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons
- `mcp/` is a separate Node/TypeScript package (its own `package.json`,
  built with `tsc`) implementing an [MCP](https://modelcontextprotocol.io)
  server

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `/pilots` optionally
uses `SEC_EDGAR_CONTACT_EMAIL` — see [`.env.example`](.env.example).

```bash
npm run build   # production build
npm run lint    # eslint
```

For the MCP server, see [`mcp/README.md`](mcp/README.md) — it has its own
`package.json`, dependencies, and setup steps.

## Installing as an app (PWA)

Auto Broker is installable to a phone or desktop home screen
(`src/app/manifest.ts`, `src/app/apple-icon.tsx`, `src/app/icon-192/`,
`src/app/icon-512/`). `/agent` and `/pilots` both work from an installed
copy — Saxo, the simulation broker, and Pilots are all plain HTTPS calls —
except the IBKR adapter, which needs its Client Portal Gateway on
`localhost` and so only works from the same machine the gateway runs on,
installed app or not.

## Two different mobile builds

- **`native/` — a real native app (recommended).** Built with
  [Expo](https://expo.dev), not a wrapped website: native navigation,
  gestures, haptics, and Reanimated-driven motion, reusing the same rule
  engine and Pilots logic as the web app. Preview it on your own iPhone in
  under a minute via the free Expo Go app — no Xcode required for that
  step. See [`native/README.md`](native/README.md).
- **`mobile/` / `ios/` / `android/` — a Capacitor wrap of this web app.**
  Simpler (it's the website above in a native shell), and still useful if
  you'd rather maintain one UI. See [`mobile/README.md`](mobile/README.md).

Both hit the same IBKR-localhost caveat: `localhost` means the phone
itself on a phone, not the computer running your Client Portal Gateway.

## Project structure

```
src/
  app/                 routes: home, agent, pilots, PWA manifest/icons
  components/
    agent/             rule form, dashboard, state hook
    ui.tsx             shared UI primitives
  lib/
    agent/             rule engine, schedule/guardrails, broker adapters
    pilots/            curated pilot list, SEC EDGAR client
mcp/                   separate MCP server package (own README)
docs/
  regulatory.md        the legal reasoning behind the architecture
ios/, android/         Capacitor native app projects (see mobile/README.md)
mobile/                Capacitor mobile build/submission docs
native/                real native app (Expo), own README
```

## Extending

- **Add a broker adapter**: implement the `BrokerAdapter` interface
  (`src/lib/agent/types.ts`) in `src/lib/agent/brokers/`, then add it to the
  `brokers` array in `src/components/agent/use-agent.ts`. Mirror it in
  `mcp/src/brokers/` if it should also be reachable via MCP.
- **Add a Pilot**: append to `src/lib/pilots/pilots.ts` with a verified SEC
  CIK (don't guess — look it up on SEC EDGAR first).

## Disclaimer

Auto Broker provides software, not financial advice. It does not judge
whether an instrument fits you, whether you have enough of a buffer, or
whether the timing is right — that stays your own judgement, or that of a
licensed adviser if you need one. Read `docs/regulatory.md` before
connecting a real account.
