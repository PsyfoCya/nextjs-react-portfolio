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

import WaterWaveWrapper from "@/components/visualEffects/WaterWaveWrapper";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Featured from "@/sections/Featured";
import Landing from "@/sections/Landing";

export default function Home() {
  return (
    <WaterWaveWrapper
      imageUrl=""
      dropRadius="3"
      perturbance="5"
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
