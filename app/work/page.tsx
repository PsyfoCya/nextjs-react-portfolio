import type { Metadata } from "next";
import CaseStudyCard from "@/components/card/CaseStudyCard";
import PageShell from "@/components/layout/PageShell";
import Chip from "@/components/ui/Chip";
import { caseStudies, currentRole } from "@/data/Index";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `Frontend case studies from ${currentRole.duration} at ${currentRole.company} — a restaurant management and online ordering platform. Problem, approach, and outcome for each.`,
};

const featured = caseStudies.filter((study) => study.featured);
const secondary = caseStudies.filter((study) => !study.featured);

const WorkIndex = () => {
  return (
    <PageShell backHref="/" backLabel="Back to home">
      <header className="mt-12 flex flex-col gap-5 border-b border-border pb-12">
        <p className="font-pixel text-sm uppercase tracking-wide text-secondary-foreground">
          {currentRole.company} · {currentRole.period} · {currentRole.duration}
        </p>
        <h1 className="font-oswald text-5xl leading-[105%] text-primary-foreground lg:text-7xl">
          Case <span className="italic">Studies</span>
        </h1>
        <p className="max-w-2xl text-[16px] leading-[175%] text-secondary-foreground">
          {currentRole.blurb}
        </p>
        <div className="flex flex-wrap gap-2">
          {currentRole.stack.map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
      </header>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="font-pixel text-lg uppercase text-secondary-foreground">
          Selected work
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="font-pixel text-lg uppercase text-secondary-foreground">
          Also shipped
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {secondary.map((study) => (
            <CaseStudyCard key={study.slug} study={study} variant="compact" />
          ))}
        </div>
      </section>

      <p className="mt-16 max-w-2xl text-sm leading-[175%] text-secondary-foreground">
        These write-ups cover the problem, the approach, and my contribution.
        They contain no proprietary code, screenshots, or customer data.
      </p>
    </PageShell>
  );
};

export default WorkIndex;
