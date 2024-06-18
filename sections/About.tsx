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
    <div className="pt-24 px-3 lg:px-8 ">
      {/* Heading */}
      <Heading number="02" title_1="About" title_2="Me" />
      <div className="space-y-4 py-8">
        <div className="spcace-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 2xl:grid-cols-3">
          {/* Me Card */}
          <section id="about">
            <Card title="Me">
              <MeCard />
            </Card>
          </section>

          {/* Resume Card */}
          <section id="resume">
            <Card title="Resume">
              <ResumeCard />
            </Card>
          </section>

          {/* Background Card */}
          <section id="background">
            <Card title="Backgorund">
              <BackgroundCard />
            </Card>
          </section>

          {/* Gallery Swiper Card */}
          <section id="gallery">
            <div className="2xl:hidden">
              <Gallery />
            </div>
          </section>
        </div>

        <div className="spcace-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 2xl:grid-cols-3">
          <section id="certifications">
            <div className="space-y-4">
              {/* <Card title="Software Developer"> Developer </Card> */}
              <CertificationCard />
            </div>
          </section>

          <div className="space-y-4">
            <section id="experience">
              <div>
                {/* <Card title="Stack"> Stack </Card> */}
                <ExperienceCard />
              </div>
            </section>
            <section id="education">
              <div>
                {/* <Card title="Stack"> Stack </Card> */}
                <EducationCard />
              </div>
            </section>
            <section id="stack">
              <div>
                {/* <Card title="Stack"> Stack </Card> */}

                <StackCard />
              </div>
            </section>
          </div>

          <section id="gallery">
            <div className="hidden 2xl:flex">
              <Gallery />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
