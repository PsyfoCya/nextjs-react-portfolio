import { cn } from "@/lib/utils";
import { FC } from "react";

interface ChipProps {
  label: string;
  className?: string;
}

const Chip: FC<ChipProps> = ({ label, className }) => (
  <span
    className={cn(
      "rounded-full border border-border bg-white/[0.04] px-2.5 py-1",
      "text-[11px] font-medium uppercase tracking-wide text-secondary-foreground",
      className
    )}
  >
    {label}
  </span>
);

export default Chip;
