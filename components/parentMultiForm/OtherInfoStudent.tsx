import React, { ChangeEvent, ReactNode } from 'react';
import Grades from '../grades';
import { countryList } from '../signup/countries';
import UsernameButton from '../signup/usernameButton';

export default function OtherInfoStudent() {
  return (
    <div>
      <h1 className="font-bold text-[32px]">Create Your Account</h1>
      <label className="block text-xl font-semibold mt-6">School Name</label>
      <input
        type="text"
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        placeholder="Enter School Name"
        required
      />

      <label className="block text-xl font-semibold mt-6">Select Country</label>
      <select
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0  mt-3"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const value = event.target.options[event.target.selectedIndex].value;
          // dispatch(updateUser({ key: 'schoolCountry', value }));
          // dispatch(updateUser({ key: 'country', value }));
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
      <label className="block text-xl font-semibold mt-6">Username</label>
      <input
        type="text"
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        placeholder="Enter School Name"
        required
      />
      <UsernameButton />
    </div>
  );
}
