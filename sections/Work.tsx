import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import CaseStudyCard from "@/components/card/CaseStudyCard";
import Heading from "@/components/heading/Heading";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import {
  currentRole,
  featuredCaseStudies,
  secondaryCaseStudies,
} from "@/data/Index";
import Section from "@/components/ui/Section";

const Work = () => {
  return (
    <Section>
      <Heading
        number="01"
        title_1="Case"
        title_2="Studies"
        svgText="TWO YEARS OF PRODUCT WORK AT MUNCH"
      />

      {/* Role context — who I did this for and what the product is */}
      <div className="py-8">
        <Card>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-3 lg:col-span-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-medium text-primary-foreground xl:text-3xl">
                  {currentRole.title}
                </h3>
                <span className="text-2xl font-medium text-secondary-foreground xl:text-3xl">
                  · {currentRole.company}
                </span>
              </div>
              <p className="font-pixel text-sm uppercase text-secondary-foreground">
                {currentRole.period} · {currentRole.duration} ·{" "}
                {currentRole.location}
              </p>
              <p className="max-w-2xl text-[16px] leading-[170%] text-secondary-foreground">
                {currentRole.blurb}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentRole.stack.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-pixel text-lg uppercase text-primary-foreground">
                Where I spend my time
              </p>
              <ul className="flex flex-col gap-3">
                {currentRole.focus.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-[160%] text-secondary-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* The three headline case studies */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {featuredCaseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>

      {/* Shorter write-ups */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {secondaryCaseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} variant="compact" />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/work"
          className="link group flex items-center gap-3 rounded-full border border-border bg-primary-background px-6 py-3 text-primary-foreground transition-colors duration-200 hover:bg-white/[0.1]"
        >
          <span className="font-medium">Read all case studies</span>
          <FiArrowRight
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Section>
  );
};

export default Work;
