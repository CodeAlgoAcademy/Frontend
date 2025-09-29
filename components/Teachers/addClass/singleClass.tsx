import React, { FC, useState } from "react";
import Link from "next/link";
import { IClass } from "../../../types/interfaces";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateCurrentClass } from "store/currentClassSlice";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddStudentModal from "../students/AddStudentModal";
import { getAllClasses, deleteClass } from "services/classesService";
import DeleteConfirmationModal from "../UI/common/DeleteConfirmationModal";

const SingleClass: FC<IClass> = ({ id, className, grade, subject, color, totalStudent }) => {
   const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [isDeleting, setIsDeleting] = useState<boolean>(false);

   const handleDeleteClick = () => {
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      setIsDeleting(true);
      try {
         await dispatch(deleteClass(id));
         dispatch(getAllClasses());
         setIsDeleteModalOpen(false);
      } catch (error) {
         console.error("Failed to delete class:", error);
      } finally {
         setIsDeleting(false);
      }
   };

   const handleDeleteCancel = () => {
      setIsDeleteModalOpen(false);
   };

   return (
      <article
         className="col-span-1 flex min-h-[200px] w-full overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg"
         data-testid="single-class"
      >
         <aside className={`h-full flex-[0.15]`} style={{ backgroundColor: color }}></aside>
         <div className="h-full flex-[0.85] px-4 pb-4">
            <header className="border-b-2 py-4">
               <div className="flex items-center justify-between">
                  <h1 className="text-[25px] font-bold text-black md:text-[30px]">{className}</h1>
                  <button
                     onClick={handleDeleteClick}
                     className="rounded-md p-2 text-red-600 hover:bg-red-50"
                     title="Delete Class"
                  >
                     <RiDeleteBin6Line className="text-lg" />
                  </button>
               </div>
            </header>
            <main className="mt-4 flex flex-col justify-between">
               <h2 className="font-bold">Grade {grade}</h2>
               <h2 className="font-bold">{subject}</h2>
               <h2 className="font-bold">{totalStudent} Student(s)</h2>
            </main>
            <footer className="mt-[16px] flex justify-between pb-2">
               <div
                  className="flex cursor-pointer items-center gap-x-2 px-2 py-2 text-[16px] font-semibold hover:bg-gray-100"
                  onClick={() => {
                     setIsOpen(true);
                     dispatch(updateCurrentClass({ className, color, id }));
                  }}
               >
                  Add Students
                  <span className="text-[18px] font-bold">
                     <BiPlus />
                  </span>
               </div>
               <Link href="/teachers">
                  <div
                     className="flex w-fit cursor-pointer items-center justify-end gap-x-2"
                     onClick={() => {
                        dispatch(updateCurrentClass({ className, color, id }));
                     }}
                     data-testid="dashboard-button"
                  >
                     <p className="text-[16px] font-semibold">Dashboard</p>
                     <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-black text-[18px]">
                        <FaChevronRight />
                     </span>
                  </div>
               </Link>
            </footer>
         </div>
         {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
   
         <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            title="Delete Class"
            itemName={className}
            isLoading={isDeleting}
         />
      </article>
   );
};

export default SingleClass;