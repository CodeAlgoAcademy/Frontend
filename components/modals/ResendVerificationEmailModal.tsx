import { Input } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { resendEmail } from "services/authService";
import { openSuccessModal } from "store/modalSlice";

interface Props {
   closeModal(): void;
}

const ResendVerificationEmailModal = ({ closeModal }: Props) => {
   const [email, setEmail] = useState<string>("");

   const dispatch = useDispatch();

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = await dispatch(resendEmail(email));
      if (!data?.error) {
         closeModal();
         dispatch(openSuccessModal("Account Verified Successfully"));
      }
   };

   return (
      <div className={styles.modalOverlay}>
         <form className={styles.modal} onSubmit={submit}>
            <header className="mb-6 flex items-center justify-between gap-3">
               <p className="cursor-pointer text-[1.2rem] font-bold text-mainPink">Resend Email</p>
               <i className="cursor-pointer text-[1.5rem] text-red-600" onClick={closeModal}>
                  <MdClose />
               </i>
            </header>
            <div>
               <div className="mx-auto mb-8 flex h-[64px] max-w-[400px] flex-col items-center justify-center text-center text-[1rem]  text-gray-900">
                  <p className="mb-2 font-medium">Enter your email to verify your account</p>
                  <input
                     className="w-full max-w-[300px] rounded-md border-[1.5px] border-mainPink p-2 font-medium outline-none placeholder:font-medium"
                     placeholder="Enter Email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="flex justify-center">
                  <button className={styles.button} type="submit">
                     Send Verification Link 📨
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
};

const styles = {
   modalOverlay: "fixed top-0 left-0 z-[6] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
   modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
   button: "bg-mainPink text-white py-2 px-2 rounded-md max-w-[300px]  w-full text-center",
};

export default ResendVerificationEmailModal;
