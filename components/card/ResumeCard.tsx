import Image from "next/image";
import Card from "../ui/Card";
import signature from "@/public/assets/images/me/signature (1).png";
import Socials from "../ui/Socials";

const ResumeCard = () => {
  return (
    <Card className="md:h-full 2xl:h-fit">
      <p className="text-lg xl:text-2xl font-medium text-primary-foreground leading-[150%]">
        Frontend developer with two years on a production platform, working in
        React, TypeScript and Next.js. I own shared components end to end —
        API design, accessibility, documentation, release — and I&apos;m as
        comfortable in a franchise back office as I am in a checkout flow.
        I hold a Diploma in IT in Software Development from IIE Rosebank
        College, plus certifications from freeCodeCamp and LinkedIn Learning.
        The short version: I like problems where the correct answer isn&apos;t
        the first one.
      </p>
      {/* Signature */}
      <div>
        <Image src={signature} alt="Siyabonga Hadebe" />
      </div>
      {/* Socials */}
      <div className="flex items-center justify-between w-11/12 md:absolute md:bottom-6 md:left-6">
        <Socials />
      </div>
    </Card>
  );
};

export default ResumeCard;
