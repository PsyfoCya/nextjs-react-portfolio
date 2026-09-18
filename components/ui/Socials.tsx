import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Button from "./Button";
import { socialLinks } from "@/data/Links";

const socials = [
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    link: socialLinks.linkedin,
    label: "LinkedIn",
  },
  {
    icon: <FaGithub className="w-4 h-4" />,
    link: socialLinks.github,
    label: "GitHub",
  },
];

const Socials = () => {
  return (
    <div className="flex items-center flex-wrap gap-3">
      {socials.map((social) => (
        <Button
          key={social.label}
          link={social.link}
          ariaLabel={social.label}
          className="w-7 h-7 grid place-items-center"
        >
          {social.icon}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
