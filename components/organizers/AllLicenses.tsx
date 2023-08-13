import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";

const AllLicenses = () => {
   const dispatch = useDispatch();
   const licenses = useSelector((state: RootState) => state?.organizer?.licenses);

   return (
      <ContentBox title="All Licenses" size="base" padding="small">
         <div className="max-h-[250px] overflow-y-scroll">
            {licenses?.map((license, index) => {
               return (
                  <div key={index} className="mb-2">
                     <h2 className="text-[1.1rem] font-bold text-[#2073fa]">{license.name}</h2>
                     <p className="font-500 text-[.95rem] text-[#333]">{license.description}</p>
                  </div>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default AllLicenses;
