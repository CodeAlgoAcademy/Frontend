// import { useRouter } from "next/router";
// import { useMemo, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { 
//   initiatePayment, 
//   getBillingHistory, 
//   cancelSubscription,
// } from "services/pricingService";
// import { useAppDispatch } from "store/hooks";
// import { RootState } from "store/store";
// import { toast } from "sonner";
// import SubscriptionSuccessModal from "../TrialPaymentRequiredModal";
// import { BillingStepperHandle } from "./BillingStepper.tsx";

// interface Step3Props {
//   priceId: number;
//   selectedChildren: (string | number)[];
//   goBack: () => void;
//   onResetToStepOne?: () => void;
// }

// const Step3ConfirmPay: React.FC<Step3Props> = ({
//   priceId,
//   selectedChildren,
//   goBack,
//   onResetToStepOne,
// }) => {
//   const { plans, coupon_validation, billing_history } = useSelector((state: RootState) => state.pricing);
//   const { children } = useSelector((state: RootState) => state.parentChild);
//   const user = useSelector((state: RootState) => state.user);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { handlers } = useSelector((state: RootState) => state.pricing);
//   const stepperRef = useRef<BillingStepperHandle>(null);

//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [subscriptionData, setSubscriptionData] = useState<{
//     subscription_id: number;
//     is_trial: boolean;
//     trial_ends_at?: string;
//   } | null>(null);
//   const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

//   const isFirstSubscription = useMemo(() => {
//     if (typeof user?.has_created_subscription === 'boolean') {
//       return !user.has_created_subscription;
//     }
//     return !billing_history || billing_history.length === 0;
//   }, [user?.has_created_subscription, billing_history]);

//   const hasSelectedChildren = selectedChildren.length > 0;

//   const selectedPrice = useMemo(() => {
//     for (const plan of plans) {
//       const price = plan.prices.find((p) => p.id === priceId);
//       if (price) return { plan, price };
//     }
//     return null;
//   }, [plans, priceId]);

//   const childNames = hasSelectedChildren 
//     ? children
//         .filter((c) => selectedChildren.includes(c.id))
//         .map((c) => c.fullName)
//     : [];

//   const priceDetails = useMemo(() => {
//     if (!selectedPrice) return null;

//     const baseAmount = selectedPrice.price.amount_in_cent / 100;
//     let discount = 0;
//     let finalAmount = baseAmount;

//     if (coupon_validation?.code && coupon_validation.discount) {
//       if (coupon_validation.discount.type === "percentage") {
//         discount = (baseAmount * coupon_validation.discount.value) / 100;
//       } else {
//         discount = coupon_validation.discount.value;
//       }
//       finalAmount = baseAmount - discount;
//     }

//     return { baseAmount, discount, finalAmount };
//   }, [selectedPrice, coupon_validation]);

//   const handleActivate = async () => {
//     try {
//       setIsLoadingSubscription(true);
//       const existingSubscriptionIds = (billing_history || []).map(sub => sub.id);

//       const existingTrials = billing_history?.filter(
//         (sub) => sub.status === "TRIALING" && sub.payment_status !== "Paid"
//       ) || [];

//       if (existingTrials.length > 0) {
//         console.log(`Cancelling ${existingTrials.length} existing trial subscription(s)...`);
        
//         const cancelPromises = existingTrials.map(trial => 
//           dispatch(cancelSubscription(trial.id))
//         );
        
//         const cancelResults = await Promise.allSettled(cancelPromises);
//         cancelResults.forEach((result, index) => {
//           if (result.status === 'rejected') {
//             console.error(`Failed to cancel trial ${existingTrials[index].id}:`, result.reason);
//           }
//         });

//         await new Promise(resolve => setTimeout(resolve, 1000));
//       }

//       const payload: any = {
//         price_id: priceId,
//         is_trial: true,
//       };

//       if (hasSelectedChildren) {
//         payload.children = selectedChildren as number[];
//       }

//       if (coupon_validation?.code) {
//         payload.promotion_code = coupon_validation.code;
//       }
//       const result = await dispatch(initiatePayment(payload));
//       if (!initiatePayment.fulfilled.match(result)) {
//         toast.error("Failed to create subscription");
//         setIsLoadingSubscription(false);
//         return;
//       }
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       const billingResult = await dispatch(getBillingHistory());
//       if (!getBillingHistory.fulfilled.match(billingResult)) {
//         toast.error("Subscription created but couldn't retrieve details. Please check your billing page.");
//         setIsLoadingSubscription(false);
//         setTimeout(() => router.push("/parents/billing"), 2000);
//         return;
//       }

