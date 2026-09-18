import Image from "next/image";
import Card from "../ui/Card";
import signature from "@/public/assets/images/me/signature (1).png";
import Socials from "../ui/Socials";

const ResumeCard = () => {
  return (
    <Card title="Resume" fill>
      <p className="text-base font-medium leading-[160%] text-primary-foreground xl:text-lg">
        Frontend developer with two years on a production platform, working in
        React, TypeScript and Next.js. I own shared components end to end — API
        design, accessibility, documentation, release — and I&apos;m as
        comfortable in a franchise back office as I am in a checkout flow. I
        hold a Diploma in IT in Software Development from IIE Rosebank College,
        plus certifications from freeCodeCamp and LinkedIn Learning. The short
        version: I like problems where the correct answer isn&apos;t the first
        one.
      </p>
      {/*
        Pushed to the bottom by `mt-auto` rather than positioned absolutely.
        The old `md:absolute md:bottom-6` assumed the card was always taller
        than its prose, and overlapped the signature when it wasn't.
      */}
      <div className="mt-auto flex flex-col gap-4">
        <Image
          src={signature}
          alt="Siyabonga Hadebe"
          sizes="(max-width: 768px) 60vw, 260px"
          className="h-auto w-[60%] max-w-[260px]"
        />
        <Socials />
      </div>
    </Card>
  );
};

export default ResumeCard;
