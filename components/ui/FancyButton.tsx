"use client";

// import { FC, ReactNode } from "react";

// interface FancyButtonProps {
//   text: string;
//   icon: ReactNode;
// }

// const FancyButton: FC<FancyButtonProps> = ({ text, icon }) => {
//   return (
//     <a className="fancy-btn">
//       <div className="group bg-black hover:bg-transparent text-primary-foreground hover:text-white rounded-[108em] py-5 px-10 flex items-center gap-2 font-bold text-3xl cursor-none transition-all duration-500">
//         <span>{text}</span>
//         <span className="group-hover:translate-x-[.75vw] transition-transform duration-500">
//           {icon}
//         </span>
//       </div>
//     </a>
//   );
// };

// export default FancyButton;

import { FC, ReactNode } from "react";

interface FancyButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void; // Add onClick as an optional prop
}

const FancyButton: FC<FancyButtonProps> = ({ text, icon, onClick }) => {
  return (
    <a className="fancy-btn" onClick={onClick}>
      <div className="group bg-black hover:bg-transparent text-primary-foreground hover:text-white rounded-[108em] py-5 px-10 flex items-center gap-2 font-bold text-3xl cursor-none transition-all duration-500 z-50">
        <span>{text}</span>
        <span className="group-hover:translate-x-[.75vw] transition-transform duration-500">
          {icon}
        </span>
      </div>
    </a>
  );
};

export default FancyButton;

