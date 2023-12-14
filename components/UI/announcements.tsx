import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { MdCancel, MdClose } from "react-icons/md";
import { AnnouncementStates, getAnnouncementSession, removeAnnouncementSession } from "utils/announcement";

export default function Announcements() {
   const slug = useRouter();
   const [isOpen, setIsOpen] = useState(true);

   //    it should have teacher or parent in the route but it shouldn't be /login/teacher or /signup/teacher
   const isDashboardPage =
      (slug.pathname.includes("/teacher") || slug.pathname.includes("parent")) &&
      !(slug.pathname.includes("login") || slug.pathname.includes("signup"));

   if (!isOpen) return <></>;

   return (
      <div className={`text-white ${isDashboardPage ? "bg-[#2073fa]" : "bg-orange-400"}  z-[50] flex w-full items-center justify-center p-2`}>
         <p className="flex cursor-pointer items-center gap-2">
            <IoInformationCircle /> This is a beta
         </p>
         {/* <span>
            <MdClose cursor="pointer" size={26} onClick={() => setIsOpen(false)} />
         </span> */}
      </div>
   );
}
