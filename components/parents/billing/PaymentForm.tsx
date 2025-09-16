import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
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

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/payment/confirm`,
         },
      });

      if (error?.type === "card_error" || error?.type === "validation_error") {
         toast.error(error.message);
      } else if (error) {
         toast.error("An unexpected error occurred");
      }

      setIsLoading(false);
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="mt-8 flex w-full items-start gap-8 max-lg:flex-col"
      >
         <div className="w-full flex-[.7]">
            <PaymentElement
               id="payment-element"
               options={{
                  layout: "tabs",
                  business: {
                     name: "CodeAlgo LLC",
                  },
               }}
               onReady={() => setIsPaymentElementReady(false)}
               onChange={(event) => {
                  setIsPaymentElementReady(event.complete);
               }}
            />
         </div>

         <div className="w-full flex-[.3]">
            <BillingSummary amount={initiated_payment?.amount_in_cent! / 100} />

            <div className="mt-8 flex justify-end gap-3">
               <button
                  className="w-[100px] rounded-[4px] border border-black bg-white px-4 py-2 text-xs text-black"
                  onClick={() => push("/parents/billing")}
                  type="button"
                  disabled={isLoading}
               >
                  Cancel
               </button>
               <button
                  disabled={isLoading || !isPaymentElementReady}
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
