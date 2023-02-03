import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/authSlice';
import { RootState } from 'store/store';

export default function ParentSignUp2() {
  // const [verifyPassword, setVerifyPassword] = useState<string>('')
  const dispatch = useDispatch();
  const { firstname, lastname, password } = useSelector(
    (state: RootState) => state.user.auth,
  );

  return (
    <div key={2}>
        <h1 className='font-bold text-[32px]'>Create Your Account</h1>
        <label className='block text-xl font-semibold mt-6'>First Name</label>
        <input 
          value={firstname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(updateUser({ key: 'firstname', value: e.target.value }));
        }}
        type="text" className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3'  required/>
        <label className='block text-xl font-semibold mt-6'>Last Name</label>
        <input 
          value={lastname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(updateUser({ key: 'lastname', value: e.target.value }));
        }}
        type="text" className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3'  required/>
        <label className='block text-xl font-semibold mt-6'>Password</label>
        <input className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' 
           value={password}
           onChange={(e: ChangeEvent<HTMLInputElement>) => {
           dispatch(updateUser({ key: 'password', value: e.target.value }));
         }}
        type="password" required/>
        {/* <label className='block text-xl font-semibold mt-6'>Verify Password</label>
        <input className='block w-full h-[2.5rem] rounded-xl px-4 mb-[2.5rem] py-2 
        focus:outline-0 mt-3' 
         value={verifyPassword}
         onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setVerifyPassword(e.target.value)
         }}
        type="password" required/> */}
    </div>
  );
}
