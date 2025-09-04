import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "services/pricingService";
import { RootState } from "store/store";
import { cn } from "utils";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import BillingSummary from "./BillingSummary";
import { useInitStripe } from "hooks/useStripe";
import PaymentForm from "./PaymentForm";

const PaymentPage = () => {
   const dispatch = useDispatch();
   const { handlers, initiated_payment } = useSelector((state: RootState) => state.pricing);
const currentChild = useSelector((state: RootState) => state.parentChild.currentChild);
   const { query, push } = useRouter();
   const { plan_id, children } = query;

   const { stripePromise, options: paymentFormOptions } = useInitStripe(initiated_payment?.client_secret);

useEffect(() => {
  if (!plan_id) {
    push("/parents/billing");
  } else {
    const childIds = children 
      ? String(children).split(',').map(id => Number(id))
      : [];
    
    dispatch(
      initiatePayment({
        plan_id: Number(plan_id),
        children: childIds,
      })
    );
  }
}, [plan_id, children]);

// useEffect(() => {
//    if (!plan_id) {
//       push("/parents/billing");
//    } else if (currentChild?.id) {
//       dispatch(
//          initiatePayment({
//             plan_id: Number(plan_id),
//             children: [currentChild.id],
//          })
//       );
//    }
// }, [plan_id, currentChild?.id]);

   if (handlers.initiate_payment_loading || !initiated_payment?.client_secret) {
      return <Skeleton />;
   }

   return (
      <div className=" scrollbar-hide mt-12 overflow-y-scroll bg-white px-8 pt-6 pb-10">
         <h4 className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">Payment</h4>

         <Elements options={paymentFormOptions} stripe={stripePromise!}>
            <PaymentForm />
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
