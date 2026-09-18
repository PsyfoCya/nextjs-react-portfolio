import BackgroundCard from "@/components/card/BackgroundCard";
import MeCard from "@/components/card/MeCard";
import ResumeCard from "@/components/card/ResumeCard";
import StackCard from "@/components/card/StackCard";
import TimelineCard from "@/components/card/TimelineCard";
import Heading from "@/components/heading/Heading";
import Card from "@/components/ui/Card";
import Gallery from "@/components/ui/Gallery";
import Section from "@/components/ui/Section";
import Reveal from "@/components/visualEffects/Reveal";
import { certifications, education, experience } from "@/data/Timeline";

/**
 * A bento on a fixed row unit.
 *
 * The spans are chosen per card from how much content it actually holds, which
 * is the part a plain stretch grid cannot do: making every card fill its row
 * left the two-entry Education and Experience cards as tall as the nine-entry
 * Certifications card, all of them mostly empty. Short things now get short
 * cells.
 *
 * `auto-rows-[5.5rem]` plus `row-span-*` is what makes the bottoms line up.
 * `grid-flow-dense` lets a short card backfill a gap a taller neighbour left.
 *
 * Order is the reading order: who I am, what I do, where I came from, where
 * I have worked, what I studied, what I use, and then the personal one.
 */
const About = () => {
  return (
    <Section>
      <Heading
        number="03"
        title_1="About"
        title_2="Me"
        svgText="EXPERIENCE, EDUCATION AND THE STACK I WORK IN"
      />

      {/*
        One grid rather than two, so the Gallery renders once instead of being
        duplicated for mobile and desktop — duplicate ids broke the menu's
        anchor links.
      */}
      <div className="grid grid-cols-1 gap-4 py-8 md:auto-rows-[5.5rem] md:grid-flow-dense md:grid-cols-6">
        <Reveal
          index={0}
          className="h-full md:col-span-3 md:row-span-5 2xl:col-span-2"
        >
          <section id="me" className="h-full">
            <MeCard />
          </section>
        </Reveal>

        <Reveal
          index={1}
          className="h-full md:col-span-3 md:row-span-5 2xl:col-span-2"
        >
          <section id="resume" className="h-full">
            <ResumeCard />
          </section>
        </Reveal>

        <Reveal
          index={2}
          className="h-full md:col-span-3 md:row-span-5 2xl:col-span-2"
        >
          <section id="background" className="h-full">
            <BackgroundCard />
          </section>
        </Reveal>

        {/* Two entries each — deliberately short cells. */}
        <Reveal
          index={3}
          className="h-full md:col-span-3 md:row-span-3 2xl:col-span-2"
        >
          <section id="experience" className="h-full">
            <TimelineCard title="My Experience" entries={experience} />
          </section>
        </Reveal>

        <Reveal
          index={3}
          className="h-full md:col-span-3 md:row-span-3 2xl:col-span-2"
        >
          <section id="education" className="h-full">
            <TimelineCard title="My Education" entries={education} />
          </section>
        </Reveal>

        {/* Nine entries, capped at three with a toggle. */}
        <Reveal
          index={4}
          className="h-full md:col-span-3 md:row-span-4 2xl:col-span-2"
        >
          <section id="certifications" className="h-full">
            <TimelineCard
              title="My Certifications"
              entries={certifications}
              initialCount={3}
            />
          </section>
        </Reveal>

        <Reveal
          index={4}
          className="h-full md:col-span-3 md:row-span-4 2xl:col-span-3"
        >
          <section id="stack" className="h-full">
            <StackCard />
          </section>
        </Reveal>

        <Reveal
          index={5}
          className="h-full md:col-span-6 md:row-span-6 2xl:col-span-3"
        >
          <section id="gallery" className="h-full">
            <Card title="Gallery" fill>
              <Gallery />
            </Card>
          </section>
        </Reveal>
      </div>
    </Section>
  );
};

export default About;
