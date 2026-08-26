"use client";

import Image from "next/image";
import Link from "next/link";
import { HeadingAnimatedSvg } from "@/components/heading/HeadingAnimatedSVG";
import shadeImg from "@/public/assets/images/background/polymophic-bg.jpg";
import { menuLinks } from "@/data/Links";
import { useHashNavigation } from "@/lib/useHashNavigation";

interface MenuCardProps {
  closeMenu: () => void;
}

const MenuCard = ({ closeMenu }: MenuCardProps) => {
  const handleLinkClick = useHashNavigation(closeMenu);

  return (
    <div className="w-full h-auto min-h-[320px] lg:min-h-[427px] gap-8 lg:gap-[70px] bg-[#1e36ea] rounded-[10px] flex-col justify-between items-start flex relative overflow-hidden pt-6 lg:pt-10 px-[25px] pb-5 shadow-md">
      {/* Header */}
      <div className="w-full flex relative justify-between items-center">
        <div className="uppercase font-bold text-xl sm:text-2xl text-white">
          Who is SIYA?
        </div>
        <HeadingAnimatedSvg animated text="LEARN MORE ABOUT SIYA" />
      </div>
      {/* Menu */}
      <div className="z-40 w-full flex flex-col gap-y-[5px] justify-center items-start relative">
        {menuLinks.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            onClick={(e) => handleLinkClick(e, link.link)}
            className="text-[#fdf825] uppercase text-[28px] sm:text-[34px] lg:text-[42px] leading-[95%] lg:leading-[85%] transition-colors duration-75 hover:text-white"
          >
            {link.title}
          </Link>
        ))}
      </div>
      {/* Image shade */}
      <Image
        src={shadeImg}
        alt=""
        aria-hidden
        sizes="(max-width: 1024px) 100vw, 500px"
        className="w-full h-full mix-blend-overlay absolute top-0 right-0 left-0 bottom-0"
      />
    </div>
  );
};

export default MenuCard;
