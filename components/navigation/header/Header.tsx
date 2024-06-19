// import FancyButton from "@/components/ui/FancyButton";
// import Profile from "@/components/ui/Profile";
// import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
// import { FaArrowRight } from "react-icons/fa6";
// import FullScreenMenu from "./fullScreenMenu/FullScreenMenu";
// import { useEffect, useState } from "react";
// import ToggleButton from "./fullScreenMenu/ToggleButton";
// import { AnimatePresence } from "framer-motion";

// const Header = () => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [showToggle, setShowToggle] = useState<boolean>(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY >= 80) {
//         setShowToggle(true);
//       } else {
//         setShowToggle(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="w-full flex items-center justify-center md:justify-between">
//       <Profile />
//       <div className="hidden md:inline">
//         <MagneticWrapper>
//           <FancyButton text="Contact Me" icon={<FaArrowRight />} />
//         </MagneticWrapper>
//       </div>

//       {/* Toggle Btn */}
//       {showToggle && <ToggleButton open={open} setOpen={setOpen} />}

//       {/* Full Screen Menu */}
//       <AnimatePresence mode="wait">
//         {open && <FullScreenMenu />}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Header;


import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import FancyButton from "@/components/ui/FancyButton";
import Profile from "@/components/ui/Profile";
import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
import FullScreenMenu from "./fullScreenMenu/FullScreenMenu";
import ToggleButton from "./fullScreenMenu/ToggleButton";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showToggle, setShowToggle] = useState<boolean>(false);

  const scrollToContact = () => {
    console.log("Button clicked");
    const contactSection = document.getElementById("contact");
    console.log("Contact section:", contactSection);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <Profile />
      <div className="hidden md:inline">
        <MagneticWrapper>
          <FancyButton text="Contact Me" icon={<FaArrowRight />} onClick={scrollToContact}/>
        </MagneticWrapper>
      </div>

      {/* Toggle Btn */}
      {showToggle && <ToggleButton open={open} setOpen={setOpen} />}

      {/* Full Screen Menu */}
      <AnimatePresence mode="wait">
        {open && <FullScreenMenu closeMenu={closeMenu} />}
      </AnimatePresence>
    </div>
  );
};

export default Header;
