import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { updateSubscriptionChild, getActiveSubscription } from "services/pricingService";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Step2ManageChildren from "./Stepper/Step2managechildren";

interface ManageExistingChildrenProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const ManageExistingChildren: React.FC<ManageExistingChildrenProps> = ({ onCancel, onSuccess }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { current_subscription } = useSelector((state: RootState) => state.pricing);
  
  const [selectedChildIds, setSelectedChildIds] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (current_subscription?.children) {
      setSelectedChildIds(current_subscription.children.map(c => c.id));
    }
  }, [current_subscription]);

  // Locked state check
  const isLocked = current_subscription?.status === "PAST_DUE" || current_subscription?.status === "INCOMPLETE";

  const handlePayNow = () => {
    if (current_subscription?.id) {
       router.push(`/parents/billing/payment?subscription_id=${current_subscription.id}`);
    }
  };

  const handleSaveChanges = async () => {
    if (!current_subscription) return;
    
    setIsProcessing(true);
    
    const currentIds = current_subscription.children?.map(c => c.id) || [];
    const childrenToRemove = currentIds.filter(id => !selectedChildIds.includes(id));
    const childrenToAdd = selectedChildIds.filter(id => !currentIds.includes(id));

    if (childrenToRemove.length === 0 && childrenToAdd.length === 0) {
      toast.info("No changes made.");
      setIsProcessing(false);
      onSuccess();
      return;
    }

    try {
      // 1. Process Removals
      await Promise.all(childrenToRemove.map(id => 
        dispatch(updateSubscriptionChild({
          subscriptionId: current_subscription.id,
          childId: id,
          active: false
        }))
      ));

      // 2. Process Additions
      for (const id of childrenToAdd) {
        const result = await dispatch(updateSubscriptionChild({
          subscriptionId: current_subscription.id,
          childId: id,
          active: true
        }));

        if (updateSubscriptionChild.fulfilled.match(result)) {
           const payload = result.payload as any;
           
           if (payload.status === 'requires_payment' || payload.status === 'requires_payment_action') {
             toast.message("Payment Required", { description: "Please complete payment to activate this child." });
             
             const secretParam = payload.client_secret ? `&client_secret=${payload.client_secret}` : "";
             router.push(`/parents/billing/payment?subscription_id=${current_subscription.id}${secretParam}`);
             return; 
           }
        } 
        else if (updateSubscriptionChild.rejected.match(result)) {
           const errorPayload = result.payload as any;
           if (errorPayload?.status_code === 400 || errorPayload?.details?.[0]?.message?.includes("active")) {
              toast.error("Subscription is Past Due", { description: "You must pay your outstanding balance before adding more children." });
              router.push(`/parents/billing/payment?subscription_id=${current_subscription.id}`);
              return;
           }
        }
      }

      toast.success("Subscription updated successfully");
      await dispatch(getActiveSubscription());
      onSuccess();

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLocked) {
    return (
      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <h3 className="text-lg font-bold text-red-900">Payment Required</h3>
        <p className="mt-1 text-sm text-red-700">
          Your subscription is currently <strong>Past Due</strong>. Please pay to continue.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onCancel} className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700">Cancel</button>
          <button onClick={handlePayNow} className="rounded-xl bg-red-600 px-6 py-2 text-sm font-semibold text-white">Pay Outstanding Balance</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6">
       <Step2ManageChildren 
          selectedChildIds={selectedChildIds}
          setSelectedChildIds={setSelectedChildIds}
          goBack={onCancel}
          goNext={handleSaveChanges}
          submitLabel="Save Changes"
          isProcessing={isProcessing}
       />
    </div>
  );
};

export default ManageExistingChildren;