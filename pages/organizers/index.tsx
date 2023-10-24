import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import OrganizationInfo from "@/components/organizers/OrganizationInfo";
import OrganizationUsers from "@/components/organizers/OrganizationUsers";
import ContentBox from "@/components/parents/UI/ContentBox";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrganiztions } from "services/organizersService";

const Dashboard = () => {
   const dispatch = useDispatch();

   return (
      <OrganizerLayout>
         <div className="mt-8 flex flex-wrap items-center justify-center gap-[2rem] lg:justify-between">
            <OrganizationInfo />
            <OrganizationUsers />
         </div>
      </OrganizerLayout>
   );
};

export default Dashboard;
