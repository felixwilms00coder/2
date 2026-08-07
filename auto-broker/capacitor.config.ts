import type { CapacitorConfig } from "@capacitor/cli";

// Points at the static export in out/ (see next.config.ts / mobile/README.md).
// Run `npm run cap:sync` after any change here or in the app itself — that
// rebuilds out/ and copies it into the native ios/ and android/ projects.
const config: CapacitorConfig = {
  appId: "com.autobroker.app",
  appName: "Auto Broker",
  webDir: "out",
};

export default config;
