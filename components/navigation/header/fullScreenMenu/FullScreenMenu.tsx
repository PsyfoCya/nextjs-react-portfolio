// import { motion } from "framer-motion";
// import { menuSlide } from "./animations";
// import Curve from "./Curve";
// import Profile from "@/components/ui/Profile";
// import NavLink from "./NavLink";
// import Link from "next/link";
// import MenuCard from "./MenuCard";

// const FullScreenMenu = () => {
//   return (
//     <motion.div
//       variants={menuSlide}
//       animate="enter"
//       exit="exit"
//       initial="initial"
//       className="h-screen w-full bg-black fixed top-0 right-0 text-primary-foreground z-40 font-oswald"
//     >
//       <div className="relative w-full pl-[5%]">
//         {/* Profile */}
//         <div className="absolute top-8">
//           <Profile />
//         </div>
//       </div>

//       {/* Menu and Card */}
//       <div className="absolute bottom-32 w-full lg:px-[5%]">
//         <div
//           className="grid relative"
//           style={{ gridTemplateColumns: "1fr 500px" }}
//         >
//           <div className="pl-4 flex flex-col justify-end">
//             {navItems.map((item, index) => (
//               <NavLink key={index} data={{ ...item, index }} />
//             ))}
//           </div>
//           {/* Menu about card */}
//           <MenuCard/>
//         </div>
//       </div>

//       {/* Footer links */}
//       <div className="w-[95%] pl-[5%] absolute bottom-8">
//         <div className="flex flex-wrap items-center justify-between uppercase text-white">
//           {/* ---------- Left ----------- */}
//           <div className="hidden">
//             <Link href="/">LEGAL NOTICE</Link>
//             <Link href="/">404</Link>
//             <Link href="/">LEGAL STYLE</Link>
//           </div>
//           {/* ---------- Middel ----------- */}
//           <div className="flex items-center gap-4">
//             <Link href="https://www.linkedin.com/in/siyabonga-hadebe-25385620b/" target="_blank">LINKEDIN</Link>
//             <Link href="https://www.instagram.com/psyfo_c_ya/" target="_blank">INSTAGRAM</Link>
//             <Link href="https://www.youtube.com/@noiamnotsomebodyelse" target="_blank">YOUTUBE</Link>
//           </div>
//           {/* ---------- Right ----------- */}
//           <div className="flex items-center gap-4">
//             <Link href="/">©️2024</Link>
//           </div>
//         </div>
//       </div>
      

//       {/*Curve SVG Effect */}
//       <Curve />
//     </motion.div>
//   );
// };

// export default FullScreenMenu;

// const navItems = [
//   {
//     title: "Home",
//     href: "/#home",
//   },
//   {
//     title: "Featured",
//     href: "/#featured",
//   },
//   {
//     title: "About",
//     href: "/#about",
//   },
//   {
//     title: "Projects",
//     href: "/#projects",
//   },
//   {
//     title: "Contact",
//     href: "/#contact",
//   },
// ];


import { motion } from "framer-motion";
import { menuSlide } from "./animations";
import Curve from "./Curve";
import Profile from "@/components/ui/Profile";
import NavLink from "./NavLink";
import Link from "next/link";
import MenuCard from "./MenuCard";
import { FC } from "react";

interface FullScreenMenuProps {
  closeMenu: () => void; // Define the type for closeMenu
}

const FullScreenMenu: FC<FullScreenMenuProps> = ({ closeMenu }) => {
  return (
    <motion.div
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className="h-screen w-full bg-black fixed top-0 right-0 text-primary-foreground z-40 font-oswald"
    >
      <div className="relative w-full pl-[5%]">
        <div className="absolute top-8">
          <Profile />
        </div>
      </div>

      <div className="absolute bottom-32 w-full lg:px-[5%]">
        <div className="grid relative" style={{ gridTemplateColumns: "1fr 500px" }}>
          <div className="pl-4 flex flex-col justify-end">
            {navItems.map((item, index) => (
              <NavLink key={index} data={{ ...item, index }} closeMenu={closeMenu} />
            ))}
          </div>
          <MenuCard closeMenu={closeMenu} />
        </div>
      </div>

      <div className="w-[95%] pl-[5%] absolute bottom-8">
        <div className="flex flex-wrap items-center justify-between uppercase text-white">
          <div className="hidden">
            <Link href="/">LEGAL NOTICE</Link>
            <Link href="/">404</Link>
            <Link href="/">LEGAL STYLE</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://www.linkedin.com/in/siyabonga-hadebe-25385620b/" target="_blank">LINKEDIN</Link>
            <Link href="https://www.instagram.com/psyfo_c_ya/" target="_blank">INSTAGRAM</Link>
            <Link href="https://www.youtube.com/@noiamnotsomebodyelse" target="_blank">YOUTUBE</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">©️2024</Link>
          </div>
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
    title: "Featured",
    href: "#featured",
  },
  {
    title: "About",
    href: "#about",
  },
  // {
  //   title: "Projects",
  //   href: "#projects",
  // },
  {
    title: "Contact",
    href: "#contact",
  },
];
