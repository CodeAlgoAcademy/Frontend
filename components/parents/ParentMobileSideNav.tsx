import React from "react";
import NavButton from "./NavButton";

const linkDetails = [
   [{ title: "Main Dashboard", image: "Dashboard.svg", url: "/parents" }],
   [{ title: "Messages", image: "message.svg", url: "/parents/messages" }],
   [
      { title: "Billing", image: "Billing.svg", url: "/parents/billing" },
      { title: "Student Accounts", image: "people.svg", url: "/parents/student" },
   ],
   [
      { title: "Screen Time", image: "screen-time.svg", url: "/parents/screen-time" },
      { title: "Multiplayer", image: "game.svg", url: "/parents/multiplayer" },
   ],
];

const ParentMobileSideNav = ({ className }: { className?: string }) => {
   return (
      <div
         className={`sticky top-0 z-[3] mr-[3%] flex h-full min-w-[50px] flex-col gap-4 divide-y bg-white px-3 py-2 first:pt-0 xl:hidden ${className}`}
      >
         {linkDetails.map((links, index) => {
            return (
               <div className="flex flex-col justify-between gap-3 pt-4" key={`${index}`}>
                  {links.map(({ title, url, image }) => {
                     return <NavButton {...{ image, url, title, isIcon: true }} key={title} />;
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default ParentMobileSideNav;
