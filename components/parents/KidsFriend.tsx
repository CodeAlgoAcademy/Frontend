import React, { useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { IFriends } from "types/interfaces";

const KidsFriend = () => {
   const [friends, setFriends] = useState<IFriends[]>([
      {
         id: 0,
         name: "hannah12",
         is_friend: true,
      },
      {
         id: 1,
         name: "elitrevor",
         is_friend: true,
      },
      {
         id: 2,
         name: "ilovemydog",
         is_friend: true,
      },
      {
         id: 3,
         name: "hank45",
         is_friend: false,
      },
      { id: 4, name: "codingisgreat10", is_friend: true },
      {
         id: 5,
         name: "daniel_dunsin",
         is_friend: false,
      },
      {
         id: 6,
         name: "isreal_ayanda",
         is_friend: true,
      },
   ]);
   const { pendingRequests } = useSelector((state: RootState) => state.parentChild.currentChild);

   const removeFriend = (id: number): void => {
      setFriends((prev) => prev.filter((friend) => friend.id !== id));
   };

   return (
      <div className="mt-14 h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4">
         {[...(pendingRequests as any)]?.map((friend, index: number) => {
            return (
               <article key={index} className="flex items-center justify-between gap-x-2 p-2">
                  <span className="flex items-center gap-x-2 ">
                     <span className="text-[#2073FA]">
                        <HiOutlineDotsCircleHorizontal />
                     </span>
                     <p className="font-lighter text-[12px]">{friend.to_user}</p>
                  </span>
                  <i className="text-[12px] underline">Pending</i>
               </article>
            );
         })}

         {/* create a new map for the friends with bienvelope icon */}
      </div>
   );
};

export default KidsFriend;
