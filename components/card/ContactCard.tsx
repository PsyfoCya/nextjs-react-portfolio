import { ReactNode } from "react";
import Button from "../ui/Button";
import ExternalLink from "../ui/ExternalLink";

interface ContactCardProps {
  title: string;
  icon: ReactNode;
  text: string;
  btnText: string;
  /** Where the button goes — a mailto: or an external profile. */
  href: string;
}

const ContactCard = ({
  title,
  icon,
  text,
  btnText,
  href,
}: ContactCardProps) => {
  return (
    <div className="gradient-ring relative rounded-lg overflow-hidden py-5 px-[25px] shadow-md">
      <div className="z-20 flex flex-col gap-8 justify-between items-start">
        {/* Header */}
        <div className="flex items-center gap-x-2">
          <span className="bg-white w-8 h-8 rounded-lg grid place-items-center">
            {icon}
          </span>
          <h1>{title}</h1>
        </div>
        <div>
          <h2 className="font-bold text-xl sm:text-2xl break-words">{text}</h2>
        </div>
        <ExternalLink href={href} className="link">
          <Button className="w-24">{btnText}</Button>
        </ExternalLink>
      </div>
    </div>
  );
};

export default ContactCard;
