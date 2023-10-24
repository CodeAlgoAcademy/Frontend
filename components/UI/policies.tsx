import React from "react";

const Policies = ({ title, body, isSubtitle }: { title: string; body: string; isSubtitle?: boolean }) => {
   return (
      <div className="mt-[20px]">
         <h1 className={`text-mainColor ${isSubtitle ? "text-[18px]" : "text-[23px]"} font-bold`}>{title}</h1>
         <p className="mt-[15px] text-[15px]">{body}</p>
      </div>
   );
};

export default Policies;
