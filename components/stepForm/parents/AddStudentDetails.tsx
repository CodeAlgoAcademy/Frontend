import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import { generateUsername } from "utils/generateUsername";

export default function ParentSignUp5() {
   const dispatch = useDispatch();
   const child = useSelector((state: RootState) => state.parentChild);

   const onChange = (e: any) => {
      dispatch(updateChild({ key: e.target.name, value: e.target.value }));
   };

   return (
      <div key={5}>
         <h1 className="text-[28px] font-bold">
            It{"’"}s time to create {child?.fullName}
            {"’"}s log in
         </h1>
         <p className="mt-3 block text-[14px] font-[400]">
            You and your student will have separate log ins on CodeAlgo. Don{"’"}t worry, you will still have access to your student{"’"}s account.{" "}
         </p>
         <label className="mt-6 block text-xl font-semibold">Username</label>
         <input className="auth-input" name="username" type="text" autoFocus required value={child?.username} onChange={onChange} />
         <button
            type="button"
            className="text-mainColor  hover:bg-mainColor mt-2 block h-[2.5rem] w-full rounded-xl bg-white text-center font-bold transition duration-300 ease-out hover:text-white"
            onClick={() => {
               if (child?.fullName) {
                  const randomName = generateUsername(child?.fullName, "");
                  dispatch(updateChild({ key: "username", value: randomName }));
               }
            }}
         >
            Generate Username
         </button>
         <label className="mt-6 block text-xl font-semibold">Password</label>
         <input className="auth-input" type="password" name="password" required value={child?.password} onChange={onChange} />
         <label className="mt-6 block text-xl font-semibold">Verify Password</label>
         <div className="mb-[2.5rem]">
            <input className="auth-input" type="password" name="confirmPassword" required value={child?.confirmPassword} onChange={onChange} />
            {child?.confirmPassword && child?.password && child?.confirmPassword !== child?.password && (
               <p className="mt-2 text-red-500">Passwords do not match</p>
            )}
         </div>
      </div>
   );
}
