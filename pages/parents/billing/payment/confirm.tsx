import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAppDispatch } from "store/hooks";
import { attachPaymentMethod, getActiveSubscription } from "services/pricingService";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentConfirmPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, isReady } = router;
  const hasRunRef = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Please wait while we confirm your payment details");

  // ✅ Separate useEffect handles redirect after success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/parents/billing");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  useEffect(() => {
    if (!isReady) return;
    if (hasRunRef.current) return;

    const finalize = async () => {
      hasRunRef.current = true;
      setStatus("loading");

      const stripe = await stripePromise;
      if (!stripe) return;

      const redirectStatus = query.redirect_status as string;
      const subscriptionId = Number(query.subscription_id);

      // 1. Handle PAYMENT Intent (Immediate Charge)
      if (query.payment_intent_client_secret) {
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          query.payment_intent_client_secret as string
        );

        if (!paymentIntent || paymentIntent.status !== "succeeded") {
          setStatus("error");
          setMessage("Payment could not be confirmed.");
          return;
        }

        await dispatch(getActiveSubscription());
        setStatus("success");
        setMessage("Payment successful! Your subscription has been updated.");
      }

      // 2. Handle SETUP Intent (Adding Card / Trial)
      else if (query.setup_intent_client_secret) {
        const { setupIntent } = await stripe.retrieveSetupIntent(
          query.setup_intent_client_secret as string
        );

        if (!setupIntent || setupIntent.status !== "succeeded" || !setupIntent.payment_method) {
          setStatus("error");
          setMessage("Failed to save payment method.");
          return;
        }

        const paymentMethodId = typeof setupIntent.payment_method === "string"
          ? setupIntent.payment_method
          : setupIntent.payment_method.id;

        const result = await dispatch(
          attachPaymentMethod({
            subscription_id: subscriptionId,
            payment_method_id: paymentMethodId,
            is_default: true,
          })
        );

        if (attachPaymentMethod.fulfilled.match(result)) {
          await dispatch(getActiveSubscription());
          setStatus("success");
          setMessage("Payment method saved! Redirecting...");
        } else {
          setStatus("error");
          setMessage("Could not attach payment method to subscription.");
        }
      }

      // 3. Unknown / Error State
      else {
        setStatus("error");
        setMessage("Invalid payment confirmation details.");
      }
    };

    finalize();
  }, [isReady, query, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-mainColor" />
            <h2 className="mt-4 text-xl font-semibold">Processing...</h2>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-green-700">Success!</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <p className="mt-4 text-sm text-gray-400">Redirecting to billing...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-red-700">Failed</h2>
            <p className="mt-2 text-gray-600">{message}</p>
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



// import { useRouter } from "next/router";
// import { useEffect, useState, useRef } from "react";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";
// import { useAppDispatch } from "store/hooks";
// import { attachPaymentMethod } from "services/pricingService";
// import { loadStripe } from "@stripe/stripe-js";


// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const PaymentConfirmPage = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { query, isReady } = router;
//   const hasAttachedRef = useRef(false);
//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");


// useEffect(() => {
//   if (!isReady) return;
//   if (hasAttachedRef.current) return;

//   const redirectStatus = query.redirect_status as string;
//   const clientSecret =
//     query.setup_intent_client_secret as string;
//   const subscriptionId = Number(query.subscription_id);

//   if (
//     redirectStatus !== "succeeded" ||
//     !clientSecret ||
//     !subscriptionId
//   ) {
//     setStatus("error");
//     return;
//   }

//   const finalizePayment = async () => {
//     try {
//       hasAttachedRef.current = true;

//       setStatus("loading");

//       const stripe = await stripePromise;
//       if (!stripe) throw new Error("Stripe not initialized");

//       const { setupIntent, error } =
//         await stripe.retrieveSetupIntent(clientSecret);

//       if (error || !setupIntent?.payment_method) {
//         throw new Error("Failed to retrieve payment method");
//       }

//       const paymentMethodId =
//         typeof setupIntent.payment_method === "string"
//           ? setupIntent.payment_method
//           : setupIntent.payment_method.id;

//       const result = await dispatch(
//         attachPaymentMethod({
//           subscription_id: subscriptionId,
//           payment_method_id: paymentMethodId,
//           is_default: true,
//         })
//       );

//       if (!attachPaymentMethod.fulfilled.match(result)) {
//         throw new Error("Attach payment failed");
//       }

//       setStatus("success");

//       setTimeout(() => {
//         router.push("/parents/billing");
//       }, 3000);
//     } catch (err) {
//       console.error(err);
//       setStatus("error");
//     }
//   };

//   finalizePayment();
// }, [isReady]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
//         {status === "loading" && (
//           <div className="text-center">
//             <Loader2 className="mx-auto h-16 w-16 animate-spin text-mainColor" />
//             <h2 className="mt-4 text-xl font-semibold">Processing...</h2>
//             <p className="mt-2 text-gray-600">
//               Please wait while we confirm your payment method
//             </p>
//           </div>
//         )}

//         {status === "success" && (
//           <div className="text-center">
//             <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
//             <h2 className="mt-4 text-xl font-semibold text-green-700">
//               Payment Method Saved!
//             </h2>
//             <p className="mt-2 text-gray-600">
//               Your payment method has been successfully added to your subscription.
//             </p>
//             <p className="mt-4 text-sm text-gray-500">
//               You won't be charged until your trial ends.
//             </p>
//             <p className="mt-2 text-sm text-gray-400">
//               Redirecting to billing page...
//             </p>
//           </div>
//         )}

//         {status === "error" && (
//           <div className="text-center">
//             <XCircle className="mx-auto h-16 w-16 text-red-500" />
//             <h2 className="mt-4 text-xl font-semibold text-red-700">
//               Setup Failed
//             </h2>
//             <p className="mt-2 text-gray-600">
//               There was a problem setting up your payment method. Please try again.
//             </p>
//             <div className="mt-6 flex gap-4 justify-center">
//               <button
//                 onClick={() => router.back()}
//                 className="rounded border border-gray-300 bg-white px-6 py-2 text-gray-700"
//               >
//                 Try Again
//               </button>
//               <button
//                 onClick={() => router.push("/parents/billing")}
//                 className="rounded bg-mainColor px-6 py-2 text-white"
//               >
//                 Back to Billing
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmPage;