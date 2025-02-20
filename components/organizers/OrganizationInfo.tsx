import React from "react";
import { BiCopy } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";

const OrganizationInfo = () => {
   const organization = useSelector((state: RootState) => state?.organizer?.selectedOrganization);

   return (
      <ContentBox title="Organization Info" size="base" padding="small">
         <h3 className="text-[1.1rem] font-bold">{organization?.name}</h3>

         <div className="mt-3 max-h-[200px] overflow-y-scroll">
            <h5 className="font-bold text-[#333] underline">Organization Code</h5>
            <header className="mt-2 mb-4 flex justify-between text-[0.9rem] leading-[1.2]">
               <p>{organization?.invite_code}</p>

               <p className="text-mainColor cursor-pointer">
                  Copy Code{" "}
                  <span className="ml-[6px] inline-block">
                     <BiCopy />
                  </span>
               </p>
            </header>

            <h5 className="font-bold text-[#333] underline">Description</h5>
            <p className="mt-2 text-[0.9rem] leading-[1.2]">{organization?.description}</p>
         </div>
      </ContentBox>
   );
};

export default OrganizationInfo;
