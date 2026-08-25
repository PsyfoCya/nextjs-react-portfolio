export interface CaseStudySection {
  heading: string;
  /** Prose paragraphs, rendered in order before any list. */
  body?: string[];
  /** Unordered bullet list. */
  bullets?: string[];
  /** Ordered list, used where sequence is the point. */
  steps?: string[];
  /** Prose rendered after the list. */
  footnote?: string;
}

export interface CaseStudy {
  slug: string;
  /** Index-card ordering. Lower comes first. */
  order: number;
  title: string;
  /** One line that carries the whole case study. Used on the index card. */
  tagline: string;
  /** Two or three sentences of context for the index card. */
  summary: string;
  /** What I was actually responsible for. */
  role: string;
  period: string;
  /** Shown as chips on the card and the detail page. */
  stack: string[];
  /** The three headline case studies get the large cards. */
  featured: boolean;
  sections: CaseStudySection[];
  /** Closing line — what shipped and what changed because of it. */
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "date-range-picker",
    order: 1,
    title: "Date Range Picker",
    tagline: "A calendar component that turned out to be a product.",
    summary:
      "Every report on the platform needed date selection, and nothing off the shelf fit. This was the first component I owned end to end — range selection, time on both ends, correct in South African time regardless of the browser, usable on a phone, navigable by keyboard.",
    role: "Sole owner — design, implementation, accessibility, shared-library release",
    period: "Shared component library",
    stack: ["React", "TypeScript", "date-fns-tz", "Tailwind CSS", "Storybook"],
    featured: true,
    sections: [
      {
        heading: "The problem",
        body: [
          "Reporting across the platform needed date selection — and nothing off the shelf fit. The requirement wasn't “pick a day.” It was: pick a range, pick a time on each end, do it correctly in South African time regardless of where the browser thinks it is, work on a phone, and stay keyboard-navigable.",
          "This was the first component I owned end to end. It had to be right, because every report in the system would depend on it.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Dual-calendar range selection with hover preview, so the range you're about to select is visible before you commit to it.",
          "Time selection on both ends of the range, with previously chosen times preserved when the date changes — a small detail that removes a genuinely annoying re-entry step.",
          "Quick-select presets (Today, Yesterday, Last 7 Days, Last 30 Days) for the 90% case, with the full calendar there for the rest.",
          "Month and year dropdowns, so navigating back a year isn't twelve clicks.",
          "Explicit timezone handling via date-fns-tz — dates are pinned to Africa/Johannesburg rather than inherited from the browser, so a franchisee's report reads the same whether they open it in Pretoria or on holiday abroad.",
          "A responsive layout that collapses to a single calendar with a mobile-appropriate quick-select on small screens.",
          "An accessibility pass on ARIA roles and keyboard navigation after an initial review flagged gaps.",
        ],
      },
      {
        heading: "What was hard",
        body: [
          "Timezones. The naive approach — manually calculating offsets — falls apart at DST boundaries and when the browser's local time disagrees with the business's time. The working solution was to stop fighting JavaScript's Date object: read the date components in the target timezone, apply the change there, and convert back to UTC through date-fns-tz rather than doing arithmetic by hand.",
          "The other hard part was architectural. It's tempting to build a date picker as one component. It isn't one — it's a controlled input, a calendar, a time select, a month/year navigator, and a quick-select panel, all sharing state. Splitting it into sub-components with a single source of truth is what made it maintainable.",
        ],
      },
    ],
    outcome:
      "Shipped as a shared library component and used across reporting and admin surfaces. Supports both single-date and range modes from the same API.",
  },
  {
    slug: "delivery-service-areas",
    order: 2,
    title: "Delivery Service Areas from Google Earth",
    tagline:
      "Letting franchisees draw their own delivery zones instead of describing them to a developer.",
    summary:
      "Delivery boundaries are real-world shapes — they follow highways, avoid the river, stop at the township edge. A KML import and export pipeline moved defining them out of engineering and into the hands of the people who actually know where the lines fall.",
    role: "Feature owner — import/export pipeline, landmarks, serviceability checks",
    period: "Franchise back office",
    stack: ["React", "TypeScript", "Next.js", "KML / geospatial", "TanStack Query"],
    featured: true,
    sections: [
      {
        heading: "The problem",
        body: [
          "Every restaurant location has a delivery area — the geographic boundary it will and won't deliver to. Those boundaries are real-world shapes: they follow highways, avoid the river, stop at the township edge. A radius doesn't describe them. Neither does a list of suburbs.",
          "The people who actually know where those lines fall are the franchisees. But they aren't engineers, and there was no way to get that knowledge into the system without a developer in the middle.",
        ],
      },
      {
        heading: "What I built",
        body: ["A KML import and export pipeline for service areas. The workflow:"],
        steps: [
          "Franchisee opens Google Earth — a tool they already know, or can learn in ten minutes.",
          "Draws their delivery boundary as a polygon.",
          "Exports it as a KML file.",
          "Uploads it to the back office.",
          "The system parses the geometry and turns it into a live service area used for serviceability checks at checkout.",
        ],
        footnote:
          "Export works in reverse, so an existing zone can be pulled back into Google Earth, adjusted, and re-uploaded. I also built landmarks — named point locations that sit inside a service area to handle exceptions. A park, a stadium, an office block with no street address. Places customers genuinely order to that a polygon-and-street-address model can't express on its own.",
      },
      {
        heading: "Why it mattered",
        body: [
          "It moved boundary definition from engineering to operations. A franchisee expanding into a new suburb no longer files a ticket and waits — they redraw and re-upload. That's a whole class of support work that stopped existing.",
        ],
      },
      {
        heading: "Related work",
        body: [
          "I also worked on the serviceability checks these zones feed into — including a bug where switching from delivery to collection at checkout with an out-of-area address silently failed to warn the customer, because the overlap check only ran for delivery. Collection needed the same guard.",
        ],
      },
    ],
    outcome:
      "Franchisees define and adjust their own delivery boundaries without a developer in the loop, and checkout enforces those boundaries for both delivery and collection.",
  },
  {
    slug: "svg-icon-system",
    order: 3,
    title: "SVG Icon System",
    tagline: "A design system problem disguised as an icon problem.",
    summary:
      "Icons arrived from Figma with inconsistent artboards, viewBoxes, and hardcoded fills, and were hand-corrected per icon. The fix wasn't a better icon — it was a contract between design output and application code.",
    role: "Owner of the shared SVG primitive and the icon conventions around it",
    period: "Shared component library",
    stack: ["React", "TypeScript", "SVG", "Tailwind CSS", "Storybook"],
    featured: true,
    sections: [
      {
        heading: "The problem",
        body: [
          "Icons came out of Figma inconsistent. Different artboard sizes, different viewBox values, hardcoded fills. Dropping two icons next to each other in the UI produced two visibly different sizes, in two different colours, and fixing it meant hand-editing SVG markup per icon — which meant it drifted again the next time design shipped a batch.",
          "The real problem wasn't any single icon. It was that there was no contract between design output and application code.",
        ],
      },
      {
        heading: "What I built",
        body: ["A shared SVG wrapper component that establishes that contract:"],
        bullets: [
          "Standardises the viewBox to a 24×24 grid, with an escape hatch for icons legitimately authored on a different grid.",
          "A named size scale (6xs through 6xl) mapped to Tailwind utilities, so sizing is a prop and not a magic number.",
          "fill='currentColor' throughout, so icons inherit colour from their parent — one less thing to pass, and theming works for free.",
          "shapeRendering='geometricPrecision' for crisp edges at small sizes.",
        ],
        footnote:
          "Icons became a thin, predictable file: a named export, the path data, no styling decisions.",
      },
      {
        heading: "The interesting part",
        body: [
          "Design occasionally shipped icons drawn on a 16-unit grid, wrapped in a scale(1.5) group to fake compatibility with the 24 grid. That works visually but violates the pattern — and waiting for a redraw was a three-day turnaround.",
          "I wrote a script to multiply the path coordinates by 1.5 mathematically and verified the output rendered pixel-identically at high resolution before shipping, so the transform wrapper could be removed without a visual diff.",
          "Worth being honest about what that did and didn't fix: the coordinate scaling was lossless, but the original scale(1.5) had already inflated the stroke weight relative to natively-drawn 24-grid icons. Scaling the coordinates preserved that inflation rather than introducing it — correcting it properly needs inward curve offsetting on filled compound paths, or a redraw at source. I flagged it as a design-source fix rather than pretending a coordinate transform had solved it.",
        ],
      },
      {
        heading: "The lesson I took from it",
        body: [
          "I'd asserted a stroke weight was “standard” without measuring a native icon to check. A reviewer caught it. Measure first, then claim.",
        ],
      },
    ],
    outcome:
      "Icons ship as data, not as styling decisions. Size and colour are props, and a new batch from design drops in without hand-editing markup.",
  },
  {
    slug: "testing-infrastructure",
    order: 4,
    title: "Testing Infrastructure",
    tagline:
      "Confidence to ship on a platform where a regression means a restaurant can't take orders.",
    summary:
      "Storybook at the component level and Playwright at the journey level, with mocked API responses that let the suite exercise business states — collection-only, out-of-area, offline — that would otherwise need a real store broken on purpose.",
    role: "Set up and extended component and end-to-end coverage across the library and both apps",
    period: "Component library + ordering app + back office",
    stack: ["Storybook", "Playwright", "TypeScript", "React"],
    featured: false,
    sections: [
      {
        heading: "The problem",
        body: [
          "Ordering is transactional and time-sensitive. A broken checkout at 6pm on a Friday isn't a bug report — it's lost revenue for a franchisee, in real time. Manual QA doesn't scale to that risk across a component library plus two applications.",
        ],
      },
      {
        heading: "Component level — Storybook",
        body: [
          "Every shared component documented in isolation, with its states enumerated as stories: empty, loading, error, disabled, edge-case content. This did double duty — a regression surface for developers and a reference for designers checking that what shipped matches what they drew.",
        ],
      },
      {
        heading: "Journey level — Playwright",
        body: [
          "End-to-end coverage of the flows that actually carry money and identity, login being the meatiest. The hard part wasn't writing assertions, it was controlling the environment:",
        ],
        bullets: [
          "Route interception with mocked API responses, so tests exercise specific store configurations deterministically rather than depending on whatever state a shared backend happens to be in.",
          "CORS preflight handling in the mocks — intercepting OPTIONS requests and returning the right access-control-* headers alongside the actual response, which is the sort of detail that silently breaks a suite until you know to look for it.",
          "Fixture scenarios for specific business states: collection-only stores, delivery-only stores, stores outside a service area, offline stores.",
        ],
      },
    ],
    outcome:
      "Regressions surface in CI rather than in a franchisee's Friday evening. The mocked scenarios in particular made it possible to test business states that would otherwise require manually configuring a real store to break.",
  },
  {
    slug: "franchise-back-office",
    order: 5,
    title: "Franchise Back Office",
    tagline: "The unglamorous side of the product, where the actual operations happen.",
    summary:
      "Store configuration, stock transfers, reporting surfaces, and the state-synchronisation debugging that comes with React Server Components — plus an N+1 in a list endpoint that was better fixed on the API than absorbed into the client.",
    role: "Feature development across the back office and the ordering app",
    period: "Franchise back office",
    stack: ["Next.js", "React Server Components", "TypeScript", "TanStack Query"],
    featured: false,
    sections: [
      {
        heading: "The problem",
        body: [
          "The customer-facing ordering app is what people see. Behind it sits the back office restaurant staff and franchisees actually work in every day — configuring stores, managing stock, pulling reports. It gets less design attention and carries more operational weight.",
        ],
      },
      {
        heading: "What I worked on",
        bullets: [
          "Organisation overview and default order method pages — scaffolded from Figma with the API layer stubbed and typed ahead of the endpoints landing, so integration was a swap rather than a rewrite.",
          "Internal stock location transfers — moving inventory between locations within a site, with the state and validation that implies.",
          "Reporting surfaces — the consumers of the date range picker.",
          "An Alert component with auto-dismiss support, added to the shared library.",
          "State synchronisation debugging across React Server Components in the ordering app, where client and server state diverged in ways that only showed up on specific navigation paths.",
        ],
      },
      {
        heading: "An API design call worth mentioning",
        body: [
          "The stock-count-template/list endpoint returned templates without their stock location names — which meant rendering a list of 30 templates required 31 requests: one for the list, then one retrieve per row to resolve names.",
          "That's a textbook N+1, and it wasn't going to pass review on our side. Rather than working around it on the client with a cache and hoping, I wrote up the problem for the backend team with the request count made concrete, and asked for { id, name } to be included in the list response directly.",
          "I mention it because a chunk of frontend work is recognising when the right fix belongs on the other side of the API and making that case clearly, rather than absorbing the complexity into the client and calling it done.",
        ],
      },
    ],
    outcome:
      "Operational surfaces that restaurant staff use daily, built to survive contact with real store configurations — and one list endpoint that no longer costs 31 requests to render.",
  },
];

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);