//       const subscriptions = billingResult.payload;

//       let newSubscription = subscriptions.find((sub: any) => 
//         !existingSubscriptionIds.includes(sub.id)
//       );

//       if (!newSubscription) {
//         const trialingSubscriptions = subscriptions.filter(
//           (sub: any) => sub.status?.toLowerCase() === 'trialing' && !sub.cancel_at_period_end
//         );

//         if (trialingSubscriptions.length > 0) {
//           newSubscription = trialingSubscriptions.sort((a: any, b: any) => {
//             const dateA = a.activated_date ? new Date(a.activated_date).getTime() : 0;
//             const dateB = b.activated_date ? new Date(b.activated_date).getTime() : 0;
//             return dateB - dateA || b.id - a.id;
//           })[0];
//         }
//       }

//       if (!newSubscription) {
//         toast.success("Subscription created! Redirecting to billing page...");
//         setIsLoadingSubscription(false);
//         setTimeout(() => router.push("/parents/billing"), 2000);
//         return;
//       }
//       const subscriptionInfo = {
//         subscription_id: newSubscription.id,
//         is_trial: newSubscription.status?.toLowerCase() === 'trialing',
//         trial_ends_at: newSubscription.expiration_date,
//       };

//       setSubscriptionData(subscriptionInfo);
//       setIsLoadingSubscription(false);
//       setShowSuccessModal(true);

//     } catch (error) {
//       console.error("Subscription creation error:", error);
//       toast.error("An error occurred. Please try again.");
//       setIsLoadingSubscription(false);
//     }
//   };

//   const handleCloseModal = async () => {
//     setShowSuccessModal(false);
//     await dispatch(getBillingHistory());
//     if (onResetToStepOne) {
//       onResetToStepOne();
//     } else if (stepperRef.current) {
//       stepperRef.current?.resetToStepOne();
//     }
//     document.getElementById('stepper-section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleAddPayment = () => {
//     if (!subscriptionData?.subscription_id) {
//       toast.error("Missing subscription information");
//       return;
//     }
//     setShowSuccessModal(false);
//     router.push(
//       `/parents/billing/payment?subscription_id=${subscriptionData.subscription_id}`
//     );
//   };

//   const isLoading = handlers.initiate_payment_loading || isLoadingSubscription;

//   return (
//     <>
//       <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
//         <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
//           <h2 className="text-lg font-bold">Confirm & Pay</h2>
//         </div>

//         <div className="px-6 py-6">
//           {selectedPrice && priceDetails && (
//             <>
//               <div className="mb-4 flex justify-between border-b pb-2">
//                 <span className="font-medium text-gray-600">Plan</span>
//                 <span className="font-semibold text-gray-900">
//                   {selectedPrice.plan.name} – ${priceDetails.baseAmount.toFixed(2)} /{" "}
//                   {selectedPrice.price.interval.toLowerCase()}
//                 </span>
//               </div>

//               {coupon_validation?.code && priceDetails.discount > 0 && (
//                 <>
//                   <div className="mb-4 flex justify-between border-b pb-2">
//                     <span className="font-medium text-gray-600">
//                       Coupon Discount
//                       {coupon_validation?.code && ` (${coupon_validation?.code})`}
//                     </span>
//                     <span className="font-semibold text-green-600">
//                       -${priceDetails.discount.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="mb-4 flex justify-between border-b pb-2">
//                     <span className="font-medium text-gray-600">Total</span>
//                     <span className="font-bold text-gray-900">
//                       ${priceDetails.finalAmount.toFixed(2)}
//                     </span>
//                   </div>
//                 </>
//               )}
//             </>
//           )}
          
//           {/* Children Section */}
//           <div className="mb-6 flex justify-between border-b pb-2">
//             <span className="font-medium text-gray-600">Children</span>
//             <span className="font-semibold text-gray-900 text-right">
//               {hasSelectedChildren ? (
//                 childNames.join(", ")
//               ) : (
//                 <span className="text-gray-400 italic text-sm">
//                   None selected - you can add children later
//                 </span>
//               )}
//             </span>
//           </div>

//           <div className="mt-8 flex justify-between gap-4">
//             <button
//               onClick={goBack}
//               disabled={isLoading}
//               className="w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 disabled:opacity-50"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleActivate}
//               disabled={isLoading}
//               className="w-1/2 rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
//             >
//               {isLoading ? "Creating Subscription..." : "Start Subscription"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       {subscriptionData && (
//         <SubscriptionSuccessModal
//           open={showSuccessModal}
//           onClose={handleCloseModal}
//           onAddPayment={handleAddPayment}
//           subscriptionId={subscriptionData.subscription_id}
//           isTrialSubscription={subscriptionData.is_trial}
//           trialEndsAt={subscriptionData.trial_ends_at}
//         />
//       )}
//     </>
//   );
// };

