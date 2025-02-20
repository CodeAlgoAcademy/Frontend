import AddStudent from "@/components/stepForm/parents/AddStudent";
import AddStudentExperience from "@/components/stepForm/parents/AddStudentExperience";
import AddStudentDetails from "@/components/stepForm/parents/AddStudentDetails";
import SuccessForm from "@/components/stepForm/parents/SuccessRes";
import Safety1 from "@/components/stepForm/parents/Safety1";
import Safety2 from "@/components/stepForm/parents/Safety2";
import Safety3 from "@/components/stepForm/parents/Safety3";
import ThankyouForm from "@/components/stepForm/parents/Thankyou";
import WelcomeForm from "@/components/stepForm/parents/WelcomeForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import useMultiForm from "utils/useMultiForm";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChild, addChildFriend, resetScreenTime } from "store/parentChildSlice";
import { RootState } from "store/store";

export default function ParentStudent() {
   const dispatch = useDispatch();
   const router = useRouter();
   const parent = useSelector((state: RootState) => state.parentChild);
   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiForm([
      <WelcomeForm key={1} />,
      <AddStudent key={2} />,
      <AddStudentExperience key={3} />,
      <AddStudentDetails key={4} />,
      <SuccessForm key={5} />,
      <Safety1 key={6} />,
      <Safety2 key={7} />,
      <Safety3 key={8} />,
      <ThankyouForm key={9} />,
   ]);

   const signUp = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (currentStepIndex === 6) {
         const data = await dispatch(addChild());
         if (!data?.error?.message) {
            goTo(7);
         }
      } else if (currentStepIndex === 7) {
         const data = await dispatch(addChildFriend());
         if (!data?.error) {
            router.push("/parents");
         }
      } else {
         next();
      }
   };
   const addChildWithoutParentalControls = async () => {
      dispatch(resetScreenTime());
      const data = await dispatch(addChild());
      if (!data?.error?.message) {
         router.push("/parents");
      }
   };

   return (
      <>
         <AuthLayout>
            <form onSubmit={signUp}>
               <div className="">{step}</div>
               <div>
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-mainRed text-center font-bold text-white" type="submit">
                     Continue
                  </button>
                  {currentStepIndex === 5 && (
                     <p onClick={addChildWithoutParentalControls} className="my-3 cursor-pointer text-center text-[14px] font-bold underline">
                        I do not want to set parental controls
                     </p>
                  )}
                  {!isFirstStep && !isLastStep && (
                     <button className="mt-4 block w-full text-center" type="button" onClick={back}>
                        Back
                     </button>
                  )}
               </div>
            </form>
         </AuthLayout>
      </>
   );
}
