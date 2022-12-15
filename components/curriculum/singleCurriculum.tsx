import React from "react";
import { Icurriculum } from "types/interfaces";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";

const SingleCurriculum = ({ curriculum }: { curriculum: Icurriculum }) => {
  return (
    <div
      style={{
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="flex justify-between flex-[0.5] bg-transparent mt-14 relative"
    >
      <div
        className="p-8 flex items-center justify-center rounded-l-xl"
        style={{ background: curriculum.level }}
      ></div>
      <div className="bg-white w-[20rem] p-8 rounded-r-xl flex-1 py-16">
        <div>
          <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
        </div>
        <h1 className="font-bold mb-3">{curriculum.title}</h1>
        <p className="text-[15px]">{curriculum.description}</p>
      </div>
    </div>
  );
};

export default SingleCurriculum;
