import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AllUsers from "@/components/organizers/AllUsers";
import OrganizationInvitations from "@/components/organizers/OrganizationInvitations";
import SentOutInvitation from "@/components/organizers/SentOutInvitations";
import AddUserModal from "@/components/organizers/UI/AddUserModal";
import React, { useState } from "react";

const Users = () => {
   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

   return (
      <OrganizerLayout>
         <section>
            <div className="mt-8 mb-[2rem] flex w-full flex-col flex-wrap items-center justify-center gap-[2rem] w840:flex-row">
               <OrganizationInvitations />
               <SentOutInvitation />
            </div>

            <AllUsers onAddUser={() => setIsAddUserModalOpen(true)} />
            
            <AddUserModal
               isOpen={isAddUserModalOpen}
               onClose={() => setIsAddUserModalOpen(false)}
            />
         </section>
      </OrganizerLayout>
   );
};

export default Users;