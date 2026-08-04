import React from "react";
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineCalendar, HiUsers } from "react-icons/hi";
import { BiMessageRounded, BiUserPin } from "react-icons/bi";
import NavButton from "components/parents/UI/NavButton";
import { FcOrganization } from "react-icons/fc";
import { GrOrganization } from "react-icons/gr";
import { SlOrganization } from "react-icons/sl";
import { useTranslation } from "react-i18next";

const OrganizerMobileNav = ({ className }: { className?: string }) => {
   const { t } = useTranslation("organizer");
   const links = [
      {
         name: t("dashboard"),
         icon: <TbLayoutDashboard />,
         url: "/organizers",
      },
      {
         name: t("createOrganization"),
         icon: <SlOrganization />,
         url: "/organizers/create-organization",
      },
      {
         name: t("roles"),
         icon: <BiUserPin />,
         url: "/organizers/roles",
      },
      {
         name: t("users"),
         icon: <HiUsers />,
         url: "/organizers/users",
      },
   ];
   return (
      <div className={`sticky top-0 z-20 mr-[3%] flex h-full min-w-[50px] flex-col gap-4 divide-y py-2 first:pt-0 xl:hidden ${className}`}>
         <div className="flex flex-col justify-between gap-3 pt-4">
            {links.map(({ name, icon, url }) => {
               return <NavButton {...{ image: icon, url, title: name }} key={name} />;
            })}
         </div>
      </div>
   );
};

export default OrganizerMobileNav;
