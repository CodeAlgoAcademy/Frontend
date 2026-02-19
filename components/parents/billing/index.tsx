import ParentLayout from "@/components/layouts/ParentLayout";
import BillingHistory from "./BillingHistory";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSubscription, getBillingHistory } from "services/pricingService";
import { RootState } from "store/store";
import BillingStepper from "./Stepper/BillingStepper.tsx";
import { useRouter } from "next/router";
import TrialExpiryCard from "./TrialExpiryCard";
import SubscriptionChildrenCard from "./SubscriptionChildrenCard";

const BillingPage = () => {
  const { active_subscription, billing_history } = useSelector((state: RootState) => state.pricing);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getActiveSubscription());
    dispatch(getBillingHistory());
  }, [dispatch]);

  const expiringTrial = billing_history
    ?.filter(sub => 
      sub.status === 'TRIALING' && 
      sub.payment_status !== 'Paid' &&
      sub.is_active &&
      !sub.cancel_at_period_end
    )
    .sort((a, b) => {
      return new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime();
    })[0];

  const calculateDaysLeft = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const handleChangePlan = () => {
    document.getElementById('stepper-section')?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <div id="stepper-section">
          <BillingStepper/>
        </div>
        <SubscriptionChildrenCard />
        {expiringTrial && (
          <TrialExpiryCard 
            daysLeft={calculateDaysLeft(expiringTrial.expiration_date)}
            expiryDate={new Date(expiringTrial.expiration_date).toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'short',
              year: 'numeric'
            })}
            onUpdatePayment={() => router.push(`/parents/billing/payment?subscription_id=${expiringTrial.id}`)}
            onChangePlan={handleChangePlan}
          />
        )}
        <BillingHistory />
      </div>
    </ParentLayout>
  );
};

export default BillingPage;