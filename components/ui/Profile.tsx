import Image from "next/image";
import myImage from "@/public/assets/images/me/Psyfo.png";
import { cn } from "@/lib/utils";

const Profile = () => {
  return (
    <div className="flex items-center gap-x-2 transition-colors duration-75 text-primary-foreground">
      {/* Photo */}
      <div
        className={cn(
          "relative w-[100px] h-[100px] rounded-full flex items-center justify-center", "fancy-bg"
        )}
      >
        <Image
          src={myImage}
          alt="Siyabonga Hadebe"
          className="w-[95px] h-[95px] border-[0.2vw] border-blue-cosmos rounded-full object-cover"
        />

        {/* Online */}
        <div className="w-3 h-3 rounded-full bg-green-benzol border border-blue-cosmos absolute right-0 bottom-5"></div>
      </div>
      {/* Name  */}
      <div className="text-3xl font-medium"> Siyabonga Hadebe</div>
    </div>
  );
};

export default Profile;
