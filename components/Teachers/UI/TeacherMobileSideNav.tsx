import React from "react";
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import NavButton from "components/parents/UI/NavButton";

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

const TeacherMobileSideNav = ({ className }: { className?: string }) => {
   return (
      <div className={`sticky top-0 z-20 mr-[3%] flex h-full min-w-[50px] flex-col gap-4 divide-y py-2 first:pt-0 xl:hidden ${className}`}>
         <div className="flex flex-col justify-between gap-3 pt-4">
            {links.map(({ name, icon, url }) => {
               return <NavButton {...{ image: icon, url, title: name }} key={name} isIcon={true} />;
            })}
         </div>
      </div>
   );
};

export default TeacherMobileSideNav;
