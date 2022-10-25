import React, { ChangeEvent, ReactNode } from "react";
import { countryList } from "./countries";
import { IInputFields, IUser } from "../../types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { openGradesModal } from "../../store/modalSlice";
import { FaChevronDown } from "react-icons/fa";
import { updateUser } from "../../store/authSlice";
import styles from "../../styles/styles";
const inputFields: IInputFields[] = [
  {
    type: "text",
    name: "firstname",
    placeholder: "First Name*",
  },
  {
    type: "text",
    name: "lastname",
    placeholder: "Last Name*",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email*",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password*",
  },
];

const Students = () => {
  const dispatch = useDispatch();
  const { grade } = useSelector((state: RootState) => state.user);

  const getInputValue = (name: string) => {
    const value = useSelector(
      (state: RootState) => state.user[name as keyof IUser]
    );
    // value attribute only accepts string
    return typeof value === "string" ? value : "";
  };

  return (
    <div className="grid md:grid-cols-2 gap-[1rem] items-start">
      {inputFields.map((inputField: IInputFields, index: number) => {
        const { type, placeholder, name } = inputField;
        return (
          <input
            key={index}
            type={type}
            placeholder={placeholder}
            name={name}
            required
            value={getInputValue(name)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(updateUser({ key: name, value: e.target.value }));
            }}
            className={styles.input}
          />
        );
      })}
      <select
        className={styles.input}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const value = event.target.options[event.target.selectedIndex].value;
          dispatch(updateUser({ key: "country", value }));
        }}
      >
        <option value="Select Country">Select Country</option>
        {countryList.map((countryOption: string, index: number): ReactNode => {
          return (
            <option value={countryOption} key={index}>
              {countryOption}
            </option>
          );
        })}
      </select>

      <div
        className="w-full px-4 py-3 rounded-md flex justify-between items-center outline-none border-2 border-gray-400 focus:border-mainPurple text-black text-[16px] placeholder:text-black font-bold cursor-pointer"
        onClick={() => {
          dispatch(openGradesModal());
        }}
      >
        <p>{grade}</p>
        <span>
          <FaChevronDown />
        </span>
      </div>
    </div>
  );
};

export default Students;
