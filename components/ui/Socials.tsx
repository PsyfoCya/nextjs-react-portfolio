import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Button from "./Button";

const socials = [
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    link: "https://www.linkedin.com/in/siyabonga-hadebe-25385620b",
    label: "LinkedIn",
  },
  {
    icon: <FaGithub className="w-4 h-4" />,
    link: "https://github.com/PsyfoCya",
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
