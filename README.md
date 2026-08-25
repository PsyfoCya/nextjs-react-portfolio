# Portfolio — Siyabonga Hadebe

Personal portfolio site. Built with Next.js (App Router), TypeScript and
Tailwind CSS, deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## Structure

| Path          | What lives there                                                     |
| ------------- | -------------------------------------------------------------------- |
| `app/`        | Routes. `/` is the single-page home, `/work` and `/work/[slug]` are the case studies. |
| `sections/`   | The composed blocks of the home page — Landing, Work, Featured, About, Hobbies, Contact. |
| `components/` | Reusable UI, cards, navigation and visual effects.                    |
| `data/`       | Content as typed modules — case studies, side projects, stack, gallery. |
| `lib/`        | Small shared helpers (`cn`, in-page scrolling).                       |
| `types/`      | Ambient declarations for untyped dependencies.                        |

Content is data, not markup: case studies live in `data/CaseStudies.ts` and the
`/work/[slug]` route is generated from that array via `generateStaticParams`.
Adding a case study means adding an object, not a page.

## Notes

- The home page is one scrolling document; the full-screen menu scrolls to
  in-page anchors and links out to the case-study routes.
- `next.config.mjs` does not skip type errors — `npx tsc --noEmit` must pass
  before a build will.
- The water-ripple background renders through WebGL and is loaded client-side
  only.
