import Image from "next/image";
import React from "react";
import loop from "../public/assets/imgs/loop.png";
const SummaryBox = () => {
  return (
    <div className="rounded-md shadow-lg p-6 max-w-[380px] bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-[20px] font-bold mb-2">
          Lesson - <span>Conditional Statements</span>
        </h3>
        <p className="leading-normal text-base tracking-tight mb-4">
          Conditional statements are used through the various programming
          languages to instruct the computer on the decision to make when given
          some conditions.
        </p>
      </div>
      <div className="bg-[#F0AA9B] rounded-md py-12 w-[100%]">
        <div className="w-[38%] relative aspect-[12/10] mx-auto">
          <Image src={loop} alt="current-lesson" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
