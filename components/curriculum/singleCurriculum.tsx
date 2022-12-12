import React from "react";
import { Icurriculum } from "types/interfaces";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";

const SingleCurriculum = ({ curriculum }: { curriculum: Icurriculum }) => {
  return (
    <div className="flex-[0.5]">
      <div
        style={{
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        className="flex rounded-xl overflow-hidden mt-14"
      >
        <div
          className="w-[70px]"
          style={{ background: curriculum.level }}
        ></div>
        <div className="bg-white flex-1 w-full h-[17rem] p-8">
          <div>
            <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
          </div>
          <h1 className="font-bold mb-3">{curriculum.title}</h1>
          <p className="text-[15px]">{curriculum.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCurriculum;
