import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AddUser from "@/components/organizers/AddUser";
import OrganizationInvitations from "@/components/organizers/OrganizationInvitations";
import React from "react";

const Users = () => {
   return (
      <OrganizerLayout>
         {" "}
         <section>
            <div className="mb-8 flex flex-wrap gap-[1rem]">
               <OrganizationInvitations />
            </div>

            <AddUser />
         </section>
      </OrganizerLayout>
   );
};

export default Users;
