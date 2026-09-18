export interface Role {
  company: string;
  title: string;
  /** Display range, e.g. "2024 — Present". */
  period: string;
  /** How long it has run, e.g. "2 yrs". */
  duration: string;
  location: string;
  /** One paragraph of context for anyone who doesn't know the product. */
  blurb: string;
  /** What the day-to-day actually consists of. */
  focus: string[];
  stack: string[];
}

export const currentRole: Role = {
  company: "Munch",
  title: "Frontend Developer",
  period: "2024 — Present",
  duration: "2 yrs",
  location: "South Africa",
  blurb:
    "Munch is a restaurant management and online ordering platform. I work across three surfaces: the customer-facing ordering app, the franchise back office that restaurant staff and franchisees run their day from, and the shared component library both of them sit on.",
  focus: [
    "Shared component library — owning components end to end, from API design through accessibility to release",
    "Franchise back office — store configuration, stock, delivery zones, reporting",
    "Customer ordering — checkout serviceability, React Server Components state",
    "Testing — Storybook at the component level, Playwright for the journeys that carry money",
  ],
  stack: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "TanStack Query",
    "Storybook",
    "Playwright",
  ],
};
