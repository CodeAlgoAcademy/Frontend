import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { changeCurrentStudent } from "store/teacherStudentSlice";

interface Props {
   close(): void;
   open(): void;
   isOpen: boolean;
}

export default function TeacherStudentsList({ close, open, isOpen }: Props) {
   const teacherStudents = useSelector((state: RootState) => state.teacherStudentSlice);
   const dispatch = useDispatch();
   console.log(teacherStudents, "this is student");

   if (!teacherStudents?.students || teacherStudents?.students?.length === 0) {
      return <></>;
   }

   return (
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
         <div className="relative">
            {/* header */}
            <header className="flex cursor-pointer items-center gap-2" onClick={() => (isOpen ? close() : open())}>
               <h2 className="text-lg font-medium text-mainColor">{teacherStudents?.currentStudent?.firstName || "Select Student"}</h2>
               <BsChevronDown size={24} color="#2073fa" />
            </header>

            {/* dropdown */}
            {isOpen && (
               <div className="absolute top-[100%] left-0 z-[4] max-h-[200px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-md bg-white shadow-md">
                  {teacherStudents.students.map((student) => (
                     <p
                        key={student.student_id}
                        onClick={() => {
                           dispatch(changeCurrentStudent(student));
                           close();
                        }}
                        className="w-full cursor-pointer px-3 py-3 capitalize text-black hover:bg-[#ced4e9]"
                     >
                        {student.firstName}
                     </p>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}
