import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";
import Link from "next/link";
import BillingPlan from "@/components/parents/billing/BillingPlan";
import ParentLayout from "@/components/layouts/ParentLayout";
import BillingsPlansList from "./BillingsPlansList";
import BillingHistory from "./BillingHistory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSubscription } from "services/pricingService";
import { RootState } from "store/store";

const BillingPage = () => {
   const { active_subscription } = useSelector((state: RootState) => state.pricing);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getActiveSubscription());
   }, []);

   return (
      <ParentLayout title="Billing">
         <div className="scrollbar-hide overflow-y-scroll px-4 py-6">
            {active_subscription && (
               <p className="mb-4">
                  Current Plan - <span className="cursor-pointer text-mainColor">{active_subscription.plan.name}</span>
               </p>
            )}
            <BillingsPlansList />

            <BillingHistory />
         </div>
      </ParentLayout>
   );
};

export default BillingPage;
