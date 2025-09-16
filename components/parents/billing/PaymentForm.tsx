import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { FormEvent, useEffect, useState } from "react";
import BillingSummary from "./BillingSummary";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Loader from "@/components/UI/loader";

const PaymentForm = () => {
   const { initiated_payment } = useSelector((state: RootState) => state.pricing);
   const { push } = useRouter();
   const stripe = useStripe();
   const elements = useElements();
   const [isLoading, setIsLoading] = useState(false);
   const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);
   const [hasPaymentError, setHasPaymentError] = useState(false);
   const [retryCount, setRetryCount] = useState(0);

   useEffect(() => {
      if (!stripe || !elements) {
         setHasPaymentError(true);
         toast.error("Payment system not ready. Please check your internet connection.");
      }
   }, [stripe, elements]);

   const handleRetry = () => {
      setRetryCount((prev) => prev + 1);
      setHasPaymentError(false);
      setIsPaymentElementReady(false);
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
         toast.error("Payment system not ready. Please check your internet connection.");
         return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/payment/confirm`,
         },
      });
      if (error.type === "card_error" || error.type === "validation_error") {
         toast.error(error.message);
      } else {
         toast.error("An unexpected error occured");
      }

      setIsLoading(false);
   };

   return (
      <form onSubmit={handleSubmit} className="mt-8 flex w-full items-start gap-8 max-lg:flex-col">
         <div className="w-full flex-[.7]">
            {!isPaymentElementReady && !hasPaymentError && <div className="mb-4 h-40 animate-pulse rounded-lg bg-gray-200"></div>}

            {hasPaymentError ? (
               <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-700">Failed to load payment methods. Please check your internet connection.</p>
                  <div className="mt-2 flex gap-2">
                     <button type="button" onClick={handleRetry} className="text-xs text-red-700 underline">
                        Try again
                     </button>
                  </div>
               </div>
            ) : (
               <PaymentElement
                  id="payment-element"
                  options={{
                     layout: "tabs",
                     business: {
                        name: "CodeAlgo LLC",
                     },
                  }}
                  onReady={() => setIsPaymentElementReady(true)}
                  onChange={(event) => {
                     setIsPaymentElementReady(event.complete);
                  }}
               />
            )}
         </div>

         <div className="w-full flex-[.3]">
            <BillingSummary amount={initiated_payment?.amount_in_cent! / 100} />

            <div className="mt-8 flex justify-end gap-3">
               <button
                  className="w-[100px] rounded-[4px] border border-black bg-white px-4 py-2 text-xs text-black transition-colors hover:bg-gray-50"
                  onClick={() => push("/parents/billing")}
                  type="button"
                  disabled={isLoading}
               >
                  Cancel
               </button>
               <button
                  disabled={isLoading || !isPaymentElementReady || hasPaymentError}
                  className="flex w-[100px] items-center justify-center rounded-[4px] bg-mainColor px-4 py-2 text-xs text-white transition-colors hover:bg-mainColor/90 disabled:cursor-not-allowed disabled:bg-gray-100"
                  type="submit"
               >
                  {isLoading ? <Loader color="gray" /> : "Proceed"}
               </button>
            </div>
         </div>
      </form>
   );
};

export default PaymentForm;
