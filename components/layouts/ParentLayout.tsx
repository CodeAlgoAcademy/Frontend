import React, { ReactNode, useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { BiUserCircle } from "react-icons/bi";
import AddChildModal from "../parents/multiplayer/AddChildModal";
import BetaButton from "../UI/beta-button";
import { GoChevronDown } from "react-icons/go";
import UserDropDown from "../parents/UI/UserDropDown";
import { MdClose, MdMenu } from "react-icons/md";
import ChildrenList from "../parents/UI/ChildrenList";
import ParentSidebar from "../parents/UI/Sidebar";
import { IUser } from "types/interfaces";
import { getChildProgress, getChildSkills, getChildren } from "store/parentChildSlice";
import { BsChevronDown } from "react-icons/bs";
import { getUserFromLocalStorage } from "utils/getTokens";
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

interface ParentTabs {
   user: boolean;
   children: boolean;
   sidebar: boolean;
}
interface Props {
   children?: ReactNode;
   title: string;
}

const ParentLayout = ({ children, title }: Props) => {
   const router = useRouter();
   const [tabs, setTabs] = useState<ParentTabs>({
      user: false,
      children: false,
      sidebar: false,
   });
   const [user, setUser] = useState<IUser | null>(null);
   const modals = useSelector((state: RootState) => state.modal);
   const currentChild = useSelector((state: RootState) => state.parentChild?.currentChild);
   const dispatch = useDispatch();

   const toggleTab = async (key: keyof ParentTabs, open: boolean) => {
      setTabs({ ...tabs, [key]: open });
   };

   useEffect(() => {
      dispatch(getChildProgress());
      dispatch(getChildSkills());
   }, [currentChild?.id]);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const stringedToken = localStorage.getItem(ILocalStorageItems.token);
         const token = JSON.parse(`${stringedToken}`);
         if (token?.user_type !== "parent") {
            router.push("/login");
         } else {
            setUser(getUserFromLocalStorage());
         }
      }
   }, [router]);

   useEffect(() => {
      dispatch(getChildren());
   }, [router.pathname]);
   return (
      <section className="h-screen w-full bg-white md:flex md:p-2">
         {modals.addChildModalOpen && <AddChildModal />}
         <ParentSidebar isOpen={tabs.sidebar} onClose={() => toggleTab("sidebar", false)} />

         {/* Mobile Only */}
         <nav className="flex items-center justify-between gap-2 bg-white p-2 md:hidden">
            <Image src={"/assets/CodeAlgo_Logo.png"} className="h-9 md:cursor-pointer" alt="logo" loading="lazy" width={90} height={45} />
            <MdMenu size={26} cursor={"pointer"} onClick={() => toggleTab("sidebar", true)} />
         </nav>
         {/* Main */}
         <div className="min-h-full w-full flex-1 bg-[#ecedf3] p-[1rem] md:ml-[300px] md:h-full md:overflow-y-scroll md:rounded-[30px] md:p-[2rem]">
            <header className="mb-8 flex items-center justify-between gap-2">
               <h1 className="text-[1.2rem] font-medium text-mainColor md:text-[1.4rem] lg:text-[1.6rem]">{title}</h1>
               <div className="flex items-center gap-2">
                  <BetaButton />
                  <div className="relative">
                     <div className="flex cursor-pointer items-center gap-1 text-mainColor" onClick={() => toggleTab("user", !tabs.user)}>
                        <BiUserCircle size={24} />
                        <p className="hidden text-[1rem] md:block">{user?.username}</p>
                        <BsChevronDown size={24} />
                     </div>

                     <UserDropDown isOpen={tabs.user} />
                  </div>
               </div>
            </header>
            <ChildrenList isOpen={tabs.children} open={() => toggleTab("children", true)} close={() => toggleTab("children", false)} />

            {children}
         </div>
      </section>
   );
};

export default ParentLayout;
