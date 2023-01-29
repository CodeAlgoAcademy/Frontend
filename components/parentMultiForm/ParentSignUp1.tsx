import React from 'react';

export default function ParentSignUp1() {
  return (
    <div key={1}>
        <h1 className='font-bold text-[32px]'>Create Your Account</h1>
        <label className='block text-xl font-semibold mt-6'>Your email</label>
        <input type="email" className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' placeholder='schoolTeach@gmail.com' required/>
    </div>
  );
}
