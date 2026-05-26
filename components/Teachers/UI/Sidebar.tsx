import React, { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdClose, MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

export interface ILink {
   name: string;
   icon: ReactElement | string;
   url?: string;
   subLinks?: { name: string; url: string }[];
}

interface Props {
   links: ILink[];
   isOpen: boolean;
   close(): void;
}

const TeacherSidebar = ({ links, isOpen, close }: Props) => {
   const router = useRouter();
   const [expandedMenus, setExpandedMenus] = useState<string[]>(["Classroom", "Reports & Settings"]);

   const toggleMenu = (name: string) => {
      setExpandedMenus((prev) =>
         prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
      );
   };

   return (
      <aside
         className={`
         ${isOpen ? "translate-x-0" : "-translate-x-full"}
         fixed top-0 left-0 z-[50] h-full w-full bg-white p-4 transition-transform duration-300 
         md:translate-x-0 md:w-[280px] border-r border-gray-100 overflow-y-auto
      `}
      >
         <div className="mb-8 flex w-full items-center justify-between gap-2">
         <div className="block max-w-[150px]  md:mx-auto">
         <Link href={router?.pathname?.includes("/teacher") ? "/teachers/addClass" : "/organizers"}>
         <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" width={90} height={45} />
         </Link>
         </div>
         <span className="block md:hidden" onClick={close}>
         <MdClose size={26} cursor={"pointer"} />
         </span>
         </div>

         <div className="flex flex-col gap-1">
            {links.map((link) => {
               const isExpanded = expandedMenus.includes(link.name);
               const hasSubLinks = !!link.subLinks;
               const isActive = router.pathname === link.url || link.subLinks?.some(s => s.url === router.pathname);

               return (
                  <div key={link.name} className="w-full">
                     {hasSubLinks ? (
                        <button
                           onClick={() => toggleMenu(link.name)}
                           className="flex w-full items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                           <div className="flex items-center gap-4">
                              <span className="text-xl">{link.icon}</span>
                              <span className="text-[16px] font-medium">{link.name}</span>
                           </div>
                           {isExpanded ? <MdKeyboardArrowDown size={20} className="text-gray-400" /> : <MdKeyboardArrowRight size={20} className="text-gray-400" />}
                        </button>
                     ) : (
                        <Link href={link.url || "#"} onClick={close}>
                           <div
                              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all mb-1 ${
                                 isActive
                                    ? "bg-[#007bff] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-50"
                              }`}
                           >
                              <span className={`text-xl ${isActive ? "text-white" : ""}`}>{link.icon}</span>
                              <span className="text-[16px] font-medium">{link.name}</span>
                           </div>
                        </Link>
                     )}

                     {hasSubLinks && isExpanded && (
                        <div className="ml-12 flex flex-col gap-4 py-2 mb-2">
                           {link.subLinks?.map((sub) => (
                              <Link key={sub.url} href={sub.url} onClick={close}>
                                 <div
                                    className={`text-[15px] cursor-pointer transition-colors ${
                                       router.pathname === sub.url
                                          ? "text-[#007bff] font-semibold"
                                          : "text-gray-600 hover:text-black"
                                    }`}
                                 >
                                    {sub.name}
                                 </div>
                              </Link>
                           ))}
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </aside>
   );
};

export default TeacherSidebar;