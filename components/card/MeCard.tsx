import Image from "next/image";
import Card from "../ui/Card";
import { galleryImages } from "@/data/Gallery";
import { cn } from "@/lib/utils";

const myImage = galleryImages[0].img;

const MeCard = () => {
  return (
    <Card className="md:h-full 2xl:h-full">
      <div className="w-full h-[400px] sm:h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={myImage}
          alt="Siyabonga Hadebe"
          className="absolute top-0 left-0 bottom-0 right-0 h-full w-full object-cover"
        />
        {/* tags */}
        <div className="absolute top-[65%] space-y-2 ">
          <Tag
            text="Hello, World! 👋"
            className="rounded-tl-2xl rounded-br-2xl rounded-bl-2xl"
          />
          <Tag
            text="I'm Siyabonga Hadebe"
            className="rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
          />
          <Tag
            text="Software Developer"
            className="rounded-tl-2xl  rounded-br-2xl rounded-bl-2xl"
          />
        </div>
      </div>
      <div className="h-[2.4rem]"></div>
    
    </Card>
  );
};

export default MeCard;

const Tag = ({ text, className }: { text: string; className: string }) => {
  return (
    <div className={cn("bg-black/[0.7] w-fit py-1.5 px-3", className)}>
      <p className="text-primary-foreground leading-[110%] font-bold">{text}</p>
    </div>
  );
};
