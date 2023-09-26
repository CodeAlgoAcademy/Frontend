import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChildFriend, getChildren, updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import ContentBox from "../UI/ContentBox";

const AddAFriend = () => {
   const { friend, currentChild } = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();
   return (
      <ContentBox size="large" title="Add a friend" padding="large">
         <section className="small-scroll-thumb blue-scroll-thumb" data-testid="add-a-friend-container">
            <p className="mb-4 text-sm font-light">
               CodeAlgo allows parents to limit students multiplayer interactions. Please enter the email or username of your student{"'"}s friend
               below. A request will be sent to the linked parent account. They can accept and decline the request
            </p>
            <h2 className="text-[15px] font-bold">Friend email or username</h2>
            <input
               type="text"
               className="focus:border-mainColor mb-5 w-full max-w-[400px] rounded-xl border-2 px-3 py-1 text-[15px] outline-none placeholder:text-gray-500"
               placeholder="hank45"
               value={friend}
               onChange={(e) => {
                  dispatch(updateChild({ key: "friend", value: e.target.value }));
               }}
            />
            <button
               onClick={async () => {
                  if ((friend?.length as number) > 0) {
                     await dispatch(addChildFriend(currentChild.username));
                     await dispatch(getChildren());
                  }
               }}
               className="bg-mainColor mb-4 w-full max-w-[400px] rounded-xl py-1 px-3 font-light text-white"
            >
               Send Request
            </button>
            <p className="text-[14px]">Requests will be accepted or denied by the student{"'"}s parent</p>
         </section>
      </ContentBox>
   );
};

export default AddAFriend;
