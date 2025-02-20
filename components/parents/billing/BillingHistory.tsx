import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { TbFileDownload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getBillingHistory } from "services/pricingService";
import { RootState } from "store/store";
import { cn } from "utils";
import { format } from "date-fns";

const BillingHistory = () => {
   const { handlers, billing_history } = useSelector((state: RootState) => state.pricing);
   const dispatch = useDispatch();
   const [showBill, setShowBill] = useState(false);

   useEffect(() => {
      dispatch(getBillingHistory());
   }, [showBill]);

   return (
      <div>
         <div className="mt-8 flex items-end justify-between">
            <div onClick={() => setShowBill(!showBill)} className="flex items-center gap-3">
               <h3 className="text-lg  font-[600]">Billing History</h3>
               <p>
                  <BiChevronDown />
               </p>
            </div>
            {/* <button className="ml-auto flex items-center gap-1 rounded-md  bg-[#008BF8] px-5 py-2 text-white ">
               <TbFileDownload className="text-2xl" />
               <p className="whitespace-nowrap"> Download All</p>
            </button> */}
         </div>
         {showBill && (
            <div className="mt-4">
               <div className="overflow-y-hidden overflow-x-scroll rounded-lg border  ">
                  <div className="flex min-w-fit bg-[#C5C5C5] px-5 py-2">
                     <p className="min-w-[150px] flex-1">Invoice</p>

                     <p className="min-w-[150px] flex-1">Amounts($)</p>
                     <p className="min-w-[150px] flex-1">Activation Date</p>
                     <p className="min-w-[150px] flex-1">Expiration Date</p>
                     <p className="min-w-[150px] flex-1">Status</p>
                  </div>
                  {/* here */}

                  {billing_history?.map((data, Index) => (
                     <div key={Index} className=" flex min-w-fit cursor-pointer items-center border-t border-black bg-white px-5 py-2">
                        <p className="min-w-[150px] flex-1 text-sm">{data.plan_name}</p>

                        <p className="min-w-[150px] flex-1 text-sm">{data.amount}</p>
                        <p className="min-w-[150px] flex-1 text-sm">{format(data.activated_date, "do MMMM, yyyy")}</p>
                        <p className="min-w-[150px] flex-1 text-sm">{format(data.expiration_date, "do MMMM, yyyy")}</p>
                        <div className="min-w-[150px] flex-1">
                           <p
                              className={cn(
                                 "w-fit rounded-[20px] border px-3 py-1 text-sm",
                                 data.is_active && "border-green-600 bg-green-200 text-green-600",
                                 !data.is_active && "border-red-600 bg-red-200 text-red-600"
                              )}
                           >
                              {data.is_active ? "Active" : "Inactive"}
                           </p>
                        </div>
                     </div>
                  ))}
                  {handlers.billing_history_loading && (
                     <>
                        <HistorySkeleton />
                        <HistorySkeleton />
                        <HistorySkeleton />
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

const HistorySkeleton = () => {
   return (
      <div className="h-[40px] w-full animate-pulse bg-gray-200">
         <hr />
      </div>
   );
};

export default BillingHistory;
