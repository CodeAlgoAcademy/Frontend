import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiHome, BiHomeAlt, BiMenu } from "react-icons/bi";
import Link from "next/link";
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb";
import { SlOrganization } from "react-icons/sl";
import Image from "next/image";
import BetaButton from "../UI/beta-button";
import TeacherSidebar from "../Teachers/UI/Sidebar";
import UserInfo from "../Teachers/UI/UserInfo";
import { MdClass, MdMenu } from "react-icons/md";
import ClassSelector from "../Teachers/UI/ClassSelector";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getAllClasses } from "services/classesService";
import { FiActivity } from "react-icons/fi";

interface Props {
   children?: ReactNode;
   className?: string;
}

const links = [
   // {
   //    name: "Classes",
   //    icon: <MdClass />,
   //    url: "/teachers/addClass",
   // },
   {
      name: "dashboard",
      icon: <TbLayoutDashboard />,
      url: "/teachers",
   },
   {
      name: "Activity",
      icon: <FiActivity />,
      url: "/teachers/activities",
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
   const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);
   const router = useRouter();
   const dispatch = useDispatch();

   useEffect(() => {
      // const stringedToken = localStorage.getItem(ILocalStorageItems.token);
      // const token = JSON.parse(`${stringedToken}`);
      // if (token?.user_type !== "teacher") {
      //    router?.push("/login");
      // }
   }, [router]);

   useEffect(() => {
      dispatch(getAllClasses());
   }, [router.pathname]);

   return (
      <section className="h-screen w-full bg-white md:flex md:px-4">
         <TeacherSidebar links={links} isOpen={sidebarOpened} close={() => setSidebarOpened(false)} />
         <section className={`
       flex h-screen max-h-screen w-full flex-col items-center overflow-hidden
       transition-all duration-500
       w820:ml-[300px]
     `}>
            <nav className="flex w-full items-center justify-between gap-2 py-2 px-4 md:py-6 md:px-0">
               <div className="flex items-center gap-2">
                  <div className="md:hidden">
                     <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" width={90} height={45} />
                  </div>
                  <Link href={`/teachers/addClass`}>
                     <BiHomeAlt size={24} color="#2073fa" title="Back to classes" cursor="pointer" />
                  </Link>
                  <div className="hidden md:block">
                     <ClassSelector />
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <BetaButton />
                  <UserInfo />
                  <MdMenu cursor={"pointer"} size={26} className="md:hidden" onClick={() => setSidebarOpened(true)} />
               </div>
            </nav>

            <div className={`w-full flex-1 bg-[#ecedf3] p-[1rem] md:h-full overflow-y-scroll md:rounded-[30px] md:p-[2rem] ${className}`}>
               <div className="flex items-center justify-end md:hidden">
                  <ClassSelector />
               </div>
               {children}
            </div>
         </section>
      </section>
   );
};

export default TeacherLayout;
