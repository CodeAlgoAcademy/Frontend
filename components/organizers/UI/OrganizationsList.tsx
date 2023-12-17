import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { selectOrganization } from "store/organizersSlice";
import { RootState } from "store/store";

interface Props {
   close(): void;
   open(): void;
   isOpen: boolean;
}

export default function OrganizationsList({ close, open, isOpen }: Props) {
   const organizer = useSelector((state: RootState) => state.organizer);
   const dispatch = useDispatch();

   //    if (!organizer.organizations?.length) return <></>;

   return (
      <div className="relative">
         <header className="flex cursor-pointer items-center gap-2" onClick={() => (isOpen ? close() : open())}>
            <h2 className="text-lg font-medium text-mainColor">{organizer?.selectedOrganization?.name}</h2>
            <BsChevronDown size={24} color="#2073fa" onClick={close} />
         </header>
         {isOpen && (
            <div className="absolute top-[100%] left-0 z-[4] max-h-[200px] min-h-[200px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-md bg-white shadow-md">
               {organizer?.organizations?.map((organization, index) => {
                  return (
                     <p
                        key={index}
                        onClick={() => {
                           dispatch(selectOrganization(organization));
                           close();
                        }}
                        className="w-full cursor-pointer px-3 py-3 capitalize text-black hover:bg-[#ced4e9]"
                        data-testid="child"
                     >
                        {organization?.name}
                     </p>
                  );
               })}
            </div>
         )}
      </div>
   );
}
