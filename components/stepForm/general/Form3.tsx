import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { updateUser } from "store/authSlice";
import UsernameButton2 from "../../signup/usernameButton2";

const ParentSignUp3 = () => {
   const dispatch = useDispatch();
   const { password, username } = useSelector((state: RootState) => state.user.auth);
   return (
      <div key={3}>
         <label className="mt-6 block text-xl font-semibold">Username</label>
         <input
            type="text"
            value={username}
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            placeholder="Enter your username"
            onChange={(e) => {
               dispatch(updateUser({ key: "username", value: e.target.value }));
            }}
            required
         />
         <UsernameButton2 />
         <label className="mt-6 block text-xl font-semibold">Password</label>
         <input
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "password", value: e.target.value }));
            }}
            minLength={10}
            type="password"
            placeholder="Enter your password"
            required
         />
      </div>
   );
};

export default ParentSignUp3;
