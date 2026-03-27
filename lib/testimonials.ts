export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  scenario: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "D. and M. Rivera",
    location: "Beacon, NY",
    scenario: "First-time buyers",
    quote:
      "Ryan made the process legible. We stopped chasing random listings and bought the right house with a clean strategy.",
  },
  {
    name: "A. Patel",
    location: "Fishkill, NY",
    scenario: "Home sale + relocation",
    quote:
      "We needed timing certainty more than hype. Ryan mapped prep, pricing, and move logistics in one plan and delivered.",
  },
  {
    name: "K. Johnson",
    location: "Poughkeepsie, NY",
    scenario: "Probate property",
    quote:
      "The communication was calm, direct, and respectful. We got clarity on options first and never felt pushed.",
  },
  {
    name: "S. Chen",
    location: "Wappingers Falls, NY",
    scenario: "Investor criteria search",
    quote:
      "Ryan filtered out bad-fit inventory quickly. The intake and follow-up discipline saved weeks of dead-end tours.",
  },
  {
    name: "L. Morales",
    location: "Cold Spring, NY",
    scenario: "Downsizing sale",
    quote:
      "What stood out was the net-proceeds focus and realistic planning. Every decision had a reason behind it.",
  },
];
