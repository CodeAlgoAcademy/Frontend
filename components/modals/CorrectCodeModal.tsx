import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

interface CorrectCodeModalProps {
   setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CorrectCodeModal = (props: CorrectCodeModalProps) => {
   return (
      <main className={styles.modalOverlay}>
         <div className={styles.modal}>
            <header className="mb-6 flex items-center justify-between gap-3">
               <p className="cursor-pointer text-[1.2rem] font-bold text-mainPink">Congratulations</p>
               <i
                  className="cursor-pointer text-[1.5rem] text-red-600"
                  onClick={() => {
                     props.setModalOpen(false);
                  }}
               >
                  <MdClose />
               </i>
            </header>
            <div>
               <p className="mx-auto mb-8 flex h-[64px] max-w-[400px] items-center justify-center text-center text-[1rem] font-bold text-gray-900">
                  Congratulations on writing your first line of code! 🎉 You've taken the first step towards a world of endless creativity and
                  learning
               </p>
               <div className="flex justify-center">
                  <Link href="/signup">
                     <button
                        className={styles.button}
                        onClick={() => {
                           props.setModalOpen(false);
                        }}
                     >
                        Register
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </main>
   );
};

const styles = {
   modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
   modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
   button: "bg-mainPink text-white py-3 px-2 rounded-md max-w-[300px]  w-full text-center",
};

export default CorrectCodeModal;
