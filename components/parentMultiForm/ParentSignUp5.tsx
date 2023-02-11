import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChild } from 'store/parentSlice';
import { RootState } from 'store/store';

export default function ParentSignUp4() {
  const dispatch = useDispatch();
  const { fullname, codingExperience, dob } = useSelector( (state: RootState) => state.parent);

  const onChange = (e: any) => {
    dispatch(updateChild({ key: e.target.name, value: e.target.value }))
  }

  return (
    <div key={4}>
      <h1 className='font-bold text-[32px]'>Tell us more about { fullname }</h1>
      <label className='block text-xl font-semibold mt-6'>Birthday</label>
      <input className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3' type="date" name='dob' value={dob} onChange={onChange} />
      <label className='block text-xl font-semibold mt-6 capitalize'>coding experience</label>
      <select name="codingExperience" value={codingExperience} onChange={onChange} className='block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mb-[2.5rem] mt-3' id="">
        <option value="experienced">Experienced</option>
        <option value="standard">Standard</option>
        <option value="beginner">Beginner</option>
        <option value="amateur">Amateur</option>
      </select>
    </div>
  );
}
