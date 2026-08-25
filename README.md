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
| `lib/`        | Small shared helpers (`cn`, in-page scrolling, EmailJS config).       |
| `types/`      | Ambient declarations for untyped dependencies.                        |

Content is data, not markup: case studies live in `data/CaseStudies.ts` and the
`/work/[slug]` route is generated from that array via `generateStaticParams`.
Adding a case study means adding an object, not a page.

## Contact form (EmailJS)

The form posts straight from the browser via `@emailjs/browser`. The service,
template and public key live in `lib/emailjs.ts` and can be overridden with
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. All three are public by design — EmailJS
identifies the account with a *public* key — so there is no secret in the
bundle, and abuse is prevented in the dashboard rather than in the code.

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
- The water-ripple background renders through WebGL and is loaded client-side
  only.
- The landing page's interactive lanyard badge (`components/badge3d/`) mounts
  only above 1280px, and via a JS media query rather than a `hidden lg:block`
  class — CSS would hide it while still mounting the component and downloading
  three.js and rapier's wasm on phones. Visitors who ask for reduced motion get
  a static card instead.
- `ScrollMemory` records the scroll offset per route in sessionStorage, so
  returning from a case study lands you where you left off rather than at the
  top.
