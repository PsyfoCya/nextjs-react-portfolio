import Link from "next/link";
import { FC, ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ScrollMemory from "./ScrollMemory";

interface PageShellProps {
  /** Where the back link goes, and what it says. */
  backHref: string;
  backLabel: string;
  children: ReactNode;
}

/**
 * Reading layout for the routes outside the single-page home experience.
 * Deliberately plain: no water-wave canvas, no full-bleed type — these pages
 * exist to be read.
 */
const PageShell: FC<PageShellProps> = ({ backHref, backLabel, children }) => (
  <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-10 lg:px-8">
    {/* Long case studies are worth returning to at the same paragraph. */}
    <ScrollMemory />
    <Link
      href={backHref}
      className="link group inline-flex items-center gap-2 text-sm text-secondary-foreground transition-colors duration-200 hover:text-primary-foreground"
    >
      <FiArrowLeft
        aria-hidden
        className="transition-transform duration-200 group-hover:-translate-x-1"
      />
      {backLabel}
    </Link>
    {children}
  </main>
);

export default PageShell;
