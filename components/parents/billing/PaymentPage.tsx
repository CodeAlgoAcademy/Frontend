import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { createSetupIntent } from "services/pricingService";
import { toast } from "sonner";
import { useInitStripe } from "hooks/useStripe";
import PaymentForm from "./PaymentForm";

const PaymentPage = () => {
  const router = useRouter();
  const { query, isReady, push } = router;
  const dispatch = useAppDispatch();
  
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const subscriptionId = Number(query.subscription_id);
  
  useEffect(() => {
    if (!isReady) return;

    if (!subscriptionId || isNaN(subscriptionId)) {
      push("/parents/billing");
      return;
    }

    const fetchSetupIntent = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await dispatch(createSetupIntent(subscriptionId));

        if (createSetupIntent.fulfilled.match(result)) {
          setClientSecret(result.payload.client_secret);
        } else {
          setError("Failed to initialize payment form");
          toast.error("Failed to initialize payment");
        }
      } catch (err) {
        setError("An error occurred while loading payment form");
        toast.error("Failed to load payment form");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSetupIntent();
  }, [isReady, subscriptionId, dispatch, push]);

  const { stripePromise, options } = useInitStripe(clientSecret);

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-12 bg-white px-8 pt-6 pb-10">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor mx-auto mb-4"></div>
            <p>Loading payment form...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !clientSecret || !options) {
    return (
      <div className="mt-12 bg-white px-8 pt-6 pb-10">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">
            {error || "Failed to load payment form"}
          </p>
          <button
            onClick={() => push("/parents/billing")}
            className="rounded bg-mainColor px-6 py-2 text-white"
          >
            Back to Billing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white px-8 pt-6 pb-10">
      <h4 className="border-b pb-2 text-lg font-semibold">
        Add payment method
      </h4>

      <Elements stripe={stripePromise} options={options}>
        <PaymentForm subscriptionId={subscriptionId} />
      </Elements>
    </div>
  );
};

export default PaymentPage;