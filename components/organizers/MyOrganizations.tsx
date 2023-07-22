import React from "react";
import ContentBox from "../parents/UI/ContentBox";

const organizations = [
   {
      name: "Orgnization 1",
      code: "342819a",
   },

   {
      name: "Orgnization 1",
      code: "342819a",
   },

   {
      name: "Orgnization 1",
      code: "342819a",
   },

   {
      name: "Orgnization 1",
      code: "342819a",
   },
];

const MyOrganizations = () => {
   return (
      <ContentBox title="My Organizations" size="base" padding="small">
         <div className=" flex max-h-[230px] flex-col overflow-y-scroll">
            {organizations?.map((organization, index: number) => {
               return (
                  <div key={index} className="form-check flex items-center gap-[1rem] py-[12px]">
                     <input type="radio" name="same-name" id={index.toString()} />
                     <div className="flex flex-1 items-center justify-between">
                        <label htmlFor={index.toString()} className="font-bold">
                           {organization.name}
                        </label>
                        <p className="font-500 text-[#2073fa]">{organization.code}</p>
                     </div>
                  </div>
               );
            })}
         </div>

         <button className="ml-auto block w-[120px] rounded-md bg-[#2073fa] px-4 py-2 text-[0.9rem] font-bold text-white hover:scale-95">
            Select
         </button>
      </ContentBox>
   );
};

export default MyOrganizations;
