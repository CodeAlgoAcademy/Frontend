import Link from "next/link";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeSuccessModal } from "store/modalSlice";
import { RootState } from "store/store";

const SuccessModal = () => {
   const successModal = useSelector((state: RootState) => state.modal?.successModal);
   const dispatch = useDispatch();

   const closeModal = () => dispatch(closeSuccessModal());

   if (!successModal.isOpen) {
      return <></>;
   }

   return (
      <main className={styles.modalOverlay}>
         <div className={styles.modal}>
            <header className="mb-6 flex items-center justify-between gap-3">
               <p className="cursor-pointer text-[1.2rem] font-bold text-orange-400">Good Job!</p>
               <i className="cursor-pointer text-[1.5rem] text-red-600" onClick={closeModal}>
                  <MdClose />
               </i>
            </header>
            <div>
               <p className="mx-auto mb-8 flex h-[64px] max-w-[400px] items-center justify-center text-center text-[1rem] font-bold text-gray-900">
                  {successModal?.message}
               </p>
               <div className="flex justify-center">
                  <button className={styles.button} onClick={closeModal}>
                     Got it
                  </button>
               </div>
            </div>
         </div>
      </main>
   );
};

export default SuccessModal;

const styles = {
   modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
   modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
   button: "bg-orange-400 text-white py-2 px-2 rounded-md max-w-[300px]  w-full text-center",
};
