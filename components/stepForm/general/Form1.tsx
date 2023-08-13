import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";

export default function ParentSignUp1() {
   const dispatch = useDispatch();
   const auth = useSelector((state: RootState) => state.user.auth);
   const router = useRouter();

   const accountType = router.pathname.includes("teacher")
      ? "teacher"
      : router.pathname.includes("parent")
      ? "parent"
      : router.pathname.includes("student")
      ? "student"
      : "organizer";

   return (
      <div key={1}>
         <h1 className="text-[32px] font-bold">Create Your Account</h1>
         <label className="mt-6 block text-xl font-semibold">Your email</label>
         <input
            value={auth?.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "email", value: e.target.value }));
            }}
            type="email"
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            placeholder={`${accountType}@gmail.com`}
            required
         />
      </div>
   );
}
