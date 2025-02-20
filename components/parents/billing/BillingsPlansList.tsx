import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import BillingPlan from "./BillingPlan";
import { getPricingPlans } from "services/pricingService";

const BillingsPlansList = () => {
   const dispatch = useDispatch();
   const { plans, handlers } = useSelector((state: RootState) => state.pricing);

   useEffect(() => {
      dispatch(getPricingPlans());
   }, []);

   if (handlers.loading || handlers.active_subscription_loading) return <Skeleton />;

   if (plans.length === 0) return <NoPlans />;

   return (
      <div className="flex flex-wrap gap-6">
         {plans.map((plan, index) => (
            <BillingPlan plan={plan} key={index} />
         ))}
      </div>
   );
};

const Skeleton = () => {
   return (
      <div className="flex flex-wrap gap-6">
         {[null, null, null].map((_, index) => {
            return (
               <div key={index} className="flex-1 cursor-pointer">
                  <div className="mb-1 h-[50px] animate-pulse rounded-md bg-black/10"></div>
                  <div className="mb-3 h-[300px] animate-pulse rounded-md bg-black/10"></div>
               </div>
            );
         })}
      </div>
   );
};

const NoPlans = () => {
   return (
      <div className="flex h-[300px] items-center justify-center text-base text-[.95rem]">
         <p>No Plans</p>
      </div>
   );
};

export default BillingsPlansList;
