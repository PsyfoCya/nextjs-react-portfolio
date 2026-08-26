import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { ReactNode } from "react";

interface TooltipProps {
  title: string;
  /** A logo asset. Omit it and pass `icon` instead. */
  image?: string | StaticImport;
  /** Icon component, for tools we don't ship a PNG for. */
  icon?: ReactNode;
  bgColor?: string;
}

/**
 * A tech-stack tile with its name on hover.
 *
 * Hover is CSS, not state. This renders once per item in the stack grid, and
 * the previous version held a `useState` flag per tile, so moving the cursor
 * across the grid re-rendered a component for every tile it passed over. It is
 * also now a server component — nothing here needs the browser.
 */
const Tooltip = ({ title, image, icon, bgColor }: TooltipProps) => (
  <div
    className={cn(
      "link group relative w-10 h-10 cursor-pointer grid place-items-center",
      "border border-border rounded-xl",
      "transition-transform duration-200 hover:scale-110",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    )}
    style={{ background: bgColor || "#2D2C33" }}
    title={title}
    tabIndex={0}
  >
    <div className="w-[27px] h-[27px] grid place-items-center text-[22px] text-primary-foreground">
      {image ? (
        <Image
          src={image}
          alt={title}
          sizes="27px"
          className="w-full h-full overflow-clip object-contain"
        />
      ) : (
        icon
      )}
    </div>

    {/* Name, revealed on hover or keyboard focus. */}
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-6 z-10 rounded-2xl bg-black/20 px-1.5 py-0.5 backdrop-blur-[6px]",
        "opacity-0 transition-opacity duration-200",
        "group-hover:opacity-100 group-focus-visible:opacity-100"
      )}
    >
      <p className="font-pixel text-[10px] whitespace-nowrap">{title}</p>
    </div>
  </div>
);

export default Tooltip;
