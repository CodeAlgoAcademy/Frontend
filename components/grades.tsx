import React, { ReactElement, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateClassDetails } from "../store/addClassSlice";
import { updateUser } from "../store/authSlice";
import { closeGradesModal } from "../store/modalSlice";
import { RootState } from "../store/store";
import styles from "../styles/styles";

type gradesType = {
   addStudents?: boolean;
};

const availableGrades: Array<string> = ["K", "1", "2", "3", "4", "5", "6", "7", "8+"];

const Grades: FC<gradesType> = ({ addStudents }) => {
   const [chosenGrade, setChosenGrade] = useState<string>("");
   const { gradesModalOpen } = useSelector((state: RootState) => state.modal);
   const { grade } = useSelector((state: RootState) => {
      if (addStudents) {
         return state.user.auth;
      } else {
         return state.addClass.class;
      }
   });

   const dispatch = useDispatch();
   if (!gradesModalOpen) {
      return <></>;
   }
   return (
      <section className={`fixed top-0 left-0 z-[999] flex min-h-screen w-[100vw] items-center justify-center bg-[rgba(0,0,0,.25)]`}>
         <div className="mx-auto w-[90vw] max-w-[350px] rounded-md bg-white py-6 px-4">
            <h2 className="mb-2 text-center text-lg font-bold">Which grade are you in?</h2>

            <div className="mt-4 grid grid-cols-4 gap-3">
               {availableGrades.map((availableGrade: string, index: number): ReactElement => {
                  return (
                     <article
                        className={`w-full cursor-pointer rounded-md border-2 p-4 text-center font-bold ${
                           availableGrade === chosenGrade ? "border-[#2073fa] text-[#2073fa]" : "border-gray-700 text-black"
                        }`}
                        key={index}
                        onClick={() => {
                           if (addStudents) {
                              dispatch(
                                 updateClassDetails({
                                    key: "grade",
                                    value: availableGrade,
                                 })
                              );
                           } else {
                              dispatch(updateUser({ key: "grade", value: availableGrade }));
                           }
                           setChosenGrade(availableGrade);
                           dispatch(closeGradesModal());
                        }}
                     >
                        {availableGrade}
                     </article>
                  );
               })}
            </div>

            {/* buttons container */}
            <div className="mt-3">
               <button
                  className="w-full rounded-md bg-[#2073fa] px-4 py-[10px] text-center font-bold text-white"
                  onClick={() => {
                     dispatch(closeGradesModal());
                  }}
               >
                  Back
               </button>
            </div>
         </div>
      </section>
   );
};

export default Grades;
