import ParentLayout from "@/components/layouts/ParentLayout";
import BillingHistory from "./BillingHistory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSubscription, getBillingHistory } from "services/pricingService";
import { RootState } from "store/store";
import BillingStepper from "./Stepper/BillingStepper.tsx";
import SubscriptionChildrenCard from "./SubscriptionChildrenCard"

const BillingPage = () => {
  const { active_subscription } = useSelector((state: RootState) => state.pricing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveSubscription());
    dispatch(getBillingHistory());
  }, [dispatch]);

  return (
    <ParentLayout title="Billing">
      <div className="scrollbar-hide overflow-y-scroll px-4 py-6">
        {active_subscription && (
          <p className="mb-4">
            Current Plan -{" "}
            <span className="cursor-pointer text-mainColor">
              {active_subscription.plan.name}
            </span>
          </p>
        )}
        <BillingStepper />
    <SubscriptionChildrenCard />
        <BillingHistory />
      </div>
    </ParentLayout>
  );
};

export default BillingPage;