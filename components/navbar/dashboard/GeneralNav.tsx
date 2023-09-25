import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BiBell, BiHomeAlt, BiLogOut } from "react-icons/bi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentClass } from "../../../store/currentClassSlice";
import { IClass, CurrentClassState, IUser } from "../../../types/interfaces";
import { motion } from "framer-motion";
import { IoSettingsSharp } from "react-icons/io5";
import { resetAuthUser, updateUser } from "store/authSlice";
import { updateEmail, updateFirstname, updateLastname } from "services/authService";
import { AnyAction } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "utils/getTokens";
import { getAllClasses } from "services/classesService";

const GeneralNav = () => {
   const [userDropDown, setUserDropDown] = useState<boolean>(false);
   const [settingsTabOpen, setSettingsTabOpen] = useState<boolean>(false);
   const [user, setUser] = useState<IUser | null>(null);

   const dispatch = useDispatch();
   const router = useRouter();

   const classes = useSelector((state: RootState): IClass[] => state.allClasses.classes);
   const { firstname, lastname, email } = useSelector((state: RootState) => state.user);
   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);

   const classDetails = classes?.map((item: CurrentClassState) => {
      const { className, color, id } = item;
      return { className, color, id };
   });
   const otherClassDetails = classDetails?.filter((item) => item.className !== currentClass.className);
   const [classListView, setClassListView] = useState(false);

   const dropdownStyle = {
      transform: classListView ? "rotate(180deg)" : "",
      transition: "transform 150ms ease",
   };

   const classListStyle = {
      maxHeight: classListView ? "" : "56px",
      transition: "max-height 200ms ease",
      overflowY: classListView ? "auto" : "hidden",
      height: classListView ? "191.9px" : "",
   } as React.CSSProperties;

   const toggleUserDropDown = () => {
      setUserDropDown(!userDropDown);
      setUserDropDown(!userDropDown);
   };
   const classBox = useRef<HTMLDivElement>(null);

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("token_timestamp");
      dispatch(resetAuthUser());
      router.push("/login");
   };

   useEffect(() => {
      setUser(getUserFromLocalStorage());
   }, []);

   return (
      <div className="hidden items-center justify-between bg-white pt-6 w840:flex ">
         <div className="relative flex items-center gap-40">
            <div className="flex items-center gap-4">
               <Link href={`/teachers/addClass`}>
                  <div className="text-[24px] text-[#2073fa]">
                     <BiHomeAlt />
                  </div>
               </Link>
               <div className="relative h-[52px]">
                  <div className="absolute left-0 top-0 overflow-hidden rounded-[28px]">
                     <div
                        className="small-scroll-thumb z-30 w-[260px] divide-y overflow-hidden rounded-[28px] border border-[#BDBDBD] bg-white"
                        style={classListStyle}
                        ref={classBox}
                     >
                        <div className="relative flex cursor-pointer items-center justify-between py-2 px-3 hover:bg-gray-100">
                           <div className="flex items-center gap-3">
                              <span style={{ backgroundColor: currentClass?.color }} className='content-[" "] h-[24px] w-[24px] rounded-full'></span>
                              <span className="text-[18px] font-bold">{currentClass.className}</span>
                           </div>
                           <div className="hover:b rounded-lg p-1" onClick={() => setClassListView((prev) => !prev)}>
                              <div className="text-[32px] text-[#838383]" style={dropdownStyle}>
                                 <RiArrowDropDownLine />
                              </div>
                           </div>
                        </div>
                        {otherClassDetails?.map((navClass: CurrentClassState, index: number) => (
                           <div
                              className="relative z-[50] flex cursor-pointer items-center justify-between py-2 px-3 hover:bg-gray-100"
                              key={index}
                              onClick={() => {
                                 dispatch(
                                    updateCurrentClass({
                                       className: navClass.className,
                                       color: navClass.color,
                                       id: navClass.id,
                                    })
                                 );
                                 const node = classBox.current;
                                 if (node) {
                                    node.scroll({
                                       top: 0,
                                       behavior: "smooth",
                                    });
                                 }
                                 setClassListView((prev) => false);
                              }}
                           >
                              <div className="flex items-center gap-3">
                                 <span style={{ backgroundColor: navClass?.color }} className='content-[" "] h-[24px] w-[24px] rounded-full'></span>
                                 <span className="text-[18px] font-bold">{navClass.className}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-8">
            <div
               className={
                  userDropDown
                     ? `absolute top-[1.9rem] right-[2rem] z-[50] w-[16rem] overflow-hidden rounded-[20px] border border-[#BDBDBD] bg-white px-4 py-[6px] ${
                          settingsTabOpen ? "h-[18rem]" : "h-[10rem]"
                       } box-border duration-300 ease-in-out`
                     : `box-border h-[3rem] min-w-fit rounded-[30px] border border-[#BDBDBD] bg-white px-2 py-[6px]  transition-[width]` +
                       " mr-[2rem]"
               }
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center overflow-hidden rounded-full">
                     <Image src="/assets/no user.png" alt="avatar" className="h-9 md:cursor-pointer" width={35} height={35} />
                  </div>
                  {!userDropDown && (
                     <p className="ml-2 text-sm font-[700] capitalize text-[#2073fa]">
                        {user?.firstname} {user?.lastname}
                     </p>
                  )}
                  {userDropDown && (
                     <div>
                        <motion.h5
                           className="ml-2 whitespace-nowrap text-sm font-[700] capitalize text-[#2073fa]"
                           initial={{ display: "none", opacity: 0 }}
                           animate={{
                              display: "block",
                              opacity: 1,
                              transition: { duration: "1", delay: 0.3 },
                           }}
                        >
                           {`${user?.firstname} ${user?.lastname}`}
                        </motion.h5>
                     </div>
                  )}
                  <div className="cursor-pointer pl-6 text-[32px] text-[#838383]" onClick={toggleUserDropDown}>
                     {userDropDown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                  </div>
               </div>
               {userDropDown && (
                  <div className="relative z-10">
                     <div>
                        <motion.header
                           className="mt-4 flex w-full  items-center justify-between border-t border-black pt-4"
                           initial={{ opacity: 0, y: "5px" }}
                           animate={{
                              opacity: 1,
                              y: 0,
                              transition: { duration: "0.5" },
                           }}
                           onClick={() => {
                              setSettingsTabOpen((prev) => !prev);
                           }}
                        >
                           <div className="flex items-center text-[#2073fa]">
                              <span className="text-xl">
                                 <IoSettingsSharp />
                              </span>
                              <motion.h5 className="ml-2 select-none text-sm font-[700]">Settings</motion.h5>
                           </div>
                           <span className="text-sm font-light">{settingsTabOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                        </motion.header>
                        <main
                           className={`mt-4 flex w-full flex-col gap-2 transition duration-300 ${
                              settingsTabOpen ? "h-[125px]" : "h-0"
                           } overflow-hidden`}
                        >
                           <UpdateUserForms />
                        </main>
                     </div>
                     <motion.div
                        className="mt-[1rem] flex cursor-pointer items-center pb-2 text-[#2073fa]"
                        initial={{ opacity: 0, y: "5px" }}
                        animate={{
                           opacity: 1,
                           y: 0,
                           transition: { delay: 0.3, duration: "0.5" },
                        }}
                        onClick={logout}
                     >
                        <span>
                           <BiLogOut />
                        </span>

                        <h5 className="ml-2 text-sm font-[500]">Logout</h5>
                     </motion.div>
                  </div>
               )}
            </div>
            {/* <div className="bell-shake relative cursor-pointer text-[24px] text-[#2073fa]">
               
               <BiBell />
            </div> */}
         </div>
      </div>
   );
};

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

   const { firstname: authFirstname, lastname: authLastname } = useSelector((state: RootState) => state.user.auth);
   return (
      <>
         <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
               updateUserForm(e, updateFirstname);
            }}
            className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-[#2073fa]"
         >
            <input
               type="text"
               className="h-full w-full border-none text-[15px] tracking-wider text-black outline-none placeholder:text-gray-500"
               placeholder="Update firstname"
               value={authFirstname}
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
               <FaEdit />
            </button>
         </form>
         <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
               updateUserForm(e, updateLastname);
            }}
            className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-[#2073fa]"
         >
            <input
               type="text"
               className="h-full w-full border-none text-[15px] tracking-wider text-black outline-none placeholder:text-gray-500"
               placeholder="Update lastname"
               value={authLastname}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(updateUser({ key: "lastname", value: e.target.value }));
               }}
            />
            <button type="submit" className="relative flex-[0.2] cursor-pointer text-xl font-bold text-gray-900">
               <FaEdit />
            </button>
         </form>
         {/* <form
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
               updateUserForm(e, updateEmail);
            }}
            className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-[#2073fa]"
         >
            <input
               type="text"
               className="h-full w-full border-none text-[15px] tracking-wider text-black outline-none placeholder:text-gray-500"
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
         {/* <form className="flex h-[35px] w-full items-center gap-2 rounded-[4px] border px-2 hover:border-[#2073fa]">
            <input
               type="text"
               className="h-full w-full border-none text-[15px] tracking-wider text-black outline-none placeholder:text-gray-500"
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

export default GeneralNav;
