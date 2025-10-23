import ParentLayout from "@/components/layouts/ParentLayout";
import MyOrganizations from "@/components/parents/organization/MyOrganizations";
import OrganizationRequest from "@/components/parents/organization/OrganizationRequest";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrgIBelongTo } from "services/organizersService";

const Organization = () => {
      const dispatch = useDispatch();
   
      useEffect(() => {
         dispatch(getOrgIBelongTo());
      }, [dispatch]);
   return (
      <ParentLayout title="Organizations" showChildrenList>
         <div className="relative  mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className=" mb-6 grid w-full grid-cols-1 justify-start gap-x-6 gap-y-8 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
               <MyOrganizations />
               <OrganizationRequest />
            </div>
         </div>
      </ParentLayout>
   );
};

export default Organization;
