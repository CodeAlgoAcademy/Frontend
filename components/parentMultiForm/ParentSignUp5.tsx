import React from 'react';

export default function ParentSignUp5() {
  return (
    <div key={5}>
      <h1 className="font-bold text-[28px]">
        It{'’'}s time to create Connor{'’'}s log in
      </h1>
      <p className="block text-[14px] font-[400] mt-3">
        You and your student will have separate log ins on CodeAlgo. Don{'’'}t worry, you will still
        have access to your student{'’'}s account.{' '}
      </p>
      <label className="block text-xl font-semibold mt-6">Username</label>
      <input
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        type="email"
        autoFocus
        required
      />
      <label className="block text-xl font-semibold mt-6">Password</label>
      <input
        className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
        type="password"
        required
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
