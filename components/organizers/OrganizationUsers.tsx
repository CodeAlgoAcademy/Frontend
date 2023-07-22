import React from "react";
import ContentBox from "../parents/UI/ContentBox";

const users = ["josephine", "hannah", "elizabeth", "joshua", "emmanuel", "caleb", "abraham", "bolu", "gabriel"];

const OrganizationUsers = () => {
   return (
      <ContentBox title="Users" size="base" padding="small">
         <div className="max-h-[250px] overflow-y-scroll">
            {users.map((user, index: number) => {
               return (
                  <div className="mb-1 flex items-center justify-between gap-[1rem]" key={index}>
                     <p className="font-bold capitalize">{user}</p>
                     <p className="text-[#2073fa]">Parent</p>
                  </div>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default OrganizationUsers;
