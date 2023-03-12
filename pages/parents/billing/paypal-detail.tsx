import ParentLayout from "@/components/parents/ParentLayout";
import { countryList } from "@/components/signup/countries";
import Image from "next/image";
import { ReactNode } from "react";

const PaypalDetail = () => {
   return (
      <ParentLayout>
         <div className=" pt-6 pb-10 px-8 overflow-y-scroll scrollbar-hide bg-white" style={{ height: "calc(100vh - 250px)" }}>
            <div className="border-b text-lg pb-2 font-[600] border-[#C5C5C5]">
               <Image width={150} height={94} src="/assets/paypalLogo.png" alt="paypal" />
            </div>

            <div className="flex gap-16 w-full">
               <div className="flex-1">
                  <h4 className="text-lg pb-2 font-[600] mt-8">First name *</h4>
                  <input
                     type="text"
                     className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full"
                     placeholder="Enter Pasword"
                  />
               </div>
               <div className="flex-1">
                  <h4 className="text-lg pb-2 font-[600] mt-8">Last name *</h4>
                  <input
                     type="text"
                     className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full"
                     placeholder="Enter Pasword"
                  />
               </div>
            </div>
            <h4 className="text-lg pb-2 font-[600] mt-8">Country / Region *</h4>
            <div className="flex items-center py-2 px-4 h-[44px]  gap-5 border-[#C5C5C5] border rounded-sm">
               <select className="outline-none w-full">
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
               <h4 className="text-lg pb-2 font-[600] mt-8">Street address *</h4>
               <input type="text" className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full" placeholder="Enter Pasword" />
            </div>
            <div className="flex gap-16 w-full">
               <div className="flex-1">
                  <h4 className="text-lg pb-2 font-[600] mt-8">State *</h4>
                  <input
                     type="number"
                     className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full"
                     placeholder="Enter Pasword"
                  />
               </div>
               <div className="flex-1">
                  <h4 className="text-lg pb-2 font-[600] mt-8">Town / City*</h4>
                  <input
                     type="text"
                     className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full"
                     placeholder="Enter Pasword"
                  />
               </div>
            </div>
            <div className="flex gap-16 w-full">
               <div className="flex-1">
                  <h4 className="text-lg pb-2 font-[600] mt-8">Zip Code *</h4>
                  <input
                     type="number"
                     className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full"
                     placeholder="Enter Pasword"
                  />
               </div>
               <div className="flex-1">
                  <h4 className="text-lg pb-2 font-[600] mt-8">Email address*</h4>
                  <input
                     type="text"
                     className="border-[#C5C5C5] py-2 px-4 border rounded-sm h-[44px] outline-none w-full"
                     placeholder="Enter Pasword"
                  />
               </div>
            </div>
            <div className="mt-10 flex justify-center">
            <button className="bg-[#2073FA] text-xs mx-auto text-white w-[292px] py-3 rounded-[4px]">Proceed to Paypal</button>
            </div>
         </div>
      </ParentLayout>
   );
};

export default PaypalDetail;
