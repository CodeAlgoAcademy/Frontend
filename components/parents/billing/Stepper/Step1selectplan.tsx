import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { getPricingPlans, validateCoupon } from "services/pricingService";
import { clearCouponValidation } from "store/pricingSlice";
import PlanCard from "../priceCard";

interface Step1Props {
  selectedPriceId: number | null;
  setSelectedPriceId: (id: number | null) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  goNext: () => void;
}

const Step1SelectPlan: React.FC<Step1Props> = ({
  selectedPriceId,
  setSelectedPriceId,
  couponCode,
  setCouponCode,
  goNext,
}) => {
  const dispatch = useAppDispatch();
  const { plans, handlers, coupon_validation, current_subscription } = useSelector(
    (state: RootState) => state.pricing
  );

  const hasExistingSubscription = !!current_subscription?.id;
  const isPlansLoading = handlers.loading;
  const hasNoPlans = !isPlansLoading && plans.length === 0;

  const activePriceId = useMemo(() => {
    if (!current_subscription) return null;
    for (const plan of plans) {
      for (const price of plan.prices) {
        if (
          plan.name === current_subscription.plan_name &&
          price.interval === current_subscription.plan_interval
        ) {
          return price.id;
        }
      }
    }
    return null;
  }, [current_subscription, plans]);

  useEffect(() => {
    if (plans.length === 0) dispatch(getPricingPlans());
  }, [plans.length, dispatch]);

  useEffect(() => {
    dispatch(clearCouponValidation());
  }, [selectedPriceId, dispatch]);

  const handleApplyCoupon = () => {
    if (!couponCode || !selectedPriceId) return;
    dispatch(validateCoupon({ code: couponCode, price_id: selectedPriceId }));
  };

  const isCouponValid = coupon_validation && "code" in coupon_validation && coupon_validation.code;

  const isPlanChanging = (priceId: number) =>
    hasExistingSubscription && activePriceId !== null && priceId === activePriceId;

  const canContinue = selectedPriceId !== null && selectedPriceId !== activePriceId;

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-center gap-2 bg-mainColor px-4 py-5 text-white">
        <svg className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <h2 className="text-lg font-bold">
          {hasExistingSubscription ? "Change Your Plan" : "Choose a Plan"}
        </h2>
      </div>

      <div className="px-6 py-6">
        {hasExistingSubscription && current_subscription && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Current plan: {current_subscription.plan_name} ({current_subscription.plan_interval?.toLowerCase()})</p>
              <p className="text-xs text-blue-600 mt-0.5">Select a different plan below to switch</p>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {isPlansLoading && <><PlanSkeleton /><PlanSkeleton /></>}

          {hasNoPlans && (
            <div className="col-span-full py-10 text-center text-sm text-gray-400">
              <svg className="mx-auto mb-3 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                      title={`${plan.name} Annual`}
                      price={yearlyPrice.amount_in_cent / 100 / 12}
                      originalPrice={monthlyPrice.amount_in_cent / 100}
                      interval="mo"
                      trialText={!hasExistingSubscription ? "7-Day Free Trial" : undefined}
                      billingText={`$${yearlyPrice.amount_in_cent / 100} billed yearly`}
                      badge="Save 20%"
                      selected={selectedPriceId === yearlyPrice.id}
                      disabled={isPlanChanging(yearlyPrice.id)}
                      activeSubscriptionBadge={isPlanChanging(yearlyPrice.id)}
                      onSelect={() => {
                        if (!isPlanChanging(yearlyPrice.id)) {
                          setSelectedPriceId(yearlyPrice.id);
                        }
                      }}
                    />
                  )}
                  {monthlyPrice && (
                    <PlanCard
                      title={`${plan.name} Monthly`}
                      price={monthlyPrice.amount_in_cent / 100}
                      interval="mo"
                      trialText={!hasExistingSubscription ? "7-Day Free Trial" : undefined}
                      billingText={`$${monthlyPrice.amount_in_cent / 100} billed monthly`}
                      selected={selectedPriceId === monthlyPrice.id}
                      disabled={isPlanChanging(monthlyPrice.id)}
                      activeSubscriptionBadge={isPlanChanging(monthlyPrice.id)}
                      onSelect={() => {
                        if (!isPlanChanging(monthlyPrice.id)) {
                          setSelectedPriceId(monthlyPrice.id);
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>

        {!hasExistingSubscription && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Have a coupon?</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.trim())}
                placeholder="Enter coupon code"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-mainColor focus:outline-none focus:ring-1 focus:ring-mainColor"
                disabled={handlers.coupon_validation_loading}
              />
              <button
                type="button"
                disabled={!couponCode || !selectedPriceId || handlers.coupon_validation_loading}
                onClick={handleApplyCoupon}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white transition hover:bg-gray-800 disabled:opacity-40"
              >
                {handlers.coupon_validation_loading ? "Validating..." : "Apply"}
              </button>
            </div>
            {coupon_validation && (
              <div className={`mt-2 rounded-lg p-3 text-sm ${isCouponValid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {isCouponValid ? (
                  <>
                    <span className="font-semibold">✓ Coupon applied!</span> Code: {coupon_validation.code}
                    {coupon_validation.discount && (
                      <span> — {coupon_validation.discount.value}% off</span>
                    )}
                  </>
                ) : (
                  <span>✗ {coupon_validation.message || "Invalid coupon code"}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <button
            disabled={!canContinue}
            onClick={goNext}
            className="w-full rounded-xl bg-mainColor px-4 py-3 font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
          >
            {hasExistingSubscription ? "Continue to Manage Children →" : "Continue →"}
          </button>
          {hasExistingSubscription && selectedPriceId === activePriceId && (
            <p className="mt-2 text-center text-xs text-gray-400">You're already on this plan. Select a different one to switch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1SelectPlan;

const PlanSkeleton = () => (
  <div className="h-[190px] animate-pulse rounded-xl border border-gray-100 bg-gray-50" />
);