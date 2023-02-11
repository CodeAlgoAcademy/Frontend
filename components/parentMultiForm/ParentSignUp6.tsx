import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChild } from 'store/parentSlice';
import { RootState } from 'store/store';

export default function ParentSignUp5() {
  const dispatch = useDispatch();
  const { fullname, password, username } = useSelector((state: RootState) => state.parent);

  const onChange = (e: any) => {
    dispatch(updateChild({ key: e.target.name, value: e.target.value }));
  };

  return (
    <div key={5}>
      <h1 className="font-bold text-[28px]">
        It{'’'}s time to create {fullname}
        {'’'}s log in
      </h1>
      <p className="block text-[14px] font-[400] mt-3">
        You and your student will have separate log ins on CodeAlgo. Don{'’'}t worry, you will still
        have access to your student{'’'}s account.{' '}
      </p>
      <label className="block text-xl font-semibold mt-6">Username</label>
      <input
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        name="username"
        type="text"
        autoFocus
        required
        value={username}
        onChange={onChange}
      />
      <label className="block text-xl font-semibold mt-6">Password</label>
      <input
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        type="password"
        name="password"
        required
        value={password}
        onChange={onChange}
      />
      <label className="block text-xl font-semibold mt-6">Verify Password</label>
      <input
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mb-[2.5rem] mt-3"
        type="password"
        required
      />
    </div>
  );
}
