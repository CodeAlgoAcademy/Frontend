// import { useMemo, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "store/hooks";
// import { RootState } from "store/store";
// import { Subscription } from "types/interfaces";
// import { getPricingPlans, validateCoupon } from "services/pricingService";
// import PlanCard from "../priceCard";

// interface Step2Props {
//    selectedChildren: (string | number)[];
//    setSelectedChildren: React.Dispatch<React.SetStateAction<(string | number)[]>>;
//    setPriceId: (id: number) => void;
//    goNext: () => void;
// }

// const Step2SelectChildren: React.FC<Step2Props> = ({ selectedChildren, setSelectedChildren, setPriceId, goNext }) => {
//    const dispatch = useAppDispatch();
//    const { children } = useSelector((state: RootState) => state.parentChild);
//    const { billing_history, plans, handlers, coupon_validation } = useSelector((state: RootState) => state.pricing);
//    const user = useSelector((state: RootState) => state.user);
//    const [couponCode, setCouponCode] = useState("");
//    const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
//    const isFirstSubscription = !user?.has_created_subscription;

//    useEffect(() => {
//       if (plans.length === 0) {
//          dispatch(getPricingPlans());
//       }
//    }, [plans.length, dispatch]);

// const activeSubscriptionKeys = useMemo(() => {
//    const keys: string[] = [];
//    (billing_history || []).forEach((subscription: Subscription) => {
//       if (subscription.is_active && subscription.payment_status === "Paid") {
//          const key = `${subscription.plan_name}-${subscription.plan_interval}`;
//          if (!keys.includes(key)) {
//             keys.push(key);
//          }
//       }
//    });
//    return keys;
// }, [billing_history]);

// const coveredChildIds = useMemo(() => {
//   const ids: (string | number)[] = [];
//   (billing_history || []).forEach((subscription: Subscription) => {
//      if (subscription.is_active && subscription.payment_status === "Paid") {
//         subscription.children.forEach((child) => {
//            if (!ids.includes(child.id)) ids.push(child.id);
//         });
//      }
//   });
//   return ids;
// }, [billing_history]);


// const isPriceActive = (planName: string, interval: string) => {
//       const key = `${planName}-${interval}`;
//       return activeSubscriptionKeys.includes(key);
//    };

//    const toggleChild = (id: string | number, disabled: boolean) => {
//       if (disabled) return;
//       setSelectedChildren((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
//    };

//    const handleApplyCoupon = () => {
//       if (!couponCode || !selectedPriceId) return;
//       if (!isFirstSubscription && selectedChildren.length === 0) return;

//       dispatch(
//          validateCoupon({
//             code: couponCode,
//             price_id: selectedPriceId,
//             children: selectedChildren.length > 0 ? (selectedChildren as number[]) : undefined,
//          })
//       );
//    };

//    const isCouponValid = coupon_validation && "code" in coupon_validation && coupon_validation.code;
//    const isPlansLoading = handlers.billing_history_loading;
//    const hasNoPlans = !isPlansLoading && plans.length === 0;
//    const hasChildren = children.length > 0;

//    return (
//       <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
//          <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
//             <h2 className="text-lg font-bold">Select Plan & Child(ren)</h2>
//          </div>

//          <div className="px-6 py-6">
//             <h3 className="mb-4 font-bold">Choose a Plan</h3>
//             <div className="grid gap-6 md:grid-cols-2">
//                {isPlansLoading && (
//                   <>
//                      <PlanSkeleton />
//                      <PlanSkeleton />
//                   </>
//                )}

//                {hasNoPlans && (
//                   <div className="col-span-full py-8 text-center text-sm text-gray-500">No subscription plans available at the moment.</div>
//                )}

//                {!isPlansLoading &&
//                   plans.map((plan) => {
//                      const monthlyPrice = plan.prices.find((p) => p.interval === "MONTH");
//                      const yearlyPrice = plan.prices.find((p) => p.interval === "YEAR");

//                      const isMonthlyActive = monthlyPrice ? isPriceActive(plan.name, "MONTH") : false;
//                      const isYearlyActive = yearlyPrice ? isPriceActive(plan.name, "YEAR") : false;

