# Portfolio — Siyabonga Hadebe

Personal portfolio site. Built with Next.js (App Router), TypeScript and
Tailwind CSS, deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (next/core-web-vitals + @typescript-eslint/recommended)
npm run format   # prettier
npx tsc --noEmit # typecheck
```

## Structure

| Path          | What lives there                                                     |
| ------------- | -------------------------------------------------------------------- |
| `app/`        | Routes. `/` is the single-page home, `/work` and `/work/[slug]` are the case studies. |
| `sections/`   | The composed blocks of the home page — Landing, Work, Featured, About, Hobbies, Contact. |
| `components/` | Reusable UI, cards, navigation and visual effects.                    |
| `data/`       | Content as typed modules — case studies, side projects, stack, gallery. |
| `lib/`        | Shared helpers and hooks (`cn`, in-page scrolling, EmailJS config, `useInViewport`, `useContactForm`). |

Content is data, not markup: case studies live in `data/CaseStudies.ts` and the
`/work/[slug]` route is generated from that array via `generateStaticParams`.
Adding a case study means adding an object, not a page.

## Contact form (EmailJS)

The form posts straight from the browser via `@emailjs/browser`. The service,
template and public key are read from the environment by `lib/emailjs.ts` and
nothing is hard-coded: copy `.env.example` to `.env.local` and fill in
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` from the dashboard. Set the same three in
Vercel → Project → Settings → Environment Variables (all three environments);
a build without them leaves the form reporting "Contact form is not
configured" rather than failing opaquely mid-send.

`NEXT_PUBLIC_*` is inlined at build time, so changing a value in the Vercel UI
only takes effect on the next deploy — and on a redeploy, with the build cache
disabled.

Keeping them in the environment means the account can be rotated without a
commit — it does not hide them. `NEXT_PUBLIC_*` values are inlined into the
client bundle at build time and the send happens in the browser, so all three
are readable from devtools on the deployed site. That is how EmailJS is meant
to work: the key it calls "public" is public, and abuse is prevented in the
dashboard rather than in the code. An EmailJS *private* key must never go in a
`NEXT_PUBLIC_` variable.

If a submission reports an error, the message now shows the HTTP status and
EmailJS' own text (the previous version discarded the error object, so every
failure looked identical). Work through these in order:

1. **Template variables.** The template must reference the names the form
   sends. `lib/emailjs.ts` sends each field under several aliases —
   `name`/`from_name`/`user_name`, `email`/`from_email`/`reply_to`,
   `subject`/`title`, `message` — so a template written against any of the
   common EmailJS samples resolves. A template using some *other* name still
   renders blank; add it to `toTemplateParams`.
2. **"To Email" on the template.** If it is empty, EmailJS accepts the request
   and sends nothing. It should be the destination address, and "Reply To" is
   what wants `{{reply_to}}`.
3. **Allowed domains.** Account → Security. If the list is non-empty it must
   include the deployed origin, or the request comes back `403`.
4. **Quota.** The free tier is 200 emails/month; past that the API returns an
   error rather than failing silently.

`403` almost always means 2 or 3; `422` means a variable the template requires
was empty.

## Notes

- The home page is one scrolling document; the full-screen menu scrolls to
  in-page anchors and links out to the case-study routes.
- `next.config.mjs` does not skip type errors — `npx tsc --noEmit` must pass
  before a build will.
- `app/page.tsx` is a server component. Only the leaves that need the browser
  carry `"use client"`, so the static sections ship as HTML rather than JS.
  Keep it that way — wrapping the page in a client component puts the entire
  home page back into the bundle and out of the prerendered HTML.
- The lanyard badge (`components/badge3d/`) mounts only above 1280px, and via a
  JS media query rather than a `hidden lg:block` class — CSS would hide it while
  still mounting the component and downloading three.js and rapier's wasm on
  phones. Visitors who ask for reduced motion get a static card instead. Its
  canvas and physics world pause via `useInViewport` when scrolled away.
- Anything that runs on a timer or a frame loop should be gated on
  `useInViewport` (`lib/useInViewport.ts`) — the gallery autoplay, the project
  videos and the badge all are.
- `ScrollMemory` records the scroll offset per route in sessionStorage, so
  returning from a case study lands you where you left off rather than at the
  top.
