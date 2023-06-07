import { Dispatch, SetStateAction, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

type modalProps = {
   showModal: boolean;
   cancelPresence: (event: React.MouseEvent) => void;
   updateStudentsAddedForEachLesson: (value: any) => void;
   studentsAdded: any[];
   removeStudentAddedForEachLesson: (value: any) => void;
   addAllStudentsForEachLesson: (students: any[]) => void;
   removeAllStudentsAddedForEachLesson: () => void;
   setAboutToEditStudent: Dispatch<SetStateAction<boolean>>;
   editStudent: (data: any) => void;
};

// this is the modal that pops up when add Student is clicked

export default function AddStudent(props: modalProps) {
   const backdropVariant = {
      hidden: {
         opacity: 0,
      },
      visible: {
         opacity: 1,
      },
   };

   const modal = {
      hidden: {
         y: "-100vh",
         opacity: 0,
      },
      visible: {
         y: "20px",
         opacity: 1,
         transition: { delay: 0.5 },
      },
   };
   const { className, id } = useSelector((state: RootState) => state.currentClass);
   const students = useSelector((state: RootState) => state.students.students);
   const { lessonOpened } = useSelector((state: RootState) => state.allLessons);
   return (
      <AnimatePresence exitBeforeEnter>
         {props.showModal && (
            <div className="fixed top-0 left-0 z-[20] flex h-full w-full items-center justify-center bg-black bg-opacity-50">
               <div className=" mx-auto w-[90vw] max-w-[900px] rounded-[10px] bg-white px-12 pt-6 pb-10">
                  <div className="cursor-pointer" onClick={(event) => props.cancelPresence(event)}>
                     <GiCancel className="ml-auto text-[2rem]" />
                  </div>
                  <h1 className="px-4 text-3xl font-bold text-black">Add Student</h1>
                  <div>
                     <div className="mt-10 flex items-center justify-between border-b-2 px-4">
                        <p className="text-2xl font-bold">{className}</p>
                        <div className="flex items-center gap-[1rem]">
                           <input
                              type="checkbox"
                              id="select-all-students"
                              className="checkbox-container h-[20px] w-[20px] rounded-md border-2 border-black accent-[#2073fa]"
                              onChange={(e) => {
                                 if (e.target.checked) {
                                    props.addAllStudentsForEachLesson(students?.students);
                                 } else {
                                    props.removeAllStudentsAddedForEachLesson();
                                 }
                              }}
                           />
                           <label htmlFor="select-all-students" className="inline-block text-[1rem]">
                              Select All Student
                           </label>
                        </div>
                     </div>
                  </div>

                  <div className="small-scroll-thumb grid h-[250px] grid-cols-1 gap-y-8 overflow-y-auto scroll-smooth p-6 sm:grid-cols-2 sm:gap-x-4 sm:py-12 sm:px-8 md:grid-cols-3 md:gap-x-6 md:p-12">
                     {students?.students?.map(({ email, firstName, lastName, id }) => {
                        const checked = props.studentsAdded.find((student) => student.id == id);
                        return (
                           <div key={email} className="mx-2 flex items-center gap-4">
                              <label className="checkbox-container bottom-1">
                                 <input
                                    type="checkbox"
                                    name={email}
                                    checked={checked}
                                    className="accent-[#2073fa]"
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          props.updateStudentsAddedForEachLesson({
                                             email,
                                             firstName,
                                             lastName,
                                             id,
                                          });
                                       } else {
                                          props.removeStudentAddedForEachLesson({
                                             email,
                                             firstName,
                                             lastName,
                                             id,
                                          });
                                       }
                                    }}
                                 />
                                 <span className="checkmark small-checkmark"></span>
                              </label>
                              <p className="flex flex-col font-semibold">
                                 {firstName + lastName} <span>{email}</span>
                              </p>
                           </div>
                        );
                     })}
                  </div>

                  <div className="mt-[2rem] flex justify-end">
                     <button
                        className="rounded-full bg-[#2073fa]  px-8 py-4 font-bold text-white"
                        onClick={() => {
                           if (props.studentsAdded.length > 0) {
                              props.setAboutToEditStudent((prev) => !prev);
                              props.editStudent(lessonOpened);
                           }
                        }}
                     >
                        Add Student(s)
                     </button>
                  </div>
               </div>
            </div>
         )}
      </AnimatePresence>
   );
}
