import GoogleBtn from "@/components/UI/googleBtn";
import Form1 from "@/components/stepForm/general/Form1";
import Form2 from "@/components/stepForm/general/Form2";
import Form3 from "@/components/stepForm/general/Form3";
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
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "services/authService";
import { addChild, addChildFriend, resetScreenTime } from "store/parentChildSlice";
import { FiCheckCircle } from "react-icons/fi";
import { RootState } from "store/store";
import { updateUser } from "store/authSlice";

export default function Parent() {
   const dispatch = useDispatch();
   const router = useRouter();
   const { email, password } = useSelector((state: RootState) => state.user.auth);
   const parent = useSelector((state: RootState) => state.parentChild);
   const [modalOpen, setModalOpen] = useState(false);
   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiForm([
      <Form1 key={1} />,
      <Form2 key={2} />,
      <Form3 key={3} />,
      <WelcomeForm key={4} />,
      <AddStudent key={5} />,
      <AddStudentExperience key={7} />,
      <AddStudentDetails key={6} />,
      <SuccessForm key={8} />,
      <Safety1 key={9} />,
      <Safety2 key={10} />,
      <Safety3 key={11} />,
      <ThankyouForm key={12} />,
   ]);

   const signUp = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(parent, currentStepIndex);
      if (currentStepIndex === 2) {
         const data = await dispatch(signUpUser());
         // Set this to the local storage to know whether to auto-close page after verification
         localStorage.setItem("parent-signup", JSON.stringify(true));
         if (!data?.error?.message) {
            setModalOpen(true);
         }
         // next();
      } else if (currentStepIndex === 9) {
         const data = await dispatch(addChild());
         if (!data?.error?.message) {
            goTo(10);
         }
      } else if (currentStepIndex === 10) {
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

   useEffect(() => {
      dispatch(updateUser({ key: "accountType", value: "Parent" }));
   }, []);

   return (
      <>
         <AuthLayout>
            <form onSubmit={signUp}>
               <div className="">{step}</div>
               <div>
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-orange-400 text-center font-bold text-white" type="submit">
                     Continue
                  </button>
                  {currentStepIndex === 7 && (
                     <p onClick={addChildWithoutParentalControls} className="my-3 cursor-pointer text-center text-[14px] font-bold underline">
                        I do not want to set parental controls
                     </p>
                  )}
                  {!isFirstStep && !isLastStep && (
                     <button className="mt-4 block w-full text-center" type="button" onClick={back}>
                        Back
                     </button>
                  )}
                  {isFirstStep && <GoogleBtn />}
                  {isFirstStep && (
                     <button
                        className="mt-6  block h-[2.5rem] w-full rounded-xl bg-neutral-100/70 text-center font-semibold text-black"
                        type="button"
                        onClick={back}
                     >
                        Sign Up with Facebook
                     </button>
                  )}
                  {isLastStep && <button className="mt-4 block w-full text-center underline">Continue as student</button>}
               </div>
            </form>
         </AuthLayout>
         {modalOpen && (
            <div className="fixed top-0 left-0 z-[4] flex min-h-screen w-[100vw] items-center justify-center bg-[rgba(0,0,0,.5)]">
               <div className="w-[90vw] max-w-[600px] rounded-md bg-white p-8 shadow-md">
                  <div className="py-6">
                     <span className="mb-2 flex w-full items-center justify-center text-center text-[70px] text-green-600">
                        <FiCheckCircle />
                     </span>
                     <p className="text-center text-[20px]">
                        An email verification link has been sent to your email address <span className="font-[800]">{email}</span>
                        <span className="mt-2 block font-bold">Kindly Verify before proceeding</span>
                     </p>
                  </div>
                  <button
                     className="mx-auto block max-w-fit rounded-md bg-orange-400 px-6 py-3 font-bold text-white"
                     onClick={async () => {
                        const isNotVerified = localStorage.getItem("parent-signup");
                        if (!isNotVerified) {
                           const { data } = await dispatch(loginUser());
                           console.log(data);
                        }
                        setModalOpen(false);
                        next();
                     }}
                  >
                     Got it!
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
