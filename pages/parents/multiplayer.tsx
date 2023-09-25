import ParentLayout from "@/components/layouts/ParentLayout";
import SideNav from "@/components/parents/UI/ParentSideNav";
import React from "react";
import ContentBox from "@/components/parents/UI/ContentBox";
import RecentInteraction from "@/components/parents/multiplayer/RecentInteraction";
import KidsFriend from "@/components/parents/multiplayer/KidsFriend";
import AddAFriend from "@/components/parents/multiplayer/AddAFriend";
import FriendRequests from "@/components/parents/multiplayer/FriendRequests";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import NoChild from "@/components/parents/UI/NoChild";

const Multiplayer = () => {
   const parent = useSelector((state: RootState) => state.parentChild);

   if (!parent?.children || parent?.children?.length === 0) {
      return <NoChild />;
   }
   return (
      <ParentLayout>
         <div className="relative bottom-14 mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className=" mb-6 grid max-w-fit grid-cols-1 justify-center gap-x-6 gap-y-8 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
               <RecentInteraction />
               <KidsFriend />
               <FriendRequests />
            </div>
            <AddAFriend />
         </div>
      </ParentLayout>
   );
};

export default Multiplayer;
