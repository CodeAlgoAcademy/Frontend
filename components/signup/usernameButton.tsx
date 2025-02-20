import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";
import { generateUsername } from "utils/generateUsername";
const UsernameButton = () => {
   const dispatch = useDispatch();
   const { firstname, lastname } = useSelector((state: RootState) => state.user.auth);
   return (
      <button
         type="button"
         className="bg-mainColor mt-3 w-full rounded-md p-2 text-white shadow-md active:scale-[0.91]"
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

export default UsernameButton;
