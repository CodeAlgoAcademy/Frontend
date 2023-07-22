import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import MyOrganizations from "@/components/organizers/MyOrganizations";
import OrganizationInfo from "@/components/organizers/OrganizationInfo";
import OrganizationUsers from "@/components/organizers/OrganizationUsers";
import ContentBox from "@/components/parents/UI/ContentBox";
import React from "react";

const Dashboard = () => {
   return (
      <OrganizerLayout>
         <div className="mt-8 flex flex-wrap items-center justify-center gap-[2rem] lg:justify-between">
            <MyOrganizations />
            <OrganizationInfo />
            <OrganizationUsers />
         </div>
      </OrganizerLayout>
   );
};

export default Dashboard;
