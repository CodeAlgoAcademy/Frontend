import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ISingleStudent } from "types/interfaces";
import ActionMenu from "./ActionMenu";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface StudentHeaderProps {
   student: ISingleStudent;
   headings: number[];
   handleStudents: (id: number) => void;
   setEditStudentModalOpened: (value: string) => void;
   setStudentCommentOpen: (value: string) => void;
   setStudentCommentsTabOpen: (value: string) => void;
   studentCommentOpen: string;
   studentCommentsTabOpen: string;
}

const StudentHeader = ({
   student,
   headings,
   handleStudents,
   setEditStudentModalOpened,
   setStudentCommentOpen,
   setStudentCommentsTabOpen,
   studentCommentOpen,
   studentCommentsTabOpen,
}: StudentHeaderProps) => {
   const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
   const { id: classId } = useSelector((state: RootState) => state.currentClass);
   const lastInitial = student.lastName ? `${student.lastName[0]}.` : "";

   return (
      <div className="relative flex items-center justify-between overflow-x-scroll border-b py-6 px-2 sm:px-6">
         <div className="flex items-center">
            <div
               className="min-w-28 sm:min-w-40 flex cursor-pointer items-center justify-between space-x-3 border-r px-2"
               onClick={() => handleStudents(parseInt(student.id as string))}
            >
               <div className="flex w-[128px] flex-col gap-y-2 overflow-hidden text-ellipsis">
                  <Link href={`/teachers/students/${classId}/${student.id}`}>
                     <p className="w-full max-w-fit truncate text-sm font-medium hover:underline">{`${student.firstName} ${lastInitial}`}</p>
                  </Link>
               </div>
               <span className="text-[17px]" data-testid="chevron">
                  {headings.includes(parseInt(student.id as string)) ? <IoIosArrowUp /> : <IoIosArrowDown />}
               </span>
            </div>
         </div>

         <span className="ml-4 flex-1 cursor-pointer underline" onClick={() => setEditStudentModalOpened(student.id as string)}>
            <span className="hidden md:block">Edit student's details</span>
            <span className="block md:hidden">Edit</span>
         </span>

         <div className="flex space-x-5 text-[20px] text-slate-500">
            <span
  onClick={(e) => {
    setStudentCommentsTabOpen("");
    if (studentCommentOpen === student.firstName + student.email) {
      setStudentCommentOpen("");
    } else {
      setStudentCommentOpen(student.firstName + student.email);
      // You could pass position data here if needed
    }
  }}
>
  <IoChatbubblesOutline className="cursor-pointer" />
</span>

            <ActionMenu
               student={student}
               isOpen={isActionMenuOpen}
               setIsOpen={setIsActionMenuOpen}
               setStudentCommentsTabOpen={setStudentCommentsTabOpen}
            />
         </div>
      </div>
   );
};

export default StudentHeader;
