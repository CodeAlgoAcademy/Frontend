import ParentLayout from "@/components/parents/ParentLayout";
import { countryList } from "@/components/signup/countries";
import Image from "next/image";
import { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";

const GooglepayDetail = () => {
   return (
      <ParentLayout>
         <div className=" pt-6 pb-10 px-8 overflow-y-scroll scrollbar-hide bg-white" style={{ height: "calc(100vh - 250px)" }}>
            <div className="border-b text-lg pb-2 font-[600] border-[#C5C5C5]">
               <BsArrowLeft />
            </div>

            <div className="flex gap-10 w-full items-center  py-4 border-b border-[#C5C5C5] ">
               <Image width={44} height={44} src="/assets/obi.png" alt="master" />
               <div>
                  <h3 className="text-lg font-bold">Peter Obi</h3>
                  <p className="mt-2 text-sm">peterobi.codealgo@gmail.com</p>
               </div>
            </div>
            <div className="flex gap-10 border-b border-[#C5C5C5] w-full items-center py-4">
               <Image width={57} height={29} src="/assets/master.png" alt="master" />
               <div>
                  <h3 className="text-lg font-bold">Mastercard****4322</h3>
                  <p className="mt-2 text-sm text-[#D90429]">Update expiry information</p>
               </div>
            </div>
            <h4 className="text-base font-bold mt-8">Password</h4>
            <input type="text" className="border-[#C5C5C5] w-[419px] py-2 px-4 mt-4 border rounded-sm h-[44px] outline-none " placeholder="Enter Pasword" />
         </div>
      </ParentLayout>
   );
};

export default GooglepayDetail;
