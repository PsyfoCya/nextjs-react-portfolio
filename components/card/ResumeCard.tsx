import Image from "next/image";
import Card from "../ui/Card";
import signature from "@/public/assets/images/me/signature (1).png";
import Button from "../ui/Button";
import { FaDownload } from "react-icons/fa6";
import Socials from "../ui/Socials";

const ResumeCard = () => {
  return (
    <Card className="md:h-full 2xl:h-fit">
      <p className="text-lg xl:text-2xl font-medium text-primary-foreground">
        Software Developer and web wizard and digital handyman. I am qualified
        by IIE in the course of IT and Software Development Diploma and I&apos;m
        armed with a years worth of work experence. I have completed well over 5
        certificatoins from various vendors i.e., freeCodeCamp (3 Certificates),
        LinkedIn Learning (5 Certificates) as a means to expressing my
        commitment to lifelong learning. I&apos;ve tinkered with various playgrounds
        and, I have got a toolbox that&apos;s packed to the brim with front-end
        glossyness and backend brawn.
      </p>
      {/* Signature */}
      <div>
        <Image src={signature} alt="Siyabonga Hadebe" />
      </div>
      {/* Socials and Resume btn */}
      <div className="flex items-center justify-between w-11/12 md:absolute md:bottom-6 md:left-6 md:w-[calc(100% - 48px)]">
        {/* Socials */}
        <Socials />
        {/* Download btn */}
        <Button className="hidden">
          <FaDownload /> Resume
        </Button>
      </div>
    </Card>
  );
};

export default ResumeCard;
