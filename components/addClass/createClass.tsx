import React, { ChangeEvent } from "react";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeColorModal,
  openAddStudentsModal,
  toggleColorModal,
  openGradesModal,
  closeAddClassModal,
} from "../../store/modalSlice";
import { colors } from "./colors";
import { RootState } from "../../store/store";
import { IInputFields } from "../../types/interfaces";
import { updateClassDetails } from "../../store/addClassSlice";
import styles from "../../styles/styles";

const CreateClass = () => {
  const dispatch = useDispatch();
  const { colorsModalOpen } = useSelector((state: RootState) => state.modal);
  const { className, subject, roomNumber, coTeachers, grade, color } =
    useSelector((state: RootState) => state.addClass.class);

  const inputFields: IInputFields[] = [
    {
      type: "text",
      name: "className",
      placeholder: "Enter Class Name*",
      value: className,
    },
    {
      type: "text",
      name: "subject",
      placeholder: "Enter Subject*",
      value: subject,
    },
    {
      type: "number",
      name: "roomNumber",
      placeholder: "Enter Room Number*",
      value: roomNumber,
    },
    {
      type: "text",
      name: "coTeachers",
      placeholder: "Add co-teachers*",
      value: coTeachers,
    },
  ];
  return (
    <form className="p-8 flex-[0.9]">
      <header className="w-full mb-6">
        <h1 className="md:text-[30px] text-[20px] font-bold">
          Create New Class
        </h1>
      </header>
      <section className="grid md:grid-cols-2 gap-[1rem] items-start">
        {inputFields.map((inputField: IInputFields, index: number) => {
          const { type, name, placeholder, value } = inputField;

          return (
            <input
              key={index}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateClassDetails({ key: name, value: e.target.value })
                );
              }}
              required={name === "coTeachers" ? false : true}
              className={styles.input}
            />
          );
        })}
        <div
          className="w-full px-4 py-3 flex justify-between items-center rounded-md outline-none border-2 border-gray-400 focus:border-mainPurple text-black text-[16px] placeholder:text-black font-bold cursor-pointer"
          onClick={() => {
            dispatch(openGradesModal());
          }}
        >
          <p>{grade}</p>
          <span>
            <FaChevronDown />
          </span>
        </div>
        <div className="w-[150px] h-[50px] rounded-full border-2 ml-auto relative">
          <div
            className="w-full h-full flex flex-row p-2 justify-between items-center"
            onClick={() => {
              dispatch(toggleColorModal());
            }}
          >
            <span className={`h-[38px] w-[38px] rounded-full ${color}`}></span>
            <i className="pr-1">
              <FaChevronDown />
            </i>
          </div>
          {/* colors selector */}
          {colorsModalOpen && (
            <div className="p-2 rounded-md w-full absolute bottom-[100%] left-[50%] -translate-x-[50%] min-h-[120px] bg-white shadow-md z-[10] flex flex-row gap-4 flex-wrap">
              {colors.map((color: string, index: number) => {
                return (
                  <span
                    key={index}
                    className={`h-[38px] w-[38px] mx-auto rounded-full ${color}`}
                    onClick={() => {
                      dispatch(
                        updateClassDetails({ key: "color", value: color })
                      );
                      dispatch(closeColorModal);
                    }}
                  ></span>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className="flex w-full justify-between md:items-center items-end mt-6 md:flex-row md:gap-y-0 gap-y-4 flex-col">
        <div
          className="flex flex-row gap-x-2 items-center cursor-pointer"
          onClick={() => {
            dispatch(openAddStudentsModal());
          }}
        >
          <span className="w-[30px] h-[30px] border-2 border-black rounded-full flex justify-center items-center text-[20px] text-black font-lighter">
            <FaPlus />
          </span>
          <h3 className="text-[16px] font-bold">Add New Student</h3>
        </div>
        <button
          type="submit"
          className="py-3 w-[150px] text-[16px] rounded-[30px] text-white bg-mainPurple hover:shadow-md"
          onClick={() => {
            dispatch(closeAddClassModal());
          }}
        >
          Create
        </button>
      </section>
    </form>
  );
};

export default CreateClass;
