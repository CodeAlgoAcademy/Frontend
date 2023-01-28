import React from 'react';

export default function ParentSignUp3() {
  return (
    <div>
      <h1 className='font-bold text-[32px]'>Add your student account(s)</h1>
      <label className='block text-xl font-semibold mt-6'>Students Name</label>
      <input type="email"  className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3 mb-[2.5rem]' autoFocus required/>
    </div>
  );
}
