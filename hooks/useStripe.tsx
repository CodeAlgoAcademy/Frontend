import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {} from "@stripe/react-stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(publishableKey);

export const useInitStripe = (clientSecret?: string) => {
  if (!clientSecret) {
    return { stripePromise: null, options: undefined };
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#2073fa",
        colorText: "black",
      },
    },
  };

  return { stripePromise, options };
};