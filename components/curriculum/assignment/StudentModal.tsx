import React, { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri"
import { Button } from "../../../components"
import { AssignmentStudent, DynamicChechbox } from "../../../types/interfaces"

const StudentModal = ({ students, hideModal, handleStudentCheckboxChange, handleAllStudentChechbox, allStudentCheckbox, studentCheckbox }: { students: AssignmentStudent[]; hideModal: MouseEventHandler; handleStudentCheckboxChange: ChangeEventHandler; handleAllStudentChechbox: ChangeEventHandler; allStudentCheckbox: { isChecked: boolean }; studentCheckbox: DynamicChechbox }) => {
   return (
      <div className="py-12 h-[500px] min-w-[800px]">
         <h3 className="text-2xl font-semibold pl-12">Student(s)</h3>
         <div className="flex items-center justify-between px-12 py-4 border-b">
            <div className="flex items-center gap-4">
               <label className="checkbox-container bottom-1">
                  <input type="checkbox" name="allStudents" checked={ allStudentCheckbox.isChecked } onChange={ handleAllStudentChechbox } />
                  <span className="checkmark big-checkmark"></span>
               </label>
               <p className="font-semibold">
                  { allStudentCheckbox.isChecked ? "Unselect all Students" : "Select all Students" }
               </p>
            </div>
            <div className="rounded-md px-3 gap-6 flex items-center border py-1">
               <span className="opacity-70 font-semibold">Class</span>
               <span className="opacity-60 text-3xl cursor-pointer">
                  <RiArrowDropDownLine />
               </span>
            </div>
         </div>
         <div className="p-12 h-[250px] grid grid-cols-4 scroll-smooth overflow-y-auto gap-x-6 gap-y-8 small-scroll-thumb">
            { students.map(({ studentId }) => (<div key={ studentId } className="flex items-center gap-4">
               <label className="checkbox-container bottom-1">
                  <input type="checkbox" name={ studentId } checked={ studentCheckbox[studentId] } onChange={ handleStudentCheckboxChange } />
                  <span className="checkmark small-checkmark"></span>
               </label>
               <p className="font-semibold">Students { studentId }</p>
            </div>)) }
         </div>
         <div className="px-12 py-4 flex flex-row-reverse">
            <span onClick={ hideModal } className="">
               <Button color="#F28E2C" text="Confirm" />
            </span>
         </div>
      </div>
   )
}

export default StudentModal