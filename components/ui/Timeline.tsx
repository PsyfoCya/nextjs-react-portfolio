import Link from "next/link";
import { FC, ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

// Timeline ------------------------------------------------------------------

interface TimelineProps {
  children: ReactNode;
}

const Timeline: FC<TimelineProps> = ({ children }) => {
  return <div className="flex flex-col gap-y-6">{children}</div>;
};

export default Timeline;

// Timeline Item -------------------------------------------------------------

interface TimelineItemProps {
  date: string;
  title: string;
  subTitle: string;
  link?: string;
  tag?: string;
}

export const TimelineItem: FC<TimelineItemProps> = ({
  date,
  subTitle,
  title,
  link,
  tag,
}) => {
  const isExternal = link?.startsWith("http");

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-6 justify-start relative">
      {/* Date Timeline */}
      <div className="h-auto sm:w-[7.5rem] flex-none break-words">
        <p className="text-sm sm:text-base text-secondary-foreground sm:whitespace-pre">
          {date}
        </p>
      </div>
      {/* Right Side */}
      <div className="flex min-w-0 gap-x-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          {/* Title */}
          <div className="text-primary-foreground break-words">
            <p className="leading-6 font-medium text-sm">{title}</p>
          </div>
          {/* Subtitle */}
          <div className="flex items-center gap-2 w-full">
            {link ? (
              <Link
                href={link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <Body link={link} subTitle={subTitle} tag={tag} />
              </Link>
            ) : (
              <Body subTitle={subTitle} tag={tag} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Timeline Item Body --------------------------------------------------------

interface BodyProps {
  subTitle: string;
  tag?: string;
  link?: string;
}

const Body: FC<BodyProps> = ({ link, subTitle, tag }) => {
  return (
    <div className="text-secondary-foreground w-full gap-2 sm:gap-3 flex flex-wrap items-center">
      {link ? <FiArrowUpRight className="shrink-0" /> : null}
      <p className="text-sm font-normal sm:w-[15rem] leading-6 mt-1">{subTitle}</p>

      {tag ? (
        <div className="rounded-[20px] bg-white/5 py-0.5 px-1.5 sm:ms-2">
          <p className="text-[10px] font-normal text-secondary-foreground whitespace-nowrap">
            {tag}
          </p>
        </div>
      ) : null}
    </div>
  );
};
