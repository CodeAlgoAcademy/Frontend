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

 <div
  className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm"
>
  {/* Header */}
  <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
    <h2 className="text-lg font-bold">Confirm & Pay</h2>
  </div>

  {/* Body */}
  <div className="px-6 py-6">
    {plan && (
      <div className="mb-4 flex justify-between border-b pb-2">
        <span className="font-medium text-gray-600">Plan</span>
        <span className="font-semibold text-gray-900">
          {plan.name} – ${plan.amount_in_cent / 100}
        </span>
      </div>
    )}

    <div className="mb-6 flex justify-between border-b pb-2">
      <span className="font-medium text-gray-600">Children</span>
      <span className="font-semibold text-gray-900 text-right">
        {childNames.join(", ")}
      </span>
    </div>

    {/* Footer buttons */}
    <div className="mt-8 flex justify-between gap-4">
      <button
        onClick={goBack}
        className="w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 transition"
      >
        Back
      </button>

      <Link
        href={`/parents/billing/payment?plan_id=${plan?.id}&children=${selectedChildren.join(",")}`}
        className="w-1/2"
      >
        <button className="w-full rounded-md bg-mainColor px-4 py-2 font-medium text-white hover:opacity-90 transition">
          Activate
        </button>
      </Link>
    </div>
  </div>
</div>


//     <div>
//       <h2 className="mb-4 text-lg font-semibold">Confirm & Pay</h2>

//       {plan && (
//         <p className="mb-2">
//           <strong>Plan:</strong> {plan.name} – ${plan.amount_in_cent / 100}
//         </p>
//       )}

//       <p className="mb-2">
//         <strong>Children:</strong> {childNames.join(", ")}
//       </p>

//       <div className="mt-6 flex gap-4">
//         <button onClick={goBack} className="px-4 py-2 border rounded-lg bg-gray-200">
//           Back
//         </button>
//        <Link
//   href={`/parents/billing/payment?plan_id=${plan?.id}&children=${selectedChildren.join(",")}`}
// >
//   <button className="rounded-[4px] bg-mainColor px-4 py-2 text-xs text-white">
//     Activate
//   </button>
// </Link>

//         {/* <button className="px-4 py-2 bg-mainColor text-white rounded-lg">Confirm & Pay</button> */}
//       </div>
//     </div>
  );
};

export default Step3ConfirmPay;
