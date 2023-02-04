import React, { useState } from 'react';

const AddAFriend = () => {
  const [detail, setDetail] = useState<string>('');
  const updateDetail = (value: string) => {
    setDetail(value);
  };
  return (
    <>
      <p className="mt-14 text-sm font-light mb-4">
        CodeAlgo allows parents to limit students multiplayer interactions. Please enter the email
        or username of your student{"'"}s friend below. A request will be sent to the linked parent
        account. They can accept and decline the request
      </p>
      <h2 className="font-bold text-[15px]">Friend email or username</h2>
      <input
        type="text"
        className="w-full max-w-[400px] px-3 py-1 rounded-xl border-2 focus:border-[#2073FA] placeholder:text-gray-500 outline-none text-[15px] mb-5"
        placeholder="hank45"
      />
      <button className="bg-[#2073fa] rounded-xl py-1 px-3 w-full max-w-[400px] font-light text-white mb-4">
        Send Request
      </button>
      <p className="text-[14px]">
        Requests will be accepted or denied by the student{"'"}s parent account
      </p>
    </>
  );
};

export default AddAFriend;
