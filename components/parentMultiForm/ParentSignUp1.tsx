import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/authSlice';
import { RootState } from 'store/store';

export default function ParentSignUp1() {
  const dispatch = useDispatch();
  const {email} = useSelector(
    (state: RootState) => state.user.auth,
  );
  return (
    <div key={1}>
        <h1 className='font-bold text-[32px]'>Create Your Account</h1>
        <label className='block text-xl font-semibold mt-6'>Your email</label>
        <input value={email} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(updateUser({key: 'email', value: e.target.value}));
        }}
        type="email" className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' placeholder='schoolTeach@gmail.com' required  />
    </div>
  );
}