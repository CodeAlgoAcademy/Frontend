import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface Step3Props {
  priceId: number;
  selectedChildren: (string | number)[];
  goBack: () => void;
}

const Step3ConfirmPay: React.FC<Step3Props> = ({
  priceId,
  selectedChildren,
  goBack,
}) => {
  const { plans, coupon_validation } = useSelector((state: RootState) => state.pricing);
  const { children } = useSelector((state: RootState) => state.parentChild);

  const selectedPrice = useMemo(() => {
    for (const plan of plans) {
      const price = plan.prices.find((p) => p.id === priceId);
      if (price) return { plan, price };
    }
    return null;
  }, [plans, priceId]);

  const childNames = children
    .filter((c) => selectedChildren.includes(c.id))
    .map((c) => c.fullName);

  const priceDetails = useMemo(() => {
    if (!selectedPrice) return null;

    const baseAmount = selectedPrice.price.amount_in_cent / 100;
    let discount = 0;
    let finalAmount = baseAmount;

    if (coupon_validation?.code && coupon_validation.discount) {
      if (coupon_validation.discount.type === 'percentage') {
        discount = (baseAmount * coupon_validation.discount.value) / 100;
      } else {
        discount = coupon_validation.discount.value;
      }
      finalAmount = baseAmount - discount;
    }

    return { baseAmount, discount, finalAmount };
  }, [selectedPrice, coupon_validation]);
  const paymentUrl = useMemo(() => {
    if (!priceDetails) return '#';
    
    const params = new URLSearchParams({
      price_id: String(priceId),
      children: selectedChildren.join(","),
      amount: String(Math.round(priceDetails.finalAmount * 100)), // Send in cents
    });
    
    if (coupon_validation?.code) {
      params.append('coupon', coupon_validation.code);
    }
    
    return `/parents/billing/payment?${params.toString()}`;
  }, [priceId, selectedChildren, coupon_validation, priceDetails]);

  return (
    <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
      <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
        <h2 className="text-lg font-bold">Confirm & Pay</h2>
      </div>

      <div className="px-6 py-6">
        {selectedPrice && priceDetails && (
          <>
            <div className="mb-4 flex justify-between border-b pb-2">
              <span className="font-medium text-gray-600">Plan</span>
              <span className="font-semibold text-gray-900">
                {selectedPrice.plan.name} – ₦{priceDetails.baseAmount.toFixed(2)} /{" "}
                {selectedPrice.price.interval.toLowerCase()}
              </span>
            </div>

            {coupon_validation?.code && priceDetails.discount > 0 && (
              <>
                <div className="mb-4 flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">
                    Coupon Discount
                    {coupon_validation?.code &&
                      ` (${coupon_validation?.code})`
                    }
                  </span>
                  <span className="font-semibold text-green-600">
                    -₦{priceDetails.discount.toFixed(2)}
                  </span>
                </div>

                <div className="mb-4 flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">Total</span>
                  <span className="font-bold text-gray-900">
                    ₦{priceDetails.finalAmount.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </>
        )}

        <div className="mb-6 flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Children</span>
          <span className="font-semibold text-gray-900 text-right">
            {childNames.join(", ")}
          </span>
        </div>

        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={goBack}
            className="w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2"
          >
            Back
          </button>

          <Link href={paymentUrl} className="w-1/2">
            <button className="w-full rounded-md bg-mainColor px-4 py-2 text-white">
              Activate
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Step3ConfirmPay;