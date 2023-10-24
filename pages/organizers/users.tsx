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
            <div className="mb-8 flex gap-[1rem]">
               <OrganizationInvitations />
               <SentOutInvitation />
            </div>

            <AddUser />
         </section>
      </OrganizerLayout>
   );
};

export default Users;
