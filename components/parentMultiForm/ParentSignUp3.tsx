import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { updateUser } from 'store/authSlice';
import UsernameButton2 from '../signup/usernameButton2';
const ParentSignUp3 = () => {
  const dispatch = useDispatch();
  const { password, username } = useSelector((state: RootState) => state.user.auth);
  return (
    <div key={3}>
      <label className="block text-xl font-semibold mt-6">Username</label>
      <input
        type="text"
        value={username}
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        placeholder="Enter Username"
        onChange={(e) => {
          dispatch(updateUser({ key: 'username', value: e.target.value }));
        }}
        required
      />
      <UsernameButton2 />
      <label className="block text-xl font-semibold mt-6">Password</label>
      <input
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(updateUser({ key: 'password', value: e.target.value }));
        }}
        type="password"
        required
      />
    </div>
  );
};

export default ParentSignUp3;
