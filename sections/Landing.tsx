import Header from "@/components/navigation/header/Header";
import ContactCta from "@/components/ui/ContactCta";
import LiveClock from "@/components/ui/LiveClock";

const strapline = [
  "Frontend developer in Johannesburg",
  "Two years building a restaurant",
  "management and ordering platform",
  "React · TypeScript · Next.js",
];

/**
 * The hero.
 *
 * The strapline is a sibling of the headline, not a child of it. It used to be
 * `lg:absolute` inside the `<div>` wrapping the word "Wonders" — a flex item
 * whose width is the shrink-to-fit width of that one word — with a hard
 * `lg:left-0` and `2xl:left-[50rem]` against a fixed `lg:w-[30rem]`. At 1280
 * that dropped it straight on top of the headline; at 1400 the 800px offset
 * plus 480px width overhung the content box and the root's `overflow-hidden`
 * sliced it. Anchoring it to the section instead means it can neither collide
 * nor overhang at any width.
 */
const Landing = () => {
  return (
    <div className="relative flex min-h-screen flex-col p-4 sm:p-8">
      <Header />

      <div className="flex flex-1 flex-col justify-center">
        {/* Headline. Capped so it stops growing once the type is big enough. */}
        {/*
          Capped against viewport height as well as width. At 1280x720 a
          pure vw scale made three lines taller than the screen and pushed
          the strapline out of the bottom of the section.
        */}
        <h1 className="flex flex-col items-center gap-2 text-center font-medium uppercase leading-[0.92] tracking-[-0.02em] text-primary-foreground text-[min(17vw,13vh)] lg:gap-3 lg:text-[min(13vw,17vh)] 2xl:text-[min(11rem,19vh)]">
          <span>Code</span>
          <span>Digital</span>
          <span>Wonders</span>
        </h1>

        {/*
          Centred under the headline on small screens; from lg it moves into
          the right-hand gutter of the section, where there is always room.
        */}
        <div className="mt-8 flex justify-center lg:mt-10 lg:justify-end lg:pr-[2vw]">
          <p className="max-w-[22rem] text-center text-[0.9rem] font-normal uppercase leading-[1.5] tracking-normal text-primary-foreground lg:text-left lg:text-[1rem]">
            {strapline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Contact + clock, stacked under the headline on small devices */}
      <div className="relative z-30 mt-12 flex flex-col items-center gap-4 md:hidden">
        <ContactCta />
        <LiveClock timeZone="Africa/Johannesburg" />
      </div>

      {/*
        In flow and right-aligned rather than `absolute bottom-10 right-10`,
        which could sit on top of the strapline on a short viewport.
      */}
      <div className="mt-10 hidden justify-end md:flex">
        <LiveClock timeZone="Africa/Johannesburg" />
      </div>
    </div>
  );
};

export default Landing;
