import type { MetadataRoute } from "next";

/** Makes FinEdu installable to a phone's home screen (PWA). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FinEdu — financieel wegwijs vanaf je eerste job",
    short_name: "FinEdu",
    description:
      "Budget, sparen, beleggen, wonen, pensioen en belastingen uitgelegd voor starters op de Vlaamse arbeidsmarkt.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "nl-BE",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
