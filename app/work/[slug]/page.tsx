import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import PageShell from "@/components/layout/PageShell";
import Chip from "@/components/ui/Chip";
import { caseStudies, currentRole, getCaseStudy } from "@/data/Index";

interface CaseStudyPageProps {
  params: { slug: string };
}

export const generateStaticParams = () =>
  caseStudies.map((study) => ({ slug: study.slug }));

export const generateMetadata = ({
  params,
}: CaseStudyPageProps): Metadata => {
  const study = getCaseStudy(params.slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: study.title,
    description: study.summary,
  };
};

const CaseStudyPage = ({ params }: CaseStudyPageProps) => {
  const study = getCaseStudy(params.slug);

  if (!study) {
    notFound();
  }

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <PageShell backHref="/work" backLabel="All case studies">
      <article className="mt-12">
        <header className="flex flex-col gap-5 border-b border-border pb-12">
          <p className="font-pixel text-sm uppercase tracking-wide text-secondary-foreground">
            {currentRole.company} · {study.period}
          </p>
          <h1 className="font-oswald text-4xl leading-[110%] text-primary-foreground lg:text-6xl">
            {study.title}
          </h1>
          <p className="max-w-2xl text-xl font-medium italic leading-[150%] text-primary-foreground/80">
            {study.tagline}
          </p>
          <dl className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <dt className="font-pixel text-xs uppercase text-secondary-foreground">
                My role
              </dt>
              <dd className="text-[15px] leading-[160%] text-primary-foreground">
                {study.role}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="font-pixel text-xs uppercase text-secondary-foreground">
                Stack
              </dt>
              <dd className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </dd>
            </div>
          </dl>
        </header>

        <div className="flex flex-col gap-12 py-12">
          {study.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="font-oswald text-2xl uppercase text-primary-foreground lg:text-3xl">
                {section.heading}
              </h2>

              {section.body?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-3xl text-[16px] leading-[185%] text-secondary-foreground"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className="flex max-w-3xl flex-col gap-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[16px] leading-[175%] text-secondary-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.steps ? (
                <ol className="flex max-w-3xl flex-col gap-3">
                  {section.steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex gap-4 text-[16px] leading-[175%] text-secondary-foreground"
                    >
                      <span className="font-pixel text-primary-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              ) : null}

              {section.footnote ? (
                <p className="max-w-3xl text-[16px] leading-[185%] text-secondary-foreground">
                  {section.footnote}
                </p>
              ) : null}
            </section>
          ))}

          <section className="flex flex-col gap-4 rounded-2xl border border-border bg-primary-background p-6">
            <h2 className="font-pixel text-lg uppercase text-primary-foreground">
              Outcome
            </h2>
            <p className="max-w-3xl text-[16px] leading-[185%] text-secondary-foreground">
              {study.outcome}
            </p>
          </section>
        </div>

        <footer className="border-t border-border pt-8">
          <Link
            href={`/work/${next.slug}`}
            className="link group flex flex-col gap-1"
          >
            <span className="font-pixel text-xs uppercase text-secondary-foreground">
              Next case study
            </span>
            <span className="flex items-center gap-3 text-2xl font-medium text-primary-foreground">
              {next.title}
              <FiArrowRight
                aria-hidden
                className="text-xl transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </footer>
      </article>
    </PageShell>
  );
};

export default CaseStudyPage;
