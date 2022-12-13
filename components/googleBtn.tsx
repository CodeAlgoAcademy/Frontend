import React, { FC, useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import google from "../public/assets/google.png";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "services/authService";
const GoogleBtn: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const data = await dispatch(loginWithGoogle(codeResponse.access_token));
      if (!data?.error?.message) {
        router.push("/addClass");
      }
    },
  });
  return (
    <button
      onClick={() => {
        // handleClick();
      }}
      className="flex-1 w-full border-2 border-gray-300 rounded flex flex-row gap-x-4 p-2 items-center h-[50px] md:justify-start justify-center hover:bg-blue-50"
    >
      <Image src={google} alt="google" height={"30px"} width={"30px"} />
      <p>Connect With Google</p>
    </button>
  );
};

export default GoogleBtn;
