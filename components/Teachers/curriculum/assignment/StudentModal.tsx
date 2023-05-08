import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Button from "@/components/UI/Button";
import { Student, DynamicChechbox } from "types/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const StudentModal = ({
   students,
   hideModal,
   handleStudentCheckboxChange,
   handleAllStudentChechbox,
   allStudentCheckbox,
   studentCheckbox,
}: {
   students: Student[];
   hideModal: MouseEventHandler;
   handleStudentCheckboxChange: Function;
   handleAllStudentChechbox: ChangeEventHandler;
   allStudentCheckbox: { isChecked: boolean };
   studentCheckbox: DynamicChechbox;
}) => {
   const { className, color } = useSelector((state: RootState) => state.currentClass);
   return (
      <div className="h-[500px] min-w-[800px] py-12">
         <h3 className="pl-12 text-2xl font-semibold text-[#2073fa]">Student(s)</h3>
         <div className="flex items-center justify-between border-b px-12 py-4">
            <div className="flex items-center gap-4">
               <label className="checkbox-container bottom-1">
                  <input type="checkbox" name="allStudents" checked={allStudentCheckbox.isChecked} onChange={handleAllStudentChechbox} />
                  <span className="checkmark big-checkmark"></span>
               </label>
               <p className="font-semibold">{allStudentCheckbox.isChecked ? "Unselect all Students" : "Select all Students"}</p>
            </div>
            <div className="flex items-center gap-4 rounded-md border px-3 py-1">
               <span className="h-[25px] w-[25px] rounded-full" style={{ backgroundColor: color }}></span>
               <p className="text-[18px]">{className}</p>
            </div>
         </div>
         <div className="small-scroll-thumb grid h-[250px] grid-cols-3 gap-x-6 gap-y-8 overflow-y-auto scroll-smooth p-12">
            {students.map(({ email, firstName, lastName }) => (
               <div key={email} className="mx-2 flex items-center gap-4">
                  <label className="checkbox-container bottom-1">
                     <input
                        type="checkbox"
                        name={email}
                        checked={studentCheckbox[email]}
                        onChange={(e) => {
                           handleStudentCheckboxChange(e, {
                              email,
                              firstName,
                              lastName,
                           });
                        }}
                     />
                     <span className="checkmark small-checkmark"></span>
                  </label>
                  <p className="flex flex-col font-semibold">
                     {firstName + lastName} <span>{email}</span>
                  </p>
               </div>
            ))}
         </div>
         <div className="flex flex-row-reverse px-12 py-4">
            <span onClick={hideModal} className="">
               <Button color="#2073fa" text="Confirm" />
            </span>
         </div>
      </div>
   );
};

export default StudentModal;
