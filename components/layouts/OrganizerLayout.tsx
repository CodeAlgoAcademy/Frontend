import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../Teachers/UI/Sidebar";
import GeneralNav from "../navbar/dashboard/GeneralNav";
import { useRouter } from "next/router";
import TeacherMobileSideNav from "../Teachers/UI/TeacherMobileSideNav";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import Link from "next/link";
import OrganizerMobileNav from "../organizers/OrganizerMobileNav";
import { TbLayoutDashboard } from "react-icons/tb";
import { FcOrganization } from "react-icons/fc";

interface Props {
   children?: ReactNode;
}

const links = [
   {
      name: "dashboard",
      icon: <TbLayoutDashboard />,
      url: "/organizers",
   },
   {
      name: "Add Organization",
      icon: <FcOrganization />,
      url: "/organizers/create-organization",
   },
];

const OrganizerLayout = ({ children }: Props) => {
   const router = useRouter();
   // const [width, setWidth] = useState(0);
   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);

   // useEffect(() => {
   //    setWidth(window.innerWidth);
   // }, []);

   //    useEffect(() => {
   //       const stringedToken = localStorage.getItem("token");
   //       const token = JSON.parse(`${stringedToken}`);
   //       const handleResize = () => setWidth(window.innerWidth);
   //       window.addEventListener("resize", handleResize);
   //       if (token?.user_type !== "teacher") {
   //          router?.push("/login/select-account-type");
   //       }
   //       return () => {
   //          window.removeEventListener("resize", handleResize);
   //       };
   //    }, [router]);

   return (
      <div className="flex min-h-screen flex-col">
         {/* <Header /> */}
         <div className="mb-auto flex grow items-stretch">
            <div className="sidebar hidden min-w-[280px] bg-white w840:block">
               <Sidebar links={links} />
            </div>

            <div className="mt-14 ml-4 hidden w500:block w840:hidden">
               {/* <Link href={`/teachers/addClass`}>
                     <div className="flex justify-center text-[28px] text-[#2073fa]">
                        <BiHomeAlt />
                     </div>
                  </Link> */}
               <OrganizerMobileNav />
            </div>
            <div className={`flex-1 pr-[3vw] pb-6 pl-[3vw] w840:pl-0`}>
               <div className="relative my-10 block pr-8 w500:hidden">
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
                           {/* <Link href={`/teachers/addClass`}>
                                 <div className="flex justify-center text-[28px] text-[#2073fa]">
                                    <BiHomeAlt />
                                 </div>
                              </Link> */}
                           <OrganizerMobileNav />
                        </div>
                     </div>
                  )}
               </div>

               <div
                  className={`mx-auto mt-[100px] min-h-[620px]  max-w-[96vw] overflow-y-scroll rounded-3xl bg-[#ECEDF3] px-[1rem] py-8 w500:mt-[45px] w500:max-h-screen md:px-[6%]`}
               >
                  <header className="flex w-full items-center justify-between gap-[1rem]">
                     <div></div>

                     <h2 className="cursor-pointer text-[1.2rem] font-bold text-[#2073fa]">
                        <span className="mr-2 inline-block align-middle">
                           <BiUser />
                        </span>
                        Adejare Daniel
                     </h2>
                  </header>

                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrganizerLayout;
