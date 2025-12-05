// import Header from "@/components/navigation/header/Header";
// import FancyButton from "@/components/ui/FancyButton";
// import LiveClock from "@/components/ui/LiveClock";
// import ScrollDown from "@/components/ui/ScrollDown";
// import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
// import { FaArrowRight } from "react-icons/fa6";

// const Landing = () => {
//   const scrollToContact = () => {
//     console.log("Button clicked");
//     const contactSection = document.getElementById("contact");
//     console.log("Contact section:", contactSection);
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative h-screen overflow-hidden p-8">
//       {/* Header */}
//       <Header />

//       {/* Show Magnetic fancy button on sm screen and hide on md screen */}
//       <div className="absolute bottom-36 left-10 z-30 md:hidden">
//         <MagneticWrapper>
//           <FancyButton
//             text="Contact Me"
//             icon={<FaArrowRight />}
//             onClick={scrollToContact}
//           />
//         </MagneticWrapper>
//       </div>

//       {/* Live Clock */}
//       <div className="absolute right-10 bottom-10">
//         <LiveClock timeZone="Johannesburg" />
//       </div>

//       {/* Slogan */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 leading-[14vw] lg:leading-[10vw] 2xl:leading-[9rem] font-medium h-[40rem] tracking-[-0.3rem] ">
//         <div className="flex flex-col justify-center gap-2 lg:gap-3 items-center text-primary-foreground text-[18vw] lg:text-[14vw] 2xl:text-[12rem] uppercase">
//           <div>
//             <span>Code</span>
//           </div>
//           <div>
//             <span>Digital </span>
//           </div>
//           <div className="relative">
//             <span>Wonders </span>
//             <div className="text-[1rem] leading-[1.4rem] tracking-[-0.07rem] absolute top-[14vw] lg:top-[10vw] 2xl:top-[9rem] left-0 2xl:left-[50rem] w-[30rem] uppercase font-normal">
//               <span>Code magician on a mission</span>
//               <br />
//               <span>creating digital wonders</span>
//               <br />
//               <span>through elegant code</span>
//               <br />
//               <span>bringing passion to development</span>
//             </div>
//           </div>
//         </div>

//         {/*Magnetic Scroll Down  */}
//         <MagneticWrapper className="absolute left-1/2 -translate-x-1/2 bottom-[8rem] md:bottom-[4rem] 2xl:-bottom-10">
//           <ScrollDown />
//         </MagneticWrapper>
//       </div>
//     </div>
//   );
// };

// export default Landing;

// import Header from "@/components/navigation/header/Header";
// import FancyButton from "@/components/ui/FancyButton";
// import LiveClock from "@/components/ui/LiveClock";
// import ScrollDown from "@/components/ui/ScrollDown";
// import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
// import { FaArrowRight } from "react-icons/fa6";

// const Landing = () => {
//   const scrollToContact = () => {
//     // console.log("Button clicked");
//     const contactSection = document.getElementById("contact");
//     // console.log("Contact section:", contactSection);
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative h-screen overflow-hidden p-8">
//       {/* Header */}
//       <Header />

//       {/* Show Magnetic fancy button on sm screen and hide on md screen */}
//       <div className="absolute bottom-36 left-10 z-30 md:hidden">
//         <MagneticWrapper>
//           <FancyButton
//             text="Contact Me"
//             icon={<FaArrowRight />}
//             onClick={scrollToContact}
//           />
//         </MagneticWrapper>
//       </div>

//       {/* Live Clock */}
//       <div className="absolute right-10 bottom-10">
//         <LiveClock timeZone="Johannesburg" />
//       </div>

//       {/* Slogan */}
//       <div className="absolute inset-0 flex flex-col justify-center items-center mt-8 leading-[14vw] lg:leading-[10vw] 2xl:leading-[9rem] font-medium tracking-[-0.3rem]">
//         <div className="flex flex-col justify-center gap-2 lg:gap-3 items-center text-primary-foreground text-[18vw] lg:text-[14vw] 2xl:text-[12rem] uppercase">
//           <div>
//             <span>Code</span>
//           </div>
//           <div>
//             <span>Digital </span>
//           </div>
//           <div className="relative">
//             <span>Wonders </span>
//             <div className="text-[1rem] leading-[1.4rem] tracking-[-0.07rem] absolute top-[14vw] lg:top-[10vw] 2xl:top-[9rem] left-0 2xl:left-[50rem] w-[30rem] uppercase font-normal">
//               <span>Code magician on a mission</span>
//               <br />
//               <span>creating digital wonders</span>
//               <br />
//               <span>through elegant code</span>
//               <br />
//               <span>bringing passion to development</span>
//             </div>
//           </div>
//         </div>

