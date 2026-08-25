import { motion } from "framer-motion";
import Link from "next/link";
import { FC } from "react";
import { menuSlide } from "./animations";
import Curve from "./Curve";
import NavLink from "./NavLink";
import MenuCard from "./MenuCard";
import Profile from "@/components/ui/Profile";

interface FullScreenMenuProps {
  closeMenu: () => void;
}

const FullScreenMenu: FC<FullScreenMenuProps> = ({ closeMenu }) => {
  return (
    <motion.div
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className="h-screen w-full bg-black fixed top-0 right-0 text-primary-foreground z-40 font-oswald overflow-y-auto overscroll-contain"
    >
      {/*
        Absolute positioning pinned the panel to a desktop viewport. A flex
        column that can scroll keeps the whole menu reachable on a phone.
      */}
      <div className="relative z-40 flex min-h-screen flex-col gap-10 px-[5%] py-8 pr-20 sm:pr-[5%]">
        <Profile />

        <div className="grid flex-1 items-end gap-8 lg:[grid-template-columns:1fr_500px]">
          <div className="flex flex-col gap-1 pl-4 lg:justify-end">
            {navItems.map((item, index) => (
              <NavLink
                key={item.href}
                data={{ ...item, index }}
                closeMenu={closeMenu}
              />
            ))}
          </div>
          <MenuCard closeMenu={closeMenu} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 uppercase text-white">
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            <Link
              href="https://www.linkedin.com/in/siyabonga-hadebe-25385620b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </Link>
            <Link
              href="https://github.com/PsyfoCya"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </Link>
            <Link
              href="https://www.youtube.com/@noiamnotsomebodyelse"
              target="_blank"
              rel="noopener noreferrer"
            >
              YOUTUBE
            </Link>
          </div>
          <span className="text-sm sm:text-base">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <Curve />
    </motion.div>
  );
};

export default FullScreenMenu;

const navItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Work",
    href: "#work",
  },
  {
    title: "Featured",
    href: "#featured",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];
