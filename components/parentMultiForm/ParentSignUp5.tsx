import React from 'react';

export default function ParentSignUp4() {
  return (
    <div key={4}>
      <h1 className='font-bold text-[32px]'>Tell us more about Conor</h1>
      <label className='block text-xl font-semibold mt-6'>Birthday</label>
      <input className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' type="date" />
      <label className='block text-xl font-semibold mt-6'>coding Experience</label>
      <select name="" className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mb-[2.5rem] mt-3' id="">
        <option value="">Experienced</option>
        <option value="">Standard</option>
        <option value="">Beginner</option>
        <option value="">Amateur</option>
      </select>
    </div>
  );
}
