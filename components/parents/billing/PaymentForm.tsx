import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/UI/loader";

interface PaymentFormProps {
  subscriptionId: number;
  clientSecret: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ subscriptionId, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment form not ready");
      return;
    }

    setIsLoading(true);

    try {
      const isPayment = clientSecret.startsWith("pi_");
      
      let error;

      if (isPayment) {
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/parents/billing/payment/confirm?subscription_id=${subscriptionId}&type=payment`,
          },
        });
        error = result.error;
      } else {
        const result = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/parents/billing/payment/confirm?subscription_id=${subscriptionId}&type=setup`,
          },
        });
        error = result.error;
      }

      if (error) {
        toast.error(error.message || "Payment failed");
        console.error("Stripe error:", error);
      } 
      
    } catch (error) {
      console.error("Payment form error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="mb-6">
        <PaymentElement />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="rounded bg-mainColor px-6 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader color="white" /> : clientSecret.startsWith("pi_") ? "Pay Now" : "Save Payment Method"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;