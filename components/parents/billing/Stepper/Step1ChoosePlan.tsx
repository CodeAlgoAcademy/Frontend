import BillingsPlansList from "../BillingsPlansList";

interface Step1Props {
  selectedPlan: string | null;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string | null>>;
  goNext: () => void;
}
const Step1ChoosePlan: React.FC<Step1Props> = ({ selectedPlan, setSelectedPlan, goNext })=> {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Choose a Plan</h2>
      <BillingsPlansList onSelect={(plan) => setSelectedPlan(plan.id)} />

      <button
        disabled={!selectedPlan}
        onClick={goNext}
        className="mt-6 px-4 py-2 bg-mainColor text-white rounded-lg disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

export default Step1ChoosePlan;