import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/authSlice";
import GoogleBtn from "@/components/UI/googleBtn";
import Form1 from "@/components/stepForm/general/Form1";
import Form2 from "@/components/stepForm/general/Form2";
import Form3 from "@/components/stepForm/general/Form3";
import AuthLayout from "@/components/layouts/AuthLayout";
import useMultiForm from "utils/useMultiForm";
import { signUpUser } from "services/authService";
import { useRouter } from "next/router";

const Organizer = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiForm([
      <Form1 key={1} />,
      <Form2 key={2} />,
      <Form3 key={3} />,
   ]);

   const signUp = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(parent, currentStepIndex);
      if (currentStepIndex === 2) {
         const data = await dispatch(signUpUser());

         if (!data?.error) {
            router.push("/organizers");
         }
      } else {
         next();
      }
   };

   React.useEffect(() => {
      dispatch(updateUser({ key: "accountType", value: "Organizer" }));
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
               </div>
            </form>
         </AuthLayout>
      </>
   );
};

export default Organizer;
