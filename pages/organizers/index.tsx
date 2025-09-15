import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import OrganizationAudit from "@/components/organizers/organizationAudit";
import OrganizationInfo from "@/components/organizers/OrganizationInfo";
import OrganizationUserStrenght from "@/components/organizers/organizationstrength";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useEffect } from "react";
import { getOrganizationUsers, getOrganizationAnalytics } from "services/organizersService";
import router from "next/router";
import OrganizationUsers from "@/components/organizers/OrganizationUsers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { 
    users, 
    loading, 
    selectedOrganization, 
    organizationStats, 
    isLoadingAnalytics 
  } = useSelector((state: RootState) => state.organizer);

  useEffect(() => {
    if (selectedOrganization?.id) {
      dispatch(getOrganizationUsers());
      dispatch(getOrganizationAnalytics());
    }
  }, [dispatch, selectedOrganization?.id]);

  const latestUsers = users?.slice(0, 5) || [];

  return (
    <OrganizerLayout>
      <div className="relative bottom-14 mb-[-120px] h-auto scale-90 overflow-scroll overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
        <div className="grid h-auto grid-flow-row grid-cols-1 gap-6 overflow-scroll sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
          <OrganizationInfo 
          organizationStats={organizationStats}
           loading={isLoadingAnalytics || loading}
           />
            <OrganizationUsers
              users={latestUsers}
               loading={isLoadingAnalytics || loading}
              onViewAll={() => router.push("/organizers/users")}
            />
          <OrganizationAudit />
          <OrganizationUserStrenght 
            signupsData={organizationStats?.signups_by_day}
            loading={isLoadingAnalytics}
          />
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default Dashboard;