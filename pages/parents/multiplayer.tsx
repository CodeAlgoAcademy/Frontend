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
            <div className="mx-auto mb-6 flex flex-wrap items-start justify-around gap-x-3 gap-y-10">
               <ContentBox size="base" title="Multiplayer" padding="large" link="parents/multiplayer">
                  <RecentInteraction />
               </ContentBox>
               <ContentBox size="base" title="Friends" padding="large" link="parents/multiplayer">
                  <KidsFriend />
               </ContentBox>
               <ContentBox size="base" title="Friend Requests" padding="large" link="parents/multiplayer">
                  <FriendRequests />
               </ContentBox>
               <ContentBox size="large" title="Add a friend" padding="large">
                  <AddAFriend />
               </ContentBox>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Multiplayer;
