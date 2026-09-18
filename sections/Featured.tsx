import FeaturedCard from "@/components/card/Featured/FeaturedCard";
import ExpandableFeatured from "@/components/expandables/ExpandableFeatured";
import Heading from "@/components/heading/Heading";
import { leadProject } from "@/data/Featured";
import Section from "@/components/ui/Section";

const Featured = () => {
  return (
    <Section>
      {/* Heading */}
      <Heading
        number="02"
        title_1="Side"
        title_2="Projects"
        svgText="THINGS I BUILT ON MY OWN TIME"
      />

      {/* Main Featured Card */}
      <FeaturedCard
        active={true}
        title={leadProject.title}
        tag={leadProject.tag}
        video={leadProject.video}
        link={leadProject.link}
      />
      <div className="mt-24">
        <ExpandableFeatured />
      </div>
    </Section>
  );
};

export default Featured;
