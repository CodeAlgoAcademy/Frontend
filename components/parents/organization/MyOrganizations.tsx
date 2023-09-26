import React from "react";
import ContentBox from "../UI/ContentBox";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { GrOrganization } from "react-icons/gr";
import { SlOrganization } from "react-icons/sl";

const MyOrganizations = () => {
   const organizations = useSelector((state: RootState) => state.organizer?.userOrganizations);

   return (
      <ContentBox title="My Organizations" size="base" padding="small">
         <div className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4" data-testid="friends-container">
            {organizations?.map((org, index: number) => {
               return (
                  <article key={index} className="flex items-center justify-between gap-x-2 p-2">
                     <div className="flex items-center gap-x-2 ">
                        <span className="text-mainColor text-[0.8rem]">
                           <SlOrganization />
                        </span>
                        <p className="font-lighter text-[12px]">{org.name}</p>
                     </div>
                     <p className="text-[12px]">{org?.invite_code}</p>
                  </article>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default MyOrganizations;
