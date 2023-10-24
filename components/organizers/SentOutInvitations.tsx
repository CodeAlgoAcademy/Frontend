import React, { useEffect } from "react";
import ContentBox from "../parents/UI/ContentBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getAllInvitations } from "services/organizersService";

const SentOutInvitation = () => {
   const invitations = useSelector((state: RootState) => state?.organizer?.invitations);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllInvitations());
   }, []);

   return (
      <ContentBox size="base" title="Pending Invitations" padding="small">
         <div className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4">
            {invitations?.map((invite, index: number) => {
               return (
                  <article key={index} className=" p-2" data-testid={`friend-req-${index}`}>
                     <span className="gap-x-2 ">
                        <p className="font-lighter text-[12px]">{invite?.email}</p>
                     </span>
                  </article>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default SentOutInvitation;
