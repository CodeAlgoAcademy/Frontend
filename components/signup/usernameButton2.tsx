import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";
import { generateUsername } from "utils/generateUsername";
const UsernameButton2 = () => {
   const dispatch = useDispatch();
   const { firstname, lastname } = useSelector((state: RootState) => state.user.auth);
   return (
      <button
         type="button"
         className="text-mainColor  hover:bg-mainColor mt-2 block h-[2.5rem] w-full rounded-xl bg-white text-center font-bold transition duration-300 ease-out hover:text-white"
         onClick={() => {
            if (firstname || lastname) {
               const randomName = generateUsername(firstname, lastname);
               dispatch(updateUser({ key: "username", value: randomName }));
            }
         }}
      >
         Generate Username
      </button>
   );
};

export default UsernameButton2;
