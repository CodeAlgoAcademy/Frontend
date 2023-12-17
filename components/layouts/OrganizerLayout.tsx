import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../Teachers/UI/Sidebar";
import { useRouter } from "next/router";
import TeacherMobileSideNav from "../Teachers/UI/TeacherMobileSideNav";
import { BiHomeAlt, BiMenu, BiUser, BiUserCircle, BiUserPin } from "react-icons/bi";
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
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import OrganizerSidebar from "../organizers/UI/Sidebar";
import BetaButton from "../UI/beta-button";
import { GoChevronDown } from "react-icons/go";
import UserDropDown from "../parents/UI/UserDropDown";
import OrganizationsList from "../organizers/UI/OrganizationsList";

interface OrganizerTabs {
   user: boolean;
   organizations: boolean;
   sidebar: boolean;
}
interface Props {
   children?: ReactNode;
}

const OrganizerLayout = ({ children }: Props) => {
   const router = useRouter();

   const [detachedNavDisplay, setDetachedNavDisplay] = useState(false);
   const [organizationListOpen, setOpen] = useState<boolean>(false);
   const [tabs, setTabs] = useState<OrganizerTabs>({
      user: false,
      organizations: false,
      sidebar: false,
   });
   const dispatch = useDispatch();

   const user = getUserFromLocalStorage();
   const toggleTab = async (key: keyof OrganizerTabs, open: boolean) => {
      setTabs({ ...tabs, [key]: open });
   };

   useEffect(() => {
      const stringedToken = localStorage.getItem(ILocalStorageItems.token);
      const token = JSON.parse(`${stringedToken}`);
      if (!stringedToken || !token || token?.user_type !== "organizer") {
         router?.push("/login");
      }
   }, [router]);

   useEffect(() => {
      dispatch(fetchOrganiztions());
   }, []);

   return (
      <section className="h-screen w-full bg-white md:flex md:p-2">
         <OrganizerSidebar isOpen={tabs.sidebar} onClose={() => toggleTab("sidebar", false)} />
         {/* Mobile Only */}
         <nav className="flex items-center justify-between gap-2 bg-white p-2 md:hidden">
            <Image src={"/assets/CodeAlgo_Logo.png"} className="h-9 md:cursor-pointer" alt="logo" loading="lazy" width={90} height={45} />
            <MdMenu size={26} cursor={"pointer"} onClick={() => toggleTab("sidebar", true)} />
         </nav>
         {/* Main */}
         <div className="min-h-full w-full flex-1 bg-[#ecedf3] p-[1rem] md:ml-[300px] md:h-full md:overflow-y-scroll md:rounded-[30px] md:p-[2rem]">
            <header className="mb-8 flex items-center justify-end gap-2">
               <div className="flex items-center gap-2">
                  <BetaButton />
                  <div className="relative">
                     <div className="flex cursor-pointer items-center gap-1 text-mainColor" onClick={() => toggleTab("user", !tabs.user)}>
                        <BiUserCircle size={24} />
                        <p className="hidden text-[1rem] md:block">{user?.username}</p>
                        <GoChevronDown size={24} />
                     </div>

                     <UserDropDown isOpen={tabs.user} />
                  </div>
               </div>
            </header>
            <OrganizationsList
               isOpen={tabs.organizations}
               close={() => toggleTab("organizations", false)}
               open={() => toggleTab("organizations", true)}
            />

            {children}
         </div>
      </section>
   );
};

export default OrganizerLayout;
