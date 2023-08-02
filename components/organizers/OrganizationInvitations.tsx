import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvitations } from "services/organizersService";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";

const OrganizationInvitations = () => {
   const invitations = useSelector((state: RootState) => state?.organizer?.invitations);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllInvitations());
   }, []);

   return (
      <ContentBox size="base" title="Received Invitations" padding="small">
         <div className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4">
            {invitations?.map((invite, index: number) => {
               return (
                  <article key={index} className="flex items-center justify-between gap-x-2 p-2" data-testid={`friend-req-${index}`}>
                     <span className="flex items-center gap-x-2 ">
                        <p className="font-lighter text-[12px]">{invite?.email}</p>
                     </span>
                     <div className="flex items-center gap-x-2">
                        <i className="cursor-pointer text-[12px] text-[#2073FA] underline" onClick={async () => {}}>
                           Accept
                        </i>
                        <i className="cursor-pointer text-[12px] text-[#2073FA] underline" onClick={async () => {}}>
                           Decline
                        </i>
                     </div>
                  </article>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default OrganizationInvitations;
