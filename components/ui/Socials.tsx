import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import Button from "./Button";

const socials = [
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    link: "https://www.linkedin.com/in/siyabonga-hadebe-25385620b",
    username: "Siyabonga Hadebe",
  },
  {
    icon: <FaInstagram className="w-5 h-5" />,
    link: "https://www.instagram.com/psyfo_c_ya/",
    username: "psyfo_c_ya",
  },
];

const Socials = () => {
  return (
    <div className="flex items-center flex-wrap gap-3">
      {socials.map((social, i) => (
        <Button key={i} link={social.link} className="w-7 h-7 grid place-items-center">
          {social.icon}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
