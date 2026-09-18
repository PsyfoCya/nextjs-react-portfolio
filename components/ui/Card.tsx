import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        // `gradient-ring` replaces the border and the background: the ring is
        // painted through `background-image`, so a `bg-*` utility would wipe it out.
        "gradient-ring relative w-full h-fit rounded-2xl p-6 text-primary-foreground overflow-hidden",
        className
      )}
    >
     <div className="flex flex-col gap-y-6">
        {/* {Title} */}
        {
            title ? (<div className="font-pixel">
                <p className="uppercase text-lg">{title}</p>
            </div>)
            : null
        }

        {/* Children */}
        {children}
     </div>
    </div>
  );
};

export default Card;
