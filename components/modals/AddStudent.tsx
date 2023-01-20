import { Dispatch, SetStateAction, useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

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
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '20px',
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };
  const { className, id } = useSelector((state: RootState) => state.currentClass);
  const { students } = useSelector((state: RootState) => state.students.students);
  const { lessonOpened } = useSelector((state: RootState) => state.allLessons);
  return (
    <AnimatePresence exitBeforeEnter>
      {props.showModal && (
        <div className="bg-black z-[20] bg-opacity-50 top-0 fixed w-full h-full flex justify-center items-center">
          <div className=" bg-white w-[90vw] max-w-[900px] mx-auto px-12 pt-6 pb-10 rounded-[10px]">
            <div className="cursor-pointer" onClick={(event) => props.cancelPresence(event)}>
              <GiCancel className="text-[2rem] ml-auto" />
            </div>
            <h1 className="text-3xl font-bold text-black px-4">Add Student</h1>
            <div>
              <div className="flex items-center justify-between border-b-2 mt-10 px-4">
                <p className="text-2xl font-bold">{className}</p>
                <div className="flex gap-[1rem] items-center">
                  <input
                    type="checkbox"
                    className="w-[20px] rounded-md h-[20px] border-black border-2 checkbox-container accent-mainPurple"
                    onChange={(e) => {
                      if (e.target.checked) {
                        props.addAllStudentsForEachLesson(students);
                      } else {
                        props.removeAllStudentsAddedForEachLesson();
                      }
                    }}
                  />
                  <p className="text-[1rem]">Select All Student</p>
                </div>
              </div>
            </div>

            <div className="p-12 h-[250px] grid grid-cols-3 scroll-smooth overflow-y-auto gap-x-6 gap-y-8 small-scroll-thumb">
              {students.map(({ email, firstName, lastName, id }) => {
                const checked = props.studentsAdded.find((student) => student.id == id);
                return (
                  <div key={email} className="flex items-center gap-4 mx-2">
                    <label className="checkbox-container bottom-1">
                      <input
                        type="checkbox"
                        name={email}
                        checked={checked}
                        className="accent-mainPurple"
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
                    <p className="font-semibold flex flex-col">
                      {firstName + lastName} <span>{email}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-[2rem] flex justify-end">
              <button
                className="px-8 py-4  text-white rounded-full font-bold bg-[#412281]"
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
