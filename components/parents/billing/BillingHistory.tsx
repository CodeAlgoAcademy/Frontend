import React, { useState, useMemo } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "store/hooks";
import { cn } from "utils";
import { useRouter } from "next/router";
import { sortBillingHistory } from "./components/billingSort";
import { useBillingHistory } from "./components/useBillingHistory";
import BillingTableHeader from "./components/BillingTableHeader";
import BillingTableRow from "./components/BillingTableRow";
import ConfirmationModal from "./components/ConfirmationModal";
import HistorySkeleton from "./components/HistorySkeleton";



const BillingHistory = () => {
   const { handlers, billing_history } = useSelector((state: RootState) => state.pricing);
   const [showBill, setShowBill] = useState(true);
   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
   
   const router = useRouter();
   const dispatch = useAppDispatch();
   
   const {
      reactivatingId,
      cancelModalOpen,
      reactivateModalOpen,
      openCancelModal,
      openReactivateModal,
      closeCancelModal,
      closeReactivateModal,
      handleCancel,
      handleReactivate
   } = useBillingHistory();

   const handleAddPayment = (subscriptionId: number) => {
      setOpenDropdownId(null);
      router.push(`/parents/billing/payment?subscription_id=${subscriptionId}`);
   };

   const handleToggleDropdown = (id: number) => {
      setOpenDropdownId(openDropdownId === id ? null : id);
   };

   const displayHistory = useMemo(() => 
      sortBillingHistory(billing_history), 
   [billing_history]);

   return (
      <div>
         <ConfirmationModal
            isOpen={cancelModalOpen}
            onClose={closeCancelModal}
            onConfirm={handleCancel}
            title="Cancel Subscription"
            message="Are you sure you want to cancel this subscription? You will lose access to all premium features at the end of your current billing period."
            confirmText="Yes, Cancel"
            cancelText="No, Keep It"
            type="cancel"
         />

         <ConfirmationModal
            isOpen={reactivateModalOpen}
            onClose={closeReactivateModal}
            onConfirm={handleReactivate}
            title="Reactivate Subscription"
            message="Are you sure you want to reactivate this subscription? Your payment method will be charged according to the plan terms."
            confirmText="Yes, Reactivate"
            cancelText="No, Go Back"
            type="reactivate"
         />

         <div className="mt-8 flex items-end justify-between">
            <div 
               onClick={() => setShowBill(!showBill)} 
               className="flex items-center gap-3 cursor-pointer"
            >
               <h3 className="text-lg font-[600]">Billing Detail</h3>
               <p>
                  <BiChevronDown className={cn("transition-transform", showBill && "rotate-180")} />
               </p>
            </div>
         </div>

         {showBill && (
            <div className="mt-4">
               <div className="overflow-y-hidden overflow-x-scroll rounded-lg border">
                  <BillingTableHeader />

                  {handlers.billing_history_loading && (
                     <>
                        <HistorySkeleton />
                        <HistorySkeleton />
                        <HistorySkeleton />
                     </>
                  )}

                  {!handlers.billing_history_loading && displayHistory?.length === 0 && (
                     <div className="flex min-w-fit items-center justify-center bg-white px-5 py-10">
                        <p className="text-sm text-gray-500">No billing history available yet.</p>
                     </div>
                  )}

                  {!handlers?.billing_history_loading && displayHistory?.map((data) => (
                     <BillingTableRow
                        key={data.id}
                        data={data}
                        isReactivating={reactivatingId === data.id}
                        openDropdownId={openDropdownId}
                        onToggleDropdown={handleToggleDropdown}
                        onAddPayment={handleAddPayment}
                        onCancel={openCancelModal}
                        onReactivate={openReactivateModal}
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default BillingHistory;