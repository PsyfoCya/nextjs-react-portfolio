"use client";

import { FaArrowRight } from "react-icons/fa6";
import FancyButton from "@/components/ui/FancyButton";
import MagneticWrapper from "@/components/visualEffects/MagneticWrapper";
import { scrollToHash } from "@/lib/utils";

/**
 * The "Contact Me" call to action, used by both the header and the landing
 * section.
 *
 * It exists as its own client component so that `sections/Landing.tsx` can stay
 * a server component: the only thing that needed the browser there was this
 * button's click handler. Both callers previously carried a byte-identical
 * private copy of it.
 */
const ContactCta = () => (
  <MagneticWrapper>
    <FancyButton
      text="Contact Me"
      icon={<FaArrowRight />}
      onClick={() => scrollToHash("#contact")}
    />
  </MagneticWrapper>
);

export default ContactCta;
