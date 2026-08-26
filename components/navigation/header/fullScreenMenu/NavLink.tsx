"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { scale, slide } from "./animations";
import { useHashNavigation } from "@/lib/useHashNavigation";

interface NavLinkProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  closeMenu: () => void;
}

const NavLink = ({ data, closeMenu }: NavLinkProps) => {
  const { title, href, index } = data;
  const [hovered, setHovered] = useState<boolean>(false);

  // Route links navigate normally; only in-page anchors get intercepted.
  const handleLinkClick = useHashNavigation(closeMenu);

  return (
    <motion.div
      className="relative flex items-center"
      variants={slide}
      custom={index}
      initial="initial"
      animate="enter"
      exit="exit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        variants={scale}
        animate={hovered ? "open" : "closed"}
        className="w-2 h-2.5 bg-white rounded-full absolute -left-[30px]"
      ></motion.div>
      <Link
        href={href}
        onClick={(e) => handleLinkClick(e, href)}
        className="text-[9vw] lg:text-[6vw] uppercase leading-[110%] lg:leading-[96%] font-bold"
      >
        {title}
      </Link>
    </motion.div>
  );
};

export default NavLink;
