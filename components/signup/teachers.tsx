import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/authSlice";
import styles from "../../styles/styles";
import { RootState } from "../../store/store";
import { IInputFields, IUser } from "../../types/interfaces";
import { countryList } from "./countries";
import { generateUsername } from "../../utils/generateUsername";
import UsernameButton from "./usernameButton";
import { useTranslation } from "react-i18next";

const Teachers = () => {
   const dispatch = useDispatch();
   const { firstname, lastname, email, password, schoolName, username } = useSelector((state: RootState) => state.user.auth);
   const { t } = useTranslation("auth");
   const inputFields: IInputFields[] = [
      {
         name: "firstname",
         type: "text",
         placeholder: t("enterFirstName"),
         value: firstname,
      },
      {
         name: "lastname",
         type: "text",
         placeholder: t("enterLastName"),
         value: lastname,
      },
      {
         name: "email",
         type: "email",
         placeholder: t("enterEmailAsterisk"),
         value: email,
      },
      {
         name: "password",
         type: "password",
         placeholder: t("enterPasswordAsterisk"),
         value: password as string,
      },
      {
         name: "schoolName",
         type: "text",
         placeholder: t("enterSchoolName"),
         value: schoolName,
      },
   ];

   return (
      <div className="grid items-start gap-[1rem] md:grid-cols-2">
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
               dispatch(updateUser({ key: "country", value }));
            }}
         >
             <option value="Select School Country">{t("selectSchoolCountry")}</option>
            {countryList.map((countryOption: string, index: number): ReactNode => {
               return (
                  <option value={countryOption} key={index}>
                     {countryOption}
                  </option>
               );
            })}
         </select>
         <input
            type="text"
            placeholder={t("enterUsername")}
            name="username"
            value={username}
            required
            className={styles.input}
            onChange={(e) => {
               dispatch(updateUser({ key: "username", value: e.target.value }));
            }}
         />
      </div>
   );
};

export default Teachers;
