import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const aiCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "PerplexityBot",
  "CCBot",
  "anthropic-ai",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/nieuwsbrief/*"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/*", "/nieuwsbrief/*"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
