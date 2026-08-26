import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  className?: string;
}

const Chip = ({ label, className }: ChipProps) => (
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
