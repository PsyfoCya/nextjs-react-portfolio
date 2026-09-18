import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Chip from "../ui/Chip";
import type { CaseStudy } from "@/data/CaseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Large cards lead the index; compact cards fill the second row. */
  variant?: "large" | "compact";
}

const CaseStudyCard = ({ study, variant = "large" }: CaseStudyCardProps) => {
  const isLarge = variant === "large";

  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        "gradient-ring link group flex h-full flex-col justify-between gap-6 rounded-2xl p-6",
        // The old hover was white/.05 -> white/.08 — a 3% delta, effectively
        // invisible. The ring carries it now; this is just a lift underneath.
        "transition-transform duration-300 hover:-translate-y-0.5"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={cn(
              "font-medium leading-tight text-primary-foreground",
              isLarge ? "text-2xl xl:text-3xl" : "text-xl"
            )}
          >
            {study.title}
          </h3>
          <FiArrowUpRight
            aria-hidden
            className="mt-1 shrink-0 text-xl text-secondary-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-foreground"
          />
        </div>

        <p className="text-base font-medium italic leading-relaxed text-primary-foreground/80">
          {study.tagline}
        </p>

        {isLarge ? (
          <p className="text-[15px] leading-[170%] text-secondary-foreground">
            {study.summary}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {study.stack.slice(0, isLarge ? 5 : 3).map((tech) => (
          <Chip key={tech} label={tech} />
        ))}
      </div>
    </Link>
  );
};

export default CaseStudyCard;
