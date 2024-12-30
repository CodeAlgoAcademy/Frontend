import ParentLayout from "@/components/layouts/ParentLayout";
import { countryList } from "@/components/signup/countries";
import Image from "next/image";
import { ReactNode } from "react";

const PaypalDetail = () => {
   return (
      <ParentLayout title="Paypal">
         <div className=" scrollbar-hide overflow-y-scroll bg-white px-8 pt-6 pb-10">
            <div className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">
               <Image width={150} height={94} src="/assets/paypalLogo.png" alt="paypal" />
            </div>

            <div className="flex w-full gap-16">
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">First name *</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder="Enter Pasword"
                  />
               </div>
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Last name *</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder="Enter Pasword"
                  />
               </div>
            </div>
            <h4 className="mt-8 pb-2 text-lg font-[600]">Country / Region *</h4>
            <div className="flex h-[44px] items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
               <select className="w-full outline-none">
                  <option value="Select School Country">Unites States</option>
                  {countryList.map((countryOption: string, index: number): ReactNode => {
                     return (
                        <option value={countryOption} key={index}>
                           {countryOption}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div className="flex-1">
               <h4 className="mt-8 pb-2 text-lg font-[600]">Street address *</h4>
               <input type="text" className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none" placeholder="Enter Pasword" />
            </div>
            <div className="flex w-full gap-16">
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">State *</h4>
                  <input
                     type="number"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder="Enter Pasword"
                  />
               </div>
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Town / City*</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder="Enter Pasword"
                  />
               </div>
            </div>
            <div className="flex w-full gap-16">
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Zip Code *</h4>
                  <input
                     type="number"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder="Enter Pasword"
                  />
               </div>
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Email address*</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder="Enter Pasword"
                  />
               </div>
            </div>
            <div className="mt-10 flex justify-center">
               <button className="mx-auto w-[292px] rounded-[4px] bg-mainColor py-3 text-xs text-white">Proceed to Paypal</button>
            </div>
         </div>
      </ParentLayout>
   );
};

export default PaypalDetail;
