"use client";

import { supportingProjects } from "@/data/Featured";
import FeaturedCard from "../card/Featured/FeaturedCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ExpandableFeatured = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full grid lg:flex lg:justify-between lg:gap-x-4">
      {supportingProjects.map((featured, i) => (
        <div
          key={featured.title}
          className={cn(
            "relative h-[420px] sm:h-[520px] lg:h-[640px] lg:w-1/3 mb-8 lg:mb-16 transition-all origin-center duration-300 ease-in-out",
            i === hoveredIndex ? "lg:w-[40%]" : "lg:w-[33%]"
          )}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <FeaturedCard
            active={i === hoveredIndex}
            title={featured.title}
            tag={featured.tag}
            video={featured.video}
            link={featured.link}
          />
        </div>
      ))}
    </div>
  );
};

export default ExpandableFeatured;
