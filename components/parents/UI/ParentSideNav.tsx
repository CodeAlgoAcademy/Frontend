import React, { useState } from "react";
import NavButton from "./NavButton";
import Image from "next/image";
import messageService from "services/messagesService";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { GrOrganization } from "react-icons/gr";
import { SlOrganization } from "react-icons/sl";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { GiHelp } from "react-icons/gi";

const SideNav = ({ unread }: { unread: number }) => {
   return (
      <div className="parent-sidenav absolute left-0 top-0 mr-[4%] mt-3 hidden h-screen w-[250px] flex-auto flex-col gap-4 p-[1rem] xl:flex">
         <div className="mx-auto max-w-fit">
            <Image src={"/assets/CodeAlgo_Logo.png"} className="h-9 md:cursor-pointer" alt="logo" loading="lazy" width={110} height={55} />
         </div>
         <div className="mt-5">
            <NavButton title="Main Dashboard" image="Dashboard.svg" url="/parents" />
         </div>
         <div className="relative">
            {/* <NavButton title="Messages" image="message.svg" url="/parents/messages" notification={unread > 0 ? unread : ""} /> */}
         </div>
         <div>
            <h2 className="ml-7 mb-3 text-xl font-medium text-[#A8ABB0]">ACCOUNT</h2>
            {/* <NavButton title="Billing" image="Billing.svg" url="/parents/billing" /> */}
            <NavButton title="Student Accounts" image="people.svg" url="/parents/student" />
            <NavButton title="Organization" image={<SlOrganization />} url="/parents/organization" />
         </div>
         <div>
            <h2 className="ml-7 mb-3 text-xl font-medium text-[#A8ABB0]">SAFETY</h2>
            <NavButton title="Screen Time" image="screen-time.svg" url="/parents/screen-time" />
            {/* <NavButton title="Multiplayer" image="game.svg" url="/parents/multiplayer" /> */}
         </div>
         <NavButton image={<GiHelp />} url="https://discord.gg/FmQbpJGF" title="Get Help"></NavButton>
      </div>
   );
};

export default SideNav;
