import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AllRoles from "@/components/organizers/AllRoles";
import CreateRoles from "@/components/organizers/CreateRoles";
import React from "react";

const Roles = () => {
   return (
      <OrganizerLayout>
         <div className="mt-8 flex flex-wrap gap-[2rem]">
            <CreateRoles />
            <AllRoles />
         </div>
      </OrganizerLayout>
   );
};

export default Roles;