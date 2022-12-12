import React, { useState } from "react";
import Link from "next/link";
import { Icurriculum } from "types/interfaces";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";

const SingleCurrentCurriculum = ({
  curriculum,
}: {
  curriculum: Icurriculum;
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div
      style={{
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="flex rounded-xl justify-between flex-[0.5] bg-white mt-14 relative"
    >
      {modalOpen && (
        <aside className="absolute top-[15px] right-[70px] px-2 py-2 rounded-md shadow-md flex flex-row gap-x-4 font-bold items-center min-w-fit bg-mainPurple text-white cursor-pointer">
          <span>
            <BiArrowBack />
          </span>
          Move to past
        </aside>
      )}
      <div
        className="p-8 flex items-center justify-center rounded-l-xl"
        style={{ background: curriculum.level }}
      ></div>
      <div className="bg-white w-[20rem] p-8 rounded-r-xl">
        <div
          onClick={() => {
            setModalOpen((prev) => !prev);
          }}
        >
          <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
        </div>
        <h1 className="font-bold mt-5 mb-5">{curriculum.title}</h1>
        <p>{curriculum.description}</p>
        <div className="flex items-center sm:flex-col md:flex-row pt-[1.6rem] pb-[1rem] justify-between">
          <p>{curriculum.start_date}</p>
          <Link href="curriculum/unit">
            <p className="px-5 py-[5px] whitespace-nowrap font-semibold border-black rounded-full border-2 w-fit cursor-pointer">
              view unit
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCurrentCurriculum;
