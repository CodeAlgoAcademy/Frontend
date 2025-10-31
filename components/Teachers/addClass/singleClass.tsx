import React, { FC, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IClass } from "../../../types/interfaces";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateCurrentClass } from "store/currentClassSlice";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBin6Line, RiMore2Fill, RiEditLine } from "react-icons/ri";
import AddStudentModal from "../students/AddStudentModal";
import { getAllClasses, deleteClass } from "services/classesService";
import DeleteConfirmationModal from "../UI/common/DeleteConfirmationModal";
import { openEditClassModal } from "../../../store/modalSlice";
import { populateClassForEdit } from "../../../store/addClassSlice";

const SingleClass: FC<IClass> = ({ 
  id, 
  className, 
  grade, 
  subject, 
  color, 
  totalStudent,
  organization,
  roomNumber,
  teacher
}) => {
   const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [isDeleting, setIsDeleting] = useState<boolean>(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const isOrganizationClass = organization !== null;

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleDeleteClick = () => {
      setIsDeleteModalOpen(true);
      setIsDropdownOpen(false);
   };

   const handleEditClick = () => {
      dispatch(populateClassForEdit({
         className,
         grade,
         subject,
         color,
         roomNumber,
         organization: organization?.id || organization?.name || "",
         coTeachers: "",
      }));
      
      dispatch(openEditClassModal(id));
      setIsDropdownOpen(false);
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

   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   return (
      <article
         className="col-span-1 flex min-h-[200px] w-full overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg relative"
         data-testid="single-class"
      >
         <aside className={`h-full flex-[0.15]`} style={{ backgroundColor: color }}></aside>
         <div className="h-full flex-[0.85] px-4 pb-4">
            <header className="border-b-2 py-4">
               <div className="flex items-center justify-between">
                  <div>
                     <h1 className="text-[25px] font-bold text-black md:text-[30px]">{className}</h1>
                     <div className="flex">
                     {isOrganizationClass ? (
                        <p className="text-sm text-gray-600 mt-1">
                          Org Name: {organization?.name} • Room {roomNumber}
                        </p>
                     ) : (
                        <p className="text-sm text-gray-600 mt-1">
                           Private Class • Room {roomNumber}
                        </p>
                     )}
                     </div>
                  </div>
                  
                  <div className="relative" ref={dropdownRef}>
                     <button
                        onClick={toggleDropdown}
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        title="More options"
                     >
                        <RiMore2Fill className="text-lg" />
                     </button>

                     {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                           <div className="py-1">
                              <button
                                 onClick={handleEditClick}
                                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                              >
                                 <RiEditLine className="mr-2 text-gray-500" />
                                 Edit Class
                              </button>
                              <button
                                 onClick={handleDeleteClick}
                                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                              >
                                 <RiDeleteBin6Line className="mr-2" />
                                 Delete Class
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </header>
            <main className="mt-4 flex flex-col justify-between space-y-2">
               <h2 className="font-bold">Grade {grade}</h2>
               <h2 className="font-bold">{subject}</h2>
               <h2 className="font-bold">{totalStudent} Student(s)</h2>
            </main>
            <footer className="mt-[16px] flex justify-between pb-2">
               <div
                  className="flex cursor-pointer items-center gap-x-2 px-2 py-2 text-[16px] font-semibold hover:bg-gray-100"
                  onClick={() => {
                     setIsOpen(true);
                     dispatch(updateCurrentClass({ 
                        className, 
                        color, 
                        id,
                        isOrganizationClass,
                        organization: organization 
                     }));
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
                        dispatch(updateCurrentClass({ 
                           className, 
                           color, 
                           id,
                           isOrganizationClass,
                           organization: organization 
                        }));
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
            warningMessage={
               isOrganizationClass 
                  ? "This is an organization class. You may need special permissions to delete it."
                  : undefined
            }
         />
      </article>
   );
};

export default SingleClass;