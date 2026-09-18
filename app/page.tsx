import ScrollMemory from "@/components/layout/ScrollMemory";
import About from "@/sections/About";
import AccessCard from "@/sections/AccessCard";
import Contact from "@/sections/Contact";
import Featured from "@/sections/Featured";
import Hobbies from "@/sections/Hobbies";
import Landing from "@/sections/Landing";
import Work from "@/sections/Work";

/**
 * A server component, deliberately.
 *
 * This page used to be `"use client"` and pass everything below as the child
 * function of a `dynamic(..., { ssr: false })` water-ripple wrapper, which meant
 * none of it was server-rendered: the document arrived empty and the headline
 * only appeared once React, jQuery and a WebGL context had all loaded. Keeping
 * the boundary here — with the interactive leaves marked `"use client"`
 * themselves — lets Work, Featured, About and Hobbies ship as HTML instead of
 * JavaScript.
 */
export default function Home() {
  return (
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
      <section id="access-card">
        <AccessCard />
      </section>
      <section id="hobbies">
        <Hobbies />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
