import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { JsonLd } from "@/components/json-ld";
import { TrackingClient } from "@/components/tracking-client";
import { TrackingScripts } from "@/components/tracking-scripts";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { personalMedia } from "@/lib/personal-brand-content";
import { localBusinessSchema } from "@/lib/schema";
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
    "Ryan Sylvestri's personal brand hub for Hudson Valley real estate, systems thinking, applied AI, and clearer routing for buyers, sellers, investors, renters, and complex homeowner situations.",
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      "Hudson Valley real estate guidance, personal-brand trust, applied systems thinking, and clearer routing into the right next step.",
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: getCloudinaryAssetUrl(personalMedia.sign, {
          crop: "fill",
          gravity: "auto",
          width: 1200,
          height: 630,
          format: "jpg",
        }),
        width: 1200,
        height: 630,
        alt: "Ryan Sylvestri serving the Hudson Valley.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      "Hudson Valley real estate guidance, home values, relocation support, applied AI, and cleaner local lead routing.",
    images: [
      getCloudinaryAssetUrl(personalMedia.sign, {
        crop: "fill",
        gravity: "auto",
        width: 1200,
        height: 630,
        format: "jpg",
      }),
    ],
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
        <JsonLd data={localBusinessSchema} />
        {children}
      </body>
    </html>
  );
}
