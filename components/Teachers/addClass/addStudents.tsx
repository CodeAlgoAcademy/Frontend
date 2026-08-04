import React, { ChangeEvent, useState } from "react";
import { FaChevronLeft, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFile, updateClassDetails } from "../../../store/addClassSlice";
import { closeAddStudentsModal } from "../../../store/modalSlice";
import { RootState } from "../../../store/store";
import styles from "../../../styles/styles";
import { IInputFields } from "../../../types/interfaces";
import { generateUsername } from "utils/generateUsername";
import BulkImportModal from "./bulkImportModal";
import { openErrorModal } from "store/fetchSlice";
import { useTranslation } from "react-i18next";

const AddStudents = () => {
   const { t } = useTranslation("teacher");
   const dispatch = useDispatch();
   const { firstName, lastName, email, username, dob } = useSelector((state: RootState) => state.addClass.student);

   const [file, setFile] = useState<any>(null);
   const [bulkImportModalOpen, setBulkImportModalOpen] = useState<boolean>(false);

   const inputFields: IInputFields[] = [
      {
         type: "text",
         name: "firstName",
         placeholder: t("enterStudentFirstName"),
         value: firstName,
         required: true,
      },
      {
         type: "text",
         name: "lastName",
         placeholder: t("enterStudentLastNameInitial"),
         value: lastName,
         required: true,
      },
      {
         type: "email",
         name: "email",
         placeholder: t("enterStudentEmailPlaceholder"),
         value: email,
         required: false,
      },
      {
         type: "text",
         name: "username",
         placeholder: t("enterUsernamePlaceholder"),
         value: username,
         required: true,
      },
      {
         type: "date",
         name: "dob",
         placeholder: t("enterDob"),
         value: dob,
         required: true,
      },
   ];
   const handleFileInputChange = (e: any) => {
      if (!e.target.files[0].type.includes("csv")) {
            dispatch(openErrorModal({ errorText: [t("csvFileError")] }));
      } else {
         setFile(e.target.files[0]);
      }
   };
   const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      file && dispatch(addFile(file));
      dispatch(closeAddStudentsModal());
   };

   return (
      <form className="h-full flex-[0.9] py-8" onSubmit={handleSubmit}>
         {bulkImportModalOpen && <BulkImportModal setBulkImportModalOpen={setBulkImportModalOpen} />}
         <header className="mb-6 flex w-full items-center gap-x-2 px-8">
            <span
               className="text-[20px] font-bold"
               onClick={() => {
                  dispatch(closeAddStudentsModal());
               }}
            >
               <FaChevronLeft />
            </span>
             <h1 className="text-[20px] font-bold md:text-[30px]">{t("addNewStudentTitle")}</h1>
         </header>
         <section className="grid gap-[1rem] px-8 md:grid-cols-2">
            {inputFields?.map((inputField: IInputFields, index: number) => {
               const { name, type, placeholder, value, required } = inputField;
               return (
                  <input
                     key={index}
                     type={type}
                     name={name}
                     placeholder={placeholder}
                     value={value}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(
                           updateClassDetails({
                              typeofState: "student",
                              key: name,
                              value: e.target.value,
                           })
                        );
                     }}
                     // required={required}
                     className={styles.input}
                  />
               );
            })}
            <button
               type="button"
               className=" bg-mainColor rounded-md px-2 py-3 text-white shadow-md active:scale-[0.91]"
               onClick={() => {
                  if (firstName || lastName) {
                     const randomName = generateUsername(firstName, lastName);
                     dispatch(
                        updateClassDetails({
                           typeofState: "student",
                           key: "username",
                           value: randomName,
                        })
                     );
                  }
               }}
            >
                {t("generateUsername")}
             </button>
         </section>
         <section className="mt-8 border-t-2 px-8 pt-4">
            <button
               type="button"
               className="max-w-fit p-3 hover:bg-gray-100"
               onClick={() => {
                  setBulkImportModalOpen(true);
               }}
            >
                {t("viewBulkImport")}
             </button>
         </section>
         <section className="mt-4 flex w-full flex-col items-end justify-between gap-y-4 px-8 md:flex-row md:items-center md:gap-y-0">
            <div>
               <input
                  type="file"
                  id="studentsUpload"
                  className="hidden"
                  onChange={(e) => {
                     handleFileInputChange(e);
                  }}
               />
               <label htmlFor="studentsUpload" className="flex w-full cursor-pointer flex-row items-center gap-x-2">
                  <span className="font-lighter flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-black text-[20px] text-black">
                     <FaPlus />
                  </span>
                   <h3 className="text-[16px] font-bold">{file ? t("fileAddedClassUpload") : t("bulkImport")}</h3>
               </label>
            </div>
             <button className="bg-mainColor min-w-[150px] rounded-[30px] py-3 px-4 text-[16px] text-white hover:shadow-md">{t("addStudentBtn")}</button>
         </section>
         {file && (
            <div className="mt-2 w-full px-8">
               <div
                  className="flex w-full max-w-fit cursor-pointer items-center gap-x-2 py-3 px-3 hover:bg-red-50"
                  onClick={() => {
                     setFile(null);
                  }}
               >
                  <span className="cursor-pointer text-[22px] text-red-600">
                     <FaTimes />
                  </span>
                   <p>{t("deleteUploadedFile")}</p>
               </div>
            </div>
         )}
      </form>
   );
};

export default AddStudents;
