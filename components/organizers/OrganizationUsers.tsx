import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationUsers } from "services/organizersService";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";

const OrganizationUsers = () => {
   const users = useSelector((state: RootState) => state?.organizer?.users);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getOrganizationUsers());
   }, []);

   return (
      <ContentBox title="Users" size="base" padding="small">
         <div className="max-h-[250px] overflow-y-scroll">
            {users?.map((user, index: number) => {
               return (
                  <div className="mb-1 flex items-center justify-between gap-[1rem]" key={index}>
                     <p className="font-bold capitalize">{user?.user}</p>
                     <p className="text-[#2073fa]">Parent</p>
                  </div>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default OrganizationUsers;
