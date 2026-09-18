import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  link?: Url;
  isIcon?: boolean;
  className?: string;
  /** Accessible name — required when the button only renders an icon. */
  ariaLabel?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  link,
  isIcon,
  className,
  ariaLabel,
}) => {
  return (
    <>
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="w-10 h-10 cursor-pointer"
        >
          <ButtonBody className={className} isIcon={isIcon}>
            {children}
          </ButtonBody>
        </Link>
      ) : (
        <ButtonBody className={className} isIcon={isIcon}>
          {children}
        </ButtonBody>
      )}
    </>
  );
};

interface ButtonBodyProps {
  children: ReactNode;
  isIcon?: boolean;
  className?: string;
}

const ButtonBody: FC<ButtonBodyProps> = ({ children, isIcon, className }) => {
  return (
    <div className="flex-none w-auto h-full">
      <div
        className={cn(
          "gradient-ring flex items-center justify-center gap-2 rounded-full select-none whitespace-nowrap text-primary-foreground text-sm font-medium",
          className,
          isIcon ? "h-10 w-10" : "h-full w-max px-3 py-2"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
