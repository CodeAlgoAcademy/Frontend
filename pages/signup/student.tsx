import GoogleBtn from "@/components/UI/googleBtn";
import StudentInfo from "@/components/stepForm/students/StudentInfo";
import Form1 from "@/components/stepForm/general/Form1";
import Form2 from "@/components/stepForm/general/Form2";
import Form3 from "@/components/stepForm/general/Form3";
import AuthLayout from "@/components/layouts/AuthLayout";
import useMultiForm from "utils/useMultiForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "services/authService";
import { clearFields, updateUser } from "store/authSlice";
import { RootState } from "store/store";
import Grades from "@/components/Teachers/addClass/grades";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import http from "axios.config";

export default function Student() {
   const dispatch = useDispatch();
   const router = useRouter();
   const { auth } = useSelector((state: RootState) => state.user);
   const { email } = useSelector((state: RootState) => state.user.auth);
   const { steps, currentStepIndex, teacherSignUpStep, step, isFirstStep, isLastStep, back, next } = useMultiForm([
      <Form1 key={1} />,
      <Form2 key={2} />,
      <Form3 key={3} />,
      <StudentInfo key={4} />,
   ]);

   const signup = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(auth);
      console.log(currentStepIndex);
      if (currentStepIndex === 0) {
         dispatch(openPreloader({ loadingText: "Checking Email availability" }));
         try {
            const res = await http.post("/auth/check-email", { email });

            if (res?.data?.details?.toLowerCase() === "email not found") {
               next();
            } else if (res?.data?.details?.toLowerCase() === "email found") {
               dispatch(openErrorModal({ errorText: ["Email already exist. Try again!"] }));
            }
         } catch (error) {}
         dispatch(closePreloader());
      } else if (currentStepIndex !== 3) {
         next();
      } else {
         const data = await dispatch(signUpUser());
         if (!data?.error?.message) {
            dispatch(clearFields());
            router.push("/verify-email");
         }
         console.log(data);
      }
   };

   useEffect(() => {
      dispatch(updateUser({ key: "accountType", value: "Student" }));
   }, []);

   return (
      <>
         <Grades />
         <AuthLayout>
            <form onSubmit={signup}>
               <div className="">{step}</div>
               <div>
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-orange-400 text-center font-bold text-white" type="submit">
                     Continue
                  </button>
                  {!isFirstStep && (
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
