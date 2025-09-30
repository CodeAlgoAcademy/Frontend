import TeacherLayout from "@/components/layouts/TeacherLayout";
import MyOrganizations from "@/components/parents/organization/MyOrganizations";
import OrganizationRequest from "@/components/parents/organization/OrganizationRequest";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrgIBelongTo } from "services/organizersService";

const Orgnization = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getOrgIBelongTo());
   }, [dispatch]);
   return (
      <TeacherLayout>
         <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start md:justify-start">
            <MyOrganizations />
            <OrganizationRequest />
         </div>
      </TeacherLayout>
   );
};

export default Orgnization;
