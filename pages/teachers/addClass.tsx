import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import Modal from "@/components/Teachers/addClass/modal";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeAddClassModal, openAddClassModal } from "store/modalSlice";
import Classes from "@/components/Teachers/addClass/classes";
import { getAllClasses } from "services/classesService";
import { RootState } from "store/store";

const AddClass = () => {
   const dispatch = useDispatch();

   const getClass = async () => {
      await dispatch(getAllClasses());
   };

   useEffect(() => {
      getClass();
      dispatch(closeAddClassModal());
   }, []);

   return (
      <main>
         <Head>
            <title>CodeAlgo Academy | Add Class</title>
         </Head>

         {/* navbar here */}
         <section className="min-h-screen w-full bg-[#ECEDF3]">
            <div className="mx-auto w-full max-w-[1250px] px-[16px] py-[30px]">
               <div className="flex w-full flex-wrap items-center justify-between">
                  <h1 className="text-mainColor text-[2rem] font-bold">Home</h1>
                  <div
                     className="text-mainColor flex cursor-pointer flex-row items-center gap-x-2"
                     data-testid="open-modal"
                     onClick={() => {
                        dispatch(openAddClassModal());
                     }}
                  >
                     <span className="font-lighter border-mainColor text-mainColor flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 text-[20px]">
                        <FaPlus />
                     </span>
                     <h3 className="text-[16px] font-bold">Add Class</h3>
                  </div>
               </div>

               <section className="mt-12">
                  <Classes />
               </section>
            </div>
         </section>

         {/* it has a position of fixed */}
         <Modal />
      </main>
   );
};

export default AddClass;
