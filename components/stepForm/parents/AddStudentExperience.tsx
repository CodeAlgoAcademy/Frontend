import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";

export default function ParentSignUp4() {
   const dispatch = useDispatch();
   const { fullName, codingExperience, dob } = useSelector((state: RootState) => state.parentChild);

   const onChange = (e: any) => {
      dispatch(updateChild({ key: e.target.name, value: e.target.value }));
   };

   return (
      <div key={4}>
         <h1 className="text-[32px] font-bold">Tell us more about {fullName}</h1>
         <label className="mt-6 block text-xl font-semibold">Birthday</label>
         <input className="auth-input" type="date" name="dob" value={dob} onChange={onChange} required />
         <label className="mt-6 block text-xl font-semibold capitalize">coding experience</label>
         <select name="codingExperience" value={codingExperience} onChange={onChange} className="auth-input mb-[2.5rem]" id="" required>
            <option value="experienced">Experienced</option>
            <option value="standard">Standard</option>
            <option value="beginner">Beginner</option>
            <option value="amateur">Amateur</option>
         </select>
      </div>
   );
}
