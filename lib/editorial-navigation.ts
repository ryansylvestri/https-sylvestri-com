export type NavigationLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavigationItem =
  | NavigationLink
  | {
      label: string;
      items: readonly NavigationLink[];
    };

export const editorialNavigation = [
  {
    label: "Real Estate",
    items: [
      { label: "Buy", href: "/buyers", description: "Plan a purchase with fewer surprises." },
      { label: "Sell", href: "/sellers", description: "Prepare, price, and launch thoughtfully." },
      { label: "Invest", href: "/investors", description: "Evaluate property decisions clearly." },
      { label: "Rent & Relocate", href: "/renters", description: "Make a move with local context." },
      { label: "Hudson Valley Markets", href: "/markets", description: "Start with the region, then narrow the search." },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Buyer Guides", href: "/guides#buyer-guides" },
      { label: "Seller Guides", href: "/guides#seller-guides" },
      { label: "Homeownership", href: "/guides#homeownership" },
      { label: "Property Maintenance", href: "/guides#property-maintenance" },
      { label: "Market Updates", href: "/guides#market-updates" },
    ],
  },
  {
    label: "AI & Ideas",
    items: [
      { label: "AI News", href: "/ai#ai-news" },
      { label: "Tools & Tutorials", href: "/ai#tools-tutorials" },
      { label: "Experiments & Builds", href: "/ai#experiments-builds" },
      { label: "Useful Ideas", href: "/ai#useful-ideas" },
    ],
  },
  { label: "Stories", href: "/articles" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
] as const satisfies readonly NavigationItem[];

export function isNavigationGroup(
  item: NavigationItem,
): item is Extract<NavigationItem, { items: readonly NavigationLink[] }> {
  return "items" in item;
}

export const footerNavigation = {
  Explore: [
    { label: "Real Estate", href: "/buyers" },
    { label: "Guides", href: "/guides" },
    { label: "AI & Ideas", href: "/ai" },
    { label: "Stories", href: "/articles" },
    { label: "Videos", href: "/videos" },
  ],
  About: [
    { label: "About Ryan", href: "/about" },
    { label: "Contact Ryan", href: "/intake" },
    { label: "Resources", href: "/resources" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacypolicy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
} as const;
