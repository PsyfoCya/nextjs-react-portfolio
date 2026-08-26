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

const About = () => {
  return (
    <Section>
      {/* Heading */}
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
      <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 2xl:grid-cols-3">
        <Reveal index={0}>
          <section id="me">
            <Card title="Me">
              <MeCard />
            </Card>
          </section>
        </Reveal>

        <Reveal index={1}>
          <section id="resume">
            <Card title="Resume">
              <ResumeCard />
            </Card>
          </section>
        </Reveal>

        <Reveal index={2}>
          <section id="background">
            <Card title="My Background">
              <BackgroundCard />
            </Card>
          </section>
        </Reveal>

        <Reveal index={3}>
          <section id="certifications">
            <TimelineCard title="My Certifications" entries={certifications} />
          </section>
        </Reveal>

        <Reveal index={4}>
          <div className="space-y-4">
            <section id="experience">
              <TimelineCard title="My Experience" entries={experience} />
            </section>
            <section id="education">
              <TimelineCard title="My Education" entries={education} />
            </section>
            <section id="stack">
              <StackCard />
            </section>
          </div>
        </Reveal>

        <Reveal index={5}>
          <section id="gallery">
            <Gallery />
          </section>
        </Reveal>
      </div>
    </Section>
  );
};

export default About;
