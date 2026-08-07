import path from "node:path";
import type { NextConfig } from "next";

// The normal web build stays a live Next.js server (fresh SEC EDGAR data on
// every /pilots request). The Capacitor build (`npm run build:capacitor`)
// needs a fully static bundle instead — no server to wrap in a native shell
// — so it sets CAPACITOR_BUILD=1 to opt into `output: "export"`. See
// mobile/README.md for what that trades away (Pilot data freezes at
// whenever the mobile build last ran) and why.
const forCapacitor = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  ...(forCapacitor ? { output: "export" as const } : {}),
  // This app currently lives nested inside another repo (see README for why
  // — it's meant to move to its own repository). Turbopack otherwise finds
  // that repo's root package-lock.json and infers the wrong workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
