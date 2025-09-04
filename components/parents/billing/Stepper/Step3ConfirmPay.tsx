import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface Step3Props {
  selectedPlan: string | number | null;
  selectedChildren: (string | number)[];
  goBack: () => void;
}

const Step3ConfirmPay: React.FC<Step3Props> = ({ selectedPlan, selectedChildren, goBack }) => {
  const { plans } = useSelector((state: RootState) => state.pricing);
  const { children } = useSelector((state: RootState) => state.parentChild);

  const plan = plans.find((p) => p.id === selectedPlan);
  const childNames = children
    .filter((c) => selectedChildren.includes(c.id))
    .map((c) => c.fullName);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Confirm & Pay</h2>

      {plan && (
        <p className="mb-2">
          <strong>Plan:</strong> {plan.name} – ${plan.amount_in_cent / 100}
        </p>
      )}

      <p className="mb-2">
        <strong>Children:</strong> {childNames.join(", ")}
      </p>

      <div className="mt-6 flex gap-4">
        <button onClick={goBack} className="px-4 py-2 border rounded-lg bg-gray-200">
          Back
        </button>
       <Link
  href={`/parents/billing/payment?plan_id=${plan?.id}&children=${selectedChildren.join(",")}`}
>
  <button className="rounded-[4px] bg-mainColor px-4 py-2 text-xs text-white">
    Activate
  </button>
</Link>

        {/* <button className="px-4 py-2 bg-mainColor text-white rounded-lg">Confirm & Pay</button> */}
      </div>
    </div>
  );
};

export default Step3ConfirmPay;
