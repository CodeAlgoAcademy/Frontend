import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser, IInputFields } from "../../types/interfaces";
import { RootState } from "../../store/store";
import styles from "../../styles/styles";
import { countryList } from "./countries";
import { updateUser } from "../../store/authSlice";

const inputFields: IInputFields[] = [
  {
    name: "firstname",
    type: "text",
    placeholder: "Enter Firstname",
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Enter Lastname",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter Password",
  },
];

const Parents = () => {
  const dispatch = useDispatch();
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
        const { type, name, placeholder } = inputField;
        return (
          <input
            key={index}
            type={type}
            name={name}
            placeholder={placeholder}
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
    </div>
  );
};

export default Parents;
