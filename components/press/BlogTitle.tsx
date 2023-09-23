import React from "react";

const BlogTitle = ({ title, by, date, link }: { title: string; by?: string; date?: string; link?: string }) => {
   return (
      <>
         <h1 className="mb-2 mt-8 max-w-[850px] text-[1.5rem] font-bold text-[#2073f]">{title}</h1>
         <p className="mt-2 text-[14px] text-[#222]">
            {by && <>By  
            <a target={"_blank"} rel="noopener noreferrer" href={link}>
               {by}
            </a>{" "}
            - {date} </>}
         </p>
      </>
   );
};

export default BlogTitle;