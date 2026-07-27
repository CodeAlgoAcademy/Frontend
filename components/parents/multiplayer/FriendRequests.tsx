import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getChildren, rejectFriendRequest } from "store/parentChildSlice";
import { RootState } from "store/store";
import ContentBox from "../UI/ContentBox";
import { useTranslation } from "react-i18next";

const FriendRequests = () => {
   const dispatch = useDispatch();
   const { t } = useTranslation("parent");

   const currentChild = useSelector((state: RootState) => state.parentChild.currentChild);

   return (
      <ContentBox size="base" title={t("friendRequests")} padding="large" link="parents/multiplayer">
         <div
            className="h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4"
            data-testid="friend-requests-container"
         >
            {currentChild?.friendRequests?.map((friend, index: number) => {
               return (
                  <article key={index} className="flex items-center justify-between gap-x-2 p-2" data-testid={`friend-req-${index}`}>
                     <span className="flex items-center gap-x-2 ">
                        <p className="font-lighter text-[12px]">{friend.from_user}</p>
                     </span>
                     <div className="flex items-center gap-x-2">
                        <i
                           className="text-mainColor cursor-pointer text-[12px] underline"
                           onClick={async () => {
                              await dispatch(acceptFriendRequest(friend?.id));
                              await dispatch(getChildren());
                           }}
                        >
                           {t("accept")}
                        </i>
                        <i
                           className="text-mainColor cursor-pointer text-[12px] underline"
                           onClick={async () => {
                              await dispatch(rejectFriendRequest(friend?.id));
                              await dispatch(getChildren());
                           }}
                        >
                           {t("decline")}
                        </i>
                     </div>
                  </article>
               );
            })}
         </div>
      </ContentBox>
   );
};

export default FriendRequests;
