import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Startgeld — financieel wegwijs vanaf je eerste job",
    template: "%s — Startgeld",
  },
  description:
    "Startgeld helpt jonge starters op de Vlaamse arbeidsmarkt wegwijs te raken in loon, sparen, beleggen, verzekeringen en pensioen. Duidelijke uitleg, handige rekentools en een korte quiz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
