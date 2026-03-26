/**
 * Structured-data schemas (JSON-LD) injected site-wide via RootLayout.
 *
 * Google's local-pack algorithm weights LocalBusiness + RealEstateAgent
 * structured data heavily for "near me" and geo-modified queries.
 * Placing the schema in the root layout ensures every page carries the
 * signal without per-page boilerplate.
 */

import { siteConfig } from "./site-content";

/* ── Shared address block ── */
const postalAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: "584 Route 9",
  addressLocality: "Fishkill",
  addressRegion: "NY",
  postalCode: "12524",
  addressCountry: "US",
};

/* ── Geo coordinates for 584 Route 9, Fishkill NY ── */
const geo = {
  "@type": "GeoCoordinates" as const,
  latitude: 41.5285,
  longitude: -73.8921,
};

/* ── RE/MAX office as the parent organization ── */
const parentOrganization = {
  "@type": "RealEstateAgent" as const,
  name: "RE/MAX Town & Country",
  telephone: siteConfig.officePhone,
  address: postalAddress,
};

/* ── Service area: counties covered ── */
const areaServed = siteConfig.regions.map((region) => ({
  "@type": "AdministrativeArea" as const,
  name: region,
}));

/* ── Primary LocalBusiness schema (RealEstateAgent is a subtype) ── */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${siteConfig.siteUrl}/#agent`,
  name: "Ryan Sylvestri | Hudson Valley Real Estate",
  alternateName: "TheReelistRealtor",
  description:
    "Licensed Associate Real Estate Broker serving the Hudson Valley — Dutchess, Putnam, Orange, Ulster, and Sullivan counties. Buyer advocacy, seller launch strategy, investor intake, relocation guidance, and systems-driven follow-up.",
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: postalAddress,
  geo,
  areaServed,
  hasMap: "https://maps.google.com/?q=584+Route+9+Fishkill+NY+12524",
  /* Google Business Profile canonical link — reinforces GBP ↔ website entity match */
  additionalType: "https://g.page/r/CV5BYkl3vmZuEBM",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  image: `${siteConfig.siteUrl}/og-image.jpg`,
  priceRange: "$$",
  parentOrganization,
  sameAs: siteConfig.sameAs,
  knowsAbout: [
    "Hudson Valley real estate",
    "Buyer representation",
    "Seller launch strategy",
    "Home valuation",
    "Real estate investing",
    "Relocation guidance",
    "First-time home buyers",
    "Property preservation",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Buyer Representation",
        description:
          "Structured buyer planning for first-time buyers, relocations, and move-up searchers in the Hudson Valley.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Seller Launch Strategy",
        description:
          "Human valuation guidance, prep planning, pricing strategy, and listing launch for Hudson Valley homeowners.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Investor Intake",
        description:
          "Criteria-first intake for value-add, multifamily, flip, rental, and opportunistic investment opportunities.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Relocation Guidance",
        description:
          "Town-matching, commute analysis, and lifestyle-fit orientation for inbound Hudson Valley movers.",
      },
    },
  ],
};
