import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // This repo's separate MCP server package, built with its own tsc.
    "mcp/**",
    // Capacitor native projects: generated/vendored code, not app source.
    "ios/**",
    "android/**",
    // Separate Expo app, its own package.json/tsconfig/eslint scope.
    "native/**",
  ]),
]);

export default eslintConfig;
