"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ContactCta from "@/components/ui/ContactCta";
import Profile from "@/components/ui/Profile";
import FullScreenMenu from "./fullScreenMenu/FullScreenMenu";
import ToggleButton from "./fullScreenMenu/ToggleButton";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showToggle, setShowToggle] = useState<boolean>(false);

  useEffect(() => {
    // Coalesced into a frame rather than handled per event: scroll fires far
    // more often than 60Hz, and this only ever flips a boolean.
    let queued = false;
    const handleScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        setShowToggle(window.scrollY >= 80);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <Profile />
      <div className="hidden md:inline">
        <ContactCta />
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
