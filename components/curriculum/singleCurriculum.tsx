import React, { useState } from "react";
import Link from "next/link";
import { Icurriculum } from "types/interfaces";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  getAllCurriculums,
  updateCurriculumToCurrent,
  updateCurriculumToPast,
} from "../../services/curriculumService";
import { updateUnitInView } from "store/unitsSlice";
import { useRouter } from "next/router";

const SingleCurriculum = ({
  curriculum,
  active,
}: {
  curriculum: Icurriculum;
  active: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const topics = curriculum?.title;
  const enterLesson = () => {
    router.push(`curriculum/unit/${topics}`);
  };
  return (
    <div
      style={{
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="flex rounded-xl justify-between flex-[0.5] bg-white mt-14 relative"
    >
      {modalOpen && active === "current" && (
        <aside
          onClick={async () => {
            await dispatch(
              updateCurriculumToPast({ id: curriculum.id, curriculum })
            );
            setModalOpen(false);
            dispatch(getAllCurriculums());
          }}
          className={styles.aside}
        >
          <span>
            <BiArrowBack />
          </span>
          Move to past
        </aside>
      )}
      {modalOpen && active === "upcoming" && (
        <aside
          onClick={async () => {
            await dispatch(
              updateCurriculumToCurrent({ id: curriculum.id, curriculum })
            );
            setModalOpen(false);
            dispatch(getAllCurriculums());
          }}
          className={styles.aside}
        >
          <span>
            <BiArrowBack />
          </span>
          Move to current
        </aside>
      )}
      <div
        className="p-8 flex items-center justify-center rounded-l-xl"
        style={{ background: curriculum.level }}
      ></div>
      <div className="bg-white w-[20rem] p-8 rounded-r-xl flex-1">
        <div
          onClick={() => {
            setModalOpen((prev) => !prev);
          }}
        >
          <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
        </div>
        <h1 className="font-bold mt-5 mb-5">{curriculum.title}</h1>
        <p>{curriculum.description}</p>
        <div className="flex items-center md:flex-row pt-[1.6rem] pb-[1rem] justify-between">
          <p>{curriculum.start_date}</p>
          <p
            className="px-5 py-[5px] whitespace-nowrap font-semibold border-black rounded-full border-2 w-fit cursor-pointer"
            onClick={() => {
              dispatch(
                updateUnitInView({
                  id: curriculum.id as string,
                  start_date: curriculum.start_date,
                  is_current: curriculum.is_current,
                  is_finished: curriculum.is_finished,
                })
              );
              enterLesson();
            }}
          >
            view unit
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  aside:
    "absolute top-[15px] right-[70px] px-2 py-2 rounded-md shadow-md flex flex-row gap-x-4 font-bold items-center min-w-fit bg-mainPurple text-white cursor-pointer",
};

export default SingleCurriculum;
