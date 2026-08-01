// Set NEXT_PUBLIC_SITE_URL in your deployment environment to the real
// production domain once one exists — canonical URLs, sitemap, robots.txt
// and structured data all derive from this.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
