import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import {
  initiatePayment,
  changePlan,
  getBillingHistory,
  getActiveSubscription,
} from "services/pricingService";
import { toast } from "sonner";
import SubscriptionSuccessModal from "../TrialPaymentRequiredModal";

interface Step3ConfirmProps {
  priceId: number;
  selectedChildIds: number[];
  goBack: () => void;
  onSuccess: (subscriptionId: number) => void;
  existingSubscriptionId: number | null;
}

const Step3Confirm: React.FC<Step3ConfirmProps> = ({ priceId, goBack, onSuccess, existingSubscriptionId, selectedChildIds }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { plans, coupon_validation, current_subscription, handlers } = useSelector(
    (state: RootState) => state.pricing
  );
  const { children: allChildren } = useSelector((state: RootState) => state.parentChild);

  const hasExistingSubscription = !!existingSubscriptionId;
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newSubscriptionId, setNewSubscriptionId] = useState<number | null>(null);
  const [isTrialSubscription, setIsTrialSubscription] = useState(false);

  const selectedChildrenNames = useMemo(() => {
    if (!selectedChildIds || selectedChildIds.length === 0) return "None";
    
    return allChildren
      .filter((child) => selectedChildIds.includes(Number(child.id)))
      .map((child) => child.fullName || child.username || "Child")
      .join(", ");
  }, [allChildren, selectedChildIds]);


  const isPendingSubscription = useMemo(() => {
    return hasExistingSubscription && current_subscription?.status === "PENDING";
  }, [hasExistingSubscription, current_subscription]);

  const selectedPrice = useMemo(() => {
    for (const plan of plans) {
      const price = plan.prices.find((p) => p.id === priceId);
      if (price) return { plan, price };
    }
    return null;
  }, [plans, priceId]);

  const priceDetails = useMemo(() => {
    if (!selectedPrice) return null;
    const baseAmount = selectedPrice.price.amount_in_cent / 100;
    let discount = 0;
    if (coupon_validation?.code && coupon_validation.discount) {
      discount =
        coupon_validation.discount.type === "percentage"
          ? (baseAmount * coupon_validation.discount.value) / 100
          : coupon_validation.discount.value;
    }
    return { baseAmount, discount, finalAmount: baseAmount - discount };
  }, [selectedPrice, coupon_validation]);

  const handleCreateSubscription = async () => {
    setIsProcessing(true);
    try {
      const result = await dispatch(
        initiatePayment({
          price_id: priceId,
          is_trial: true, 
          children: selectedChildIds, 
          ...(coupon_validation?.code && { promotion_code: coupon_validation.code }),
        })
      );

      if (!initiatePayment.fulfilled.match(result)) {
        toast.error("Failed to create subscription.");
        return;
      }

      const payload = result.payload as {
        status: string;
        subscription: number;
        client_secret?: string;
      };

      const newSubId = payload.subscription; 
      const status = payload.status;

      await dispatch(getActiveSubscription());
      await dispatch(getBillingHistory());

      setNewSubscriptionId(newSubId);

      if (status === "requires_payment_action") {
         toast.success("Subscription created! Please complete payment.");
         router.push(`/parents/billing/payment?subscription_id=${newSubId}`);
         return; 
      }

      setIsTrialSubscription(status === "trialing");
      setShowSuccessModal(true);

    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChangePlan = async () => {
    if (!existingSubscriptionId) return;
    setIsProcessing(true);
    try {
      const result = await dispatch(
        changePlan({ subscriptionId: existingSubscriptionId, priceId })
      );
      
      if (changePlan.fulfilled.match(result)) {
        const payload = result.payload as any;
        
        if (payload.client_secret) {
          toast.success("Action required to complete plan change.");
          router.push(`/parents/billing/payment?subscription_id=${existingSubscriptionId}&client_secret=${payload.client_secret}`);
        } else {
          toast.success("Plan updated successfully!");
          await dispatch(getActiveSubscription());
          await dispatch(getBillingHistory());
          onSuccess(existingSubscriptionId);
        }
      } else {
        toast.error("Failed to change plan.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActivate = () => {
    if (isPendingSubscription) {
      router.push(`/parents/billing/payment?subscription_id=${existingSubscriptionId}`);
    } else if (hasExistingSubscription) {
      handleChangePlan();
    } else {
      handleCreateSubscription();
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    if (newSubscriptionId) onSuccess(newSubscriptionId);
  };

  const handleAddPayment = () => {
    if (!newSubscriptionId) return;
    setShowSuccessModal(false);
    router.push(`/parents/billing/payment?subscription_id=${newSubscriptionId}`);
  };

  const isLoading =
    handlers.initiate_payment_loading || handlers.change_plan_loading || isProcessing;

  return (
    <>
      <div className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className={`flex items-center justify-center gap-2 px-4 py-5 text-white ${isPendingSubscription ? "bg-red-500" : "bg-mainColor"}`}>
          {isPendingSubscription ? (
             <h2 className="text-lg font-bold">Payment Required</h2>
          ) : (
             <h2 className="text-lg font-bold">
               {hasExistingSubscription ? "Confirm Plan Change" : "Confirm & Start"}
             </h2>
          )}
        </div>

        <div className="px-6 py-6">
          {selectedPrice && priceDetails ? (
            <div className="space-y-1">
              <SummaryRow
                label="Plan"
                value={`${selectedPrice.plan.name} – ${selectedPrice.price.interval.toLowerCase()}`}
              />
              <SummaryRow
                label="Price"
                value={`$${priceDetails.baseAmount.toFixed(2)} / ${selectedPrice.price.interval.toLowerCase()}`}
              />
              
              <SummaryRow 
                label="Children Included" 
                value={selectedChildrenNames} 
                className="text-right max-w-[50%]" 
              />

              {coupon_validation?.code && priceDetails.discount > 0 && (
                <SummaryRow
                  label={`Discount (${coupon_validation.code})`}
                  value={`-$${priceDetails.discount.toFixed(2)}`}
                  accent="green"
                />
              )}

              {priceDetails.discount > 0 && (
                <>
                  <div className="!my-4 border-t border-gray-100" />
                  <SummaryRow
                    label="Total"
                    value={`$${priceDetails.finalAmount.toFixed(2)} / ${selectedPrice.price.interval.toLowerCase()}`}
                    bold
                  />
                </>
              )}

              {isPendingSubscription && (
                <div className="!mt-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  This plan is pending. Please complete the payment to activate.
                </div>
              )}

              {!hasExistingSubscription && !isPendingSubscription && (
                <div className="!mt-5 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your 7-day free trial starts today.
                </div>
              )}
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-gray-400">Loading plan details…</p>
          )}

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={isLoading}
              className="w-1/3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleActivate}
              disabled={isLoading || !selectedPrice}
              className={`flex-1 rounded-xl px-4 py-3 font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50
                ${isPendingSubscription ? "bg-red-600 hover:bg-red-700" : "bg-mainColor"}
              `}
            >
              {isLoading
                ? "Processing..."
                : isPendingSubscription
                ? "Pay Now →" 
                : hasExistingSubscription 
                ? "Confirm Plan Change" 
                : "Start Trial"}
            </button>
          </div>
        </div>
      </div>

      {newSubscriptionId && (
        <SubscriptionSuccessModal
          open={showSuccessModal}
          onClose={handleSuccessClose}
          onAddPayment={handleAddPayment}
          subscriptionId={newSubscriptionId}
          isTrialSubscription={isTrialSubscription}
        />
      )}
    </>
  );
};

export default Step3Confirm;

const SummaryRow: React.FC<{
  label: string;
  value: string;
  accent?: "green";
  bold?: boolean;
  className?: string;
}> = ({ label, value, accent, bold, className }) => (
  <div className="flex items-center justify-between border-b border-gray-50 py-3 last:border-0">
    <span className="text-sm text-gray-500 shrink-0 mr-4">{label}</span>
    <span
      className={`text-sm ${bold ? "font-bold text-gray-900" : "font-medium"} ${
        accent === "green" ? "text-green-600" : "text-gray-800"
      } ${className || ""}`}
    >
      {value}
    </span>                
  </div>
);
