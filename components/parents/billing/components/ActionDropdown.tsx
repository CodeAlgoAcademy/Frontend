import React, { useEffect, useRef } from "react";
import { MoreVertical, CreditCard, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "utils";

export interface ActionDropdownProps {
   subscriptionId: number;
   isOpen: boolean;
   onToggle: () => void;
   onAddPayment: () => void;
   onCancel: () => void;
   onReactivate: () => void;
   isCancelled: boolean;
   isActive: string | boolean;
   isReactivating?: boolean;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
   isOpen,
   onToggle,
   onAddPayment,
   onCancel,
   onReactivate,
   isCancelled,
   isActive,
   isReactivating = false,
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
            className="rounded p-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
            disabled={isReactivating}
         >
            <MoreVertical className="h-5 w-5 text-gray-600" />
         </button>

         {isOpen && (
            <div className="fixed z-40 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
                 style={{
                    top: dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().bottom + 4}px` : '0',
                    left: dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().right - 224}px` : '0',
                 }}>
               <div className="py-1">
                  <button
                     onClick={onAddPayment}
                     className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                     <CreditCard className="h-4 w-4 text-gray-500" />
                     <span>Add Payment Method</span>
                  </button>
                  
                  {isCancelled && (
                     <button
                        onClick={onReactivate}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
                        disabled={isReactivating}
                     >
                        <RefreshCw className={cn("h-4 w-4 text-green-500", isReactivating && "animate-spin")} />
                        <span>{isReactivating ? "Reactivating..." : "Reactivate Subscription"}</span>
                     </button>
                  )}

                  {isActive && !isCancelled && (
                     <button
                        onClick={onCancel}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                     >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span>Cancel Subscription</span>
                     </button>
                  )}

                  {!isActive && !isCancelled && (
                     <div className="flex w-full items-center gap-3 px-4 py-2 text-xs text-gray-400 italic">
                        <AlertCircle className="h-4 w-4 text-gray-300" />
                        <span>Subscription Inactive</span>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default ActionDropdown;