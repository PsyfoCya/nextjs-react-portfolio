import SVGCurve from "../visualEffects/SVGCurve";
import { HeadingAnimatedSvg } from "./HeadingAnimatedSVG";

interface HeadingProps {
  number: string;
  title_1: string;
  /** Rendered in italic as the second half of the heading. */
  title_2: string;
  /** Text that rings the animated star on hover. */
  svgText?: string;
}

const Heading = ({
  number,
  title_1,
  title_2,
  svgText = "LEARN MORE ABOUT MY PROJECTS",
}: HeadingProps) => {
  return (
    <div className="relative my-10 px-4 sm:px-8 z-20">
      {/* Number */}
      <div className="outline-none flex flex-col justify-start shrink-0 opacity-5 transform -top-24 sm:-top-32 2xl:-top-24 w-[71px] flex-none h-auto left-2 sm:left-4 lg:left-12 absolute whitespace-pre">
        <h2 className="font-pixel text-[120px] sm:text-[180px] text-center text-primary-foreground relative">
          <span className="bottom_fade bg-clip-text text-transparent p-4">
            {number}
          </span>
        </h2>
      </div>

      {/*
        Headings run edge to edge, so the type scale has to come down on narrow
        screens or the second word gets clipped by the overflow guard.
      */}
      <div className="flex items-center flex-nowrap min-h-min overflow-hidden p-0 w-full font-oswald">
        <p className="text-[12vw] xs:text-[14vw] lg:text-[12vw] leading-[100%] text-primary-foreground mr-2 sm:mr-3">
          {title_1}
        </p>

        {/* SVG Animated  */}
        <HeadingAnimatedSvg text={svgText} />

        <p className="text-[12vw] xs:text-[14vw] lg:text-[12vw] leading-[100%] text-primary-foreground italic">
          {title_2}
        </p>
      </div>

      {/* SVG Curve */}
      <SVGCurve />
    </div>
  );
};

export default Heading;
