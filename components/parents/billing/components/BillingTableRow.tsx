import React from "react";
import { format } from "date-fns";
import { cn } from "utils";
import ActionDropdown from "./ActionDropdown";
import { Subscription } from "types/interfaces/pricing.interface";


export interface BillingTableRowProps {
   data: Subscription;
   isReactivating: boolean;
   openDropdownId: number | null;
   onToggleDropdown: (id: number) => void;
   onAddPayment: (id: number) => void;
   onCancel: (id: number) => void;
   onReactivate: (id: number) => void;
}

const BillingTableRow: React.FC<BillingTableRowProps> = ({
   data,
   isReactivating,
   openDropdownId,
   onToggleDropdown,
   onAddPayment,
   onCancel,
   onReactivate
}) => {
   const isActive = data.is_active && !data.cancel_at_period_end;
   const isCancelled = data.cancel_at_period_end;

   return (
      <div className="flex min-w-fit items-center border-t border-black bg-white px-5 py-2">
         <p className="min-w-[150px] flex-1 text-sm">
            {data.plan_name}
            {isCancelled && (
               <span className="block text-[10px] text-orange-600 font-bold">
                  Cancels on {format(new Date(data.expiration_date), "MMM d, yyyy")}
               </span>
            )}
         </p>
         <p className="min-w-[150px] flex-1 text-sm capitalize">
            {data.plan_interval.toLowerCase()}
         </p>
         <p className="min-w-[150px] flex-1 text-sm">
            {data.activated_date 
               ? format(new Date(data.activated_date), "do MMMM, yyyy") 
               : <span className="text-gray-400 italic">Pending</span>}
         </p>
         <p className="min-w-[150px] flex-1 text-sm">
            {format(new Date(data.expiration_date), "do MMMM, yyyy")}
         </p>
         <div className="min-w-[150px] flex-1">
            <p className={cn(
                  "w-fit rounded-[20px] border px-3 py-1 text-sm",
                  isActive
                     ? "border-green-600 bg-green-200 text-green-600"
                     : isCancelled
                     ? "border-orange-600 bg-orange-200 text-orange-600"
                     : "border-red-600 bg-red-200 text-red-600"
               )}>
               {data.status === "TRIALING" ? "Free Trial" : data.status}
               {isCancelled && " (Cancelled)"}
            </p>
         </div>
         <div className="min-w-[100px]">
            <ActionDropdown
               subscriptionId={data.id}
               isOpen={openDropdownId === data.id}
               onToggle={() => onToggleDropdown(data.id)}
               onAddPayment={() => onAddPayment(data.id)}
               onCancel={() => onCancel(data.id)}
               onReactivate={() => onReactivate(data.id)}
               isCancelled={isCancelled}
               isActive={isActive}
               isReactivating={isReactivating}
            />
         </div>
      </div>
   );
};

export default BillingTableRow;