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

const availableGrades: Array<string> = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8+",
];

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
    <section className={`${styles.modalOverlay} bg-[rgba(0,0,0,.25)]`}>
      <div className="w-[90vw] max-w-[350px] mx-auto bg-white rounded-md py-6 px-4">
        <h2 className="text-lg text-center font-bold mb-2">
          Which grade are you in?
        </h2>

        <div className="grid grid-cols-4 gap-3 mt-4">
          {availableGrades.map(
            (availableGrade: string, index: number): ReactElement => {
              // if a grade is selected, give it a border-color and text-color of mainPurple
              return (
                <article
                  className={`w-full p-4 text-center border-2 cursor-pointer rounded-md font-bold ${
                    availableGrade === chosenGrade
                      ? "border-orange-600 text-orange-600"
                      : "border-gray-700 text-black"
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
                      dispatch(
                        updateUser({ key: "grade", value: availableGrade })
                      );
                    }
                    setChosenGrade(availableGrade);
                    dispatch(closeGradesModal());
                  }}
                >
                  {availableGrade}
                </article>
              );
            }
          )}
        </div>

        {/* buttons container */}
        <div className="mt-3">
          <button
            className="w-full text-center px-4 py-[10px] rounded-md text-white font-bold bg-orange-600"
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
