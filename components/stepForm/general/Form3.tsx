import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { updateUser } from "store/authSlice";
import UsernameButton2 from "../../signup/usernameButton2";
import { useRouter } from "next/router";
import { PasswordInput } from "@/components/UI/input";

const ParentSignUp3 = () => {
   const dispatch = useDispatch();
   const { password, username, organization_code } = useSelector((state: RootState) => state.user.auth);
   const router = useRouter();

   return (
      <div key={3}>
         <label className="mt-6 block text-xl font-semibold">Username</label>
         <input
            type="text"
            value={username}
            className="auth-input"
            placeholder="Enter your username"
            onChange={(e) => {
               dispatch(updateUser({ key: "username", value: e.target.value }));
            }}
            required
         />
         <UsernameButton2 />

         {/* don't display for the organizers */}
         {!router.pathname.includes("/organizer") && (
            <>
               <label className="mt-6 block text-xl font-semibold">Organization Code (optional)</label>
               <input
                  className="auth-input"
                  value={organization_code}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     dispatch(updateUser({ key: "organization_code", value: e.target.value }));
                  }}
                  minLength={6}
                  type="text"
                  placeholder="Enter organization code"
               />
            </>
         )}

         <label className="mt-6 block text-xl font-semibold">Password</label>
         <PasswordInput
            value={password ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "password", value: e.target.value }));
            }}
         />
      </div>
   );
};

export default ParentSignUp3;
