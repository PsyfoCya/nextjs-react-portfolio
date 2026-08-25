import FeaturedCard from "@/components/card/Featured/FeaturedCard";
import ExpandableFeatured from "@/components/expandables/ExpandableFeatured";
import Heading from "@/components/heading/Heading";
import { featuredData } from "@/data/Index";

const MainFeatured = featuredData[0];

const Featured = () => {
  return (
    <div className="pt-16 sm:pt-24 px-3 lg:px-8">
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
        title={MainFeatured.title}
        tag={MainFeatured.tag}
        video={MainFeatured.video}
        link={MainFeatured.link}
      />
      <div className="mt-24">
        <ExpandableFeatured />
      </div>
    </div>
  );
};

export default Featured;
