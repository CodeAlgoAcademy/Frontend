import React, { ChangeEvent } from "react";
import { BiEdit } from "react-icons/bi";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "store/authSlice";
import { updateEmail, updateFirstname, updateLastname } from "services/authService";

export const UpdateUserForms = ({ setUserDropDown }: { setUserDropDown?: any }) => {
   const dispatch = useDispatch();
   // const [password, setPassword] = useState<string>("");
   const updateUserForm = async (e: ChangeEvent<HTMLFormElement>, func: any) => {
      e.preventDefault();
      const data = await dispatch(func());
      if (!data?.error) {
         setUserDropDown && setUserDropDown(false);
      }
   };

   const auth = useSelector((state: RootState) => state.user?.auth);
   return (
      <>
         <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
               updateUserForm(e, updateFirstname);
            }}
            className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-mainColor"
         >
            <input
               type="text"
               className="h-full w-full border-none text-[14px] tracking-wider text-black outline-none placeholder:text-gray-500"
               placeholder="Update firstname"
               value={auth?.firstname}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                     updateUser({
                        key: "firstname",
                        value: e.target.value,
                     })
                  );
               }}
            />
            <button type="submit" className="relative flex-[0.2] cursor-pointer text-xl font-bold text-gray-900">
               <BiEdit />
            </button>
         </form>
         <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
               updateUserForm(e, updateLastname);
            }}
            className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-mainColor"
         >
            <input
               type="text"
               className="h-full w-full border-none text-[14px] tracking-wider text-black outline-none placeholder:text-gray-500"
               placeholder="Update lastname"
               value={auth?.lastname}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(updateUser({ key: "lastname", value: e.target.value }));
               }}
            />
            <button type="submit" className="relative flex-[0.2] cursor-pointer text-xl font-bold text-gray-900">
               <BiEdit />
            </button>
         </form>
         {/* <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
               updateUserForm(e, updateEmail);
            }}
            className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-mainColor"
         >
            <input
               type="text"
               className="h-full w-full border-none text-[14px] tracking-wider text-black outline-none placeholder:text-gray-500"
               placeholder="Update email"
               value={email}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(updateUser({ key: "email", value: e.target.value }));
               }}
            />
            <button type="submit" className="relative flex-[0.2] cursor-pointer text-xl font-bold text-gray-900">
               <FaEdit />
            </button>
         </form> */}
         {/* <form className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-mainColor">
            <input
               type="text"
               className="h-full w-full border-none text-[14px] tracking-wider text-black outline-none placeholder:text-gray-500"
               placeholder="Update password"
               value={password}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
               }}
            />
            <button type="submit" className="relative flex-[0.2] cursor-pointer text-xl font-bold text-gray-900">
               <FaEdit />
            </button>
         </form> */}
      </>
   );
};
