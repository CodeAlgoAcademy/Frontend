import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import OrganizationInfo from "@/components/organizers/OrganizationInfo";
import OrganizationUsers from "@/components/organizers/OrganizationUsers";
import ContentBox from "@/components/parents/UI/ContentBox";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganiztions } from "services/organizersService";
import { RootState } from "store/store";

const Dashboard = () => {
   const dispatch = useDispatch();
  
   return (
      <OrganizerLayout>
         <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-[2rem] w840:flex-row">
            <OrganizationInfo />
            <OrganizationUsers />
         </div>
      </OrganizerLayout>
   );
};

export default Dashboard;
