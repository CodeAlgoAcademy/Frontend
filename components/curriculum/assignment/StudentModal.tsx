import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button } from "../../../components";
import { Student, DynamicChechbox } from "types/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const StudentModal = ({
  students,
  hideModal,
  handleStudentCheckboxChange,
  handleAllStudentChechbox,
  allStudentCheckbox,
  studentCheckbox,
}: {
  students: Student[];
  hideModal: MouseEventHandler;
  handleStudentCheckboxChange: Function;
  handleAllStudentChechbox: ChangeEventHandler;
  allStudentCheckbox: { isChecked: boolean };
  studentCheckbox: DynamicChechbox;
}) => {
  const { className, color } = useSelector(
    (state: RootState) => state.currentClass
  );
  return (
    <div className="py-12 h-[500px] min-w-[800px]">
      <h3 className="text-2xl font-semibold pl-12">Student(s)</h3>
      <div className="flex items-center justify-between px-12 py-4 border-b">
        <div className="flex items-center gap-4">
          <label className="checkbox-container bottom-1">
            <input
              type="checkbox"
              name="allStudents"
              checked={allStudentCheckbox.isChecked}
              onChange={handleAllStudentChechbox}
            />
            <span className="checkmark big-checkmark"></span>
          </label>
          <p className="font-semibold">
            {allStudentCheckbox.isChecked
              ? "Unselect all Students"
              : "Select all Students"}
          </p>
        </div>
        <div className="rounded-md px-3 gap-4 flex items-center border py-1">
          <span
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          ></span>
          <p className="text-[18px]">{className}</p>
        </div>
      </div>
      <div className="p-12 h-[250px] grid grid-cols-3 scroll-smooth overflow-y-auto gap-x-6 gap-y-8 small-scroll-thumb">
        {students.map(({ email, firstName, lastName }) => (
          <div key={email} className="flex items-center gap-4 mx-2">
            <label className="checkbox-container bottom-1">
              <input
                type="checkbox"
                name={email}
                checked={studentCheckbox[email]}
                onChange={(e) => {
                  handleStudentCheckboxChange(e, {
                    email,
                    firstName,
                    lastName,
                  });
                }}
              />
              <span className="checkmark small-checkmark"></span>
            </label>
            <p className="font-semibold flex flex-col">
              {firstName + lastName} <span>{email}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="px-12 py-4 flex flex-row-reverse">
        <span onClick={hideModal} className="">
          <Button color="#F28E2C" text="Confirm" />
        </span>
      </div>
    </div>
  );
};

export default StudentModal;
