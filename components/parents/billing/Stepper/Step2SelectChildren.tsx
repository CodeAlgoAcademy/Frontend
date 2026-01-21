import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { Subscription } from "types/interfaces";
import { getPricingPlans, validateCoupon, getBillingHistory } from "services/pricingService";
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
  const { billing_history, plans, handlers, coupon_validation } = useSelector(
    (state: RootState) => state.pricing
  );
  const [couponCode, setCouponCode] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);

  useEffect(() => {
    if (plans.length === 0) {
      dispatch(getPricingPlans());
    }
  }, [plans.length, dispatch]);

  useEffect(() => {
    if (!billing_history || billing_history.length === 0) {
      dispatch(getBillingHistory());
    }
  }, [billing_history, dispatch]);

  const coveredChildIds = useMemo(() => {
    const ids: (string | number)[] = [];
    (billing_history || []).forEach((payment: Subscription) => {
      if (payment.is_active && payment.payment_status === "Paid") {
        payment.children.forEach((child) => {
          if (!ids.includes(child.id)) ids.push(child.id);
        });
      }
    });
    return ids;
  }, [billing_history]);

  const toggleChild = (id: string | number, disabled: boolean) => {
    if (disabled) return;
    setSelectedChildren((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleApplyCoupon = () => {
    if (!couponCode || !selectedPriceId || selectedChildren.length === 0) return;
    dispatch(
      validateCoupon({
        code: couponCode,
        price_id: selectedPriceId,
        children: selectedChildren as number[],
      })
    );
  };
  const isCouponValid = coupon_validation && 'code' in coupon_validation && coupon_validation.code;
  return (
    <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
      <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
        <h2 className="text-lg font-bold">Select Plan & Child(ren)</h2>
      </div>

      <div className="px-6 py-6">
        <h3 className="mb-4 font-bold">Choose a Plan</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const monthlyPrice = plan.prices.find(p => p.interval === "MONTH");
            const yearlyPrice = plan.prices.find(p => p.interval === "YEAR");

            return (
              <>
              {/* ANNUAL */}
                {yearlyPrice && monthlyPrice && (
                  <PlanCard
                    key={yearlyPrice.id}
                    title={`${plan.name} Annual Plan`}
                    price={17.3}
                    originalPrice={(monthlyPrice.amount_in_cent / 100)}
                    interval="mo"
                    trialText="7-Day Free Trial"
                    billingText={`$${(yearlyPrice.amount_in_cent / 100)} Billed yearly`}
                    badge="Save 20%"
                    selected={selectedPriceId === yearlyPrice.id}
                    onSelect={() => {
                      setSelectedPriceId(yearlyPrice.id);
                      setPriceId(yearlyPrice.id); 
                    }}
                  />
                )}

                {/* MONTHLY */}
                {monthlyPrice && (
                  <PlanCard
                    key={monthlyPrice.id}
                    title={`${plan.name} Monthly Plan`}
                    price={monthlyPrice.amount_in_cent / 100}
                    interval="mo"
                    trialText="7-Day Free Trial"
                    billingText={`$${(monthlyPrice.amount_in_cent / 100)} Billed monthly`}
                    selected={selectedPriceId === monthlyPrice.id}
                    onSelect={() => {
                      setSelectedPriceId(monthlyPrice.id);
                      setPriceId(monthlyPrice.id);
                    }}
                  />
                )}

                
              </>
            );
          })}
        </div>
      </div>

      {/* CHILDREN */}
      <div className="px-6 py-6">
        <h3 className="font-medium mb-2">Select Children</h3>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {children.map((child) => {
            const isAlreadySubscribed = coveredChildIds.includes(child.id);
            const isChecked =
              selectedChildren.includes(child.id) || isAlreadySubscribed;

            return (
              <label
                key={child.id}
                className={`flex items-center justify-between rounded-lg border p-4 transition ${
                  isAlreadySubscribed
                    ? "bg-gray-100 opacity-70 cursor-not-allowed"
                    : "hover:shadow-md cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isAlreadySubscribed}
                    onChange={() =>
                      toggleChild(child.id, isAlreadySubscribed)
                    }
                  />
                  <span className="font-medium">{child.fullName}</span>
                </div>

                {isAlreadySubscribed && (
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Already Subscribed
                  </span>
                )}
              </label>
            );
          })}
        </div>
        
        {/* COUPON CODE */}
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
                selectedChildren.length === 0 ||
                handlers.coupon_validation_loading
              }
              onClick={handleApplyCoupon}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {handlers.coupon_validation_loading ? "Validating..." : "Apply"}
            </button>
          </div>

          {/* Coupon Validation Feedback */}
          {coupon_validation && (
            <div className={`mt-2 rounded-md p-2 text-sm ${
              isCouponValid 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
            }`}>
              {isCouponValid ? (
                <>
                  ✓ Coupon applied! Code: {coupon_validation.code}
                  {coupon_validation.discount && (
                    <span>
                      {' '}— Discount: {coupon_validation.discount.value}
                      {coupon_validation.discount.type === 'percentage' ? '%' : ` ${coupon_validation.currency || '$'}`}
                    </span>
                  )}
                </>
              ) : (
                `✗ ${coupon_validation.message || "Invalid coupon code"}`
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            disabled={!selectedPriceId || selectedChildren.length === 0}
            onClick={goNext}
            className="w-full rounded-md bg-mainColor px-4 py-2 text-white disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2SelectChildren;