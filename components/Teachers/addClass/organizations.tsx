import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateClassDetails } from "store/addClassSlice";
import { closeSelectOrg } from "store/modalSlice";
import { RootState } from "store/store";

const SelectOrganization = () => {
   const modalOpen = useSelector((state: RootState) => state.modal.selectOrganizationOpen);

   const organizations = useSelector((state: RootState) => state.organizer.userOrganizations);

   const selected_org = useSelector((state: RootState) => state.addClass.class.organization);

   const dispatch = useDispatch();

   if (!modalOpen) {
      return <></>;
   }

   return (
      <div className="absolute top-[105%] left-0  max-h-[80px] w-full overflow-y-scroll rounded-md border-[1.5px] bg-white shadow-md">
         {organizations.length > 0 &&
            organizations?.map((org, index) => {
               return (
                  <p
                     key={index}
                     className={`cursor-pointer p-2 hover:bg-slate-100 ${org.id === selected_org ? "bg-slate-100" : ""}`}
                     onClick={() => {
                        dispatch(updateClassDetails({ key: "organization", value: org.id as number, typeofState: "class" }));
                        dispatch(closeSelectOrg());
                     }}
                  >
                     {org.name}
                  </p>
               );
            })}
         {organizations.length <= 0 && <p className="cursor-pointer p-2 text-center text-[12px] font-bold">You do not belong to any organization</p>}
      </div>
   );
};

export default SelectOrganization;
