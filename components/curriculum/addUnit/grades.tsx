import React, { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from ".";
import { FaPlus } from "react-icons/fa";
import { updateGrades } from "store/unitsSlice";

const Grade: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { grades, chosenGrades } = useSelector(
    (state: RootState) => state.unit.addUnit
  );
  return (
    <article className="flex flex-row gap-x-2 relative">
      {openedModal === "grade" && (
        <div
          className={`${styles.preview} -bottom-[10%] left-[30%] max-h-[300px]`}
        >
          {grades.map((grade, index: number) => {
            return (
              <div className={`${styles.inputContainer}`} key={index}>
                <input
                  type="checkbox"
                  id={grade}
                  className="accent-mainPurple"
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
                />
                <label htmlFor={grade}>{grade}</label>
              </div>
            );
          })}
        </div>
      )}
      <div
        className={styles.topic}
        onClick={() => {
          updateOpenedModal("grade");
        }}
      >
        <h1>Grade(s)</h1>
        <i>
          <FaPlus />
        </i>
      </div>
      <div className={styles.numbersSelectedContainer}>
        {chosenGrades.length} grades selected
      </div>
    </article>
  );
};

export default Grade;
