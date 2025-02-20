import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";

export default function ParentSignUp2() {
   const dispatch = useDispatch();
   const auth = useSelector((state: RootState) => state?.user?.auth);

   return (
      <div key={2}>
         <h1 className="text-[32px] font-bold">Create Your Account</h1>
         <label className="mt-6 block text-xl font-semibold">First Name</label>
         <input
            value={auth?.firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "firstname", value: e.target.value }));
            }}
            type="text"
            className="auth-input"
            required
            placeholder="Enter your firstname"
         />
         <label className="mt-6 block text-xl font-semibold">Last Name</label>
         <input
            value={auth?.lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "lastname", value: e.target.value }));
            }}
            type="text"
            className="auth-input"
            required
            placeholder="Enter your lastname"
         />
      </div>
   );
}
