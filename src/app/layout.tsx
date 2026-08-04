import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WebsiteJsonLd } from "@/components/json-ld";
import { ProgressProvider } from "@/components/progress-provider";
import { SITE_URL } from "@/lib/site";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

/** Editorial serif for the big display headlines (hero, section titles). */
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

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
    <html
      lang="nl-BE"
      className={`${body.variable} ${heading.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <WebsiteJsonLd />
        <ProgressProvider>
          <a href="#hoofdinhoud" className="skip-link">
            Naar de hoofdinhoud
          </a>
          <SiteHeader />
          <main id="hoofdinhoud" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  );
}
