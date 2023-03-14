import React, { ReactNode, useEffect, useState } from "react";
import SideNav from "@/components/parents/ParentSideNav";
import MobileSideNav from "@/components/parents/ParentMobileSideNav";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { changeCurrentChild } from "store/parentChildSlice";

interface Props {
   children?: ReactNode;
}

const ParentLayout = ({ children }: Props) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);
   const [childrenListOpen, setOpen] = useState<boolean>(false);
   const [width, setWidth] = useState(window.innerWidth);
   const { currentChild, children: parentChildren } = useSelector((state: RootState) => state.parentChild);

   // console.log(parentChildren);
   const { firstname, username } = useSelector((state: RootState) => state.user);
   // useEffect(() => {
   //    const handleResize = () => setWidth(window.innerWidth);
   //    window.addEventListener("resize", handleResize);
   //    const stringedToken = localStorage.getItem("token");
   //    const token = JSON.parse(`${stringedToken}`);
   //    if (token?.user_type !== "parent") {
   //       router.push("/login");
   //    }
   //    return () => {
   //       window.removeEventListener("resize", handleResize);
   //    };
   // }, [router]);
   return (
      <>
         <div className="parent-page min-h-screen">
            <div className="relative mb-auto flex grow items-stretch bg-white px-4 py-11 sm:pl-0 md:pl-0 xl:px-[4%]">
               <MobileSideNav className="mx-6 hidden sm:flex md:mr-6 xl:ml-0" />
               <SideNav />
               {width < 640 && (
                  <div className="relative">
                     <div
                        className="absolute left-[-8px] h-12 w-12 cursor-pointer rounded-lg sm:hidden"
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
                        <div className="absolute left-0 top-[48px] z-20 rounded-md border border-gray-300 bg-white px-2">
                           <MobileSideNav />
                        </div>
                     )}
                  </div>
               )}
               <main className="main place-items-centers relative z-0 mt-12 mr-[1%] grid  w-full rounded-2xl bg-[#ECEDF3] py-9 px-0 sm:mt-0 sm:rounded-[30px] sm:px-[3%]">
                  <div className="absolute right-[4%] top-9 mb-14 hidden w-fit items-center gap-3 sm:flex">
                     <span className="relative top-1">
                        <Image src="/assets/message.svg" alt="messages" width={22} height={22} className="blue-svg" />
                        <span className="absolute top-[-10px] right-[-10px] h-5 w-5 scale-75 rounded-full bg-[#FB4DAB] text-center text-xs leading-5 text-white">
                           1
                        </span>
                     </span>
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
                     <span className="text-base text-[#2073FA]">{username || firstname}</span>
                  </div>
                  <div className="relative">
                     <div
                        className="mt-4 mb-4 ml-4 flex items-center gap-3 sm:my-9 sm:ml-0"
                        onClick={() => {
                           setOpen((prev) => !prev);
                        }}
                     >
                        <h1 className="text-3xl font-semibold capitalize text-[#2073FA]">{currentChild?.fullName}</h1>
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
                     {childrenListOpen && (
                        <div className="absolute top-[70%] left-0 z-[4] max-h-[200px] min-h-[200px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-md bg-white shadow-md">
                           {parentChildren?.map((child, index) => {
                              return (
                                 <p
                                    key={index}
                                    onClick={() => {
                                       dispatch(changeCurrentChild(child));
                                       setOpen(false);
                                    }}
                                    className="w-full cursor-pointer px-3 py-3 capitalize text-black hover:bg-[#ced4e9]"
                                 >
                                    {child.fullName}
                                 </p>
                              );
                           })}
                        </div>
                     )}
                  </div>
                  {children}
               </main>
            </div>
         </div>
      </>
   );
};

export default ParentLayout;
