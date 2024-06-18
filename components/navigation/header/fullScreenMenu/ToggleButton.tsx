
import { cn } from "@/lib/utils";

const ToggleButton = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
  return (
    <button onClick={() => setOpen((prev: any) => !prev)} className="fixed right-4 top-4 m-5 z-50 w-20 h-20 rounded-full bg-[#323E56] cursor-pointer">
      <div className="relative flex items-center justify-center h-full">
        <div className="flex flex-col gap-y-2 transform transition-all duration-300 origin-center overflow-hidden">
          <div
            className={cn(
              "bg-white h-[2px] w-7 transform transition-all duration-300",
              {
                "rotate-45 translate-y-2.5": open,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-white h-[2px] w-7 transform transition-all duration-300",
              {
                "opacity-0": open,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-white h-[2px] w-3.5 transform transition-all duration-300",
              {
                "-rotate-45 -translate-y-2.5 w-7": open,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default ToggleButton;
