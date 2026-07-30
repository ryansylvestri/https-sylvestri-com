import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { TrackingClient } from "@/components/tracking-client";
import { TrackingScripts } from "@/components/tracking-scripts";
import { siteConfig } from "@/lib/site-content";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Practical Hudson Valley real estate guidance, homeowner resources, useful technology, and ideas from Ryan Sylvestri.",
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      "Practical Hudson Valley real estate guidance, homeowner resources, useful technology, and ideas.",
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [{ url: "/api/social-card?title=Ryan%20Sylvestri&category=Hudson%20Valley", width: 1200, height: 630, alt: "Ryan Sylvestri — Hudson Valley field notes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      "Practical Hudson Valley real estate guidance, homeowner resources, useful technology, and ideas.",
    images: ["/api/social-card?title=Ryan%20Sylvestri&category=Hudson%20Valley"],
  },
  category: "real estate",
  verification: {
    google: "GjvLYAWrlY96Su9DwEpMGdtapPQI8tqyu8Xcq3BZILU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        <TrackingScripts />
        <Suspense fallback={null}>
          <TrackingClient />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
