// "use client";

// import WaterWaveWrapper from "@/components/visualEffects/WaterWaveWrapper";
// import About from "@/sections/About";
// import Contact from "@/sections/Contact";
// import Featured from "@/sections/Featured";
// import Landing from "@/sections/Landing";

// export default function Home() {
//   return (
//     <WaterWaveWrapper
//       imageUrl=""
//       dropRadius="3"
//       perturbance="5"
//       resolution="2048"
//     >
//       {() => (
//         <div className="pb-8">
//           <Landing />
//           <Featured />
//           <About />
//           <Contact />
//         </div>
//       )}
//     </WaterWaveWrapper>
//   );
// }
// // Silicon Valley
// // The Internship

"use client";

// import WaterWaveWrapper from "@/components/visualEffects/WaterWaveWrapper";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Featured from "@/sections/Featured";
import Landing from "@/sections/Landing";
import dynamic from "next/dynamic";

// Dynamic import WaterWaveWrapper to ensure it's only used in the client-side environment
const WaterWaveWrapper = dynamic(
  () => import("@/components/visualEffects/WaterWaveWrapper"),
  { ssr: false }
);

export default function Home() {
  return (
    <WaterWaveWrapper
      imageUrl=""
      dropRadius="3"
      perturbance="3"
      resolution="2048"
    >
      {() => (
        <div className="pb-8">
          <section id="home">
            <Landing />
          </section>
          <section id="featured">
            <Featured />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </div>
      )}
    </WaterWaveWrapper>
  );
}
