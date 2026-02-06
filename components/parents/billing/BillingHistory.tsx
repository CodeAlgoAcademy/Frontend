import React, { useEffect, useState, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { cn } from "utils";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { MoreVertical, CreditCard } from "lucide-react";

const BillingHistory = () => {
   const { handlers, billing_history } = useSelector((state: RootState) => state.pricing);
   const [showBill, setShowBill] = useState(true);
   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
   const router = useRouter();

   const handleAddPayment = (subscriptionId: number) => {
      setOpenDropdownId(null);
      router.push(`/parents/billing/payment?subscription_id=${subscriptionId}`);
   };

   return (
      <div>
         <div className="mt-8 flex items-end justify-between">
            <div onClick={() => setShowBill(!showBill)} className="flex items-center gap-3 cursor-pointer">
               <h3 className="text-lg font-[600]">Billing Detail</h3>
               <p>
                  <BiChevronDown className={cn("transition-transform", showBill && "rotate-180")} />
               </p>
            </div>
         </div>
         {showBill && (
            <div className="mt-4">
               <div className="overflow-y-hidden overflow-x-scroll rounded-lg border">
                  <div className="flex min-w-fit bg-[#C5C5C5] px-5 py-2">
                     <p className="min-w-[150px] flex-1">Invoice</p>
                     <p className="min-w-[150px] flex-1">Plan Interval</p>
                     <p className="min-w-[150px] flex-1">Activation Date</p>
                     <p className="min-w-[150px] flex-1">Expiration Date</p>
                     <p className="min-w-[150px] flex-1">Status</p>
                     <p className="min-w-[100px]">Action</p>
                  </div>

                  {handlers.billing_history_loading && (
                     <>
                        <HistorySkeleton />
                        <HistorySkeleton />
                        <HistorySkeleton />
                     </>
                  )}

                  {!handlers.billing_history_loading && billing_history?.length === 0 && (
                     <div className="flex min-w-fit items-center justify-center bg-white px-5 py-10">
                        <p className="text-sm text-gray-500">
                           No billing history available yet.
                        </p>
                     </div>
                  )}

                  {!handlers?.billing_history_loading && billing_history && billing_history?.length > 0 && billing_history?.map((data, index) => (
                     <div
                        key={index}
                        className="flex min-w-fit items-center border-t border-black bg-white px-5 py-2"
                     >
                        <p className="min-w-[150px] flex-1 text-sm">{data.plan_name}</p>
                        <p className="min-w-[150px] flex-1 text-sm">{data.plan_interval}</p>
                        <p className="min-w-[150px] flex-1 text-sm">
                           {format(new Date(data.activated_date), "do MMMM, yyyy")}
                        </p>
                        <p className="min-w-[150px] flex-1 text-sm">
                           {format(new Date(data.expiration_date), "do MMMM, yyyy")}
                        </p>
                        <div className="min-w-[150px] flex-1">
                           <p
                              className={cn(
                                 "w-fit rounded-[20px] border px-3 py-1 text-sm",
                                 data.is_active
                                    ? "border-green-600 bg-green-200 text-green-600"
                                    : "border-red-600 bg-red-200 text-red-600"
                              )}
                           >
                              {data.status === "TRIALING" ? "Free Trial": data.status}
                           </p>
                        </div>
                        <div className="min-w-[100px]">
                           <ActionDropdown
                              subscriptionId={data.id}
                              isOpen={openDropdownId === data.id}
                              onToggle={() => setOpenDropdownId(openDropdownId === data.id ? null : data.id)}
                              onAddPayment={() => handleAddPayment(data.id)}
                              status={data.status}
                           />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

interface ActionDropdownProps {
   subscriptionId: number;
   isOpen: boolean;
   onToggle: () => void;
   onAddPayment: () => void;
   status: string;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
   subscriptionId,
   isOpen,
   onToggle,
   onAddPayment,
   status,
}) => {
   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            if (isOpen) onToggle();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [isOpen, onToggle]);

   return (
      <div ref={dropdownRef} className="relative inline-block">
         <button
            onClick={onToggle}
            className="rounded p-1 hover:bg-gray-100 transition-colors"
            aria-label="Actions"
         >
            <MoreVertical className="h-5 w-5 text-gray-600" />
         </button>

         {isOpen && (
            <div className="fixed z-50 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
                 style={{
                    top: dropdownRef.current ? 
                       `${dropdownRef.current.getBoundingClientRect().bottom + 4}px` : '0',
                    left: dropdownRef.current ? 
                       `${dropdownRef.current.getBoundingClientRect().right - 224}px` : '0',
                 }}
            >
               <div className="py-1">
                  <button
                     onClick={onAddPayment}
                     className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                     <CreditCard className="h-4 w-4 text-gray-500" />
                     <span>Add Payment Method</span>
                  </button>
                  {/* You can add more action items here if needed */}
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