import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChildFriend, getChildren, updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";

const AddAFriend = () => {
   const [detail, setDetail] = useState<string>("");
   const updateDetail = (value: string) => {
      setDetail(value);
   };

   const { friend, currentChild } = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();
   return (
      <section className="small-scroll-thumb blue-scroll-thumb">
         <p className="mt-14 mb-4 text-sm font-light">
            CodeAlgo allows parents to limit students multiplayer interactions. Please enter the email or username of your student{"'"}s friend below.
            A request will be sent to the linked parent account. They can accept and decline the request
         </p>
         <h2 className="text-[15px] font-bold">Friend email or username</h2>
         <input
            type="text"
            className="mb-5 w-full max-w-[400px] rounded-xl border-2 px-3 py-1 text-[15px] outline-none placeholder:text-gray-500 focus:border-[#2073FA]"
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
            className="mb-4 w-full max-w-[400px] rounded-xl bg-[#2073fa] py-1 px-3 font-light text-white"
         >
            Send Request
         </button>
         <p className="text-[14px]">Requests will be accepted or denied by the student{"'"}s parent</p>
      </section>
   );
};

export default AddAFriend;
