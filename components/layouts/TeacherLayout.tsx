import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../Teachers/UI/Sidebar";
import GeneralNav from "../navbar/dashboard/GeneralNav";
import { useRouter } from "next/router";
import TeacherMobileSideNav from "../Teachers/UI/TeacherMobileSideNav";
import { BiHomeAlt } from "react-icons/bi";
import Link from "next/link";
import { IUser } from "types/interfaces";
import { getUserFromLocalStorage } from "utils/getTokens";

interface Props {
   children?: ReactNode;
   className?: string;
}

const TeacherLayout = ({ children, className }: Props) => {
   const router = useRouter();
   const [width, setWidth] = useState(0);
   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);

   useEffect(() => {
      setWidth(window.innerWidth);
   }, []);

   useEffect(() => {
      const stringedToken = localStorage.getItem("token");
      const token = JSON.parse(`${stringedToken}`);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      if (token?.user_type !== "teacher") {
         router?.push("/login");
      }
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [router]);
   return (
      <div className="flex min-h-screen flex-col">
         {/* <Header /> */}
         <div className="mb-auto flex grow items-stretch">
            {width > 840 && (
               <div className="sidebar w-[280px] bg-white">
                  <Sidebar />
               </div>
            )}
            {width < 840 && width > 500 && (
               <div className="mt-14 ml-4">
                  <Link href={`/teachers/addClass`}>
                     <div className="flex justify-center text-[28px] text-[#2073fa]">
                        <BiHomeAlt />
                     </div>
                  </Link>
                  <TeacherMobileSideNav />
               </div>
            )}
            <div className={`flex-1 pr-[3vw] pb-6`} style={{ paddingLeft: width < 840 ? "3vw" : "0" }}>
               {width < 500 && (
                  <div className="relative my-10 pr-8">
                     <div
                        className="absolute left-0 h-12 w-12 cursor-pointer rounded-lg"
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
                           <div className="mt-4">
                              <Link href={`/teachers/addClass`}>
                                 <div className="flex justify-center text-[28px] text-[#2073fa]">
                                    <BiHomeAlt />
                                 </div>
                              </Link>
                              <TeacherMobileSideNav />
                           </div>
                        </div>
                     )}
                  </div>
               )}
               {width > 840 && <GeneralNav />}
               <div
                  className={`rounded-3xl bg-[#ECEDF3] px-[1rem] py-8 md:px-[6%] ${
                     width > 500 ? "mt-[45px]" : "mt-[100px]"
                  } mx-auto min-h-[620px] w-full max-w-[96vw] ${className}`}
               >
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeacherLayout;
