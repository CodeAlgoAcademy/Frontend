import { Button } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSuccessModal } from "store/modalSlice";
import { updateChildPassword } from "store/parentChildSlice";
import { RootState } from "store/store";

interface Props {
   closeModal(): void;
}

const ResetPassword = ({ closeModal }: Props) => {
   const currentChild = useSelector((state: RootState) => state?.parentChild?.currentChild);

   const dispatch = useDispatch();

   const [password, setPassword] = useState<string>("");

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await dispatch(updateChildPassword({ child_id: currentChild?.id, password }));

      if (!data?.error) {
         closeModal();
         dispatch(openSuccessModal({ message: "Child's password has been changed successfully" }));
      }
   };

   return (
      <form
         onSubmit={submit}
         className="max-w-screen scale-up absolute bottom-[105%] right-0 z-[4] w-[300px] rounded-md bg-gray-100  p-6 shadow-md hover:shadow-lg"
      >
         <h4 className="text-[.9rem] font-medium">Reset {currentChild?.fullName}'s password</h4>
         <input
            className={styles?.input}
            placeholder="Enter new password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required={true}
         />

         <button type="submit" className="mt-2 ml-auto block rounded-md border-none bg-mainColor px-6 py-[5px] text-white outline-none">
            Submit
         </button>
      </form>
   );
};

const styles = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-mainColor transition-all duration-300`,
};

export default ResetPassword;
