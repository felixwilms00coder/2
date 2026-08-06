import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app currently lives nested inside another repo (see README for why
  // — it's meant to move to its own repository). Turbopack otherwise finds
  // that repo's root package-lock.json and infers the wrong workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