//                      return (
//                         <div key={plan.id} className="contents">
//                            {yearlyPrice && monthlyPrice && (
//                               <PlanCard
//                                  title={`${plan.name} Annual Plan`}
//                                  price={17.3}
//                                  originalPrice={monthlyPrice.amount_in_cent / 100}
//                                  interval="mo"
//                                  trialText="7-Day Free Trial"
//                                  billingText={`$${yearlyPrice.amount_in_cent / 100} Billed yearly`}
//                                  badge="Save 20%"
//                                  selected={selectedPriceId === yearlyPrice.id}
//                                  disabled={isYearlyActive}
//                                  activeSubscriptionBadge={isYearlyActive}
//                                  onSelect={() => {
//                                     if (!isYearlyActive) {
//                                        setSelectedPriceId(yearlyPrice.id);
//                                        setPriceId(yearlyPrice.id);
//                                     }
//                                  }}
//                               />
//                            )}

//                            {monthlyPrice && (
//                               <PlanCard
//                                  title={`${plan.name} Monthly Plan`}
//                                  price={monthlyPrice.amount_in_cent / 100}
//                                  interval="mo"
//                                  trialText="7-Day Free Trial"
//                                  billingText={`$${monthlyPrice.amount_in_cent / 100} Billed monthly`}
//                                  selected={selectedPriceId === monthlyPrice.id}
//                                  disabled={isMonthlyActive}
//                                  activeSubscriptionBadge={isMonthlyActive}
//                                  onSelect={() => {
//                                     if (!isMonthlyActive) {
//                                        setSelectedPriceId(monthlyPrice.id);
//                                        setPriceId(monthlyPrice.id);
//                                     }
//                                  }}
//                               />
//                            )}
//                         </div>
//                      );
//                   })}
//             </div>
//          </div>

//          {/* CHILDREN */}
//          <div className="px-6 py-6">
//             <h3 className="mb-2 font-medium">
//                Select Children
//                {isFirstSubscription && <span className="ml-2 text-sm font-normal text-gray-500">(Optional)</span>}
//             </h3>

//             {!hasChildren ? (
//                <div className="rounded-lg border border-dashed bg-gray-50 py-8 text-center text-sm text-gray-500">
//                   {isFirstSubscription ? (
//                      <>
//                         <p className="mb-2">No children added yet.</p>
//                         <p className="text-xs">You can add children after creating your subscription.</p>
//                      </>
//                   ) : (
//                      <>
//                         <p className="mb-2">No children added yet.</p>
//                         <p className="text-xs">Please add a child first before subscribing.</p>
//                      </>
//                   )}
//                </div>
//             ) : (
//                <div className="max-h-64 space-y-4 overflow-y-auto">
//                   {children.map((child) => {
//                      const isAlreadySubscribed = coveredChildIds.includes(child.id);
//                      const isChecked = selectedChildren.includes(child.id) || isAlreadySubscribed;

//                      return (
//                         <label
//                            key={child.id}
//                            className={`flex items-center justify-between rounded-lg border p-4 transition ${
//                               isAlreadySubscribed ? "cursor-not-allowed bg-gray-100 opacity-70" : "cursor-pointer hover:shadow-md"
//                            }`}
//                         >
//                            <div className="flex items-center gap-3">
//                               <input
//                                  type="checkbox"
//                                  checked={isChecked}
//                                  disabled={isAlreadySubscribed}
//                                  onChange={() => toggleChild(child.id, isAlreadySubscribed)}
//                               />
//                               <span className="font-medium">{child.fullName}</span>
//                            </div>
//                         </label>
//                      );
//                   })}
//                </div>
//             )}

//             {/* COUPON CODE */}
//             <div className="py-6 pb-4">
//                <h3 className="mb-2 font-medium">Have a coupon?</h3>

//                <div className="flex gap-2">
//                   <input
//                      type="text"
//                      value={couponCode}
//                      onChange={(e) => setCouponCode(e.target.value.trim())}
//                      placeholder="Enter coupon code"
//                      className="flex-1 rounded-md border px-3 py-2 text-sm"
//                      disabled={handlers.coupon_validation_loading}
//                   />

//                   <button
//                      type="button"
//                      disabled={
//                         !couponCode ||
//                         !selectedPriceId ||
//                         (!isFirstSubscription && selectedChildren.length === 0) ||
//                         handlers.coupon_validation_loading
//                      }
//                      onClick={handleApplyCoupon}
//                      className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
//                   >
//                      {handlers.coupon_validation_loading ? "Validating..." : "Apply"}
//                   </button>
//                </div>

