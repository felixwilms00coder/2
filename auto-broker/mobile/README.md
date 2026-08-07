# Mobile app (Capacitor)

Auto Broker's web app is wrapped with [Capacitor](https://capacitorjs.com) so
it can be built into a real iOS and Android app. This documents what's
already done in this repo, what still requires your own machine and
accounts, and one architectural change mobile forces on the IBKR adapter.

## What's done here

- `next.config.ts` has a `CAPACITOR_BUILD=1` mode that switches Next.js to
  `output: "export"` — a fully static bundle in `out/`, since there's no
  server to wrap in a native shell on a phone.
- `/agent`'s optional `?ruleName=` prefill (used by the "Start rule" link on
  `/pilots`) was moved from the server-side `searchParams` prop to
  client-side `useSearchParams()` (`src/components/agent/agent-dashboard-with-params.tsx`),
  because static export has no server left to read a request from.
- `/pilots/[slug]` got `generateStaticParams()` + `dynamicParams = false`,
  so each pilot page is pre-rendered at build time instead of on request.
- `capacitor.config.ts` points Capacitor at `out/` with app ID
  `com.autobroker.app` and app name "Auto Broker".
- `ios/` and `ios/App.xcodeproj` and `android/` are scaffolded native
  projects (`npx cap add ios` / `npx cap add android`), committed to this
  repo. Both already carry the right app name, bundle ID/package name, and
  a default Capacitor icon and splash screen (see "Still to do" below).
- `npm run build:capacitor` (static export) and `npm run cap:sync` (export
  + copy into both native projects) both run clean.

## Trade-off: Pilots data goes static

The live web app fetches SEC EDGAR fresh on every `/pilots` request. A
static export can't do that — `fetchPilotHistory()` runs once, at
`next build` time, and whatever it returns gets baked into the shipped app.
That means the mobile app's Pilots data is only as fresh as the last time
you ran `npm run cap:sync`. Rebuild and resubmit periodically if you want
this to stay current, or don't ship `/pilots` in the mobile build at all —
both are reasonable calls, but they're yours to make, not something this
scaffold decides for you.

## The IBKR adapter does not work as-is on mobile

The IBKR broker adapter in `/agent` talks to the **Interactive Brokers
Client Portal Gateway**, a Java process you run yourself and that listens
on `https://localhost:5000`. That works in a desktop browser because the
gateway and the browser are the same machine. On a phone, "localhost" is
the phone itself — there is no gateway to reach unless you separately run
one on a computer and either:

- point the app at that computer's LAN/VPN address instead of `localhost`
  (works only on the same network, and IBKR's gateway serves a self-signed
  cert, which mobile WebViews are stricter about than desktop browsers), or
- don't offer IBKR in the mobile build and keep it web-only, letting Saxo
  (a real hosted OpenAPI) and the simulation broker cover mobile instead.

This repo does not attempt either fix — it ships the adapter as-is, which
means it will simply fail to connect from a phone. Decide which path you
want before submitting to a store; changing the connection URL is a config
change in `src/lib/agent/brokers/ibkr.ts`, not a rebuild of the feature.

## Still to do (needs your own machine and accounts)

Nothing past this point can be done from this sandbox — it has no Xcode,
no Android Studio/emulator with GUI, and no Apple/Google developer
credentials, and app store accounts must be yours, not this session's.

**iOS**
1. On a Mac, install Xcode, then `npx cap open ios` (or open
   `ios/App/App.xcodeproj` directly).
2. Set your own Apple Developer Team under Signing & Capabilities.
3. Replace the placeholder app icon and launch screen (Capacitor's default
   is a generic blue icon) — `npx cap open ios` and follow Capacitor's
   [iOS asset guide](https://capacitorjs.com/docs/guides/splash-screens-and-icons),
   or use `@capacitor/assets` to generate the full icon/splash set from a
   single source image.
4. Test on a real device before submitting — the simulator won't catch
   everything (camera-less devices, real network conditions, WebView
   quirks).
5. Submit through App Store Connect with your own Apple Developer account
   ($99/year). Expect Apple's review to ask what the app actually does;
   `docs/regulatory.md` in the repo root is the accurate answer — this is
   not a broker, adviser, or portfolio manager, it's a tool that talks to
   brokers you already have accounts with.

**Android**
1. Install Android Studio, then `npx cap open android` (or open the
   `android/` folder directly).
2. Replace the placeholder icon/splash the same way as iOS (Android asset
   guide is linked from the same Capacitor docs page).
3. Generate a signing key and build a signed release AAB
   (`Build > Generate Signed Bundle`), or configure Gradle signing config
   for CI use.
4. Test on a real device.
5. Submit through the Google Play Console with your own developer account
   ($25 one-time). Google's review process is generally faster than
   Apple's but has similar "what does this app do with money" scrutiny —
   same honest answer applies.

**Both platforms**
- Decide on the IBKR question above before submitting.
- Decide on the Pilots-data-freshness question above.
- `SEC_EDGAR_CONTACT_EMAIL` (see `.env.example`) needs to be set at
  `npm run cap:sync` time if you want polite, identified SEC EDGAR
  requests baked into the Pilots build — same as the web app.
- Re-run `npm run cap:sync` (not just `npm run build:capacitor`) any time
  you change the app and want that reflected in the native projects —
  building alone doesn't copy `out/` into `ios/`/`android/`.

## Commands reference

```bash
npm run build:capacitor   # static export to out/
npm run cap:sync          # build:capacitor, then copy into ios/ and android/
npx cap open ios          # open the Xcode project (macOS only)
npx cap open android      # open the Android Studio project
```
