import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";
import { getAllLicenses, sendLicenseRequest } from "services/organizersService";
import { openErrorModal } from "store/fetchSlice";
import { useRouter } from "next/router";

const AllLicenses = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const licenses = useSelector((state: RootState) => state?.organizer?.licenses);

   const [selectedLicense, setSelectedLicense] = useState<number | undefined>(undefined);

   const sendRequest = async () => {
      if (!selectedLicense) {
         dispatch(openErrorModal({ errorText: ["Select a license"] }));
      }

      const data = await dispatch(sendLicenseRequest(selectedLicense));
      if (!data.error) {
         router.push("/organizers");
      }
   };

   useEffect(() => {
      dispatch(getAllLicenses());
   }, []);

   return (
      <ContentBox title="All Licenses" size="base" padding="small" subtitle="Select a license and send a request">
         <div className="mb-4 max-h-[200px] overflow-y-scroll">
            {licenses?.map((license, index) => {
               return (
                  <div
                     key={index}
                     className={`mb-2 cursor-pointer p-2 hover:bg-slate-100 ${license.id === selectedLicense && "bg-slate-100"}`}
                     onClick={() => {
                        setSelectedLicense(license.id);
                     }}
                  >
                     <h2 className="text-mainColor text-[1.1rem] font-bold">{license.name}</h2>
                     <p className="font-500 text-[.95rem] text-[#333]">{license.description}</p>
                  </div>
               );
            })}
         </div>
         {licenses?.length > 0 && selectedLicense && (
            <button className="bg-mainColor rounded-md p-2 text-white" onClick={sendRequest}>
               Send Request
            </button>
         )}
      </ContentBox>
   );
};

export default AllLicenses;
