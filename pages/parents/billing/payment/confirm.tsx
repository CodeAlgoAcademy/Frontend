import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAppDispatch } from "store/hooks";
import { attachPaymentMethod } from "services/pricingService";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentConfirmPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, isReady } = router;
  const hasAttachedRef = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");


useEffect(() => {
  if (!isReady) return;
  if (hasAttachedRef.current) return;

  const redirectStatus = query.redirect_status as string;
  const clientSecret =
    query.setup_intent_client_secret as string;
  const subscriptionId = Number(query.subscription_id);

  if (
    redirectStatus !== "succeeded" ||
    !clientSecret ||
    !subscriptionId
  ) {
    setStatus("error");
    return;
  }

  const finalizePayment = async () => {
    try {
      hasAttachedRef.current = true;

      setStatus("loading");

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe not initialized");

      const { setupIntent, error } =
        await stripe.retrieveSetupIntent(clientSecret);

      if (error || !setupIntent?.payment_method) {
        throw new Error("Failed to retrieve payment method");
      }

      const paymentMethodId =
        typeof setupIntent.payment_method === "string"
          ? setupIntent.payment_method
          : setupIntent.payment_method.id;

      const result = await dispatch(
        attachPaymentMethod({
          subscription_id: subscriptionId,
          payment_method_id: paymentMethodId,
          is_default: true,
        })
      );

      if (!attachPaymentMethod.fulfilled.match(result)) {
        throw new Error("Attach payment failed");
      }

      setStatus("success");

      setTimeout(() => {
        router.push("/parents/billing");
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  finalizePayment();
}, [isReady]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-mainColor" />
            <h2 className="mt-4 text-xl font-semibold">Processing...</h2>
            <p className="mt-2 text-gray-600">
              Please wait while we confirm your payment method
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-green-700">
              Payment Method Saved!
            </h2>
            <p className="mt-2 text-gray-600">
              Your payment method has been successfully added to your subscription.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              You won't be charged until your trial ends.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Redirecting to billing page...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-red-700">
              Setup Failed
            </h2>
            <p className="mt-2 text-gray-600">
              There was a problem setting up your payment method. Please try again.
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="rounded border border-gray-300 bg-white px-6 py-2 text-gray-700"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/parents/billing")}
                className="rounded bg-mainColor px-6 py-2 text-white"
              >
                Back to Billing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmPage;