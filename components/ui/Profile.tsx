import Image from "next/image";
import myImage from "@/public/assets/images/me/Psyfo.png";
import { cn } from "@/lib/utils";

const Profile = () => {
  return (
    <div className="flex items-center gap-x-2 transition-colors duration-75 text-primary-foreground">
      {/* Photo */}
      <div
        className={cn(
          "relative w-[68px] h-[68px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center shrink-0",
          "fancy-bg"
        )}
      >
        <Image
          src={myImage}
          alt="Siyabonga Hadebe"
          className="w-[64px] h-[64px] sm:w-[95px] sm:h-[95px] border-[0.2vw] border-blue-cosmos rounded-full object-cover"
        />

        {/* Online */}
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-benzol border border-blue-cosmos absolute right-0 bottom-3 sm:bottom-5"></div>
      </div>
      {/* Name  */}
      <div className="text-xl sm:text-3xl font-medium">Siyabonga Hadebe</div>
    </div>
  );
};

export default Profile;
