# Auto Broker (native)

A true native iOS/Android app — not a wrapped website. Built with
[Expo](https://expo.dev) + [expo-router](https://docs.expo.dev/router/introduction/),
reusing the same rule engine, broker adapters and Pilots/SEC EDGAR logic as
the web app (`../src/lib`, copied into `lib/` here and adjusted for React
Native — see "What's different from the web app" below).

This exists alongside `../mobile/` (the Capacitor wrap of the *web* app).
That one is a website in a native shell; this one is native views, native
navigation, native gestures and haptics, and a Reanimated-driven motion
layer — noticeably more polished, at the cost of being a second UI to
maintain in parallel with the web app rather than one build target.

## Preview it on your own iPhone — no Xcode required

```bash
cd native
npm install
npx expo start
```

Scan the QR code with your iPhone's camera, install the free **Expo Go**
app if prompted, and it opens live. Edits you make and save show up on the
phone in seconds. This is the fastest way to actually see it running —
no Mac, no Xcode, no Apple Developer account needed for this step.

## Opening it in Xcode

Expo apps don't check the `ios/`/`android/` native projects into git by
default (that's why they're gitignored here) — they're regenerated on
demand from `app.json` + your code, which is less to keep in sync than
committing them. To generate them and open Xcode:

```bash
cd native
npm install
npx expo prebuild          # generates ios/ and android/
npx expo run:ios           # builds and opens the iOS Simulator (macOS only)
```

Or, to open the generated project directly in Xcode instead of using the
CLI: after `npx expo prebuild`, open `ios/AutoBroker.xcworkspace` (not the
`.xcodeproj`) in Xcode. You'll need to set your own Apple Developer Team
under Signing & Capabilities before it'll build to a real device or
simulator you haven't already trusted.

Re-run `npx expo prebuild --clean` any time you want to regenerate a clean
`ios/`/`android/` after significant changes — don't hand-edit those
folders, since prebuild will overwrite them.

## What's different from the web app

- **Business logic**: `lib/pilots/` and `lib/agent/` are near-identical
  ports of `../src/lib/pilots/` and `../src/lib/agent/` — same types, same
  rule engine, same SEC EDGAR client. The main changes: `store.ts` uses
  `AsyncStorage` instead of `localStorage` (async, so it hydrates once on
  mount rather than reading synchronously), and the Saxo/IBKR broker
  adapters use an in-memory token store (`lib/agent/memory-storage.ts`)
  instead of `sessionStorage` — the natural mobile equivalent, since
  there's no browser tab to scope a session to.
- **UI**: everything under `app/` and `components/` is new — native
  screens (`expo-router` file-based routing, iOS tab bar with SF Symbols),
  not a port of the web JSX. `components/ValueChart.tsx` and
  `components/PositionChanges.tsx` are React Native rebuilds of the web
  versions with real interaction: a pan-gesture crosshair scrub with
  haptic ticks on the chart, a spring-scale + haptic on every tappable
  surface (`components/ui/AnimatedPressable.tsx`), staggered entrance
  animations, and a native modal sheet for the rule form.
- **Fonts**: Inter + Plus Jakarta Sans via `@expo-google-fonts/*`, matching
  the web app's `next/font` choice exactly.

## The IBKR-localhost caveat still applies

Same as `../mobile/README.md`: the IBKR adapter talks to
`https://localhost:5000`, which is the phone itself on a phone, not a
computer running the Client Portal Gateway. Point
`ibkrStoreGatewayUrl()` (in `lib/agent/brokers/ibkr.ts`) at that computer's
LAN/VPN address if you want IBKR to work from this app — untested from an
actual device in this project so far.

## What's been verified, and what hasn't

Verified in this sandbox (no physical device or Xcode available here):
`npx tsc --noEmit` clean, and the app running correctly under
`npx expo start --web` (real Playwright screenshots of Home, Agent, Pilots
list, and a Pilot detail page with mock filing data — chart draw-in,
crosshair scrub with live value readout, position-changes grouping, all
confirmed rendering and interactive). `react-native-web` is not a perfect
stand-in for the real native renderer, so treat this as strong evidence
the logic and layout are right, not as proof of final native polish —
test on a real device via Expo Go before trusting it further.

Not yet done: a real device run, real SEC EDGAR fetches from a phone
(blocked in this sandbox's network policy the same way it was for the web
app), a real IBKR/Saxo connection, dark mode spot-check on-device, and
replacing the default Expo app icon/splash with real Auto Broker branding
(`assets/images/` still has the scaffold's placeholder icon).

## Project structure

```
app/                 expo-router screens (file-based routing)
  (tabs)/             Home, Agent, Pilots — bottom tab bar
  pilots/[slug].tsx    Pilot detail (pushed, outside the tab bar)
  rule-form.tsx        New-rule form, presented as a native modal sheet
components/
  ui/                 Text, Card, Callout, Field/Input, Toggle, AnimatedPressable
  agent/               SegmentedControl, StatusPill
  ValueChart.tsx        Animated SVG chart with gesture-driven crosshair
  PositionChanges.tsx    Grouped New/Increased/Closed/Decreased/Unchanged list
hooks/
  useAgent.ts           Rule/log state, mirrors ../src/components/agent/use-agent.ts
  useTheme.ts            Light/dark palette resolution
lib/                  agent + pilots business logic (see above)
constants/theme.ts    Colors, fonts, spacing — same palette as the web app
```
