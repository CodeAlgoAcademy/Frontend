import React from "react";
import ContentBox from "../UI/ContentBox";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { SlOrganization } from "react-icons/sl";

const MyOrganizations = () => {
   const organizations = useSelector((state: RootState) => state.organizer?.userOrganizations);

   return (
      <ContentBox title="My Organizations" size="base" padding="small">
         <div className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4" data-testid="organizations-container">
            {organizations && organizations.length > 0 ? (
               organizations.map((org, index: number) => {
                  return (
                     <article key={index} className="flex items-center justify-between gap-x-2 p-2">
                        <div className="flex items-center gap-x-2 ">
                           <span className="text-mainColor text-[0.8rem]">
                              <SlOrganization />
                           </span>
                           <p className="font-lighter text-[12px]">{org?.name}</p>
                        </div>
                        <p className="text-[12px]">{org?.invite_code}</p>
                     </article>
                  );
               })
            ) : (
               <div className="flex h-full flex-col items-center justify-center text-gray-500">
                  <SlOrganization className="text-4xl mb-2 opacity-50" />
                  <p className="text-sm">No organizations yet</p>
                  <p className="text-xs mt-1">Organizations you join will appear here</p>
               </div>
            )}
         </div>
      </ContentBox>
   );
};

export default MyOrganizations;