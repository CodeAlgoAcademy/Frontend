import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useAppDispatch } from "store/hooks";
import { ISingleStudent } from "types/interfaces";
import { useSelector } from "react-redux";
import { deleteStudent } from "store/teacherStudentSlice";
import {getStudents,} from "store/studentSlice";
import DeleteConfirmationModal from "./DeleteConfirmationModal";


interface ActionMenuProps {
   student: ISingleStudent;
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
   setStudentCommentsTabOpen: (value: string) => void;
}

const ActionMenu = ({ student, isOpen, setIsOpen, setStudentCommentsTabOpen }: ActionMenuProps) => {
   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
   const dispatch = useAppDispatch();
   const classId = useSelector((state: any) => state.currentClass.id);

   return (
      <div className="relative">
         <span onClick={() => setIsOpen(!isOpen)}>
            <HiOutlineDotsHorizontal className="cursor-pointer" />
         </span>

         {isOpen && (
            <div className="absolute top-full right-0 z-50 w-40 rounded-md border bg-white shadow-lg">
               <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                     setIsOpen(false);
                     setConfirmDeleteOpen(true);
                  }}
               >
                  Delete student
               </button>

               <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                     setIsOpen(false);
                     setStudentCommentsTabOpen(student.firstName + student.email);
                  }}
               >
                  View Comments
               </button>
            </div>
         )}

         {confirmDeleteOpen && (
            <DeleteConfirmationModal
               student={student}
               onCancel={() => setConfirmDeleteOpen(false)}
               onConfirm={async () => {
                  await dispatch(deleteStudent({ classId, studentId: student?.id }));
                  await dispatch(getStudents());
                  setConfirmDeleteOpen(false);
               }}
            />
         )}
      </div>
   );
};

export default ActionMenu;
