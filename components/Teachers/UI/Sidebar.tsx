import React, { useState } from "react";
import Link from "next/link";
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import { useRouter } from "next/router";
import Image from "next/image";

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
      name: "calendar",
      icon: <HiOutlineCalendar />,
      url: "/teachers/calendar",
   },
   {
      name: "messages",
      icon: <BiMessageRounded />,
      url: "/teachers/messages",
   },
];

const Sidebar = () => {
   const router = useRouter();
   const [activeLink, setActiveLink] = useState(router?.pathname);
   return (
      <div className="overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto">
         <div className="relative mx-auto my-8 h-[60px] w-[100px]">
            <Link href="/teachers/addClass">
               <a>
                  <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" layout="fill" objectFit="contain" />
               </a>
            </Link>
         </div>
         <>
            <div className="">
               {links.map((link) => (
                  <div key={link.name} className="mx-auto mb-5 w-[228px]">
                     <Link href={`${link.url}`}>
                        <div
                           className={
                              activeLink === link.url || (router?.pathname.includes(link.url) && link.url !== "/teachers")
                                 ? "flex cursor-pointer items-center gap-6 rounded-[28px] bg-[#2073fa] px-[30px] py-[14px] text-white"
                                 : "flex cursor-pointer items-center gap-6 rounded-[28px] px-[30px]  py-[14px] text-gray-600 hover:bg-slate-50 "
                           }
                           onClick={() => {
                              setActiveLink(() => link.url);
                           }}
                        >
                           <span
                              className={`text-lg ${
                                 activeLink === link.url || (router?.pathname.includes(link.url) && link.url !== "/teachers")
                                    ? "text-white"
                                    : "text-[#2073fa]"
                              }`}
                           >
                              {link.icon}
                           </span>
                           <span className="text-base font-semibold capitalize">{link.name}</span>
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         </>
      </div>
   );
};

export default Sidebar;
