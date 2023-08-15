import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import AllLicenses from "@/components/organizers/AllLicenses";
import CreateLicense from "@/components/organizers/CreateLicense";
import React from "react";

const License = () => {
   return (
      <OrganizerLayout>
         <div className="mt-8 flex items-start gap-[2rem]">
            <CreateLicense />
            <AllLicenses />
         </div>
      </OrganizerLayout>
   );
};

export default License;
