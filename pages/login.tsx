import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useRouter } from "next/router";
import { loginUser } from "services/authService";
import AuthLayout from "@/components/parents/AuthLayout";
import GoogleBtn from "@/components/googleBtn";
import { updateUser } from "store/authSlice";
const LoginTest = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const { email, password } = useSelector((state: RootState) => state.user.auth);
   const [recaptchaVerified, setRecaptchaVerified] = useState(false);

   const login = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = await dispatch(loginUser());
      if (!data?.error?.message) {
         if (data?.payload?.is_teacher) {
            router?.push("/teachers/addClass");
         } else if (data?.payload?.is_parent) {
            router?.push("/parents");
         } else {
            router?.push("/comingSoon");
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

   useEffect(() => {
      // dispatch(clearFields());
   }, []);
   return (
      <AuthLayout>
         <>
            <h1 className="text-center text-[25px] font-bold md:text-left md:text-[32px]">Log in to your account</h1>
            <form onSubmit={login}>
               <label className="mt-6 block text-xl font-semibold">Your email</label>
               <input
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     dispatch(updateUser({ key: "email", value: e.target.value }));
                  }}
                  type="email"
                  className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
                  placeholder="enter email"
                  required
               />
               <label className="mt-6 block text-xl font-semibold">Password</label>
               <input
                  className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     dispatch(updateUser({ key: "password", value: e.target.value }));
                  }}
                  type="password"
                  placeholder="Enter Password"
                  required
               />
               <button className="mt-6  block h-[2.5rem] w-full rounded-xl bg-orange-400 text-center font-bold text-white" type="submit">
                  Login
               </button>
               <GoogleBtn />
            </form>
         </>
      </AuthLayout>
   );
};

export default LoginTest;
