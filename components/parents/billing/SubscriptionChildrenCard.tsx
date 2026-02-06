import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { getBillingHistory } from "services/pricingService";
import { CreditCard } from "lucide-react";

const SubscriptionChildrenCard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { billing_history, handlers } = useSelector((state: RootState) => state.pricing);
  const { children } = useSelector((state: RootState) => state.parentChild);
  
  const activeSubscription = billing_history?.find(sub => 
    sub.is_active && 
    (sub.status === 'TRIALING' || sub.status === 'ACTIVE')
  );

  const handleRefresh = () => {
    dispatch(getBillingHistory());
  };

  const handleAddPaymentMethod = () => {
    if (activeSubscription) {
      router.push(`/parents/billing/payment?subscription_id=${activeSubscription.id}`);
    }
  };
  const hasPaymentMethod = activeSubscription?.payment_status === 'Paid' || activeSubscription?.status === 'ACTIVE';
  if (!activeSubscription) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 mb-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Active Subscription</h3>
        <button
          onClick={handleRefresh}
          disabled={handlers.billing_history_loading}
          className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
        >
          {handlers.billing_history_loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Plan</p>
          <p className="font-medium">
            {activeSubscription.plan_name} - {activeSubscription.plan_interval}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Status: <span className={`font-semibold ${
              activeSubscription.status === 'TRIALING' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {activeSubscription.status === 'TRIALING' ? 'Free Trial' : activeSubscription.status}
            </span>
          </p>
        </div>

        {!hasPaymentMethod && activeSubscription.status === 'TRIALING' && (
          <div className="border-t pt-4">
            <div className="bg-mainColor/10 border border-mainColor rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-mainColor mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-mainColor mb-1">
                    Payment Method Required
                  </p>
                  <p className="text-xs text-mainColor-700 mb-3">
                    Add a payment method before your trial ends to continue your subscription without interruption.
                  </p>
                  <button
                    onClick={handleAddPaymentMethod}
                    className="inline-flex items-center gap-2 bg-mainColor hover:bg-mainColor text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">
            Children in subscription ({activeSubscription.children.length})
          </p>
          {activeSubscription.children.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {activeSubscription.children.map(child => (
                <span 
                  key={child.id}
                  className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {child.firstName} {child.lastName}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No children added yet</p>
          )}
        </div>

        {activeSubscription.expiration_date && (
          <div className="border-t pt-4">
            <p className="text-xs text-gray-500">
              {activeSubscription.status === 'TRIALING' ? 'Trial ends' : 'Renews'}: {new Date(activeSubscription.expiration_date).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionChildrenCard;