import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";
import { countryList } from "../../signup/countries";
import UsernameButton2 from "../../signup/usernameButton2";

export default function OtherInfoTeacher() {
   const dispatch = useDispatch();
   const { schoolName, username } = useSelector((state: RootState) => state.user.auth);
   return (
      <div>
         <h1 className="text-[32px] font-bold">Create Your Account</h1>
         <label className="mt-6 block text-xl font-semibold">School Name</label>
         <input
            type="text"
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            placeholder="Enter School Name"
            value={schoolName}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "schoolName", value: e.target.value }));
            }}
         />

         <label className="mt-6 block text-xl font-semibold">Select School Country</label>
         <select
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
               const value = event.target.options[event.target.selectedIndex].value;
               dispatch(updateUser({ key: "schoolCountry", value }));
               dispatch(updateUser({ key: "country", value }));
            }}
         >
            <option value="Select School Country" disabled>
               Select School Country
            </option>
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
}