// export default Step3ConfirmPay;




import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  initiatePayment,
  getBillingHistory,
  updateSubscriptionChildren,
} from "services/pricingService";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { toast } from "sonner";
import SubscriptionSuccessModal from "../TrialPaymentRequiredModal";

interface Step3Props {
  priceId: number;
  selectedChildren: (string | number)[];
  goBack: () => void;
  onResetToStepOne?: () => void;
}

const Step3ConfirmPay: React.FC<Step3Props> = ({
  priceId,
  selectedChildren,
  goBack,
  onResetToStepOne,
}) => {
  const { plans, coupon_validation, billing_history, handlers, active_subscription } =
    useSelector((state: RootState) => state.pricing);
  const { children } = useSelector((state: RootState) => state.parentChild);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<{
    subscription_id: number;
    is_trial: boolean;
    trial_ends_at?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeSubscriptionRecord = useMemo(() => {
    if (!billing_history) return null;
    return (
      billing_history.find(
        (sub) =>
          (sub.status === "ACTIVE" || sub.status === "TRIALING") &&
          !sub.cancel_at_period_end
      ) ?? null
    );
  }, [billing_history]);

  const hasActiveSubscription = !!activeSubscriptionRecord;

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

  const childNames = children
    .filter((c) => selectedChildren.includes(c.id))
    .map((c) => c.fullName);

  const childDiff = useMemo(() => {
    if (!activeSubscriptionRecord) return null;
    const currentIds = activeSubscriptionRecord.children.map((c) => c.id);
    return {
      children_to_add: (selectedChildren as number[]).filter(
        (id) => !currentIds.includes(id)
      ),
      children_to_remove: currentIds.filter(
        (id) => !selectedChildren.includes(id)
      ),
    };
  }, [activeSubscriptionRecord, selectedChildren]);

  const hasChildChanges =
    childDiff &&
    (childDiff.children_to_add.length > 0 || childDiff.children_to_remove.length > 0);

  const handleUpdateChildren = async () => {
    if (!activeSubscriptionRecord || !childDiff) return;

    if (!hasChildChanges) {
      toast.info("No changes to children detected.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await dispatch(
        updateSubscriptionChildren({
          subscription_id: activeSubscriptionRecord.id,
          children_to_add: childDiff.children_to_add,
          children_to_remove: childDiff.children_to_remove,
        })
      );

      if (updateSubscriptionChildren.fulfilled.match(result)) {
        toast.success("Subscription children updated successfully.");
        await dispatch(getBillingHistory());
        onResetToStepOne?.();
        document.getElementById("stepper-section")?.scrollIntoView({ behavior: "smooth" });
      } else {
        toast.error("Failed to update children. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubscription = async () => {
    if (hasActiveSubscription) {
      toast.error("You already have an active subscription.");
      return;
    }

    try {
      setIsLoading(true);

      const payload: Parameters<typeof initiatePayment>[0] extends { type: string }
        ? never
        : {
            price_id: number;
            children: number[];
            is_trial: boolean;
            promotion_code?: string;
          } = {
        price_id: priceId,
        children: selectedChildren as number[],
        is_trial: true,
      };

      if (coupon_validation?.code) {
        payload.promotion_code = coupon_validation.code;
      }

      const result = await dispatch(initiatePayment(payload));

      if (!initiatePayment.fulfilled.match(result)) {
        toast.error("Failed to create subscription. Please try again.");
        return;
      }

      // Give backend a moment then fetch updated history
      await new Promise((r) => setTimeout(r, 1500));
      const billingResult = await dispatch(getBillingHistory());

      if (!getBillingHistory.fulfilled.match(billingResult)) {
        toast.error(
          "Subscription created but couldn't retrieve details. Redirecting to billing…"
        );
        setTimeout(() => router.push("/parents/billing"), 2000);
        return;
      }

      const subscriptions = billingResult.payload;
      const newSubscription = subscriptions.find(
        (sub: any) =>
          sub.status?.toLowerCase() === "trialing" && !sub.cancel_at_period_end
      );

      if (!newSubscription) {
        toast.success("Subscription created! Redirecting to billing page…");
        setTimeout(() => router.push("/parents/billing"), 2000);
        return;
      }

      setSubscriptionData({
        subscription_id: newSubscription.id,
        is_trial: true,
        trial_ends_at: newSubscription.trial_ends_at ?? newSubscription.expiration_date,
      });
      setShowSuccessModal(true);
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = async () => {
    setShowSuccessModal(false);
    await dispatch(getBillingHistory());
    onResetToStepOne?.();
    document.getElementById("stepper-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddPayment = () => {
    if (!subscriptionData?.subscription_id) {
      toast.error("Missing subscription information");
      return;
    }
    setShowSuccessModal(false);
    router.push(
      `/parents/billing/payment?subscription_id=${subscriptionData.subscription_id}`
    );
  };

  const isBusy = isLoading || handlers.initiate_payment_loading;

  return (
    <>
      <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
        <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
          <h2 className="text-lg font-bold">
            {hasActiveSubscription ? "Confirm Child Changes" : "Confirm & Pay"}
          </h2>
        </div>

        <div className="px-6 py-6">
          {hasActiveSubscription && activeSubscriptionRecord ? (
            <>
              <div className="mb-4 flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Plan</span>
                <span className="font-semibold text-gray-900">
                  {activeSubscriptionRecord.plan_name} —{" "}
                  {activeSubscriptionRecord.plan_interval.charAt(0) +
                    activeSubscriptionRecord.plan_interval.slice(1).toLowerCase()}
                  ly
                </span>
              </div>

              {childDiff && (
                <>
                  {childDiff.children_to_add.length > 0 && (
                    <div className="mb-4 flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-600">Adding</span>
                      <span className="font-semibold text-green-700">
                        {children
                          .filter((c) => childDiff.children_to_add.includes(c.id as number))
                          .map((c) => c.fullName)
                          .join(", ")}
                      </span>
                    </div>
                  )}

                  {childDiff.children_to_remove.length > 0 && (
                    <div className="mb-4 flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-600">Removing</span>
                      <span className="font-semibold text-red-600">
                        {children
                          .filter((c) =>
                            childDiff.children_to_remove.includes(c.id as number)
                          )
                          .map((c) => c.fullName)
                          .join(", ")}
                      </span>
                    </div>
                  )}

                  {!hasChildChanges && (
                    <div className="mb-4 rounded-md bg-gray-50 p-3 text-sm text-gray-500">
                      No changes to children detected.
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {selectedPrice && priceDetails && (
                <>
                  <div className="mb-4 flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">Plan</span>
                    <span className="font-semibold text-gray-900">
                      {selectedPrice.plan.name} – ${priceDetails.baseAmount.toFixed(2)} /{" "}
                      {selectedPrice.price.interval.toLowerCase()}
                    </span>
                  </div>

                  {coupon_validation?.code && priceDetails.discount > 0 && (
                    <>
                      <div className="mb-4 flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">
                          Coupon ({coupon_validation.code})
                        </span>
                        <span className="font-semibold text-green-600">
                          -${priceDetails.discount.toFixed(2)}
                        </span>
                      </div>
                      <div className="mb-4 flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Total</span>
                        <span className="font-bold text-gray-900">
                          ${priceDetails.finalAmount.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="mb-6 flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Children</span>
                <span className="font-semibold text-right text-gray-900">
                  {childNames.length > 0 ? (
                    childNames.join(", ")
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      None selected – you can add children later
                    </span>
                  )}
                </span>
              </div>
            </>
          )}

          <div className="mt-8 flex justify-between gap-4">
            <button
              onClick={goBack}
              disabled={isBusy}
              className="w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 disabled:opacity-50"
            >
              Back
            </button>

            {hasActiveSubscription ? (
              <button
                onClick={handleUpdateChildren}
                disabled={isBusy || !hasChildChanges}
                className="w-1/2 rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
              >
                {isBusy ? "Updating…" : "Confirm Changes"}
              </button>
            ) : (
              <button
                onClick={handleCreateSubscription}
                disabled={isBusy}
                className="w-1/2 rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
              >
                {isBusy ? "Creating Subscription…" : "Start Subscription"}
              </button>
            )}
          </div>
        </div>
      </div>

      {subscriptionData && (
        <SubscriptionSuccessModal
          open={showSuccessModal}
          onClose={handleCloseModal}
          onAddPayment={handleAddPayment}
          subscriptionId={subscriptionData.subscription_id}
          isTrialSubscription={subscriptionData.is_trial}
          trialEndsAt={subscriptionData.trial_ends_at}
        />
      )}
    </>
  );
};

export default Step3ConfirmPay;