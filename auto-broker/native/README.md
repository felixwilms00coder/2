# Auto Broker (native)

A true native iOS/Android app — not a wrapped website. Built with
[Expo](https://expo.dev) + [expo-router](https://docs.expo.dev/router/introduction/),
reusing the same rule engine as the web app (`../src/lib/agent`, copied
into `lib/agent` here and adjusted for React Native — see "What's
different from the web app" below).

Scoped deliberately narrow: **Simulation (paper orders) and IBKR only.**
No Saxo, no Pilots/SEC EDGAR feature — this app exists to get one real
broker connection (IBKR) working well for personal use first, with the
option to distribute it more broadly (App Store/Play Store) once that's
solid. Fewer moving parts until IBKR itself is proven out on a real
device with a real account.

This exists alongside `../mobile/` (the Capacitor wrap of the *web* app,
which still has Saxo and Pilots — that's a different, wider-scoped
product target). This native app is native views, native navigation,
native gestures and haptics, and a Reanimated-driven motion layer.

## Preview it on your own iPhone — no Xcode required

```bash
cd native
npm install
npx expo start
```

Scan the QR code with your iPhone's camera, install the free **Expo Go**
app if prompted, and it opens live.

**If Expo Go shows an "incompatible" / "needs an update" error**: Expo Go
on the App Store only supports one SDK version at a time, and this
project may be ahead of or behind it. Build a real dev client with Xcode
instead (next section) — that sidesteps the version pin entirely.

## Opening it in Xcode

Expo apps don't check the `ios/`/`android/` native projects into git by
default (that's why they're gitignored here) — they're regenerated on
demand from `app.json` + your code.

```bash
cd native
npm install
npx expo prebuild          # generates ios/ and android/
npx expo run:ios           # builds, starts Metro, and opens the Simulator
```

If you build/run from Xcode directly instead (open
`ios/AutoBroker.xcworkspace`, not the `.xcodeproj`, then hit ▶ Run), you
still need Metro running separately or you'll hit a red "No script URL
provided" screen:
```bash
npx expo start
```
Then reload the app (`Cmd+R` in the Simulator) once Metro says
`Waiting on http://localhost:8081`. If it launches in "Expo Go" mode
instead of "development build" mode, press `s` in the Metro terminal to
switch, then reload again.

You'll need your own Apple Developer Team set under Signing &
Capabilities before Xcode will build to a device or an untrusted
simulator — for Simulator-only runs you can usually ignore signing
prompts.

Re-run `npx expo prebuild --clean` any time you want to regenerate a
clean `ios/`/`android/` after significant changes — don't hand-edit those
folders.

## What's different from the web app

- **Business logic**: `lib/agent/` is a near-identical port of
  `../src/lib/agent/` — same types, same rule engine. Changes:
  `store.ts` uses `AsyncStorage` instead of `localStorage` (async, so it
  hydrates once on mount rather than reading synchronously), and the IBKR
  adapter uses an in-memory token store (`lib/agent/memory-storage.ts`)
  instead of `sessionStorage` — the natural mobile equivalent, since
  there's no browser tab to scope a session to.
- **UI**: everything under `app/` and `components/` is new — native
  screens (`expo-router` file-based routing, iOS tab bar with SF
  Symbols), not a port of the web JSX. A spring-scale + haptic on every
  tappable surface (`components/ui/AnimatedPressable.tsx`), staggered
  entrance animations, and a native modal sheet for the rule form.
- **Fonts**: Inter + Plus Jakarta Sans via `@expo-google-fonts/*`,
  matching the web app's `next/font` choice exactly.

## Placing orders from the app: rules, including limit orders

The Agent tab's rules are how you tell the app what to place on your IBKR
account — ticker, amount, order type (**Market** or **Limit**, with a
limit price), cadence, and per-order/per-month euro guardrails. Nothing
is suggested; you fill in every field. A rule with "Send without
confirmation" off (the default) always lands in "Waiting for your
confirmation" first — you tap **Send** yourself before anything reaches a
broker. This is the same architecture as the web app's `/agent`, just
native UI.

For a limit order, `amount` is what gets spent *at the limit price* to
size the order — e.g. an amount of $1800 with an $18 limit buys 100
units. Verified end-to-end against the Simulation broker: a $1800/$18
limit rule correctly refuses if it's above your guardrails, sits pending
until confirmed, and fills at quantity 100, price 18.

## The IBKR-localhost caveat still applies

The IBKR adapter talks to `https://localhost:5000` by default, which is
the **phone itself** on a phone, not a computer running the Client Portal
Gateway. The Agent tab now has a **Gateway address** field (shown when
IBKR is the selected broker) — enter that computer's LAN address there
(e.g. `https://192.168.1.23:5000/v1/api`) and tap **Save & test
connection**. It's saved on-device (not a secret, just an address) so you
only type it once.

**One extra step this UI can't do for you**: IBKR's Client Portal Gateway
uses a self-signed certificate. A laptop browser lets you click through
that warning once; iOS's networking stack won't silently trust it for
app traffic. Until the certificate is installed as a trusted profile on
the phone (Settings → General → VPN & Device Management, after AirDroping
or otherwise transferring the gateway's cert), requests from this app to
the gateway will fail even with the right address entered. This is a
real device-trust step, not a bug in the adapter — same constraint any
app talking to a self-signed local server would hit.

**The zero-setup alternative for a phone**: connect to
[IBKR's own official Trading MCP](../docs/ibkr-agentic-trading.md)
instead (`https://api.ibkr.com/v1/api/mcp-public`) — no local gateway, no
certificate to trust, works from wherever you are. That's a connection
you make in your AI client (Claude, ChatGPT, etc.), not inside this app,
and it can only draft instructions — you still open IBKR's own app to
place anything. This app's own IBKR adapter (with the rules above) is the
one that can actually queue orders for your confirmation from inside Auto
Broker itself, once the gateway and its certificate are reachable.

## What's been verified, and what hasn't

Verified: `npx tsc --noEmit` clean, the app has been built and run for
real via Xcode on the iOS Simulator (not just this sandbox's
`expo start --web` proxy), and the rule form → guardrail → pending
confirmation → simulated fill flow (including a limit order) was driven
end-to-end through `expo start --web` with Playwright, confirming the
persisted log entry (quantity/price computed from the limit price, not a
market quote).

Not yet done: a real IBKR connection tested end-to-end from this app on
a device (including the certificate-trust step above), a physical
(non-Simulator) device run, dark mode spot-check on-device, and replacing
the default Expo app icon/splash with real Auto Broker branding
(`assets/images/` still has the scaffold's placeholder icon) — all worth
doing before any App Store submission.

## Project structure

```
app/                 expo-router screens (file-based routing)
  (tabs)/             Home, Agent — bottom tab bar
  rule-form.tsx        New-rule form, presented as a native modal sheet
components/
  ui/                 Text, Card, Callout, Field/Input, Toggle, AnimatedPressable
  agent/               SegmentedControl, StatusPill
hooks/
  useAgent.ts           Rule/log state, mirrors ../src/components/agent/use-agent.ts
  useTheme.ts            Light/dark palette resolution
lib/agent/            rule engine, schedule/guardrails, IBKR + simulation adapters
constants/theme.ts    Colors, fonts, spacing — same palette as the web app
```
