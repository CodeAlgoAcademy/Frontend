import { useState } from "react";
import Step1ChoosePlan from "./Step1ChoosePlan";
import Step2SelectChildren from "./Step2SelectChildren";
import Step3ConfirmPay from "./Step3ConfirmPay";


const BillingStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
//   const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
const [selectedChildren, setSelectedChildren] = useState<(string | number)[]>([]);


  const goNext = () => setCurrentStep((s) => s + 1);
  const goBack = () => setCurrentStep((s) => s - 1);

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6">
        {["Choose Plan", "Select Children", "Confirm & Pay"].map((label, i) => (
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

      {/* Step Content */}
      {currentStep === 1 && (
        <Step1ChoosePlan
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          goNext={goNext}
        />
      )}
      {currentStep === 2 && (
        <Step2SelectChildren
          selectedChildren={selectedChildren}
          setSelectedChildren={setSelectedChildren}
          goNext={goNext}
          goBack={goBack}
        />
      )}
      {currentStep === 3 && (
        <Step3ConfirmPay
          selectedPlan={selectedPlan}
          selectedChildren={selectedChildren}
          goBack={goBack}
        />
      )}
    </div>
  );
};

export default BillingStepper;