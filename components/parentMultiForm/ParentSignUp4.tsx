import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";

export default function ParentSignUp4() {
   const dispatch = useDispatch();
   const { fullName } = useSelector((state: RootState) => state.parentChild);

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updateChild({ key: "fullName", value: e.target.value }));
   };

   return (
      <div key={3}>
         <h1 className="text-[32px] font-bold">Add your student account(s)</h1>
         <div className="mt-6">
            <div className="relative">
               <input type="text" name="name" id="name" placeholder="Name" className={styles.input} value={fullName} onChange={onChange} required />
               <label htmlFor="name" className={styles.label}>
                  Student{`'`}s Name
               </label>
            </div>
         </div>
      </div>
   );
}

const styles = {
   label: "pointer-events-none absolute top-3 left-2 origin-left -translate-y-1/2 transform text-[12px] text-slate-500 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-800 peer-focus:top-3 peer-focus:pl-0 peer-focus:text-[12px] peer-focus:text-slate-500",
   input: "bg-white peer mt-1 w-full px-2 py-3 placeholder:text-transparent focus:border-slate-100 focus:outline-none rounded-xl",
};
