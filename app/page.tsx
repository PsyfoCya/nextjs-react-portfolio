"use client";

import dynamic from "next/dynamic";
import ScrollMemory from "@/components/layout/ScrollMemory";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Featured from "@/sections/Featured";
import Hobbies from "@/sections/Hobbies";
import Landing from "@/sections/Landing";
import Work from "@/sections/Work";

// The water-wave effect touches the canvas/WebGL APIs on mount, so it can only
// run client side.
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
          {/* Puts you back where you were when you return from a case study. */}
          <ScrollMemory />
          <section id="home">
            <Landing />
          </section>
          <section id="work">
            <Work />
          </section>
          <section id="featured">
            <Featured />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="hobbies">
            <Hobbies />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </div>
      )}
    </WaterWaveWrapper>
  );
}
