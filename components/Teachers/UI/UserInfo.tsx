import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IUser } from "types/interfaces";
import { getUserFromLocalStorage } from "utils/getTokens";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { logout } from "services/authService";
import { useDispatch } from "react-redux";
import { UpdateUserForms } from "@/components/UI/UpdateUserForm";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

export default function UserInfo() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
   const [user, setUser] = useState<IUser | null>(null);

   const dispatch = useDispatch();

   useEffect(() => {
      setUser(getUserFromLocalStorage());
   }, []);

   return (
      <div className="relative w-full max-w-fit flex-1">
         <div className={` ease-in- z-[3] box-border rounded-[30px] border border-[#bdbdbd] p-2`}>
            <div className="flex flex-1 items-center justify-between">
               <img
                  src="/assets/no user.png"
                  alt="avatar"
                  className="h-[24px] w-[24px] flex-1 rounded-full object-cover object-center md:cursor-pointer"
               />
               <p className="ml-2 hidden text-sm font-medium capitalize text-mainColor md:block">
                  {user?.firstname} {user?.lastname}
               </p>

               <div className="flex-1 cursor-pointer  pl-6 text-[#838383]" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <IoChevronUp /> : <IoChevronDown />}
               </div>
            </div>
         </div>

         {/* SETTINGS  */}
         {isOpen && (
            <div className="small-scroll-thumb fade-in absolute top-[110%] right-0 z-[5] flex min-h-[100px] w-[90vw] max-w-[200px] flex-col justify-between overflow-y-scroll rounded-[20px] border border-[#bdbdbd] bg-white px-2 py-4 shadow-md">
               <p className="mb-2 flex items-center gap-2 font-medium text-mainColor">
                  <img src="/assets/no user.png" alt="avatar" className="h-[24px] w-[24px] rounded-full object-cover object-center" />{" "}
                  {user?.firstname} {user?.lastname}
               </p>
               <div className="flex cursor-pointer items-center justify-between gap-2" onClick={() => setSettingsOpen((prev) => !prev)}>
                  <div className="flex items-center gap-2">
                     <BsGear size={24} color="#2073fa" />
                     <p className="text-[.9rem] font-medium text-mainColor">Settings</p>
                  </div>
                  <span>{settingsOpen ? <IoChevronUp /> : <IoChevronDown />}</span>
               </div>
               {/* settings form */}
               <div
                  className={`${settingsOpen ? "h-[100px]" : "h-0"} mt-2  flex w-full flex-col gap-2 overflow-hidden transition-all duration-[400ms]`}
               >
                  <UpdateUserForms />
               </div>

               <div
                  className="flex cursor-pointer items-center gap-2 text-mainColor"
                  onClick={() => {
                     dispatch(logout());
                  }}
               >
                  <BiLogOut size={24} />
                  <p>Logout</p>{" "}
               </div>
            </div>
         )}
      </div>
   );
}
