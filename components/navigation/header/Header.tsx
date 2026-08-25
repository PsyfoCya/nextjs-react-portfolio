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
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowToggle(window.scrollY >= 80);
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
          <FancyButton
            text="Contact Me"
            icon={<FaArrowRight />}
            onClick={scrollToContact}
          />
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
