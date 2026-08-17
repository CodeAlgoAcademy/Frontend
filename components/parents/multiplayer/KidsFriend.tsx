import React, { useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { FriendRequests } from "types/interfaces";
import ContentBox from "../UI/ContentBox";
import { useTranslation } from "react-i18next";

const KidsFriend = () => {
   const currentChild = useSelector((state: RootState) => state.parentChild.currentChild);
   const { t } = useTranslation("parent");

   return (
      <ContentBox size="base" title={t("friends")} padding="large" link="parents/multiplayer">
         <div className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4" data-testid="friends-container">
            {(currentChild?.pendingRequests as FriendRequests[])?.map((friend: FriendRequests, index: number) => {
               return (
                  <article key={index} className="flex items-center justify-between gap-x-2 p-2">
                     <div className="flex items-center gap-x-2 " data-testid={`friend-req-${index}`}>
                        <span className="text-mainColor">
                           <HiOutlineDotsCircleHorizontal />
                        </span>
                        <p className="font-lighter text-[12px]">{friend.to_user}</p>
                     </div>
                     <i className="text-[12px] underline">{t("pending")}</i>
                  </article>
               );
            })}

            {/* create a new map for the friends with bienvelope icon */}
            {currentChild?.friends?.map((friend, index: number) => {
               return (
                  <article key={index} className="flex items-center justify-between gap-x-2 p-2">
                     <div className="flex items-center gap-x-2 ">
                        <span className="text-mainColor">
                           <BiEnvelope />
                        </span>
                        <p className="font-lighter text-[12px]">{friend.friend}</p>
                     </div>
                  </article>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default KidsFriend;
