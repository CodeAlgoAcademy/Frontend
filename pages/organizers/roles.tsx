import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AllRoles from "@/components/organizers/AllRoles";
import CreateRoles from "@/components/organizers/CreateRoles";
import React from "react";

const Roles = () => {
   return (
      <OrganizerLayout>
         <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-[2rem] w840:flex-row">
            <CreateRoles />
            <AllRoles />
         </div>
      </OrganizerLayout>
   );
};

export default Roles;
