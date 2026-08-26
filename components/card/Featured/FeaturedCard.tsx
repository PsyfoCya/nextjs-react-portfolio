import Link from "next/link";
import Header from "./Header";
import Video from "./Video";

interface FeaturedCardProps {
  title: string;
  tag: string;
  video: string;
  active: boolean;
  /** Live site for the project. Falls back to a non-interactive card. */
  link?: string;
}

const FeaturedCard = ({
  title,
  tag,
  video,
  active,
  link,
}: FeaturedCardProps) => {
  const body = (
    <div className="link w-full h-full bg-secondary-background border border-border shadow-lg rounded-3xl cursor-pointer flex flex-col gap-2 flex-nowrap p-2">
      {/* Header */}
      <Header title={title} tag={tag} />

      {/* Body */}
      <div className="relative p-6 w-full items-center justify-center h-[340px] sm:h-[440px] lg:h-[550px] border border-border rounded-3xl">
        {/* Video */}
        <Video video={video} active={active} title={title} />
      </div>
    </div>
  );

  if (!link) return body;

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${title}`}
      className="block h-full"
    >
      {body}
    </Link>
  );
};

export default FeaturedCard;
