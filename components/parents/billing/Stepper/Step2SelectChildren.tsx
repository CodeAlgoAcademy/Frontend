import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { IBilling } from "types/interfaces";

interface Step2Props {
  selectedChildren: (string | number)[];
  setSelectedChildren: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  goNext: () => void;
  goBack: () => void;
}

const Step2SelectChildren: React.FC<Step2Props> = ({
  selectedChildren,
  setSelectedChildren,
  goNext,
  goBack,
}) => {
  const { children } = useSelector((state: RootState) => state.parentChild);
  const { billing_history } = useSelector((state: RootState) => state.pricing);

const coveredChildIds = useMemo(() => {
 const ids: (string | number)[] = [];
  (billing_history || []).forEach((payment: IBilling) => {
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

  return (
    <div className="group flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white shadow-sm">
      <div className="flex justify-center bg-mainColor px-4 py-6 text-white">
        <h2 className="text-lg font-bold">Select Child(ren)</h2>
      </div>
      <div className="px-6 py-6">
        <div className="space-y-4">
          {children.map((child) => {
            const isAlreadySubscribed = coveredChildIds.includes(child.id);
            const isChecked =
              selectedChildren.includes(child.id) || isAlreadySubscribed;
            const isDisabled = isAlreadySubscribed;

            return (
              <label
                key={child.id}
                className={`flex items-center justify-between rounded-lg border p-4 transition ${
                  isDisabled
                    ? "bg-gray-100 opacity-70 cursor-not-allowed"
                    : "hover:shadow-md cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleChild(child.id, isDisabled)}
                    className="h-5 w-5 rounded-md border-gray-300 text-mainColor focus:ring-mainColor disabled:cursor-not-allowed"
                  />
                  <span className="font-medium text-gray-800">
                    {child.fullName}
                  </span>
                </div>

                {isDisabled && (
                  <span className="ml-2 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Already Subscribed
                  </span>
                )}
              </label>
            );
          })}
        </div>

        {/* Footer buttons */}
        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={goBack}
            className="w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            disabled={selectedChildren.length === 0}
            onClick={goNext}
            className="w-1/2 rounded-md bg-mainColor px-4 py-2 font-medium text-white hover:opacity-90 transition disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2SelectChildren;
