import React from "react";

const Policies = ({ title, body }: { title: string; body: string }) => {
   return (
      <div className="mt-[20px]">
         <h1 className="text-mainColor text-[23px] font-bold">{title}</h1>
         <p className="mt-[15px] text-[15px]">{body}</p>
      </div>
   );
};

export default Policies;
