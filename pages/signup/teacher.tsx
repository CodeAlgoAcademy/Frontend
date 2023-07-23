import Form1 from "@/components/stepForm/general/Form1";
import Form2 from "@/components/stepForm/general/Form2";
import TeacherInfo from "@/components/stepForm/teachers/TeacherInfo";
import useMultiForm from "utils/useMultiForm";
import { ChangeEvent, useEffect } from "react";
import { signUpUser } from "services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearFields, updateUser } from "store/authSlice";
import { RootState } from "store/store";
import AuthLayout from "@/components/layouts/AuthLayout";
import GoogleBtn from "@/components/UI/googleBtn";
import Form3 from "@/components/stepForm/general/Form3";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";

export default function Teacher() {
   const dispatch = useDispatch();
   const router = useRouter();
   const { email } = useSelector((state: RootState) => state.user.auth);
   const { steps, currentStepIndex, step, teacherSignUpStep, isFirstStep, isLastStep, back, next } = useMultiForm([
      <Form1 key={1} />,
      <Form2 key={2} />,
      <Form3 key={3} />,
      <TeacherInfo key={4} />,
   ]);

   const signup = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!teacherSignUpStep) {
         if (currentStepIndex === 0) {
            dispatch(openPreloader({ loadingText: "Checking Email availability" }));
            try {
               const res = await http.post("/auth/check-email", { email });

               if (res?.data?.details?.toLowerCase() === "email not found") {
                  next();
               } else if (res?.data?.details?.toLowerCase() === "email found") {
               }
               console.log(res?.data?.details);
            } catch (error) {}
            dispatch(closePreloader());
         } else {
            next();
         }
      } else {
         const data = await dispatch(signUpUser());
         localStorage.removeItem("parent-signup");
         if (!data?.error?.message) {
            dispatch(clearFields());
            router.push("/verify-email");
         }
      }
   };

   useEffect(() => {
      dispatch(updateUser({ key: "accountType", value: "Teacher" }));
   }, []);

   return (
      <AuthLayout>
         <form onSubmit={signup}>
            <div className="">{step}</div>
            <div>
               {!teacherSignUpStep && (
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-orange-400 text-center font-bold text-white" type="submit">
                     Continue
                  </button>
               )}
               {teacherSignUpStep && (
                  <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-orange-400 text-center font-bold text-white" type="submit">
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
