import Header from "@/components/navigation/header/Header";
import FancyButton from "@/components/ui/FancyButton";
import LiveClock from "@/components/ui/LiveClock";
import ScrollDown from "@/components/ui/ScrollDown";
import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
import { FaArrowRight } from "react-icons/fa6";

const Landing = () => {
  return (
    <div className="relative h-screen overflow-hidden p-8">
      {/* Header */}
      <Header />

      {/* Show Magnetic fancy button on sm screen and hide on md screen */}
      <div className="absolute bottom-36 left-10 z-20 md:hidden">
        <MagneticWrapper>
          <FancyButton text="Contact Me" icon={<FaArrowRight />} />
        </MagneticWrapper>
      </div>

      {/* Live Clock */}
      <div className="absolute right-10 bottom-10">
        <LiveClock timeZone="Johannesburg" />
      </div>

      {/* Slogan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 leading-[14vw] lg:leading-[10vw] 2xl:leading-[9rem] font-medium h-[40rem] tracking-[-0.3rem]">
        <div className="flex flex-col justify-center gap-2 lg:gap-3 items-center text-primary-foreground text-[18vw] lg:text-[14vw] 2xl:text-[12rem] uppercase">
          <div>
            <span>Code</span>
          </div>
          <div>
            <span>Digital </span>
          </div>
          <div className="relative">
            <span>Wonders </span>
            <div className="text-[1rem] leading-[1.4rem] tracking-[-0.07rem] absolute top-[14vw] lg:top-[10vw] 2xl:top-[9rem] left-0 2xl:left-[50rem] w-[30rem] uppercase font-normal">
              <span>Code magician on a mission</span>
              <br />
              <span>creating digital wonders</span>
              <br />
              <span>through elegant code</span>
              <br />
              <span>bringing passion to development</span>
            </div>
          </div>
        </div>

        {/*Magnetic Scroll Down  */}
        <MagneticWrapper className="absolute left-1/2 transform -translate-x-1/2 bottom-[8rem] md:bottom-[4rem] 2xl:-bottom-10">
          <ScrollDown />
        </MagneticWrapper>
      </div>
    </div>
  );
};

export default Landing;