//                {coupon_validation && (
//                   <div className={`mt-2 rounded-md p-2 text-sm ${isCouponValid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
//                      {isCouponValid ? (
//                         <>
//                            ✓ Coupon applied! Code: {coupon_validation.code}
//                            {coupon_validation.discount && (
//                              <span>
//                                  {" "}
//                                  — Discount: {`${coupon_validation.discount.value}% off`}
//                               </span>
//                            )}
//                         </>
//                      ) : (
//                         `✗ ${coupon_validation.message || "Invalid coupon code"}`
//                      )}
//                   </div>
//                )}
//             </div>

//             <div className="mt-8">
//                <button
//                 disabled={!selectedPriceId || selectedChildren.length === 0}
//                   onClick={goNext}
//                   className="w-full rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
//                >
//                   Continue
//                </button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default Step2SelectChildren;

// const PlanSkeleton = () => <div className="h-[180px] animate-pulse rounded-lg border bg-gray-100" />;



import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { getPricingPlans, validateCoupon } from "services/pricingService";
import PlanCard from "../priceCard";

interface Step2Props {
  selectedChildren: (string | number)[];
  setSelectedChildren: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setPriceId: (id: number) => void;
  goNext: () => void;
}

const Step2SelectChildren: React.FC<Step2Props> = ({
  selectedChildren,
  setSelectedChildren,
  setPriceId,
  goNext,
}) => {
  const dispatch = useAppDispatch();
  const { children } = useSelector((state: RootState) => state.parentChild);
  const { plans, handlers, coupon_validation, active_subscription } = useSelector(
    (state: RootState) => state.pricing
  );

  const [couponCode, setCouponCode] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);

  const hasActiveSubscription =
    active_subscription &&
    (active_subscription.plan !== undefined) &&
    (active_subscription.is_active === true);

  // Pre-select children already on the active subscription
  useEffect(() => {
    if (hasActiveSubscription && active_subscription?.plan) {
      // We don't have children directly on ISubscribedPlan — rely on billing_history
      // This is handled in the parent via billing_history; if active_subscription has children, seed here
    }
  }, [hasActiveSubscription]);

  useEffect(() => {
    if (plans.length === 0) {
      dispatch(getPricingPlans());
    }
  }, [plans.length, dispatch]);

  // Current children IDs on active subscription (sourced from billing_history)
  const { billing_history } = useSelector((state: RootState) => state.pricing);

  const activeSubscriptionRecord = useMemo(() => {
    if (!billing_history) return null;
    return (
      billing_history.find(
        (sub) =>
          (sub.status === "ACTIVE" || sub.status === "TRIALING") &&
          !sub.cancel_at_period_end
      ) ?? null
    );
  }, [billing_history]);

  // Seed selectedChildren from active subscription on mount
  useEffect(() => {
    if (activeSubscriptionRecord) {
      const ids = activeSubscriptionRecord.children.map((c) => c.id);
      setSelectedChildren(ids);
    }
  }, [activeSubscriptionRecord]);

  const coveredChildIds = useMemo(
    () => activeSubscriptionRecord?.children.map((c) => c.id) ?? [],
    [activeSubscriptionRecord]
  );

  const toggleChild = (id: string | number) => {
    setSelectedChildren((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleApplyCoupon = () => {
    if (!couponCode || !selectedPriceId) return;
    dispatch(
      validateCoupon({
        code: couponCode,
        price_id: selectedPriceId,
        children: selectedChildren.length > 0 ? (selectedChildren as number[]) : undefined,
      })
    );
  };

  const isCouponValid =
    coupon_validation && "code" in coupon_validation && coupon_validation.code;

  const isPlansLoading = handlers.loading;
  const hasNoPlans = !isPlansLoading && plans.length === 0;
  const hasChildren = children.length > 0;

  // For "Update Children" mode, enable Continue regardless of plan selection
  const canContinue = hasActiveSubscription
    ? true // always allow going to Step 3 to confirm child changes
    : !!selectedPriceId;

  return (
    <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
      <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
        <h2 className="text-lg font-bold">
          {hasActiveSubscription ? "Manage Your Subscription" : "Select Plan & Child(ren)"}
        </h2>
      </div>

      {/* ── PLAN SELECTION ── */}
      <div className="px-6 py-6">
        {hasActiveSubscription ? (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <p className="font-semibold">
              You are currently subscribed to{" "}
              <span className="font-bold">{active_subscription.plan.name}</span>.
            </p>
            <p className="mt-1 text-blue-600">
              You can manage the children covered under this subscription below.
            </p>
          </div>
        ) : (
          <>
            <h3 className="mb-4 font-bold">Choose a Plan</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {isPlansLoading && (
                <>
                  <PlanSkeleton />
                  <PlanSkeleton />
                </>
              )}

              {hasNoPlans && (
                <div className="col-span-full py-8 text-center text-sm text-gray-500">
                  No subscription plans available at the moment.
                </div>
              )}

              {!isPlansLoading &&
                plans.map((plan) => {
                  const monthlyPrice = plan.prices.find((p) => p.interval === "MONTH");
                  const yearlyPrice = plan.prices.find((p) => p.interval === "YEAR");

                  return (
                    <div key={plan.id} className="contents">
                      {yearlyPrice && monthlyPrice && (
                        <PlanCard
                          title={`${plan.name} Annual Plan`}
                          price={yearlyPrice.amount_in_cent / 100 / 12}
                          originalPrice={monthlyPrice.amount_in_cent / 100}
                          interval="mo"
                          trialText="7-Day Free Trial"
                          billingText={`$${yearlyPrice.amount_in_cent / 100} Billed yearly`}
                          badge="Save 20%"
                          selected={selectedPriceId === yearlyPrice.id}
                          disabled={false}
                          activeSubscriptionBadge={false}
                          onSelect={() => {
                            setSelectedPriceId(yearlyPrice.id);
                            setPriceId(yearlyPrice.id);
                          }}
                        />
                      )}

                      {monthlyPrice && (
                        <PlanCard
                          title={`${plan.name} Monthly Plan`}
                          price={monthlyPrice.amount_in_cent / 100}
                          interval="mo"
                          trialText="7-Day Free Trial"
                          billingText={`$${monthlyPrice.amount_in_cent / 100} Billed monthly`}
                          selected={selectedPriceId === monthlyPrice.id}
                          disabled={false}
                          activeSubscriptionBadge={false}
                          onSelect={() => {
                            setSelectedPriceId(monthlyPrice.id);
                            setPriceId(monthlyPrice.id);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>

      {/* ── CHILDREN ── */}
      <div className="px-6 py-6">
        <h3 className="mb-2 font-medium">
          {hasActiveSubscription ? "Manage Children" : "Select Children"}
          {!hasActiveSubscription && (
            <span className="ml-2 text-sm font-normal text-gray-500">(Optional)</span>
          )}
        </h3>

        {!hasChildren ? (
          <div className="rounded-lg border border-dashed bg-gray-50 py-8 text-center text-sm text-gray-500">
            <p className="mb-2">No children added yet.</p>
            <p className="text-xs">
              {hasActiveSubscription
                ? "Add a child to your account to include them in your subscription."
                : "You can add children after creating your subscription."}
            </p>
          </div>
        ) : (
          <div className="max-h-64 space-y-4 overflow-y-auto">
            {children.map((child) => {
              const isChecked = selectedChildren.includes(child.id);

              return (
                <label
                  key={child.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChild(child.id)}
                    />
                    <span className="font-medium">{child.fullName}</span>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* ── COUPON (only for new subscriptions) ── */}
        {!hasActiveSubscription && (
          <div className="py-6 pb-4">
            <h3 className="mb-2 font-medium">Have a coupon?</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.trim())}
                placeholder="Enter coupon code"
                className="flex-1 rounded-md border px-3 py-2 text-sm"
                disabled={handlers.coupon_validation_loading}
              />
              <button
                type="button"
                disabled={
                  !couponCode ||
                  !selectedPriceId ||
                  handlers.coupon_validation_loading
                }
                onClick={handleApplyCoupon}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {handlers.coupon_validation_loading ? "Validating..." : "Apply"}
              </button>
            </div>

            {coupon_validation && (
              <div
                className={`mt-2 rounded-md p-2 text-sm ${
                  isCouponValid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {isCouponValid ? (
                  <>
                    ✓ Coupon applied! Code: {coupon_validation.code}
                    {coupon_validation.discount && (
                      <span> — Discount: {`${coupon_validation.discount.value}% off`}</span>
                    )}
                  </>
                ) : (
                  `✗ ${coupon_validation.message || "Invalid coupon code"}`
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <button
            disabled={!canContinue}
            onClick={goNext}
            className="w-full rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
          >
            {hasActiveSubscription ? "Update Children" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2SelectChildren;

const PlanSkeleton = () => (
  <div className="h-[180px] animate-pulse rounded-lg border bg-gray-100" />
);