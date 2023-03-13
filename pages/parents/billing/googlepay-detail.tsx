import ParentLayout from "@/components/parents/ParentLayout";
import { countryList } from "@/components/signup/countries";
import Image from "next/image";
import { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";

const GooglepayDetail = () => {
   return (
      <ParentLayout>
         <div className=" scrollbar-hide overflow-y-scroll bg-white px-8 pt-6 pb-10">
            <div className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">
               <BsArrowLeft />
            </div>

            <div className="flex w-full items-center gap-10  border-b border-[#C5C5C5] py-4 ">
               <Image width={44} height={44} src="/assets/obi.png" alt="master" />
               <div>
                  <h3 className="text-lg font-bold">Peter Obi</h3>
                  <p className="mt-2 text-sm">peterobi.codealgo@gmail.com</p>
               </div>
            </div>
            <div className="flex w-full items-center gap-10 border-b border-[#C5C5C5] py-4">
               <Image width={57} height={29} src="/assets/master.png" alt="master" />
               <div>
                  <h3 className="text-lg font-bold">Mastercard****4322</h3>
                  <p className="mt-2 text-sm text-[#D90429]">Update expiry information</p>
               </div>
            </div>
            <h4 className="mt-8 text-base font-bold">Password</h4>
            <input
               type="text"
               className="mt-4 h-[44px] w-[419px] rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none "
               placeholder="Enter Pasword"
            />
         </div>
      </ParentLayout>
   );
};

export default GooglepayDetail;
