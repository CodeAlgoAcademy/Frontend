import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useRouter } from "next/router";
import { loginUser } from "services/authService";
import AuthLayout from "@/components/layouts/AuthLayout";
import GoogleBtn from "@/components/UI/googleBtn";
import { updateUser } from "store/authSlice";
import { openErrorModal } from "store/fetchSlice";
import { AuthButton } from "../UI/Button";
import Link from "next/link";
import ResendVerificationEmailModal from "../modals/ResendVerificationEmailModal";
import { ILoginReducerArg } from "types/interfaces";
import { PasswordInput } from "../UI/input";

const Login = ({ route }: { route?: any }) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const credentials = useSelector((state: RootState) => state.user?.auth);
   const [recaptchaVerified, setRecaptchaVerified] = useState(false);
   const [verificationModalOpened, setVerificationModalOpened] = useState<boolean>(false);

   const accountType = router.pathname.includes("teacher")
      ? "teacher"
      : router.pathname.includes("parent")
      ? "guardian"
      : router.pathname.includes("organizer")
      ? "admin"
      : "student";

   const login = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = await dispatch(loginUser());
      if (!data?.error?.message) {
         // If the account doesn't match the user selected in the select-account-type, display an error

         if (router.pathname.includes("/login/teacher")) {
            if (data?.payload?.is_teacher) {
               router?.push("/teachers/addClass");
            } else {
               dispatch(openErrorModal({ errorText: ["Invalid credentials"] }));
               return;
            }
         } else if (router.pathname.includes("/login/parent")) {
            if (data?.payload?.is_parent) {
               if (route) {
                  router.push("/add-student");
               } else {
                  router?.push("/parents");
               }
            } else {
               dispatch(openErrorModal({ errorText: ["Invalid credentials"] }));
               return;
            }
         } else if (router.pathname.includes("/login/organizer")) {
            if (data?.payload?.is_organizer) {
               router.push("/organizers");
            } else {
               dispatch(openErrorModal({ errorText: ["Invalid credentials"] }));
               return;
            }
         }
      }
   };

   const onReCaptchaVerify = useCallback(async () => {
      setRecaptchaVerified(() => true);
   }, []);

   const onReCaptchaExpire = useCallback(async () => {
      setRecaptchaVerified(() => false);
   }, []);
   const onReCaptchaLoad = () => {
      // this reaches out to the hCaptcha JS API and runs the
      // execute function on it. you can use other functions as
      // documented here:
      // https://docs.hcaptcha.com/configuration#jsapi
      // if(captchaRef.current !== null) {
      //   captchaRef.current.execute();
      // }
   };

   return (
      <>
         {verificationModalOpened && (
            <ResendVerificationEmailModal
               closeModal={() => {
                  setVerificationModalOpened(false);
               }}
            />
         )}
         <AuthLayout>
            <>
               <h1 className="text-center text-[25px] font-bold md:text-left md:text-[32px]">
                  Log in to your account <span className="capitalize">{`(${accountType})`}</span>
               </h1>
               <form onSubmit={login}>
                  <label className="mt-6 block text-xl font-semibold">Your email/username</label>
                  <input
                     value={credentials?.email}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(updateUser({ key: "email", value: e.target.value }));
                     }}
                     type="text"
                     className="auth-input"
                     placeholder={`Enter your email or username`}
                     required
                  />
                  <label className="mt-6 block text-xl font-semibold">Password</label>

                  <PasswordInput
                     value={credentials?.password ?? ""}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(updateUser({ key: "password", value: e.target.value }));
                     }}
                  />
                  <div className="mt-2 flex items-center justify-between">
                     <Link href="/change-password">
                        <p className="max-w-fit cursor-pointer font-bold text-[#222] underline">Forgot password</p>
                     </Link>

                     <p className="max-w-fit cursor-pointer font-bold text-[#222] underline" onClick={() => setVerificationModalOpened(true)}>
                        Verify Account
                     </p>
                  </div>
                  <AuthButton text="Login" />
                  <GoogleBtn />
               </form>
            </>
         </AuthLayout>
      </>
   );
};

export default Login;
