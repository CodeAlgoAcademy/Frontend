import { useState } from "react";
import Step2SelectChildren from "./Step2SelectChildren";
import Step3ConfirmPay from "./Step3ConfirmPay";

const BillingStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChildren, setSelectedChildren] = useState<(string | number)[]>([]);
  const [priceId, setPriceId] = useState<number | null>(null);
  const goNext = () => setCurrentStep((s) => s + 1);
  const goBack = () => setCurrentStep((s) => s - 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        {["Select Plan & Children", "Confirm & Pay"].map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center 
              ${currentStep === i + 1 ? "bg-mainColor text-white" : "bg-gray-300"}`}
            >
              {i + 1}
            </div>
            <p className="mt-2 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {currentStep === 1 && (
        <Step2SelectChildren
          selectedChildren={selectedChildren}
          setSelectedChildren={setSelectedChildren}
          setPriceId={setPriceId}
          goNext={goNext}
        />
      )}

      {currentStep === 2 && priceId !== null && (
        <Step3ConfirmPay
          priceId={priceId}   
          selectedChildren={selectedChildren}
          goBack={goBack}   
        />
      )}
    </div>
  );
};

export default BillingStepper;
