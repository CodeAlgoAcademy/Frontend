import React from 'react';

export default function ParentSignUp2() {
  return (
    <div>
        <h1 className='font-bold text-[32px]'>Create Your Account</h1>
        <label className='block text-xl font-semibold mt-6'>Name</label>
        <input type="text" className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3'  required/>
        <label className='block text-xl font-semibold mt-6'>Password</label>
        <input className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' type="password" required/>
        <label className='block text-xl font-semibold mt-6'>Verify Password</label>
        <input className='block w-full h-[2.5rem] rounded-xl px-4 mb-[2.5rem] py-2 focus:outline-0 mt-3' type="password" required/>
    </div>
  );
}
