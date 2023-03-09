import GoogleBtn from "@/components/googleBtn";
import ParentSignUp1 from "@/components/parentMultiForm/ParentSignUp1";
import ParentSignUp2 from "@/components/parentMultiForm/ParentSignUp2";
import ParentSignUp3 from "@/components/parentMultiForm/ParentSignUp3";
import ParentSignUp4 from "@/components/parentMultiForm/ParentSignUp4";
import ParentSignUp5 from "@/components/parentMultiForm/ParentSignUp5";
import ParentSignUp6 from "@/components/parentMultiForm/ParentSignUp6";
import ParentSignUp7 from "@/components/parentMultiForm/ParentSignUp7";
import Safety1 from "@/components/parentMultiForm/Safety1";
import Safety2 from "@/components/parentMultiForm/Safety2";
import Safety3 from "@/components/parentMultiForm/Safety3";
import ThankyouForm from "@/components/parentMultiForm/ThankyouForm";
import WelcomeForm from "@/components/parentMultiForm/WelcomeForm";
import AuthLayout from "@/components/parents/AuthLayout";
import useMultiForm from "@/components/useMultiForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "services/authService";
import { addChild, resetScreenTime } from "store/parentChildSlice";
import { FiCheckCircle } from "react-icons/fi";
import { RootState } from "store/store";
export default function Parent() {
   const dispatch = useDispatch();
   const router = useRouter();
   const { email, password } = useSelector((state: RootState) => state.user.auth);
   const parent = useSelector((state: RootState) => state.parentChild);
   const [modalOpen, setModalOpen] = useState(false);
   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiForm([
      <ParentSignUp1 key={1} />,
      <ParentSignUp2 key={2} />,
      <ParentSignUp3 key={3} />,
      <WelcomeForm key={4} />,
      <ParentSignUp4 key={5} />,
      <ParentSignUp5 key={7} />,
      <ParentSignUp6 key={6} />,
      <ParentSignUp7 key={8} />,
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
         localStorage.setItem("parent-signup", JSON.stringify(true));
         if (!data?.error?.message) {
            setModalOpen(true);
         }
         next();
      } else if (currentStepIndex === 9) {
         const data = await dispatch(addChild());
         if (!data?.error?.message) {
            goTo(10);
         }
      } else if (currentStepIndex === 10) {
         router.push("/parents");
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
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-[#2073FA] text-center font-bold text-white" type="submit">
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
                     className="mx-auto block max-w-fit rounded-md bg-[#2073fa] px-6 py-3 font-bold text-white"
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
