import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AddUser from "@/components/organizers/AddUser";
import OrganizationInvitations from "@/components/organizers/OrganizationInvitations";
import SentOutInvitation from "@/components/organizers/SentOutInvitations";
import React from "react";

const Users = () => {
   return (
      <OrganizerLayout>
         {" "}
         <section>
            <div className="mt-8 mb-[2rem] flex w-full flex-col flex-wrap items-center justify-center gap-[2rem] w840:flex-row">
               <OrganizationInvitations />
               <SentOutInvitation />
            </div>

            <AddUser />
         </section>
      </OrganizerLayout>
   );
};

export default Users;
