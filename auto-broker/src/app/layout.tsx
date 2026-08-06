import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

const title = "Auto Broker — self-managed buy rules for your own broker";
const description =
  "Write your own buy rules, connect your own IBKR or Saxo account, and confirm every order yourself. Software you run, not a broker, adviser or portfolio manager.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Auto Broker",
  },
  description,
  appleWebApp: {
    capable: true,
    title: "Auto Broker",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#hoofdinhoud" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="hoofdinhoud" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
