import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import Modal from "@/components/Teachers/addClass/modal";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeAddClassModal, openAddClassModal } from "store/modalSlice";
import Classes from "@/components/Teachers/addClass/classes";
import { getAllClasses } from "services/classesService";
import { RootState } from "store/store";
import EmptyState from "@/components/Teachers/addClass/state/emptyState";

const AddClass = () => {
   const dispatch = useDispatch();
   const { classes, loading } = useSelector((state: RootState) => state.allClasses);

   const getClass = async () => {
      await dispatch(getAllClasses());
   };

   useEffect(() => {
      getClass();
      dispatch(closeAddClassModal());
   }, []);

   const hasNoClasses = !loading && classes?.length === 0;

   return (
      <main>
         <Head>
            <title>CodeAlgo Academy | Add Class</title>
         </Head>

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
                  {loading ? (
                     <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
                     </div>
                  ) : hasNoClasses ? (
                    <>
                    <EmptyState onClick={() => dispatch(openAddClassModal())} title={"No Classes Created Yet"}  
                    description={"Start by creating your first class to organize students and track their progress."}/>
                    </>
                  ) : (
                     <Classes />
                  )}
               </section>
            </div>
         </section>

         <Modal />
      </main>
   );
};

export default AddClass;