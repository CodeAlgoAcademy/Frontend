import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import React from "react";
import ContentBox from "@/components/parents/ContentBox";
import RecentInteraction from "@/components/parents/RecentInteraction";
import KidsFriend from "@/components/parents/KidsFriend";
import AddAFriend from "@/components/parents/AddAFriend";
import FriendRequests from "@/components/parents/FriendRequests";

const Multiplayer = () => {
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
