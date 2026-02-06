import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { initiatePayment, getBillingHistory } from "services/pricingService";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { toast } from "sonner";
import SubscriptionSuccessModal from "../TrialPaymentRequiredModal";

interface Step3Props {
  priceId: number;
  selectedChildren: (string | number)[];
  goBack: () => void;
}

const Step3ConfirmPay: React.FC<Step3Props> = ({
  priceId,
  selectedChildren,
  goBack,
}) => {
  const { plans, coupon_validation, billing_history } = useSelector((state: RootState) => state.pricing);
  const { children } = useSelector((state: RootState) => state.parentChild);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handlers } = useSelector((state: RootState) => state.pricing);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<{
    subscription_id: number;
    is_trial: boolean;
    trial_ends_at?: string;
  } | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const isFirstSubscription = useMemo(() => {
    if (typeof user?.has_created_subscription === 'boolean') {
      return !user.has_created_subscription;
    }
    return !billing_history || billing_history.length === 0;
  }, [user?.has_created_subscription, billing_history]);

  const hasSelectedChildren = selectedChildren.length > 0;

  const selectedPrice = useMemo(() => {
    for (const plan of plans) {
      const price = plan.prices.find((p) => p.id === priceId);
      if (price) return { plan, price };
    }
    return null;
  }, [plans, priceId]);

  const childNames = hasSelectedChildren 
    ? children
        .filter((c) => selectedChildren.includes(c.id))
        .map((c) => c.fullName)
    : [];

  const priceDetails = useMemo(() => {
    if (!selectedPrice) return null;

    const baseAmount = selectedPrice.price.amount_in_cent / 100;
    let discount = 0;
    let finalAmount = baseAmount;

    if (coupon_validation?.code && coupon_validation.discount) {
      if (coupon_validation.discount.type === "percentage") {
        discount = (baseAmount * coupon_validation.discount.value) / 100;
      } else {
        discount = coupon_validation.discount.value;
      }
      finalAmount = baseAmount - discount;
    }

    return { baseAmount, discount, finalAmount };
  }, [selectedPrice, coupon_validation]);

  const handleActivate = async () => {
    try {
      setIsLoadingSubscription(true);
      const existingSubscriptionIds = billing_history?.map(sub => sub.id) || [];
    
      const payload: any = {
        price_id: priceId,
        is_trial: true,
      };

      if (hasSelectedChildren) {
        payload.children = selectedChildren as number[];
      }
      
      if (coupon_validation?.code) {
        payload.promotion_code = coupon_validation.code;
      }
      const result = await dispatch(initiatePayment(payload));
      if (!initiatePayment.fulfilled.match(result)) {
        toast.error("Failed to create subscription");
        setIsLoadingSubscription(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const billingResult = await dispatch(getBillingHistory());
      if (!getBillingHistory.fulfilled.match(billingResult)) {
        toast.error("Subscription created but couldn't retrieve details. Please check your billing page.");
        setIsLoadingSubscription(false);
        setTimeout(() => router.push("/parents/billing"), 2000);
        return;
      }
      const subscriptions = billingResult.payload;
      let newSubscription = subscriptions.find((sub: any) => 
        !existingSubscriptionIds.includes(sub.id)
      );

      if (!newSubscription) {        
        if (hasSelectedChildren) {
          newSubscription = subscriptions.find((sub: any) => {
            const isTrialing = sub.status?.toLowerCase() === 'trialing';
            const hasMatchingChild = sub.children?.some((child: any) => 
              selectedChildren.includes(child.id)
            );
            return isTrialing && hasMatchingChild;
          });
        } else {
          const trialingSubscriptions = subscriptions.filter(
            (sub: any) => sub.status?.toLowerCase() === 'trialing'
          );
          
          if (trialingSubscriptions.length > 0) {
            newSubscription = trialingSubscriptions.sort((a: any, b: any) => 
              new Date(b.activated_date).getTime() - new Date(a.activated_date).getTime()
            )[0];
          }
        }
      }

      if (!newSubscription) {
        toast.success("Subscription created! Redirecting to billing page...");
        setIsLoadingSubscription(false);
        setTimeout(() => router.push("/parents/billing"), 2000);
        return;
      }
      const subscriptionInfo = {
        subscription_id: newSubscription.id,
        is_trial: newSubscription.status?.toLowerCase() === 'trialing',
        trial_ends_at: newSubscription.expiration_date,
      };
      setSubscriptionData(subscriptionInfo);
      setIsLoadingSubscription(false);
      setShowSuccessModal(true);

    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setIsLoadingSubscription(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push("/parents/billing");
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

  const isLoading = handlers.initiate_payment_loading || isLoadingSubscription;

  return (
    <>
      <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
        <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
          <h2 className="text-lg font-bold">Confirm & Pay</h2>
        </div>

        <div className="px-6 py-6">
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
                      Coupon Discount
                      {coupon_validation?.code && ` (${coupon_validation?.code})`}
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
          
          {/* Children Section */}
          <div className="mb-6 flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Children</span>
            <span className="font-semibold text-gray-900 text-right">
              {hasSelectedChildren ? (
                childNames.join(", ")
              ) : (
                <span className="text-gray-400 italic text-sm">
                  None selected - you can add children later
                </span>
              )}
            </span>
          </div>

          <div className="mt-8 flex justify-between gap-4">
            <button
              onClick={goBack}
              disabled={isLoading}
              className="w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleActivate}
              disabled={isLoading}
              className="w-1/2 rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
            >
              {isLoading ? "Creating Subscription..." : "Start Subscription"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
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