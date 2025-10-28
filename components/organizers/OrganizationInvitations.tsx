import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvitations } from "services/organizersService";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";

const OrganizationInvitations = () => {
   const { 
      invitations, 
      loading, 
      error, 
      selectedOrganization 
   } = useSelector((state: RootState) => ({
      invitations: state.organizer.invitations,
      loading: state.organizer.loading,
      error: state.organizer.error,
      selectedOrganization: state.organizer.selectedOrganization
   }));
   
   const dispatch = useDispatch();

   useEffect(() => {
      if (selectedOrganization?.id) {
         dispatch(getAllInvitations(selectedOrganization.id));
      }
   }, [dispatch, selectedOrganization?.id]);

   const organizationInvitations = invitations?.filter(invite => 
      invite.organization.id === selectedOrganization?.id
   ) || [];

   if (!selectedOrganization) {
      return (
         <ContentBox size="base" title="Received Invitations" padding="small">
            <div className="h-[220px] w-full overflow-hidden rounded-xl bg-[#eeeeee] py-2 px-4 flex items-center justify-center">
               <p className="text-gray-500">Please select an organization first</p>
            </div>
         </ContentBox>
      );
   }

   if (loading) {
      return (
         <ContentBox size="base" title="Received Invitations" padding="small">
            <div className="h-[220px] w-full overflow-hidden rounded-xl bg-[#eeeeee] py-2 px-4 flex items-center justify-center">
               <p className="text-gray-500">Loading invitations...</p>
            </div>
         </ContentBox>
      );
   }

   if (error) {
      return (
         <ContentBox size="base" title="Received Invitations" padding="small">
            <div className="h-[220px] w-full overflow-hidden rounded-xl bg-[#eeeeee] py-2 px-4 flex items-center justify-center">
               <p className="text-red-500">Error: {error}</p>
            </div>
         </ContentBox>
      );
   }

   return (
      <ContentBox size="base" title="Received Invitations" padding="small">
         <div className="h-[220px] w-full overflow-hidden overflow-y-auto rounded-xl bg-[#eeeeee] py-2 px-4">
            {organizationInvitations.length > 0 ? (
               organizationInvitations.map((invite, index: number) => (
                  <article key={index} className="flex items-center justify-between gap-x-2 p-2" data-testid={`friend-req-${index}`}>
                     <span className="flex items-center gap-x-2 ">
                        <p className="font-lighter text-[12px]">{invite?.email}</p>
                     </span>
                     <div className="flex items-center gap-x-2">
                        <i className="text-mainColor cursor-pointer text-[12px] underline" onClick={async () => {}}>
                           Accept
                        </i>
                        <i className="text-mainColor cursor-pointer text-[12px] underline" onClick={async () => {}}>
                           Decline
                        </i>
                     </div>
                  </article>
               ))
            ) : (
               <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">No invitations found for {selectedOrganization.name}</p>
               </div>
            )}
         </div>
      </ContentBox>
   );
};

export default OrganizationInvitations;