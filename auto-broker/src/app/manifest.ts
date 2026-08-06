import type { MetadataRoute } from "next";

/** Installable to a phone/desktop home screen. Saxo, the simulation broker
 * and Pilots all work fine from an installed copy; IBKR needs its Client
 * Portal Gateway on localhost, so it only works from the same machine the
 * gateway runs on, installed app or not. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Auto Broker — self-managed buy rules for your own broker",
    short_name: "Auto Broker",
    description:
      "Write your own buy rules, connect your own IBKR or Saxo account, and confirm every order yourself. No server in the order path.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#ffffff",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
