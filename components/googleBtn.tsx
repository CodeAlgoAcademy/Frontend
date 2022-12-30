import React, { FC, useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import google from "../public/assets/google.png";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "services/authService";
import GoogleSignUpModal from "./signup/googleSignUpModal";
const GoogleBtn: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("");

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleClick = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const data = await dispatch(loginWithGoogle(codeResponse.access_token));
      if (!data?.error?.message) {
        router.push("/addClass");
      }
    },
  });
  return (
    <div className="relative flex-1 w-full">
      <button
        onClick={() => {
          router.pathname === "/login" ? handleClick() : toggleModal();
        }}
        className=" w-full border-2 border-gray-300 rounded flex flex-row gap-x-4 p-2 items-center h-[50px] md:justify-start justify-center hover:bg-blue-50"
      >
        <Image src={google} alt="google" height={"30px"} width={"30px"} />
        <p>Connect With Google</p>
      </button>

      {modalOpen && router.pathname === "/signup" && (
        <GoogleSignUpModal
          handleClick={handleClick}
          closeModal={closeModal}
          accountType={accountType}
          setAccountType={setAccountType}
        />
      )}
    </div>
  );
};

export default GoogleBtn;
