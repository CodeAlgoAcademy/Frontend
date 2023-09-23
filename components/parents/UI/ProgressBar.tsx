import React, { StyleHTMLAttributes } from "react";

interface Props {
   title: string;
   titleSize: "small" | "base";
   percentage: number;
   color: "red" | "green";
}

const ProgressBar = ({ title, titleSize, percentage, color }: Props) => {
   const progressBarStyle = {
      width: `${percentage <= 100 ? percentage : ""}%`,
   };
   const baseTitle = "min-w-[84px] max-w-[84px] text-base font-semibold";
   const smallTitle = "min-w-[84px] max-w-[84px] text-sm font-medium text-[#A8ABB0]";
   return (
      <div className="flex h-5 items-center">
         <p title={title} className={`w-full overflow-hidden truncate whitespace-nowrap ${titleSize === "base" ? baseTitle : smallTitle}`}>
            {title}
         </p>
         <span className="progress-indicator-bar relative h-full w-full rounded-r-xl bg-[#ECEDF3]">
            <span
               className={`top-0 left-0 block h-full rounded-r-xl pr-[10px] text-right text-sm text-black ${
                  color === "green" ? "green-progress-bar" : "red-progress-bar"
               }`}
               style={progressBarStyle}
            >
               {percentage}%
            </span>
         </span>
      </div>
   );
};

export default ProgressBar;
