import React, { ReactNode } from "react";

interface Props {
   children?: ReactNode;
}

const SkillBox = ({ children }: Props) => {
   return (
      <div className="h-fit w-full rounded-xl bg-[#ECEDF3] p-3">
         <div className="small-scroll-thumb blue-scroll-thumb skill-box h-[150px] overflow-y-auto">{children}</div>
      </div>
   );
};

export default SkillBox;
