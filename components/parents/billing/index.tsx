
import ParentLayout from "@/components/layouts/ParentLayout";
import BillingsPlansList from "./BillingsPlansList";
import BillingHistory from "./BillingHistory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSubscription } from "services/pricingService";
import { RootState } from "store/store";

const BillingPage = () => {
  const { active_subscription } = useSelector((state: RootState) => state.pricing);
  const currentChild = useSelector((state: RootState) => state.parentChild.currentChild);
  const dispatch = useDispatch();

 useEffect(() => {
      dispatch(getActiveSubscription());
   }, []);

//   useEffect(() => {
//     if (currentChild?.id) {
//       console.log(currentChild.id, "child's id")
//       dispatch(getActiveSubscription(currentChild.id));

//     }
//   }, [currentChild?.id]);

  return (
    <ParentLayout title="Billing">
      <div className="scrollbar-hide overflow-y-scroll px-4 py-6">
        {active_subscription ? (
          <p className="mb-4">
            Current Plan -{" "}
            <span className="cursor-pointer text-mainColor">
              {active_subscription.plan.name}
            </span>
          </p>
        ) : (
          <p className="mb-4 text-red-500">
            No active plan for {currentChild?.fullName}. Please activate one below.
          </p>
        )}

        <BillingsPlansList />
        <BillingHistory />
      </div>
    </ParentLayout>
  );
};

export default BillingPage;
