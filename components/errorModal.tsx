import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeErrorModal } from "store/fetchSlice";
import { RootState } from "store/store";

const ErrorModal = () => {
   const { errorModalOpen, errors } = useSelector((state: RootState) => state.fetch);
   const dispatch = useDispatch();
   if (!errorModalOpen) {
      return null;
   }

   return (
      <div className="fixed top-0 left-0 z-[70] flex min-h-screen w-[100vw] items-center justify-center bg-[rgba(0,0,0,0.5)]">
         {/* modal */}
         <div className="mx-auto w-[90vw] max-w-[450px] overflow-hidden rounded-md bg-white shadow-md">
            <header className="w-full bg-red-600 p-4 text-white">
               <h1 className="flex flex-row items-center gap-x-4 text-[22px] font-bold">
                  <span>
                     <FaExclamationTriangle />
                  </span>
                  Error
               </h1>
            </header>
            <div className="bg-white p-4">
               {/* display errors */}
               <ul className="mb-6 flex flex-col gap-y-2">
                  {errors?.map((error: string, index: number) => (
                     <li className="flex flex-row items-center gap-x-4 text-[16px] font-semibold" key={index}>
                        <i className=" text-red-500">
                           <BiChevronRight />
                        </i>
                        {error}
                     </li>
                  ))}
               </ul>
               <footer className="border-t pt-4 text-right">
                  <button
                     className="min-w-[150px] rounded-full bg-red-600 py-3 text-white"
                     onClick={() => {
                        dispatch(closeErrorModal());
                     }}
                  >
                     Close
                  </button>
               </footer>
            </div>
         </div>
      </div>
   );
};

export default ErrorModal;
