import Image from "next/image";
import Card from "../ui/Card";
import { portrait } from "@/data/Gallery";
import { cn } from "@/lib/utils";

const MeCard = () => {
  return (
    <Card title="Me" fill>
      {/*
        `relative` matters. The portrait is `absolute inset-0`, and without a
        positioned ancestor here its nearest one was the Card itself — so it
        escaped this box and covered the title too.
      */}
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl">
        <Image
          src={portrait}
          alt="Siyabonga Hadebe"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
          placeholder="blur"
          className="object-cover"
        />

        <div className="absolute bottom-4 left-0 space-y-2">
          <Tag
            text="Hello, World! 👋"
            className="rounded-tl-2xl rounded-br-2xl rounded-bl-2xl"
          />
          <Tag
            text="I'm Siyabonga Hadebe"
            className="rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
          />
          <Tag
            text="Frontend Developer"
            className="rounded-tl-2xl rounded-br-2xl rounded-bl-2xl"
          />
          <Tag
            text="React · TypeScript · Next.js"
            className="rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
          />
        </div>
      </div>
    </Card>
  );
};

export default MeCard;

const Tag = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("w-fit bg-black/[0.7] px-3 py-1.5", className)}>
      <p className="font-bold leading-[110%] text-primary-foreground">{text}</p>
    </div>
  );
};
