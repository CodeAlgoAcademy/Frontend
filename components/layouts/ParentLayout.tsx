import React, { ReactNode, useEffect, useState, MouseEvent } from "react";
import SideNav from "@/components/parents/UI/ParentSideNav";
import MobileSideNav from "@/components/parents/UI/ParentMobileSideNav";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { changeCurrentChild, getChildren, resetChild } from "store/parentChildSlice";
import { motion } from "framer-motion";
import { resetAuthUser } from "store/authSlice";
import { UpdateUserForms } from "../navbar/dashboard/GeneralNav";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import messageService from "services/messagesService";
import AddChildModal from "../parents/multiplayer/AddChildModal";
import { closeAddChildModal } from "store/modalSlice";
import { getUserFromLocalStorage } from "utils/getTokens";
import { IUser } from "types/interfaces";
import Link from "next/link";
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

interface Props {
   children?: ReactNode;
}

const ParentLayout = ({ children }: Props) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);
   const [childrenListOpen, setOpen] = useState<boolean>(false);
   const [user, setUser] = useState<IUser | null>();
   const [userDropDown, setUserDropDown] = useState<boolean>(false);
   const [unreadMessages, setUnreadMessages] = useState(0);

   const parent = useSelector((state: RootState) => state.parentChild);
   const { addChildModalOpen } = useSelector((state: RootState) => state.modal);
   const { firstname, username, lastname, email } = useSelector((state: RootState) => state.user);

   const closeChildrenList = (e: any) => {
      if (!e.target.classList.contains("do-not-select") && childrenListOpen) {
         setOpen(false);
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("token_timestamp");
      dispatch(resetAuthUser());
      router.push("/login");
   };

   useEffect(() => {
      if (typeof window !== "undefined") {
         const stringedToken = localStorage.getItem(ILocalStorageItems.token);
         const token = JSON.parse(`${stringedToken}`);
         if (token?.user_type !== "parent") {
            router.push("/login");
         } else {
            setUser(getUserFromLocalStorage());
         }
      }
   }, [router]);

   const { openedMessage } = useSelector((state: RootState) => state.messages);

   // fetch the number of unread messages
   const getConversations = async () => {
      const messages = await messageService.getParentConversation();
      const unreadMessages = await messages?.filter((message: any) => message?.message?.user?.email !== email && !message?.message?.is_read);
      setUnreadMessages(unreadMessages.length || 0);
   };

   React.useEffect(() => {
      getConversations();
   }, [openedMessage]);

   React.useEffect(() => {
      dispatch(resetChild());
      dispatch(getChildren());
      dispatch(closeAddChildModal());
   }, []);

   return (
      <>
         <div className="parent-page max-h-screen min-h-screen" onClick={closeChildrenList}>
            {/* Modal to be displayed when a prent wants to add a child from any page */}
            {addChildModalOpen && <AddChildModal />}
            <div className="relative mb-auto flex max-h-screen grow flex-col items-stretch bg-white px-4 w500:flex-row w500:pl-0 md:pl-0 xl:px-[4%]">
               <MobileSideNav className="mx-6 hidden w500:flex md:mr-6 xl:ml-0" />
               <SideNav unread={unreadMessages} />
               <div className="relative flex items-center justify-between pt-4 w500:hidden">
                  <div>
                     <Link href={"/teachers/addClass"} className="max-w-[100px]">
                        <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" height={60} width={120} />
                     </Link>
                  </div>
                  <div
                     className="h-12 w-12 cursor-pointer rounded-lg w500:hidden"
                     onClick={() => {
                        setDetachedNavDisplay((prev) => !prev);
                     }}
                  >
                     <svg
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                     >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                           {" "}
                           <title>Menu</title>{" "}
                           <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              {" "}
                              <g id="Menu">
                                 {" "}
                                 <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24">
                                    {" "}
                                 </rect>{" "}
                                 <line x1="5" y1="7" x2="19" y2="7" id="Path" stroke="#d9dadd" strokeWidth="2" strokeLinecap="round">
                                    {" "}
                                 </line>{" "}
                                 <line x1="5" y1="17" x2="19" y2="17" id="Path" stroke="#d9dadd" strokeWidth="2" strokeLinecap="round">
                                    {" "}
                                 </line>{" "}
                                 <line x1="5" y1="12" x2="19" y2="12" id="Path" stroke="#d9dadd" strokeWidth="2" strokeLinecap="round">
                                    {" "}
                                 </line>{" "}
                              </g>{" "}
                           </g>{" "}
                        </g>
                     </svg>
                  </div>
                  {detachedNavDisplay && (
                     <div className="absolute right-[1rem] top-[70px] z-20 rounded-md border border-gray-300 bg-white px-2">
                        <MobileSideNav />
                     </div>
                  )}
               </div>
               <main className="relative z-0 mr-[1%] max-h-[100%] min-h-[100%] w-full flex-1 rounded-2xl py-4 xl:ml-[250px]">
                  <div className="h-full max-h-full overflow-y-scroll bg-[#ECEDF3] py-9 px-0 pt-12 w500:rounded-[30px] w500:px-[3%] ">
                     <div className=" mb-6 hidden w-full items-center justify-end gap-3 w500:flex">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M10.7998 1C5.27695 1 0.799805 5.47715 0.799805 11C0.799805 16.5228 5.27695 21 10.7998 21C16.3226 21 20.7998 16.5228 20.7998 11C20.7998 5.47715 16.3226 1 10.7998 1Z"
                              stroke="#2073FA"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                           <path
                              d="M3.0708 17.3457C3.0708 17.3457 5.29982 14.5 10.7998 14.5C16.2998 14.5 18.5289 17.3457 18.5289 17.3457"
                              stroke="#2073FA"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                           <path
                              d="M10.7998 11C12.4567 11 13.7998 9.6569 13.7998 8C13.7998 6.34315 12.4567 5 10.7998 5C9.1429 5 7.7998 6.34315 7.7998 8C7.7998 9.6569 9.1429 11 10.7998 11Z"
                              stroke="#2073FA"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                        <div className="relative cursor-pointer">
                           <div
                              onClick={() => {
                                 setUserDropDown((prev) => !prev);
                              }}
                              className="flex items-center gap-2"
                           >
                              <span className="text-base text-mainColor">{user?.username || `${user?.firstname} ${user?.lastname}`}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                                 <path
                                    d="M1.7998 1.25L9.2998 8.75L16.7998 1.25"
                                    stroke="#2073FA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                              </svg>
                           </div>

                           {userDropDown && (
                              <div
                                 className={`absolute transition duration-500 ${
                                    userDropDown ? " opacity-100" : "opacity-0"
                                 } top-[140%] right-0 z-[6] w-[90vw] max-w-[300px] rounded-md bg-white px-4 py-4`}
                              >
                                 <div className="relative z-10">
                                    <div className="flex items-center justify-between text-[18px] font-bold text-mainColor">
                                       <h1 className="flex items-center gap-x-3 ">
                                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                d="M10.7998 1C5.27695 1 0.799805 5.47715 0.799805 11C0.799805 16.5228 5.27695 21 10.7998 21C16.3226 21 20.7998 16.5228 20.7998 11C20.7998 5.47715 16.3226 1 10.7998 1Z"
                                                stroke="#2073FA"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                             />
                                             <path
                                                d="M3.0708 17.3457C3.0708 17.3457 5.29982 14.5 10.7998 14.5C16.2998 14.5 18.5289 17.3457 18.5289 17.3457"
                                                stroke="#2073FA"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                             />
                                             <path
                                                d="M10.7998 11C12.4567 11 13.7998 9.6569 13.7998 8C13.7998 6.34315 12.4567 5 10.7998 5C9.1429 5 7.7998 6.34315 7.7998 8C7.7998 9.6569 9.1429 11 10.7998 11Z"
                                                stroke="#2073FA"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                             />
                                          </svg>

                                          {firstname && lastname ? `${firstname} ${lastname}` : `${user?.firstname} ${user?.lastname}`}
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
                                       onClick={logout}
                                    >
                                       <span>
                                          <BiLogOut />
                                       </span>

                                       <h5 className="ml-2 text-[1rem] font-bold">Logout</h5>
                                    </motion.div>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="flex flex-wrap items-center justify-between">
                        <div className="relative">
                           <div
                              className="do-not-select mt-4 mb-4 ml-4 flex max-w-fit items-center gap-3 w500:ml-0"
                              onClick={() => {
                                 setOpen((prev) => !prev);
                              }}
                              data-testid="select-child"
                           >
                              <h1 className="do-not-select cursor-pointer text-2xl font-semibold capitalize text-mainColor md:text-3xl ">
                                 {parent?.currentChild?.fullName}
                              </h1>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="do-not-select cursor-pointer"
                                 width="18"
                                 height="10"
                                 viewBox="0 0 18 10"
                                 fill="none"
                              >
                                 <path
                                    d="M1.7998 1.25L9.2998 8.75L16.7998 1.25"
                                    stroke="#2073FA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                              </svg>
                           </div>
                           {childrenListOpen && (
                              <div className="do-not-select absolute top-[70%] left-0 z-[4] max-h-[200px] min-h-[200px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-md bg-white shadow-md">
                                 {parent?.children?.map((child, index) => {
                                    return (
                                       <p
                                          key={index}
                                          onClick={() => {
                                             dispatch(changeCurrentChild(child));
                                             setOpen(false);
                                          }}
                                          className="do-not-select w-full cursor-pointer px-3 py-3 capitalize text-black hover:bg-[#ced4e9]"
                                          data-testid="child"
                                       >
                                          {child.fullName}
                                       </p>
                                    );
                                 })}
                              </div>
                           )}
                        </div>

                        {parent?.currentChild && (
                           <Link href={"http://www.play.codealgoacademy.com"} target="_blank">
                              <button className="min-w-fit rounded-md border-none bg-mainColor px-[.8rem] py-[5px] text-white outline-none">
                                 Log in to game
                              </button>
                           </Link>
                        )}
                     </div>
                     {children}
                  </div>
               </main>
            </div>
         </div>
      </>
   );
};

export default ParentLayout;
