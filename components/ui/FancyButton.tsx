"use client";

import { ReactNode } from "react";

interface FancyButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
}

/**
 * The gradient-ringed "Contact Me" call to action.
 *
 * A real `<button>`. It used to be an `<a>` with an `onClick` and no `href`,
 * which meant the site's primary CTA could not be reached by keyboard or
 * announced as a control — and `cursor-none` removed the only hint that it was
 * interactive at all.
 *
 * The gradient lives on the wrapper; the inner surface is opaque black and goes
 * transparent on hover to reveal it.
 */
const FancyButton = ({ text, icon, onClick }: FancyButtonProps) => (
  <button type="button" onClick={onClick} className="fancy-btn group block">
    <div className="flex items-center gap-2 rounded-[108em] bg-black px-10 py-5 text-3xl font-bold text-primary-foreground transition-all duration-500 group-hover:bg-transparent group-hover:text-white group-focus-visible:bg-transparent">
      <span>{text}</span>
      <span className="transition-transform duration-500 group-hover:translate-x-[.75vw]">
        {icon}
      </span>
    </div>
  </button>
);

export default FancyButton;