//         {/* Magnetic Scroll Down */}
//         <MagneticWrapper className="absolute left-1/2 -translate-x-1/2 bottom-[8rem] md:bottom-[4rem] 2xl:-bottom-10">
//           <ScrollDown />
//         </MagneticWrapper>
//       </div>
//     </div>
//   );
// };

// export default Landing;

// import Header from "@/components/navigation/header/Header";
// import FancyButton from "@/components/ui/FancyButton";
// import LiveClock from "@/components/ui/LiveClock";
// import ScrollDown from "@/components/ui/ScrollDown";
// import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
// import { FaArrowRight } from "react-icons/fa6";

// const Landing = () => {
//   const scrollToContact = () => {
//     const contactSection = document.getElementById("contact");
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative h-screen overflow-hidden p-8">
//       {/* Header */}
//       <Header />

//       {/* Centered elements on small devices */}
//       <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4 md:hidden">
//         <MagneticWrapper>
//           <FancyButton
//             text="Contact Me"
//             icon={<FaArrowRight />}
//             onClick={scrollToContact}
//           />
//         </MagneticWrapper>
//         <ScrollDown />
//         <LiveClock timeZone="Johannesburg" />
//       </div>

//       {/* Live Clock for larger devices */}
//       <div className="hidden md:block absolute right-10 bottom-10">
//         <LiveClock timeZone="Johannesburg" />
//       </div>

//       {/* Slogan */}
//       <div className="absolute inset-0 flex flex-col justify-center items-center mt-8 leading-[14vw] lg:leading-[10vw] 2xl:leading-[9rem] font-medium tracking-[-0.3rem]">
//         <div className="flex flex-col justify-center gap-2 lg:gap-3 items-center text-primary-foreground text-[18vw] lg:text-[14vw] 2xl:text-[12rem] uppercase">
//           <div>
//             <span>Code</span>
//           </div>
//           <div>
//             <span>Digital </span>
//           </div>
//           <div className="relative">
//             <span>Wonders </span>
//             <div className="text-[1rem] leading-[1.4rem] tracking-[-0.07rem] absolute top-[14vw] lg:top-[10vw] 2xl:top-[9rem] left-0 2xl:left-[50rem] w-[30rem] uppercase font-normal">
//               <span>Code magician on a mission</span>
//               <br />
//               <span>creating digital wonders</span>
//               <br />
//               <span>through elegant code</span>
//               <br />
//               <span>bringing passion to development</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;

import Header from "@/components/navigation/header/Header";
import FancyButton from "@/components/ui/FancyButton";
import LiveClock from "@/components/ui/LiveClock";
import ScrollDown from "@/components/ui/ScrollDown";
import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
import { FaArrowRight } from "react-icons/fa6";
import dynamic from "next/dynamic";

// Dynamic import for Badge3D to avoid SSR issues with Three.js
const Badge3D = dynamic(() => import("@/components/badge3d/Badge3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-48 bg-white/5 rounded-lg animate-pulse" />
    </div>
  ),
});

const Landing = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden p-8">
      {/* Header */}
      <Header />

      {/* Main content grid */}
      <div className="relative h-[calc(100%-80px)] flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Slogan - left side on large screens */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start leading-[14vw] lg:leading-[8vw] 2xl:leading-[7rem] font-medium tracking-[-0.3rem]">
          <div className="flex flex-col justify-center gap-2 lg:gap-3 items-center lg:items-start text-primary-foreground text-[16vw] lg:text-[10vw] 2xl:text-[9rem] uppercase">
            <div>
              <span>Code</span>
            </div>
            <div>
              <span>Digital </span>
            </div>
            <div className="relative">
              <span>Wonders </span>
              <div className="hidden lg:block text-[1rem] leading-[1.4rem] tracking-[-0.07rem] absolute top-[8vw] 2xl:top-[7rem] left-0 w-[20rem] uppercase font-normal">
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
        </div>

        {/* 3D Badge - right side on large screens */}
        <div className="hidden lg:flex flex-1 h-full items-center justify-center">
          <div className="w-full h-[600px] max-w-[500px]">
            <Badge3D
              profileImage="/assets/images/me/Psyfo.png"
              userName="Siyabonga Hadebe"
              userTitle="Software Developer"
            />
          </div>
        </div>
      </div>

      {/* Centered elements on small devices after the slogan */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4 md:hidden">
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
