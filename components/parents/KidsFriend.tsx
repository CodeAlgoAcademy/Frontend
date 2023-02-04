import React, { useState } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { IFriends } from 'types/interfaces';

const KidsFriend = () => {
  const [friends, setFriends] = useState<IFriends[]>([
    {
      id: 0,
      name: 'hannah12',
      is_friend: true,
    },
    {
      id: 1,
      name: 'elitrevor',
      is_friend: true,
    },
    {
      id: 2,
      name: 'ilovemydog',
      is_friend: true,
    },
    {
      id: 3,
      name: 'hank45',
      is_friend: false,
    },
    { id: 4, name: 'codingisgreat10', is_friend: true },
    {
      id: 5,
      name: 'daniel_dunsin',
      is_friend: false,
    },
    {
      id: 6,
      name: 'isreal_ayanda',
      is_friend: true,
    },
  ]);

  const removeFriend = (id: number): void => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <div className="w-full rounded-xl bg-[#eeeeee] py-2 px-4 mt-14 h-[220px] overflow-hidden overflow-y-scroll">
      {friends.map((friend: IFriends, index: number) => {
        return (
          <article key={index} className="flex justify-between items-center p-2 gap-x-2">
            <span className="flex items-center gap-x-2 ">
              <span className="text-[#2073FA]">
                {friend.is_friend ? <BiEnvelope /> : <HiOutlineDotsCircleHorizontal />}
              </span>
              <p className="font-lighter text-[12px]">{friend.name}</p>
            </span>
            {!friend.is_friend && <i className="text-[12px] underline">Pending</i>}
            <i
              className="text-[12px] text-[#2073FA] underline cursor-pointer"
              onClick={() => {
                removeFriend(friend.id as number);
              }}
            >
              Remove
            </i>
          </article>
        );
      })}
    </div>
  );
};

export default KidsFriend;
