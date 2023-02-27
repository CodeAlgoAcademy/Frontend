import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import Modal from "components/addClass/modal";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeAddClassModal, openAddClassModal } from "store/modalSlice";
import Classes from "components/addClass/classes";
import { getAllClasses } from "services/classesService";
import { RootState } from "store/store";

const AddClass = () => {
   const dispatch = useDispatch();
   const { allClasses } = useSelector((state: RootState) => state);

   const getClasss = async () => {
      const data = await dispatch(getAllClasses());
      if (!data?.error?.message) {
      }
   };
   useEffect(() => {
      getClasss();
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
                  <h1 className="text-[2rem] font-bold text-[#2073fa]">Home</h1>
                  <div
                     className="flex cursor-pointer flex-row items-center gap-x-2 text-[#2073fa]"
                     data-testid="open-modal"
                     onClick={() => {
                        dispatch(openAddClassModal());
                     }}
                  >
                     <span className="font-lighter flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[#2073fa] text-[20px] text-[#2073fa]">
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
