import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/authSlice";
import styles from "../../styles/styles";
import { RootState } from "../../store/store";
import { IInputFields, IUser } from "../../types/interfaces";
import { countryList } from "./countries";

const Teachers = () => {
  const dispatch = useDispatch();
  const { firstname, lastname, email, password, schoolName } = useSelector(
    (state: RootState) => state.user
  );
  const inputFields: IInputFields[] = [
    {
      name: "firstname",
      type: "text",
      placeholder: "Enter Firstname*",
      value: firstname,
    },
    {
      name: "lastname",
      type: "text",
      placeholder: "Enter Lastname*",
      value: lastname,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter Email*",
      value: email,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Password*",
      value: password,
    },
    {
      name: "schoolName",
      type: "text",
      placeholder: "Enter School Name*",
      value: schoolName,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-[1rem] items-start">
      {inputFields.map((inputFields: IInputFields, index: number) => {
        const { type, name, placeholder, value } = inputFields;
        return (
          <input
            key={index}
            type={type}
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(updateUser({ key: name, value: e.target.value }));
            }}
            placeholder={placeholder}
            required
            className={styles.input}
          />
        );
      })}
      <select
        className={styles.input}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const value = event.target.options[event.target.selectedIndex].value;
          dispatch(updateUser({ key: "schoolCountry", value }));
        }}
      >
        <option value="Select School Country">Select School Country</option>
        {countryList.map((countryOption: string, index: number): ReactNode => {
          return (
            <option value={countryOption} key={index}>
              {countryOption}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Teachers;
