import ParentSignUp1 from "@/components/parentMultiForm/ParentSignUp1";
import ParentSignUp2 from "@/components/parentMultiForm/ParentSignUp2";
import ThankyouForm from "@/components/parentMultiForm/ThankyouForm";
import WelcomeForm from "@/components/parentMultiForm/WelcomeForm";
import OtherInfoTeacher from "@/components/parentMultiForm/OtherInfoTeacher";
import useMultiForm from "@/components/useMultiForm";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect } from "react";
import { signUpUser } from "services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearFields, updateUser } from "store/authSlice";
import { RootState } from "store/store";
import AuthLayout from "@/components/parents/AuthLayout";
import GoogleBtn from "@/components/googleBtn";

export default function Teacher() {
   const dispatch = useDispatch();
   const router = useRouter();
   const { auth } = useSelector((state: RootState) => state.user);
   const { steps, currentStepIndex, step, teacherSignUpStep, isFirstStep, isLastStep, back, next } = useMultiForm([
      <ParentSignUp1 key={1} />,
      <ParentSignUp2 key={2} />,
      <OtherInfoTeacher key={4} />,
      <WelcomeForm key={3} />,
   ]);

   const signup = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!teacherSignUpStep) {
         next();
      } else {
         const data = await dispatch(signUpUser());
         localStorage.removeItem("parent-signup");
         if (!data?.error?.message) {
            dispatch(clearFields());
            router.push("/verify-email");
         }
      }
   };

   return (
      <AuthLayout>
         <form onSubmit={signup}>
            <div className="">{step}</div>
            <div>
               {!teacherSignUpStep && (
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-[#2073FA] text-center font-bold text-white" type="submit">
                     Continue
                  </button>
               )}
               {teacherSignUpStep && (
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-[#2073FA] text-center font-bold text-white" type="submit">
                     Sign up
                  </button>
               )}
               {!isFirstStep && !isLastStep && (
                  <button className="mt-4 block w-full text-center" type="button" onClick={back}>
                     Back
                  </button>
               )}
               {isFirstStep && <GoogleBtn />}
            </div>
         </form>
      </AuthLayout>
   );
}
