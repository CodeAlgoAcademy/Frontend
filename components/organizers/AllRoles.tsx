import React from "react";
import ContentBox from "../parents/UI/ContentBox";

const allRoles = [
   {
      name: "Teacher",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ab voluptatum facere repellendus sit cupiditate iure numquam amet, consequatur officiis!",
   },

   {
      name: "Teacher",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ab voluptatum facere repellendus sit cupiditate iure numquam amet, consequatur officiis!",
   },
   {
      name: "Teacher",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ab voluptatum facere repellendus sit cupiditate iure numquam amet, consequatur officiis!",
   },
   {
      name: "Teacher",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ab voluptatum facere repellendus sit cupiditate iure numquam amet, consequatur officiis!",
   },

   {
      name: "Teacher",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ab voluptatum facere repellendus sit cupiditate iure numquam amet, consequatur officiis!",
   },
   {
      name: "Teacher",
      description:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ab voluptatum facere repellendus sit cupiditate iure numquam amet, consequatur officiis!",
   },
   { name: "Student", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, dolores." },
];

const AllRoles = () => {
   return (
      <ContentBox title="All Roles" size="base" padding="small">
         <div className="max-h-[250px] overflow-y-scroll">
            {allRoles.map((role, index) => {
               return (
                  <div key={index} className="mb-2">
                     <h2 className="text-[1.1rem] font-bold text-[#2073fa]">{role.name}</h2>
                     <p className="font-500 text-[.95rem] text-[#333]">{role.description}</p>
                  </div>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default AllRoles;
