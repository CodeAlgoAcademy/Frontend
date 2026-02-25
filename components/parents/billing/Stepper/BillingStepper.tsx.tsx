


import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import { getActiveSubscription, getBillingHistory } from "services/pricingService";
import Step1SelectPlan from "./Step1selectplan";
import Step2ManageChildren from "./Step2managechildren";
import Step3Confirm from "./Step3ConfirmPay";

interface BillingStepperProps {
  onDone?: () => void;
  onLockStepper?: () => void;
}

export interface BillingStepperHandle {
  resetToStepOne: () => void;
}

type StepId = 1 | 2 | 3;

const BillingStepper = forwardRef<BillingStepperHandle, BillingStepperProps>(({ onDone, onLockStepper }, ref) => {
  const dispatch = useAppDispatch();
  const { current_subscription } = useSelector((state: RootState) => state.pricing);

  const hasExistingSubscription = !!current_subscription?.id;

  const [step, setStep] = useState<StepId>(1);
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
  const [selectedChildIds, setSelectedChildIds] = useState<number[]>([]); // New State
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    const load = async () => {
      await dispatch(getActiveSubscription());
      dispatch(getBillingHistory());
      setInitialLoadDone(true);
    };
    load();
  }, [dispatch]);

  // Pre-fill children if editing existing subscription
  useEffect(() => {
    if (current_subscription?.children) {
      setSelectedChildIds(current_subscription.children.map((c) => c.id));
    }
  }, [current_subscription]);

  const reset = useCallback(() => {
    setStep(1);
    setSelectedPriceId(null);
    setSelectedChildIds([]);
    onDone?.();
  }, [onDone]);

  useImperativeHandle(ref, () => ({ resetToStepOne: reset }));

  // REORDERED STEPS
  const steps = [
    { id: 1, label: hasExistingSubscription ? "Change Plan" : "Select Plan" },
    { id: 2, label: "Select Children" }, // Step 2 is now Children
    { id: 3, label: hasExistingSubscription ? "Confirm" : "Subscribe" }, // Step 3 is Payment
  ];

  if (!initialLoadDone && step === 1) {
    return <div className="py-16 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div id="stepper-section">
      {/* Stepper UI (Circles) */}
      <div className="mb-8 flex items-center">
        {steps.map((s, i) => (
           <React.Fragment key={s.id}>
             <div className="flex flex-col items-center">
               <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${step === s.id ? "bg-mainColor text-white" : step > s.id ? "bg-mainColor/20 text-mainColor" : "bg-gray-100 text-gray-400"}`}>
                 {step > s.id ? "✓" : s.id}
               </div>
               <p className="mt-1.5 text-xs font-medium text-gray-700">{s.label}</p>
             </div>
             {i < steps.length - 1 && <div className="mx-2 mb-5 h-0.5 flex-1 bg-gray-100" />}
           </React.Fragment>
        ))}
      </div>

      {/* STEP 1: PLAN */}
      {step === 1 && (
        <Step1SelectPlan
          selectedPriceId={selectedPriceId}
          setSelectedPriceId={setSelectedPriceId}
          couponCode=""
          setCouponCode={() => {}} 
          goNext={() => {
            if (onLockStepper) onLockStepper();
            setStep(2);
          }}
        />
      )}

      {/* STEP 2: CHILDREN (Now purely selection, no API calls) */}
      {step === 2 && (
        <Step2ManageChildren
          selectedChildIds={selectedChildIds}
          setSelectedChildIds={setSelectedChildIds}
          goBack={() => setStep(1)}
          goNext={() => setStep(3)}
        />
      )}

      {/* STEP 3: CONFIRM & PAY */}
      {step === 3 && selectedPriceId !== null && (
        <Step3Confirm
          priceId={selectedPriceId}
          selectedChildIds={selectedChildIds}
          goBack={() => setStep(2)}

          existingSubscriptionId={current_subscription?.id || null}
        />
      )}
    </div>
  );
});

BillingStepper.displayName = "BillingStepper";
export default BillingStepper;




// import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "store/hooks";
// import { RootState } from "store/store";
// import { getActiveSubscription, getBillingHistory } from "services/pricingService";
// import Step3Confirm from "./Step3ConfirmPay";
// import Step1SelectPlan from "./Step1selectplan";
// import Step2ManageChildren from "./Step2managechildren";

// interface BillingStepperProps {
//   onDone?: () => void;
//   onLockStepper?: () => void;
// }

// export interface BillingStepperHandle {
//   resetToStepOne: () => void;
// }

// type StepId = 1 | 2 | 3;

// const BillingStepper = forwardRef<BillingStepperHandle, BillingStepperProps>(({ onDone, onLockStepper }, ref) => {
//   const dispatch = useAppDispatch();
//   const { current_subscription } = useSelector((state: RootState) => state.pricing);

//   const hasExistingSubscription = !!current_subscription?.id;

//   const [step, setStep] = useState<StepId>(1);
//   const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
//   const [couponCode, setCouponCode] = useState("");
//   const [activeSubscriptionId, setActiveSubscriptionId] = useState<number | null>(
//     current_subscription?.id ?? null
//   );
//   const [initialLoadDone, setInitialLoadDone] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       await dispatch(getActiveSubscription());
//       dispatch(getBillingHistory());
//       setInitialLoadDone(true);
//     };
//     load();
//   }, [dispatch]);

//   useEffect(() => {
//     if (current_subscription?.id) {
//       setActiveSubscriptionId(current_subscription.id);
//     }
//   }, [current_subscription?.id]);

//   const reset = useCallback(() => {
//     setStep(1);
//     setSelectedPriceId(null);
//     setCouponCode("");
//     onDone?.();
//   }, [onDone]);

//   useImperativeHandle(ref, () => ({ resetToStepOne: reset }));

//   const steps = [
//     { id: 1, label: hasExistingSubscription ? "Change Plan" : "Select Plan" },
//     { id: 2, label: "Subscribe" },
//     { id: 3, label: "Children" },
//   ];

//   const handleStep2Success = (subscriptionId: number) => {
//     setActiveSubscriptionId(subscriptionId);
//     setStep(3);
//   };

//   if (!initialLoadDone && step === 1) {
//     return (
//       <div id="stepper-section" className="py-16 text-center">
//         <p className="mt-3 text-sm text-gray-400">Loading your subscription…</p>
//       </div>
//     );
//   }

//   return (
//     <div id="stepper-section">
//       <div className="mb-8 flex items-center">
//         {steps.map((s, i) => (
//            <React.Fragment key={s.id}>
//              <div className="flex flex-col items-center">
//                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${step === s.id ? "bg-mainColor text-white" : step > s.id ? "bg-mainColor/20 text-mainColor" : "bg-gray-100 text-gray-400"}`}>
//                  {step > s.id ? "✓" : s.id}
//                </div>
//                <p className="mt-1.5 text-xs font-medium text-gray-700">{s.label}</p>
//              </div>
//              {i < steps.length - 1 && <div className="mx-2 mb-5 h-0.5 flex-1 bg-gray-100" />}
//            </React.Fragment>
//         ))}
//       </div>


//       {step === 1 && (
//         <Step1SelectPlan
//           selectedPriceId={selectedPriceId}
//           setSelectedPriceId={setSelectedPriceId}
//           couponCode={couponCode}
//           setCouponCode={setCouponCode}
//           goNext={() => {
//             if (onLockStepper) onLockStepper();
//             setStep(2);
//           }}
//         />
//       )}


//       {step === 2 && selectedPriceId !== null && (
//         <Step3Confirm
//           priceId={selectedPriceId}
//           goBack={() => setStep(1)}
//           onSuccess={handleStep2Success}
//           existingSubscriptionId={activeSubscriptionId}
//         />
//       )}

//       {/* Step 3 — Manage children */}
//       {step === 3 && activeSubscriptionId !== null && (
//         <Step2ManageChildren
//           subscriptionId={activeSubscriptionId}
//           goBack={() => setStep(2)}
//           onDone={reset}
//         />
//       )}
//     </div>
//   );
// });

// BillingStepper.displayName = "BillingStepper";
// export default BillingStepper;