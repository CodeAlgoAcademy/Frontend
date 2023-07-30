import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AddUser from "@/components/organizers/AddUser";
import React from "react";

const Users = () => {
   return (
      <OrganizerLayout>
         {" "}
         <section>
            <AddUser />
         </section>
      </OrganizerLayout>
   );
};

export default Users;
