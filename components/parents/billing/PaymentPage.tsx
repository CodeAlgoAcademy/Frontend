import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { initiatePayment } from "services/pricingService";
import { RootState } from "store/store";
import { cn } from "utils";
import { Elements } from "@stripe/react-stripe-js";
import { useInitStripe } from "hooks/useStripe";
import PaymentForm from "./PaymentForm";

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const { handlers, initiated_payment } = useSelector((state: RootState) => state.pricing);
  const { query, push } = useRouter();
  const { price_id, children, coupon, amount } = query;
  const { stripePromise, options: paymentFormOptions } = useInitStripe(initiated_payment?.client_secret);

  useEffect(() => {
    if (!price_id) {
      push("/parents/billing");
      return;
    }

    const childIds = children
      ? String(children).split(",").map(Number)
      : [];

    const paymentData: any = {
      price_id: Number(price_id),
      children: childIds,
    };

    // Include coupon code if present
    if (coupon && typeof coupon === 'string') {
      paymentData.coupon_code = coupon;
    }

    dispatch(initiatePayment(paymentData));
  }, [price_id, children, coupon, dispatch, push]);

  if (handlers.initiate_payment_loading || !initiated_payment?.client_secret) {
    return <Skeleton />;
  }

  // Get amount from URL query or fallback to initiated_payment
  const displayAmount = amount 
    ? Number(amount) 
    : (initiated_payment?.amount_in_cent || 0);

  return (
    <div className="scrollbar-hide mt-12 overflow-y-scroll bg-white px-8 pt-6 pb-10">
      <h4 className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">Payment</h4>

      <Elements options={paymentFormOptions} stripe={stripePromise!}>
        <PaymentForm amount={displayAmount} />
      </Elements>
    </div>
  );
};

const Skeleton = () => {
  const skeletonClass = "rounded-sm w-full bg-black/10 animate-pulse";

  return (
    <div className="mt-12 flex flex-row gap-8">
      <div className="flex-[.7] space-y-4">
        <div className={cn(skeletonClass, "h-[60px]")}></div>

        <div>
          <div className={cn(skeletonClass, "h-[60px]")}></div>
          <div className="flex">
            <div className={cn(skeletonClass, "h-[60px]")}></div>
            <div className={cn(skeletonClass, "h-[60px]")}></div>
          </div>
        </div>

        <div className={cn(skeletonClass, "h-[60px]")}></div>
      </div>

      <div className={cn(skeletonClass, "h-[300px] flex-[.3] max-md:hidden")}></div>
    </div>
  );
};

export default PaymentPage;