import React, { useEffect } from "react";
import ContentBox from "../UI/ContentBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { acceptOrgRequest, declineOrgRequest, getMyInvitations } from "services/organizersService";
import { AnyAction } from "@reduxjs/toolkit";

const OrganizationRequest = () => {
   const invitations = useSelector((state: RootState) => state.organizer.userInvitation);

   const dispatch = useDispatch();

   const submit = async (func: AnyAction) => {
      await dispatch(func);
      dispatch(getMyInvitations());
   };

   useEffect(() => {
      dispatch(getMyInvitations());
   }, []);

   return (
      <ContentBox title="Organization's Request" size="base" padding="small">
         <div className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4">
            {invitations?.map((invite, index: number) => {
               return (
                  <article key={index} className="">
                     <div className="flex items-center justify-between gap-x-2 p-2">
                        <span className="flex items-center gap-x-2 ">
                           <p className="text-[14px] font-bold">{invite?.organization?.name}</p>
                        </span>
                        <div className="flex items-center gap-x-2">
                           <i
                              className="text-mainColor cursor-pointer text-[12px] underline"
                              onClick={async () => {
                                 submit(acceptOrgRequest(invite.id));
                              }}
                           >
                              Accept
                           </i>
                           <i
                              className="text-mainColor cursor-pointer text-[12px] underline"
                              onClick={async () => {
                                 submit(declineOrgRequest(invite.id));
                              }}
                           >
                              Decline
                           </i>
                        </div>
                     </div>
                     <p className="px-2 text-[12px] text-[#333]">{invite?.organization?.description}</p>
                  </article>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default OrganizationRequest;
