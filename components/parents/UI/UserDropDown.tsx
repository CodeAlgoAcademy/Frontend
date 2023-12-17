import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLogOut, BiUserCircle } from "react-icons/bi";
import { IUser } from "types/interfaces";
import { getUserFromLocalStorage } from "utils/getTokens";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { UpdateUserForms } from "@/components/navbar/dashboard/GeneralNav";
import { logout } from "services/authService";

interface Props {
   isOpen: boolean;
}

export default function UserDropDown({ isOpen }: Props) {
   const [user, setUser] = useState<IUser | null>();
   const router = useRouter();
   const userState = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      setUser(getUserFromLocalStorage());
   }, [router]);
   return (
      <div
         className={`absolute transition duration-500 ${
            isOpen ? "block" : "hidden"
         } top-[140%] right-0 z-[3] w-[90vw] max-w-[300px] rounded-md bg-white px-4 py-4`}
      >
         <div className="relative z-10">
            <div className="flex items-center justify-between text-[18px] font-bold text-mainColor">
               <h1 className="flex items-center gap-x-3 ">
                  <BiUserCircle size={24} />

                  {userState?.firstname && userState?.lastname
                     ? `${userState?.firstname} ${userState?.lastname}`
                     : `${user?.firstname} ${user?.lastname}`}
               </h1>
            </div>
            <main className={`mt-4 flex w-full flex-col gap-2 overflow-hidden transition  duration-300`}>
               <UpdateUserForms />
            </main>
            <motion.div
               className="mt-[1rem] flex cursor-pointer items-center pb-2 text-mainColor"
               initial={{ opacity: 0, y: "5px" }}
               animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3, duration: "0.5" },
               }}
               onClick={() => dispatch(logout())}
            >
               <span>
                  <BiLogOut />
               </span>

               <h5 className="ml-2 text-[1rem] font-bold">Logout</h5>
            </motion.div>
         </div>
      </div>
   );
}
