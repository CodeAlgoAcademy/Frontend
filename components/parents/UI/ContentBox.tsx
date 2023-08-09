import Link from "next/link";
import React, { CSSProperties, ReactNode } from "react";

interface Props {
   children?: ReactNode;
   title: string;
   showSublink?: boolean;
   padding: "small" | "large";
   size: "base" | "large";
   link?: string;
   style?: CSSProperties;
}
// Note: The title parameter should alao be the same name as the path of the sublink & spacing is replaced with '-' for the link href
const ContentBox = ({ children, title, showSublink, padding, size, link, style }: Props) => {
   return (
      <div
         className="short-scroll-thumb relative max-w-full self-center overflow-x-auto overflow-y-clip xl:overflow-x-hidden"
         style={{ width: size === "large" ? "100%" : "auto" }}
      >
         <div
            className="relative min-h-[340px] w-full min-w-[390px] max-w-fit rounded-2xl bg-white py-6 xl:min-w-[390px]"
            style={{
               paddingLeft: padding === "small" ? "24px" : "44px",
               paddingRight: padding === "small" ? "24px" : "44px",
               width: size === "large" ? "100%" : "416px",
               ...style,
            }}
         >
            <div className="mb-[1rem]">
               <h1 className="text-2xl font-semibold text-[#2073FA]">{title}</h1>
            </div>
            {children}
         </div>
         <div className="mb-3 sm:mb-0">
            {showSublink && (
               <Link href={`${link}`}>
                  <span className="mt-3 ml-auto block w-fit cursor-pointer text-sm font-light underline hover:text-[#2073FA]">
                     Edit {title} Settings
                  </span>
               </Link>
            )}
         </div>
      </div>
   );
};

export default ContentBox;
