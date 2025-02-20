import Link from "next/link";
import React, { FC } from "react";
import { BsCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { IPlan } from "types/interfaces";
import { cn } from "utils";

interface Props {
   plan: IPlan;
}

const BillingPlan: FC<Props> = ({ plan }) => {
   const { active_subscription } = useSelector((state: RootState) => state.pricing);

   const isSubscribed = active_subscription?.is_active && active_subscription.plan.id === plan.id;

   return (
      <div
         className={cn(
            "group min-w-fit flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white pb-12 lg:w-fit lg:min-w-[30%]",
            isSubscribed && "bg-gray-100"
         )}
      >
         <div className="">
            <div className={"flex justify-between bg-mainColor px-4 py-8 text-base text-white"}>
               <h4 className="ml-3 font-bold">{plan.name}</h4>
               <p className={"flex h-5 w-5 items-center justify-center rounded-full border border-white"}>
                  <BsCheck className="" />
               </p>
            </div>
            <div className="mt-5 flex items-start justify-center">
               <h5 className="h-fit text-[32px] font-bold">${plan.amount_in_cent/100}</h5>
               <p className="mt-4 text-sm">/Year</p>
            </div>
         </div>
         <div className="mt-5 px-4">
            {plan.description}
            <div className="mt-8 flex justify-center">
               {isSubscribed ? (
                  <p className="cursor-pointer font-bold text-mainColor">Current Plan</p>
               ) : (
                  <Link href={`/parents/billing/payment?plan_id=${plan.id}`}>
                     <button className="rounded-[4px]   bg-mainColor px-4 py-2 text-xs text-white">Activate</button>
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default BillingPlan;
