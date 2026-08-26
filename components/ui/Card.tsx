import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * The surface every block on the About grid sits on.
 *
 * The `ring` class (globals.css) paints the signature gradient into a 1px
 * transparent border. It sits desaturated until the card is hovered or
 * something inside it takes focus, at which point it brightens and begins to
 * turn. `overflow-hidden` is deliberately absent from the border itself —
 * clipping it would cut the ring off.
 */
const Card = ({ title, children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "gradient-ring relative h-fit w-full overflow-hidden rounded-2xl p-6 text-primary-foreground",
        className
      )}
    >
      <div className="flex flex-col gap-y-6">
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
