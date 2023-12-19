import React, { ChangeEvent, useEffect } from "react";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
   closeColorModal,
   openAddStudentsModal,
   toggleColorModal,
   openGradesModal,
   closeAddClassModal,
   toggleSelectOrg,
} from "../../../store/modalSlice";
import { colors } from "./colors";
import { RootState } from "../../../store/store";
import { IInputFields } from "../../../types/interfaces";
import { updateClassDetails, clearFields } from "../../../store/addClassSlice";
import styles from "../../../styles/styles";
import { addClass, getAllClasses } from "services/classesService";
import SelectOrganization from "./organizations";
import { getOrgIBelongTo } from "services/organizersService";
import { openErrorModal } from "store/fetchSlice";

const inputFields: IInputFields[] = [
   {
      type: "text",
      name: "className",
      placeholder: "Enter Class Name*",
   },
   {
      type: "text",
      name: "subject",
      placeholder: "Enter Subject*",
   },
   {
      type: "text",
      name: "roomNumber",
      placeholder: "Enter Room Number*",
   },
];

const CreateClass = () => {
   const dispatch = useDispatch();
   const { colorsModalOpen, selectOrganizationOpen } = useSelector((state: RootState) => state.modal);
   const classInfo = useSelector((state: RootState) => state.addClass.class);

   const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!classInfo?.grade) {
         return dispatch(openErrorModal({ errorText: ["Select Grade"] }));
      }
      const data = await dispatch(addClass());
      if (!data?.error?.message) {
         dispatch(clearFields());
         dispatch(closeAddClassModal());
         dispatch(getAllClasses());
      }
   };

   // fetch all organizations
   useEffect(() => {
      dispatch(getOrgIBelongTo());
   }, []);

   return (
      <form className="h-full flex-[0.9] p-8" onSubmit={handleSubmit}>
         <header className="mb-6 w-full">
            <h1 className="text-[20px] font-bold text-mainColor md:text-[30px]">Create New Class</h1>
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
                     value={classInfo[name as keyof typeof classInfo]}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(updateClassDetails({ key: name, value: e.target.value }));
                     }}
                     required={name === "coTeachers" ? false : true}
                     className={styles.input}
                  />
               );
            })}

            <div
               className={styles.select}
               onClick={() => {
                  dispatch(openGradesModal());
               }}
            >
               <p>{classInfo?.grade || "Select Grade"}</p>
               <span>
                  <FaChevronDown />
               </span>
            </div>

            <div className="relative">
               <div
                  className={styles.select}
                  onClick={() => {
                     dispatch(toggleSelectOrg());
                  }}
               >
                  <p>{classInfo?.organization || "Select Organization"}</p>
                  <span>
                     <FaChevronDown />
                  </span>
               </div>
               <SelectOrganization />
            </div>
            <div className="relative ml-auto h-[50px] w-[150px] rounded-full border-2">
               <div
                  className="flex h-full w-full flex-row items-center justify-between p-2"
                  onClick={() => {
                     dispatch(toggleColorModal());
                  }}
                  data-testid="color-modal-controller"
               >
                  <span className={`h-[38px] w-[38px] rounded-full`} style={{ backgroundColor: classInfo?.color }}></span>
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
            <button type="submit" className="w-[150px] rounded-[30px] bg-mainColor py-3 text-[16px] text-white hover:shadow-md">
               Create
            </button>
         </section>
      </form>
   );
};

export default CreateClass;
