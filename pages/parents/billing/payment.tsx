import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import { countryList } from "@/components/signup/countries";
import { Checkbox } from "@mui/material";
import { height } from "@mui/system";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

const Payment = () => {
   const [active, setActive] = useState(1);
   return (
      <ParentLayout>
         <div className=" pt-6 pb-10 px-8 overflow-y-scroll scrollbar-hide bg-white" style={{ height: "calc(100vh - 250px)" }}>
            <h4 className="border-b text-lg pb-2 font-[600] border-[#C5C5C5]">Credit Card Payment</h4>
            <div className="flex w-full gap-8 items-start">
               <div className="mt-6 flex-1 ">
                  <div className="flex items-center py-2 px-4  gap-5 border-[#C5C5C5] border rounded-sm">
                     <p>Email</p>
                     <input type="email" className="outline-none w-full" placeholder="peterobi.codealgo@gmail.com" />
                  </div>
                  <h4 className="text-lg pb-2 font-[600] mt-8">Card Information</h4>
                  <div className="flex items-center py-2 px-4  gap-5 border-[#C5C5C5] border rounded-sm">
                     <input type="email" className="outline-none w-full" placeholder="1234 5678 9123 4567" />
                     <div className="flex items-center">
                        <Image height={42} width={80} src="/assets/smaster.png" alt="master" />
                        <Image height={42} width={80} src="/assets/visa.png" alt="master" />
                        <Image height={42} width={80} src="/assets/express.png" alt="master" />
                     </div>
                  </div>
                  <div className="flex ">
                     <div className="flex items-center py-2 px-4 w-full  gap-5 border-[#C5C5C5] border rounded-sm">
                        <input type="email" className="outline-none w-full" placeholder="MM/YY" />
                     </div>
                     <div className="flex items-center py-2 px-4 w-full  gap-5 border-[#C5C5C5] border rounded-sm">
                        <input type="email" className="outline-none w-full" placeholder="CVC" />
                     </div>
                  </div>
                  <h4 className="text-lg pb-2 font-[600] mt-8">Name on Card</h4>
                  <div className="flex items-center py-2 px-4  gap-5 w-full border-[#C5C5C5] border rounded-sm">
                     <input type="email" className="outline-none w-full" placeholder="1234 5678 9123 4567" />
                  </div>
                  <h4 className="text-lg pb-2 font-[600] mt-8">Country</h4>
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
                  <div>
                     <div className="border border-[#C5C5C5] w-full px-4 pt-4 pb-6 rounded-md mt-8">
                        <div className=" flex items-center">
                           <Checkbox />
                           <div>
                              <h3 className="text-sm">Securely save my information for one-click payments</h3>
                           </div>
                        </div>
                        <p className="mt-2 text-xs">For subsequent payments, you can easily proceed without re-entering your card details.</p>
                     </div>
                  </div>
               </div>
               <div>
                  <div className="border mt-6 w-[389px] border-[#C5C5C5] rounded-md">
                     <h4 className="border-[#C5C5C5] border-b pb-2 pt-3 px-4">Billing Summary</h4>
                     <div className="pt-4 pb-8">
                        <div className="flex justify-between px-4">
                           <p>Basic price</p>
                           <p>$24.99</p>
                        </div>
                        <div className="flex justify-between px-4 mt-4 ">
                           <p>VAT</p>
                           <p>$0.00</p>
                        </div>
                        <div className="flex justify-between px-4 mt-4 ">
                           <p>Total billing price</p>
                           <p>$24.99</p>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center py-2 px-4 w-full mt-8  gap-5 border-[#C5C5C5] border rounded-sm">
                     <input type="password" className="outline-none w-full" placeholder="Enter Pasword" />
                  </div>

                  <div className="flex justify-end mt-8 gap-3">
                     <button className="bg-white border-black border text-black w-[100px]   text-xs px-4 py-2 rounded-[4px]">Cancel</button>
                     <button className="bg-[#2073FA] w-[100px]   text-xs text-white px-4 py-2 rounded-[4px]">Proceed</button>
                  </div>
               </div>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Payment;
