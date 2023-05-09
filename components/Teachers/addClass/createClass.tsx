import React, { ChangeEvent } from "react";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeColorModal, openAddStudentsModal, toggleColorModal, openGradesModal, closeAddClassModal } from "../../../store/modalSlice";
import { colors } from "./colors";
import { RootState } from "../../../store/store";
import { IInputFields } from "../../../types/interfaces";
import { updateClassDetails, clearFields } from "../../../store/addClassSlice";
import styles from "../../../styles/styles";
import { addClass, getAllClasses } from "services/classesService";

const CreateClass = () => {
   const dispatch = useDispatch();
   const { colorsModalOpen } = useSelector((state: RootState) => state.modal);
   const { className, subject, roomNumber, coTeachers, grade, color } = useSelector((state: RootState) => state.addClass.class);

   const inputFields: IInputFields[] = [
      {
         type: "text",
         name: "className",
         placeholder: "Enter Class Name*",
         value: className,
      },
      {
         type: "text",
         name: "subject",
         placeholder: "Enter Subject*",
         value: subject,
      },
      {
         type: "text",
         name: "roomNumber",
         placeholder: "Enter Room Number*",
         value: roomNumber,
      },
      {
         type: "text",
         name: "coTeachers",
         placeholder: "Add co-teachers",
         value: coTeachers,
      },
   ];

   const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = await dispatch(addClass());
      if (!data?.error?.message) {
         dispatch(clearFields());
         dispatch(closeAddClassModal());
         dispatch(getAllClasses());
      }
   };

   return (
      <form className="h-full flex-[0.9] p-8" onSubmit={handleSubmit}>
         <header className="mb-6 w-full">
            <h1 className="text-[20px] font-bold text-[#2073fa] md:text-[30px]">Create New Class</h1>
         </header>
         <section className="grid items-start gap-[1rem] md:grid-cols-2">
            {inputFields?.map((inputField: IInputFields, index: number) => {
               const { type, name, placeholder, value } = inputField;

               return (
                  <input
                     key={index}
                     name={name}
                     type={type}
                     placeholder={placeholder}
                     value={value}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(updateClassDetails({ key: name, value: e.target.value }));
                     }}
                     required={name === "coTeachers" ? false : true}
                     className={styles.input}
                  />
               );
            })}
            <div
               className="flex w-full cursor-pointer items-center justify-between rounded-md border-2 border-gray-400 px-4 py-3 text-[16px] font-bold text-black outline-none placeholder:text-black focus:border-[#2073fa]"
               onClick={() => {
                  dispatch(openGradesModal());
               }}
            >
               <p>{grade}</p>
               <span>
                  <FaChevronDown />
               </span>
            </div>
            <div className="relative ml-auto h-[50px] w-[150px] rounded-full border-2">
               <div
                  className="flex h-full w-full flex-row items-center justify-between p-2"
                  onClick={() => {
                     dispatch(toggleColorModal());
                  }}
                  data-testid="color-modal-controller"
               >
                  <span className={`h-[38px] w-[38px] rounded-full`} style={{ backgroundColor: color }}></span>
                  <i className="pr-1">
                     <FaChevronDown />
                  </i>
               </div>
               {/* colors selector */}
               {colorsModalOpen && (
                  <div className="color-modal absolute bottom-[100%] left-[50%] z-[10] flex min-h-[120px] w-full -translate-x-[50%] flex-row flex-wrap gap-4 rounded-md bg-white p-2 shadow-md">
                     {colors?.map((color: string, index: number) => {
                        return (
                           <span
                              key={index}
                              data-testid={"color-modal-" + index}
                              className={`mx-auto h-[38px] w-[38px] rounded-full`}
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                 dispatch(updateClassDetails({ key: "color", value: color }));
                                 dispatch(closeColorModal());
                              }}
                           ></span>
                        );
                     })}
                  </div>
               )}
            </div>
         </section>
         <section className="mt-6 flex w-full flex-col items-end justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0">
            <div
               className="flex cursor-pointer flex-row items-center gap-x-2"
               onClick={() => {
                  dispatch(openAddStudentsModal());
               }}
            >
               <span className="font-lighter flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-black text-[20px] text-black">
                  <FaPlus />
               </span>
               <h3 className="text-[16px] font-bold">Add New Student</h3>
            </div>
            <button type="submit" className="w-[150px] rounded-[30px] bg-[#2073fa] py-3 text-[16px] text-white hover:shadow-md">
               Create
            </button>
         </section>
      </form>
   );
};

export default CreateClass;
