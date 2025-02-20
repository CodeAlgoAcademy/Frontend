import React from "react";

const BlogTitle = ({ title, by, date, link, className }: { title: string; by?: string; date?: string; link?: string; className?: string }) => {
   return (
      <>
         <h1 className={`mb-2 mt-8 max-w-[850px] text-[1.5rem] font-bold text-mainRed ${className}`}>{title}</h1>
         {by && (
            <p className="mt-2 text-[14px] text-[#222]">
               <>
                  By  
                  <a target={"_blank"} rel="noopener noreferrer" href={link}>
                     {by}
                  </a>{" "}
                  - {date}{" "}
               </>
            </p>
         )}
      </>
   );
};

export default BlogTitle;
