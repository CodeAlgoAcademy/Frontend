import React, { useEffect, useState } from 'react';
import { BiMinusCircle, BiPlus } from 'react-icons/bi';

export default function ParentSignUp3() {
  const [students, setStudents] = useState<{ name: string; index: number }[]>([
    {
      name: '',
      index: 0,
    },
  ]);

  const addStudentsInput = () => {
    setStudents([...students, { name: '', index: students[students.length - 1].index + 1 }]);
  };

  const removeInput = (index: number) => {
    setStudents(students.filter((student) => student.index !== index));
  };

  const updateInputValue = (index: number, value: string) => {
    setStudents((prev) => {
      return prev.map((state) => {
        if (state.index === index) {
          state.name = value;
        }
        return state;
      });
    });
  };

  useEffect(() => {
    if (students.length === 0) {
      setStudents([{ name: '', index: 0 }]);
    }
  }, [students]);

  return (
    <div key={3}>
      <h1 className="font-bold text-[32px]">Add your student account(s)</h1>
      <div className="flex flex-col gap-y-4 mb-6">
        {students.map((student) => {
          return (
            <div>
              <label className="block text-xl font-semibold mt-6">Students Name</label>
              <div className="w-full relative">
                <input
                  type="text"
                  className="block student-input w-full cursor-pointer rounded-xl px-4 py-2 focus:outline-0 mt-3 "
                  value={student.name}
                  onChange={(e) => {
                    updateInputValue(student.index, e.target.value);
                  }}
                  autoFocus
                  required
                />
                <span
                  className="text-[27px] hidden text-[royalblue] cursor-pointer font-bold absolute top-[50%] right-[20px] -translate-y-[50%]"
                  onClick={() => {
                    removeInput(student.index);
                  }}
                >
                  <BiMinusCircle />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          addStudentsInput();
        }}
        className="bg-[#ececec86] text-center w-full rounded-xl p-3 flex justify-center items-center gap-x-2"
      >
        <span className="text-[17px]">
          <BiPlus />
        </span>
        Add another student
      </button>
    </div>
  );
}
