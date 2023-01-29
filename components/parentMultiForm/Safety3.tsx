import React from 'react';

export default function Safety3() {
  return (
    <div key={8}>
      <h1 className='font-bold text-[30px]'>Who can Connor play with?</h1>
      <p className="font-[400] text-[14px]">CodeAlgo allows parents to limit students multiplayer interactions. Please enter the email or username of your student’s friends below. A request will be sent to the linked parent account. They can then accept or decline the request.</p>
      <label  className='block text-xl font-semibold mt-6'>Friend email or username</label>
      <input className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' type="text" required/>
      <p className="text-[14px] mt-4 text-center font-semibold">You can update or add to this list at any time in your settings</p>
    </div>
  );
}
