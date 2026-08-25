import Header from "@/components/navigation/header/Header";
import FancyButton from "@/components/ui/FancyButton";
import LiveClock from "@/components/ui/LiveClock";
import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
import BadgeStage from "@/components/badge3d/BadgeStage";
import { FaArrowRight } from "react-icons/fa6";

const strapline = [
  "Frontend developer in Johannesburg",
  "Two years building a restaurant",
  "management and ordering platform",
  "React · TypeScript · Next.js",
];

const Landing = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 sm:p-8">
      {/* Header */}
      <Header />

      {/*
        Interactive lanyard badge. Lives in the right gutter on wide screens
        only and is layered over the hero rather than restructuring it, so the
        headline keeps the mobile layout it was fixed into.
      */}
      <BadgeStage />

      {/* Slogan */}
      <div className="relative flex flex-col justify-center items-center mt-8 leading-[14vw] lg:leading-[10vw] 2xl:leading-[9rem] font-medium tracking-[-0.2rem] sm:tracking-[-0.3rem]">
        <div className="flex flex-col justify-center gap-2 lg:gap-3 items-center text-primary-foreground text-[18vw] lg:text-[14vw] 2xl:text-[12rem] uppercase">
          <div>
            <span>Code</span>
          </div>
          <div>
            <span>Digital </span>
          </div>
          <div className="relative">
            <span>Wonders </span>
            {/*
              Below lg the strapline sits in normal flow underneath the headline;
              from lg up it returns to the offset position the layout is built
              around. Absolute + a fixed 30rem width overflowed small screens.
            */}
            <div className="mt-6 w-full text-center text-[0.9rem] leading-[1.4rem] tracking-normal uppercase font-normal lg:mt-0 lg:absolute lg:top-[10vw] lg:left-0 lg:w-[30rem] lg:text-left lg:text-[1rem] lg:tracking-[-0.07rem] 2xl:top-[9rem] 2xl:left-[50rem]">
              {strapline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact + clock, stacked under the headline on small devices */}
      <div className="relative z-30 mt-16 flex flex-col items-center gap-4 md:hidden">
        <MagneticWrapper>
          <FancyButton
            text="Contact Me"
            icon={<FaArrowRight />}
            onClick={scrollToContact}
          />
        </MagneticWrapper>
        <LiveClock timeZone="Johannesburg" />
      </div>

      {/* Live Clock for larger devices */}
      <div className="hidden md:block absolute right-10 bottom-10">
        <LiveClock timeZone="Johannesburg" />
      </div>
    </div>
  );
};

export default Landing;
