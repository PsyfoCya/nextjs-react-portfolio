import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * The standard top padding and gutters for a home-page block.
 *
 * All five sections carried this exact class string, so changing the rhythm of
 * the page meant editing five files and hoping none of them drifted.
 */
const Section = ({ children, className }: SectionProps) => (
  <div className={cn("pt-16 sm:pt-24 px-3 lg:px-8", className)}>{children}</div>
);

export default Section;
