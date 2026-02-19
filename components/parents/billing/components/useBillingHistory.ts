import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { cancelSubscription, getBillingHistory, reactivateSubscription } from "services/pricingService";
import { toast } from "sonner";

export const useBillingHistory = () => {
   const dispatch = useAppDispatch();
   const [reactivatingId, setReactivatingId] = useState<number | null>(null);
   const [cancelModalOpen, setCancelModalOpen] = useState(false);
   const [reactivateModalOpen, setReactivateModalOpen] = useState(false);
   const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<number | null>(null);

   const openCancelModal = (subscriptionId: number) => {
      setSelectedSubscriptionId(subscriptionId);
      setCancelModalOpen(true);
   };

   const openReactivateModal = (subscriptionId: number) => {
      setSelectedSubscriptionId(subscriptionId);
      setReactivateModalOpen(true);
   };

   const closeCancelModal = () => {
      setCancelModalOpen(false);
      setSelectedSubscriptionId(null);
   };

   const closeReactivateModal = () => {
      setReactivateModalOpen(false);
      setSelectedSubscriptionId(null);
   };

   const handleCancel = async () => {
      if (!selectedSubscriptionId) return;
      
      try {
         const result = await dispatch(cancelSubscription(selectedSubscriptionId));
         if (cancelSubscription.fulfilled.match(result)) {
            toast.success("Subscription cancelled successfully");
            dispatch(getBillingHistory());
         } else {
            toast.error("Failed to cancel subscription");
         }
      } catch (error) {
         toast.error("An error occurred");
      } finally {
         setSelectedSubscriptionId(null);
      }
   };

   const handleReactivate = async () => {
      if (!selectedSubscriptionId) return;
      
      setReactivatingId(selectedSubscriptionId);
      
      try {
         const result = await dispatch(reactivateSubscription(selectedSubscriptionId));
         if (reactivateSubscription.fulfilled.match(result)) {
            toast.success("Subscription reactivated successfully!");
            dispatch(getBillingHistory());
         } else {
            toast.error("Failed to reactivate subscription");
         }
      } catch (error) {
         toast.error("An error occurred while reactivating");
      } finally {
         setReactivatingId(null);
         setSelectedSubscriptionId(null);
      }
   };

   return {
      reactivatingId,
      cancelModalOpen,
      reactivateModalOpen,
      selectedSubscriptionId,
      openCancelModal,
      openReactivateModal,
      closeCancelModal,
      closeReactivateModal,
      handleCancel,
      handleReactivate
   };
};