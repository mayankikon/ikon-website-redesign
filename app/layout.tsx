import type { Metadata } from "next";
import { IconSprite } from "@/components/IconSprite";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ikon Technologies: GPS, Telematics & AI for Dealerships",
    template: "%s | Ikon Technologies",
  },
  description:
    "Ikon Technologies connects your lot, F&I office and service drive on one telematics program: lot management, theft recovery, connected car and service retention marketing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <IconSprite />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
