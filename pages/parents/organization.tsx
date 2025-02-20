import ParentLayout from "@/components/layouts/ParentLayout";
import MyOrganizations from "@/components/parents/organization/MyOrganizations";
import OrganizationRequest from "@/components/parents/organization/OrganizationRequest";
import React from "react";

const Organization = () => {
   return (
      <ParentLayout title="Organizations">
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
