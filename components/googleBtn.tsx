import React, { FC, useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle, signUpWithGoogle, updateAccountType } from "services/authService";
const GoogleBtn: FC = () => {
   const { is_parent, is_teacher, is_student } = useSelector((state: RootState) => state.user.auth);
   const dispatch = useDispatch();
   const router = useRouter();

   const handleClick = useGoogleLogin({
      onSuccess: async (codeResponse) => {
         if (router?.pathname === "/login") {
            const data = await dispatch(loginWithGoogle(codeResponse.access_token));
            if (!data?.error?.message) {
               if (data?.payload?.is_teacher) {
                  router.push("/teachers/addClass");
               } else if (data?.payload?.is_parent) {
                  router.push("/parents");
               } else {
                  router.push("/comingSoon");
               }
            }
         } else if (router.pathname.includes("/signup")) {
            const data = await dispatch(signUpWithGoogle(codeResponse.access_token));
            if (!data?.error?.message) {
               const data = await dispatch(updateAccountType(is_parent ? "Parent" : is_teacher ? "Teacher" : "Student"));
               if (!data?.error?.message) {
                  if (is_teacher) {
                     router.push("/teachers/addClass");
                  } else if (is_parent) {
                     router.push("/parents");
                  } else {
                     router.push("/comingSoon");
                  }
               }
            }
         }
      },
   });
   return (
      <div className="relative w-full flex-1">
         <button
            onClick={() => {
               handleClick();
            }}
            className="mt-6 flex h-[2.5rem] w-full items-center justify-center gap-4 rounded-xl bg-neutral-100/70 text-center font-semibold text-black"
            type="button"
         >
            <i className="text-[22px]">
               <FcGoogle />
            </i>
            <span>{router?.pathname === "/login" ? "Sign in" : "Sign up"} with Google</span>
         </button>
      </div>
   );
};

export default GoogleBtn;
