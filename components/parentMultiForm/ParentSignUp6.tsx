import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import { generateUsername } from "utils/generateUsername";

export default function ParentSignUp5() {
   const dispatch = useDispatch();
   const { fullname, password, username } = useSelector((state: RootState) => state.parentChild);

   const onChange = (e: any) => {
      dispatch(updateChild({ key: e.target.name, value: e.target.value }));
   };

   return (
      <div key={5}>
         <h1 className="text-[28px] font-bold">
            It{"’"}s time to create {fullname}
            {"’"}s log in
         </h1>
         <p className="mt-3 block text-[14px] font-[400]">
            You and your student will have separate log ins on CodeAlgo. Don{"’"}t worry, you will still have access to your student{"’"}s account.{" "}
         </p>
         <label className="mt-6 block text-xl font-semibold">Username</label>
         <input
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            name="username"
            type="text"
            autoFocus
            required
            value={username}
            onChange={onChange}
         />
         <button
            type="button"
            className="mt-2  block h-[2.5rem] w-full rounded-xl bg-white text-center font-bold text-[#2073FA] transition duration-300 ease-out hover:bg-[#2073FA] hover:text-white"
            onClick={() => {
               if (fullname) {
                  const randomName = generateUsername(fullname, "");
                  dispatch(updateChild({ key: "username", value: randomName }));
               }
            }}
         >
            Generate Username
         </button>
         <label className="mt-6 block text-xl font-semibold">Password</label>
         <input
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            type="password"
            name="password"
            required
            value={password}
            onChange={onChange}
         />
         <label className="mt-6 block text-xl font-semibold">Verify Password</label>
         <input className="mb-[2.5rem] mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0" type="password" required />
      </div>
   );
}
