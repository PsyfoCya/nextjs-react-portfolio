// import { HeadingAnimatedSvg } from "@/components/heading/HeadingAnimatedSVG";
// import Image from "next/image";
// import Link from "next/link";
// import shadeImg from "@/public/assets/images/background/polymophic-bg.jpg"

// const myLinks = [
//   {
//     title: "ABOUT",
//     link: "#about",
//   },
//   {
//     title: "BACKGROUND",
//     link: "#about",
//   },
//   {
//     title: "EXPERIENCE",
//     link: "#about",
//   },
//   {
//     title: "EDUCATION",
//     link: "#about",
//   },
//   {
//     title: "CERTIFICATIONS",
//     link: "#about",
//   },
//   {
//     title: "TECH STACK",
//     link: "#about",
//   },
//   {
//     title: "GALLERY",
//     link: "#about",
//   },
// ];

// const MenuCard = () => {
//   return (
//     <div className="w-full h-auto min-h-[427px] gap-[70px] bg-[#1e36ea] rounded-[10px] flex-col justify-between items-start flex relative overflow-hidden pt-10 px-[25px] pb-5 shadow-md">
//       {/* Header */}
//       <div className="w-full flex relative justify-between items-center">
//         <div className="uppercase font-bold text-2xl text-white">
//           Who is SIYA?
//         </div>
//         <HeadingAnimatedSvg animated text="LEARN MORE ABOUT SIYA" />
//       </div>
//       {/* Menu */}
//       <div className="z-40 w-full flex flex-col gap-y-[5px] justify-center items-start relative">
//         {
//             myLinks.map((link, i) => (
//                 <Link key={i} href={link.link} className="text-[#fdf825] uppercase text-[52px] leading-[85%] transition-colors duration-75 hover:text-white">
//                     {link.title}
//                 </Link>
//             ))
//         }
//       </div>
//       {/* Image shade */}
//       <Image src={shadeImg} alt="bg-shade-img" className="w-full h-full mix-blend-overlay absolute top-0 right-0 left-0 bottom-0"/>
//     </div>
//   );
// };

// export default MenuCard;

import { HeadingAnimatedSvg } from "@/components/heading/HeadingAnimatedSVG";
import Image from "next/image";
import shadeImg from "@/public/assets/images/background/polymophic-bg.jpg";
import { FC } from "react";

const myLinks = [
  {
    title: "ABOUT",
    link: "#about",
  },
  {
    title: "BACKGROUND",
    link: "#background",
  },
  {
    title: "EXPERIENCE",
    link: "#experience",
  },
  {
    title: "EDUCATION",
    link: "#education",
  },
  {
    title: "CERTIFICATIONS",
    link: "#certifications",
  },
  {
    title: "TECH STACK",
    link: "#tech-stack",
  },
  {
    title: "GALLERY",
    link: "#gallery",
  },
];

interface MenuCardProps {
  closeMenu: () => void;
}

const MenuCard: FC<MenuCardProps> = ({ closeMenu }) => {
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    closeMenu();
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-auto min-h-[427px] gap-[70px] bg-[#1e36ea] rounded-[10px] flex-col justify-between items-start flex relative overflow-hidden pt-10 px-[25px] pb-5 shadow-md">
      {/* Header */}
      <div className="w-full flex relative justify-between items-center">
        <div className="uppercase font-bold text-2xl text-white">
          Who is SIYA?
        </div>
        <HeadingAnimatedSvg animated text="LEARN MORE ABOUT SIYA" />
      </div>
      {/* Menu */}
      <div className="z-40 w-full flex flex-col gap-y-[5px] justify-center items-start relative">
        {myLinks.map((link, i) => (
          <a
            key={i}
            href={link.link}
            onClick={(e) => handleLinkClick(e, link.link)}
            className="text-[#fdf825] uppercase text-[52px] leading-[85%] transition-colors duration-75 hover:text-white"
          >
            {link.title}
          </a>
        ))}
      </div>
      {/* Image shade */}
      <Image
        src={shadeImg}
        alt="bg-shade-img"
        className="w-full h-full mix-blend-overlay absolute top-0 right-0 left-0 bottom-0"
      />
    </div>
  );
};

export default MenuCard;
