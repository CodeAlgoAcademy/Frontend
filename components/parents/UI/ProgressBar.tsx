import React, { StyleHTMLAttributes } from "react";

interface Props {
   title: string;
   titleSize: "large" | "base";
   percentage: number;
   color: "red" | "green";
   containerSize: "large" | "base";
}

const ProgressBar = ({ title, titleSize, percentage, color, containerSize }: Props) => {
   percentage = percentage * 100;
   const progressBarStyle = {
      width: `${percentage <= 100 ? percentage : ""}%`,
   };
   const largeTitle = `min-w-[150px] max-w-[150px] text-base font-semibold`;
   const baseTitle = `${containerSize == "base" ? "min-w-[84px] max-w-[84px]" : "min-w-[190px] max-w-[190px]"} text-sm font-medium text-[#A8ABB0]`;
   return (
      <div className="flex h-5 items-center">
         <p title={title} className={`w-full overflow-hidden truncate whitespace-nowrap ${titleSize === "large" ? largeTitle : baseTitle}`}>
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
