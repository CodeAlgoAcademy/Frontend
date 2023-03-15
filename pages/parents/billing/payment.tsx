import { PaymentConfirmation, PaymentMade } from "@/components/parents/BillingModals";
import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import { countryList } from "@/components/signup/countries";
import { Checkbox } from "@mui/material";
import { height } from "@mui/system";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

const Payment = () => {
   const [active, setActive] = useState(1);
   const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
   const [paidModalOpen, setPaidModalOpened] = useState<boolean>(false);
   return (
      <ParentLayout>
         {confirmationModalOpen && <PaymentConfirmation setConfirmationModalOpen={setConfirmationModalOpen} />}
         {paidModalOpen && <PaymentMade setPaidModalOpened={setPaidModalOpened} />}
         <div className=" scrollbar-hide overflow-y-scroll bg-white px-8 pt-6 pb-10">
            <h4 className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">Credit Card Payment</h4>
            <div className="flex w-full items-start gap-8">
               <div className="mt-6 flex-1 ">
                  <div className="flex items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
                     <p>Email</p>
                     <input type="email" className="w-full outline-none" placeholder="peterobi.codealgo@gmail.com" />
                  </div>
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Card Information</h4>
                  <div className="flex items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
                     <input type="email" className="w-full outline-none" placeholder="1234 5678 9123 4567" />
                     <div className="flex items-center">
                        <Image height={42} width={80} src="/assets/smaster.png" alt="master" />
                        <Image height={42} width={80} src="/assets/visa.png" alt="master" />
                        <Image height={42} width={80} src="/assets/express.png" alt="master" />
                     </div>
                  </div>
                  <div className="flex ">
                     <div className="flex w-full items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
                        <input type="email" className="w-full outline-none" placeholder="MM/YY" />
                     </div>
                     <div className="flex w-full items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
                        <input type="email" className="w-full outline-none" placeholder="CVC" />
                     </div>
                  </div>
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Name on Card</h4>
                  <div className="flex w-full items-center gap-5  rounded-sm border border-[#C5C5C5] py-2 px-4">
                     <input type="email" className="w-full outline-none" placeholder="1234 5678 9123 4567" />
                  </div>
                  <h4 className="mt-8 pb-2 text-lg font-[600]">Country</h4>
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
                  <div>
                     <div className="mt-8 w-full rounded-md border border-[#C5C5C5] px-4 pt-4 pb-6">
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
                  <div className="mt-6 w-[389px] rounded-md border border-[#C5C5C5]">
                     <h4 className="border-b border-[#C5C5C5] px-4 pb-2 pt-3">Billing Summary</h4>
                     <div className="pt-4 pb-8">
                        <div className="flex justify-between px-4">
                           <p>Basic price</p>
                           <p>$24.99</p>
                        </div>
                        <div className="mt-4 flex justify-between px-4 ">
                           <p>VAT</p>
                           <p>$0.00</p>
                        </div>
                        <div className="mt-4 flex justify-between px-4 ">
                           <p>Total billing price</p>
                           <p>$24.99</p>
                        </div>
                     </div>
                  </div>
                  <div className="mt-8 flex w-full items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
                     <input type="password" className="w-full outline-none" placeholder="Enter Pasword" />
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                     <button className="w-[100px] rounded-[4px] border border-black bg-white   px-4 py-2 text-xs text-black">Cancel</button>
                     <button
                        className="w-[100px] rounded-[4px]   bg-[#2073FA] px-4 py-2 text-xs text-white"
                        onClick={() => {
                           setConfirmationModalOpen(true);
                        }}
                     >
                        Proceed
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Payment;
