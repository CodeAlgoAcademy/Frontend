import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { 
  cancelSubscription as cancelSubscriptionThunk, 
  getBillingHistory, 
  reactivateSubscription,
  getActiveSubscription
} from "services/pricingService";
import { toast } from "sonner";

export const useBillingHistory = () => {
   const dispatch = useAppDispatch();
   const { billing_history } = useSelector((state: RootState) => state.pricing);

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

      const subDetails = billing_history?.find(sub => sub.id === idToCancel);
      
      const isFree = !(subDetails as any)?.stripe_subscription_id || (subDetails as any)?.plan_amount === 0;

      closeCancelModal(); 
      
      try {
         const result = await dispatch(cancelSubscriptionThunk({ id: idToCancel, isFree }));
         
         if (cancelSubscriptionThunk.fulfilled.match(result)) {
            toast.success("Subscription cancelled successfully");
            await Promise.all([
               dispatch(getBillingHistory()),
               dispatch(getActiveSubscription()) 
            ]);
         } else {
            const errorMsg = (result.payload as string) || "Failed to cancel subscription";
            toast.error(errorMsg);
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