import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { 
  cancelSubscription, 
  getBillingHistory, 
  reactivateSubscription,
  getActiveSubscription
} from "services/pricingService";
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
      const idToCancel = selectedSubscriptionId;
      closeCancelModal(); 
      
      try {
         const result = await dispatch(cancelSubscription(idToCancel));
         
         if (cancelSubscription.fulfilled.match(result)) {
            toast.success("Subscription cancelled successfully");
            await Promise.all([
               dispatch(getBillingHistory()),
               dispatch(getActiveSubscription()) 
            ]);
         } else {
            toast.error("Failed to cancel subscription");
         }
      } catch (error) {
         toast.error("An error occurred");
      }
   };

   const handleReactivate = async () => {
      if (!selectedSubscriptionId) return;
      
      const idToReactivate = selectedSubscriptionId;
      setReactivatingId(idToReactivate);
      closeReactivateModal();

      try {
         const result = await dispatch(reactivateSubscription(idToReactivate));
         
         if (reactivateSubscription.fulfilled.match(result)) {
            toast.success("Subscription reactivated successfully!");
            await Promise.all([
               dispatch(getBillingHistory()),
               dispatch(getActiveSubscription())
            ]);
         } else {
            toast.error("Failed to reactivate subscription");
         }
      } catch (error) {
         toast.error("An error occurred while reactivating");
      } finally {
         setReactivatingId(null);
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