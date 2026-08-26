import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  /**
   * Stretch to fill its grid cell instead of hugging its content.
   *
   * `h-fit` was the default and it beat grid stretch, which is why the About
   * grid had ragged bottoms — and why the `md:h-full` escapes scattered
   * through the cards did nothing.
   */
  fill?: boolean;
}

/**
 * The surface every block on the About grid sits on.
 *
 * The `gradient-ring` class (globals.css) paints the signature gradient into a
 * 1px transparent border. It sits dimmed until the card is hovered or
 * something inside it takes focus. Do not put a `bg-*` utility on a ringed
 * element — the ring is painted through `background-image`, so a background
 * utility wipes it out. Set `--card-surface` instead.
 */
const Card = ({ title, children, className, fill = false }: CardProps) => {
  return (
    <div
      className={cn(
        "gradient-ring relative w-full overflow-hidden rounded-2xl p-6 text-primary-foreground",
        fill ? "flex h-full flex-col" : "h-fit",
        className
      )}
    >
      {/*
        Scrolls rather than clips. The bento gives each card a fixed row span
        so the bottoms line up, which means a card whose content outgrows its
        cell has to do something — and quietly cutting the last paragraph off
        is the one option that looks like a bug.
      */}
      <div
        className={cn(
          "flex flex-col gap-y-6",
          fill && "min-h-0 flex-1 overflow-y-auto pr-1"
        )}
      >
        {title ? (
          <div className="font-pixel">
            <p className="text-lg uppercase">{title}</p>
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
};

export default Card;
