import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../Teachers/UI/Sidebar";
import GeneralNav from "../navbar/dashboard/GeneralNav";
import { useRouter } from "next/router";
import TeacherMobileSideNav from "../Teachers/UI/TeacherMobileSideNav";
import { BiHomeAlt } from "react-icons/bi";
import Link from "next/link";
import { CurrentClassState, IClass, IUser } from "types/interfaces";
import { getUserFromLocalStorage } from "utils/getTokens";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getAllClasses } from "services/classesService";
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import { GrOrganization } from "react-icons/gr";
import { SlOrganization } from "react-icons/sl";
import Image from "next/image";

interface Props {
   children?: ReactNode;
   className?: string;
}

const links = [
   {
      name: "dashboard",
      icon: <TbLayoutDashboard />,
      url: "/teachers",
   },
   {
      name: "curriculum",
      icon: <TbClipboardText />,
      url: "/teachers/curriculum",
   },
   {
      name: "students",
      icon: <FaUserGraduate />,
      url: "/teachers/students",
   },
   {
      name: "organizations",
      icon: <SlOrganization />,
      url: "/teachers/organization",
   },
   // {
   //    name: "calendar",
   //    icon: <HiOutlineCalendar />,
   //    url: "/teachers/calendar",
   // },
   // {
   //    name: "messages",
   //    icon: <BiMessageRounded />,
   //    url: "/teachers/messages",
   // },
];

const TeacherLayout = ({ children, className }: Props) => {
   const router = useRouter();
   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);
   const dispatch = useDispatch();

   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);
   const classes = useSelector((state: RootState): IClass[] => state.allClasses.classes);

   // Incase the user refreshes the page
   const getClass = async () => {
      const data = await dispatch(getAllClasses());
   };

   useEffect(() => {
      if (!currentClass || classes?.length === 0) {
         getClass();
      }
   }, [router?.pathname]);

   useEffect(() => {
      const stringedToken = localStorage.getItem("token");
      const token = JSON.parse(`${stringedToken}`);
      if (token?.user_type !== "teacher") {
         router?.push("/login");
      }
   }, [router]);
   return (
      <div className="flex min-h-[90dvh] flex-col">
         {/* <Header /> */}
         <div className="mb-auto flex grow items-stretch">
            {/* Side nav */}
            <div className="sidebar fixed top-0 left-0 hidden h-screen w-[280px] bg-white w840:block">
               <Sidebar links={links} />
            </div>
            {/* Mobile Nav */}
            <div className="mt-14 ml-4 hidden w500:block w840:hidden">
               <Link href={`/teachers/addClass`}>
                  <div className="text-mainColor flex justify-center text-[28px]">
                     <BiHomeAlt />
                  </div>
               </Link>
               <TeacherMobileSideNav />
            </div>

            <div className={`flex max-h-[100vh] flex-1 flex-col overflow-scroll  w500:ml-[280px] w840:pl-[3vw]`}>
               <div className="relative mt-10 flex items-center justify-between px-[1rem] w500:hidden">
                  <div className="">
                     <Link href={"/teachers/addClass"} className="max-w-[100px]">
                        <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" height={60} width={120} />
                     </Link>
                  </div>
                  <div
                     className="ml-4  h-12 w-12 cursor-pointer rounded-lg"
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
                     <div className="absolute right-[1rem] top-[60px] z-20 rounded-md border border-gray-300 bg-white px-2">
                        <div className="mt-4">
                           <Link href={`/teachers/addClass`}>
                              <div className="text-mainColor flex justify-center text-[28px]">
                                 <BiHomeAlt />
                              </div>
                           </Link>
                           <TeacherMobileSideNav />
                        </div>
                     </div>
                  )}
               </div>
               <GeneralNav />
               <div
                  className={`mx-auto mt-[20px] max-h-full w-full max-w-[96%] flex-1 overflow-y-scroll rounded-3xl bg-[#ECEDF3] px-[1rem] py-8 w500:mt-[45px] md:px-[6%] ${className}`}
               >
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeacherLayout;
