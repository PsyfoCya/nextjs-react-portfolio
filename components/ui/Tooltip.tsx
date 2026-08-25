import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC, ReactNode, useState } from "react";

interface TooltipProps {
  title: string;
  /** A logo asset. Omit it and pass `icon` instead. */
  image?: string | StaticImport;
  /** Icon component, for tools we don't ship a PNG for. */
  icon?: ReactNode;
  bgColor?: string;
}

const Tooltip: FC<TooltipProps> = ({ title, image, icon, bgColor }) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "link relative bg-[#2D2C33] w-10 h-10 transform cursor-pointer grid place-items-center",
        "border border-border rounded-xl",
        "hover:scale-110 transition-all duration-200"
      )}
      style={{ background: `${bgColor || "#2D2C33"}` }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      title={title}
    >
      <div className="w-[27px] h-[27px] grid place-items-center text-[22px] text-primary-foreground">
        {image ? (
          <Image
            src={image}
            alt={title}
            className="w-full h-full overflow-clip object-contain"
          />
        ) : (
          icon
        )}
      </div>
      {/* Title */}
      {active ? (
        <div className="absolute -top-6 z-10 bg-black/[0.2] py-0.5 px-1.5 rounded-2xl backdrop-blur-[6px] transition-all duration-200">
          <p className="font-pixel text-[10px] whitespace-nowrap"> {title}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Tooltip;
