import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { openGradesModal } from "store/modalSlice";
import { RootState } from "store/store";
import Grades from "../../Teachers/addClass/grades";
import { countryList } from "../../signup/countries";

export default function OtherInfoStudent() {
   const dispatch = useDispatch();
   const { grade, dob, country } = useSelector((state: RootState) => state.user.auth);
   return (
      <>
         <div>
            <label className="mt-6 block text-xl font-semibold">Grade</label>
            <div
               className="mt-3 block h-[2.5rem] w-full rounded-xl bg-white px-4 py-2 focus:outline-0"
               onClick={() => {
                  dispatch(openGradesModal());
               }}
            >
               {grade || "Select Grade"}
            </div>
         </div>
         <div>
            <label className="mt-6 block text-xl font-semibold">Date of birth</label>
            <input
               type="date"
               required
               value={dob}
               className="mt-3 block h-[2.5rem] w-full rounded-xl bg-white px-4 py-2 focus:outline-0"
               onChange={(e) => {
                  dispatch(updateUser({ key: "dob", value: e.target.value }));
               }}
            />
         </div>

         <label className="mt-6 block text-xl font-semibold">Select Country</label>
         <select
            className="auth-input"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
               const value = event.target.options[event.target.selectedIndex].value;
               dispatch(updateUser({ key: "country", value }));
            }}
         >
            <option value="Select School Country" disabled>
               Select Country
            </option>
            {countryList?.map((countryOption: string, index: number): ReactNode => {
               return (
                  <option value={countryOption} key={index}>
                     {countryOption}
                  </option>
               );
            })}
         </select>
      </>
   );
}
