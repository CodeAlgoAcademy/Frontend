import React, { ReactNode } from "react";

interface Props {
   children?: ReactNode;
   title: string;
   showSublink?: boolean;
   padding: "small" | "large";
}

const DashboardBox = ({ children, title, showSublink, padding }: Props) => {
   return (
      <div className="self-center">
         <div
            className="relative mx-auto h-[340px] w-full max-w-[90vw] rounded-2xl bg-white py-6 md:min-w-[420px] md:max-w-[550px]"
            style={{
               paddingLeft: padding === "small" ? "24px" : "44px",
               paddingRight: padding === "small" ? "24px" : "44px",
            }}
         >
            <div className="absolute top-9 left-11">
               <h1 className="text-mainColor text-[1.3rem] font-semibold" data-testid={title}>
                  {title}
               </h1>
            </div>
            {children}
         </div>
         {showSublink && (
            <span className="hover:text-mainColor mt-3 ml-auto block w-fit cursor-pointer text-sm font-light underline">Edit {title} Settings</span>
         )}
      </div>
   );
};

export default DashboardBox;
