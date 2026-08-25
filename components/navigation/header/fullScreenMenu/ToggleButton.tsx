import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface ToggleButtonProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToggleButton = ({ open, setOpen }: ToggleButtonProps) => {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={() => setOpen((prev) => !prev)}
      className="fixed right-2 top-2 sm:right-4 sm:top-4 m-3 sm:m-5 z-50 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#323E56] cursor-pointer"
    >
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
