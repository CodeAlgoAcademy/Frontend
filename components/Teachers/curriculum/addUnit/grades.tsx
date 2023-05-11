import React, { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from "./index";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { updateGrades } from "store/unitsSlice";

const Grade: FC<Props> = ({ openedModal, updateOpenedModal }) => {
   const dispatch = useDispatch();
   const { grades, chosenGrades } = useSelector((state: RootState) => state.unit.addUnit);
   return (
      <article className="relative flex flex-col gap-2 md:flex-row">
         <div
            className={`${styles.topic} ${openedModal === "grade" ? " outline-[#2073fa]" : "outline-transparent"}`}
            onClick={(event: any) => {
               if (!event.target.classList.contains("dropdown")) {
                  updateOpenedModal("grade");
               }
            }}
            data-testid="grade"
         >
            <h1>Grade(s)</h1>
            <i>
               <FaChevronDown />
            </i>
            {openedModal === "grade" && (
               <div className={`${styles.preview}`}>
                  {grades.length === 0 && <h1 className="font-lg p-2 text-center font-bold">Please select a level</h1>}
                  {grades.length > 0 &&
                     grades.map((grade: string, index: number) => {
                        return (
                           <div className={`${styles.inputContainer}`} key={index}>
                              <input
                                 type="checkbox"
                                 id={grade}
                                 className="dropdown accent-[#2073fa]"
                                 checked={chosenGrades.includes(grade)}
                                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    if (event.target.checked) {
                                       dispatch(updateGrades({ value: grade, type: "add" }));
                                    } else {
                                       dispatch(
                                          updateGrades({
                                             value: grade,
                                             type: "remove",
                                          })
                                       );
                                    }
                                 }}
                                 data-testid={`grade-${index}`}
                              />
                              <label htmlFor={grade} className="dropdown">
                                 {grade}
                              </label>
                           </div>
                        );
                     })}
               </div>
            )}
         </div>
         <div className={styles.numbersSelectedContainer}>
            {chosenGrades.length === 0
               ? `0 grades selected`
               : chosenGrades.map((grade: string, index: number) => {
                    return (
                       <span key={index} className={styles.selectedItems}>
                          {grade}
                       </span>
                    );
                 })}
         </div>
      </article>
   );
};

export default Grade;
