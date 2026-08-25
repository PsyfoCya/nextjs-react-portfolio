import BackgroundCard from "@/components/card/BackgroundCard";
import CertificationCard from "@/components/card/CertificationsCard";
import EducationCard from "@/components/card/EducationCard";
import ExperienceCard from "@/components/card/ExperienceCard";
import MeCard from "@/components/card/MeCard";
import ResumeCard from "@/components/card/ResumeCard";
import StackCard from "@/components/card/StackCard";
import Heading from "@/components/heading/Heading";
import Card from "@/components/ui/Card";
import Gallery from "@/components/ui/Gallery";

const About = () => {
  return (
    <div className="pt-16 sm:pt-24 px-3 lg:px-8">
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
        <section id="me">
          <Card title="Me">
            <MeCard />
          </Card>
        </section>

        <section id="resume">
          <Card title="Resume">
            <ResumeCard />
          </Card>
        </section>

        <section id="background">
          <Card title="My Background">
            <BackgroundCard />
          </Card>
        </section>

        <section id="certifications">
          <CertificationCard />
        </section>

        <div className="space-y-4">
          <section id="experience">
            <ExperienceCard />
          </section>
          <section id="education">
            <EducationCard />
          </section>
          <section id="stack">
            <StackCard />
          </section>
        </div>

        <section id="gallery">
          <Gallery />
        </section>
      </div>
    </div>
  );
};

export default About;
