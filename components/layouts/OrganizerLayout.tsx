import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../Teachers/UI/Sidebar";
import GeneralNav from "../navbar/dashboard/GeneralNav";
import { useRouter } from "next/router";
import TeacherMobileSideNav from "../Teachers/UI/TeacherMobileSideNav";
import { BiHomeAlt, BiUser, BiUserPin } from "react-icons/bi";
import Link from "next/link";
import OrganizerMobileNav from "../organizers/OrganizerMobileNav";
import { TbLayoutDashboard } from "react-icons/tb";
import { FcOrganization } from "react-icons/fc";
import { HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { selectOrganization } from "store/organizersSlice";
import { getUserFromLocalStorage } from "utils/getTokens";
import { fetchOrganiztions } from "services/organizersService";

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
   {
      name: "Roles",
      icon: <BiUserPin />,
      url: "/organizers/roles",
   },
   {
      name: "Licenses",
      icon: <BiUserPin />,
      url: "/organizers/licenses",
   },
   {
      name: "Users",
      icon: <HiUsers />,
      url: "/organizers/users",
   },
];

const OrganizerLayout = ({ children }: Props) => {
   const router = useRouter();
   // const [width, setWidth] = useState(0);
   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);
   const [organizationListOpen, setOpen] = useState<boolean>(false);

   const dispatch = useDispatch();

   const organizer = useSelector((state: RootState) => state?.organizer);

   const organizations = organizer?.organizations;
   const selectedOrganization = organizer?.selectedOrganization;

   const user = getUserFromLocalStorage();

   useEffect(() => {
      const stringedToken = localStorage.getItem("token");
      const token = JSON.parse(`${stringedToken}`);
      if (!stringedToken || !token || token?.user_type !== "organizer") {
         router?.push("/login");
      }
   }, [router]);

   useEffect(() => {
      dispatch(fetchOrganiztions());
   }, []);

   return (
      <div className="flex min-h-screen flex-col">
         {/* <Header /> */}
         <div className="mb-auto flex grow items-stretch">
            <div className="sidebar hidden min-w-[280px] bg-white w840:block">
               <Sidebar links={links} />
            </div>

            <div className="mt-14 ml-4 hidden w500:block w840:hidden">
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
                                 <div className="flex justify-center text-[28px] text-mainColor">
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

                     <h2 className="text-mainColor cursor-pointer text-[1.2rem] font-bold">
                        <span className="mr-2 inline-block align-middle">
                           <BiUser />
                        </span>
                        {user?.username}
                     </h2>
                  </header>

                  <div className="relative">
                     <div
                        className=" mt-4 mb-4 ml-4 flex max-w-fit items-center gap-3 sm:ml-0"
                        onClick={() => {
                           setOpen((prev) => !prev);
                        }}
                     >
                        <h1 className="text-mainColor text-3xl font-semibold capitalize">{selectedOrganization?.name}</h1>
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
                     {organizationListOpen && (
                        <div className="absolute top-[110%] left-0 z-[4] max-h-[200px] min-h-[200px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-md bg-white shadow-md">
                           {organizations?.map((organization, index) => {
                              return (
                                 <p
                                    key={index}
                                    onClick={() => {
                                       setOpen(false);
                                       dispatch(selectOrganization(organization));
                                    }}
                                    className="w-full cursor-pointer px-3 py-3 capitalize text-black hover:bg-[#ced4e9]"
                                    data-testid="organization"
                                 >
                                    {organization.name}
                                 </p>
                              );
                           })}
                        </div>
                     )}
                  </div>

                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrganizerLayout;
