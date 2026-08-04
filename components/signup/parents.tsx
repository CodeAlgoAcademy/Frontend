import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser, IInputFields } from "../../types/interfaces";
import { RootState } from "../../store/store";
import styles from "../../styles/styles";
import { countryList } from "./countries";
import { updateUser } from "../../store/authSlice";
import { generateUsername } from "../../utils/generateUsername";
import UsernameButton from "./usernameButton";
import { useTranslation } from "react-i18next";

const Parents = () => {
   const dispatch = useDispatch();
   const { firstname, lastname, email, password, username } = useSelector((state: RootState) => state.user.auth);
   const { t } = useTranslation("auth");

   const inputFields: IInputFields[] = [
      {
         name: "firstname",
         type: "text",
         placeholder: t("enterFirstname"),
         value: firstname,
      },
      {
         name: "lastname",
         type: "text",
         placeholder: t("enterLastname"),
         value: lastname,
      },
      {
         name: "email",
         type: "email",
         placeholder: t("enterEmail"),
         value: email,
      },
      {
         name: "password",
         type: "password",
         placeholder: t("enterPassword"),
         value: password as string,
      },
      {
         name: "username",
         type: "text",
         placeholder: t("enterUsername"),
         value: username,
      },
   ];

   return (
      <div className="grid items-start gap-[1rem] md:grid-cols-2">
         {inputFields.map((inputField: IInputFields, index: number) => {
            const { type, name, placeholder, value } = inputField;

            return (
               <input
                  key={index}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     dispatch(updateUser({ key: name, value: e.target.value }));
                  }}
                  className={styles.input}
               />
            );
         })}
         <UsernameButton />

         <select
            className={styles.input}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
               const value = event.target.options[event.target.selectedIndex].value;
               dispatch(updateUser({ key: "country", value }));
            }}
         >
             <option value="Select Country">{t("selectCountry")}</option>
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
