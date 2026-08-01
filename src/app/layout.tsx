import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WebsiteJsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const title = "FinEdu — financieel wegwijs vanaf je eerste job";
const description =
  "FinEdu helpt jonge starters op de Vlaamse arbeidsmarkt wegwijs te raken in budget, sparen, beleggen, verzekeringen, wonen, pensioen en belastingen. Duidelijke uitleg, handige rekentools en een korte quiz.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s — FinEdu",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: "FinEdu",
    title,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <WebsiteJsonLd />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
