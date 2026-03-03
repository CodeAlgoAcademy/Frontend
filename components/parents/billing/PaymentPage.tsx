import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { createSetupIntent, getActiveSubscription } from "services/pricingService";
import { toast } from "sonner";
import { useInitStripe } from "hooks/useStripe";
import PaymentForm from "./PaymentForm";

const PaymentPage = () => {
  const router = useRouter();
  const { query, isReady, push } = router;
  const dispatch = useAppDispatch();
  const { current_subscription } = useSelector((state: RootState) => state.pricing);
  
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const subscriptionId = Number(query.subscription_id);
  const urlClientSecret = query.client_secret as string;
  
  useEffect(() => {
    if (!isReady) return;

    if (!subscriptionId || isNaN(subscriptionId)) {
      push("/parents/billing");
      return;
    }

const initPayment = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (urlClientSecret) {
          setClientSecret(urlClientSecret);
          setIsLoading(false);
          return;
        }

        let activeSub = current_subscription;
        if (!activeSub || activeSub.id !== subscriptionId) {
           const action = await dispatch(getActiveSubscription());
           if (getActiveSubscription.fulfilled.match(action)) {
             const payload = action.payload as any; 
             activeSub = Array.isArray(payload) ? payload[0] : payload;
           }
        }

        if (activeSub && activeSub.id === subscriptionId) {
           if (activeSub.latest_client_secret) {
             setClientSecret(activeSub.latest_client_secret);
           } else if (activeSub.status === "ACTIVE") {
             toast.success("No payment required.");
             push("/parents/billing");
             return;
           } else {
             const result = await dispatch(createSetupIntent(subscriptionId));
             if (createSetupIntent.fulfilled.match(result)) {
               setClientSecret(result.payload.client_secret);
             }
           }
        }
      } catch (err) {
        setError("An error occurred while loading payment form");
      } finally {
        setIsLoading(false);
      }
    };

    initPayment();
  }, [isReady, subscriptionId, urlClientSecret, dispatch, push]);

  const { stripePromise, options } = useInitStripe(clientSecret);

  if (isLoading) {
    return (
      <div className="mt-12 bg-white px-8 pt-6 pb-10 flex justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
      </div>
    );
  }

  if (error || !clientSecret || !options) {
    return (
      <div className="mt-12 bg-white px-8 pt-6 pb-10 text-center">
        <p className="text-red-600 mb-4">{error || "Failed to load payment form"}</p>
        <button onClick={() => push("/parents/billing")} className="rounded bg-mainColor px-6 py-2 text-white">
          Back to Billing
        </button>
      </div>
    );
  }

  return (
    <>
     <button onClick={() => push("/parents/billing")} className="rounded border-2 border-mainColor px-6 py-2 text-black ml-8 mt-4">
          Back to Billing
     </button>
    <div className="mt-8 bg-white px-8 pt-6 pb-10">
      <h4 className="border-b pb-2 text-lg font-semibold">
        {clientSecret.startsWith("pi_") ? "Complete Payment" : "Add Payment Method"}
      </h4>
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm subscriptionId={subscriptionId} clientSecret={clientSecret} />
      </Elements>
    </div>
    </>
  );
};

export default PaymentPage;