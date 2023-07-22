import React from "react";
import { BiCopy } from "react-icons/bi";
import ContentBox from "../parents/UI/ContentBox";

const OrganizationInfo = () => {
   return (
      <ContentBox title="Organization Info" size="base" padding="small">
         <h3 className="text-[1.1rem] font-bold">My School</h3>

         <div className="mt-3 max-h-[200px] overflow-y-scroll">
            <h5 className="font-bold text-[#333] underline">Organization Code</h5>
            <header className="mt-2 mb-4 flex justify-between text-[0.9rem] leading-[1.2]">
               <p>3071278128</p>

               <p className="cursor-pointer text-[#2073fa]">
                  Copy Code{" "}
                  <span className="ml-[6px] inline-block">
                     <BiCopy />
                  </span>
               </p>
            </header>

            <h5 className="font-bold text-[#333] underline">Description</h5>
            <p className="mt-2 text-[0.9rem] leading-[1.2]">
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione molestias ab dolorem nam nihil rerum sunt sint voluptates, labore
               asperiores, quod, quaerat alias suscipit? Maiores quod doloremque similique error, molestias tempore minus deleniti, blanditiis vero
               impedit, in quas fuga rerum?
            </p>
         </div>
      </ContentBox>
   );
};

export default OrganizationInfo;
