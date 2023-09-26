import React, { useState } from "react";
import Link from "next/link";
import { Icurriculum } from "types/interfaces";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getAllCurriculums, updateCurriculumToCurrent, updateCurriculumToPast } from "../../../services/curriculumService";
import { updateUnitInView } from "store/unitsSlice";
import { useRouter } from "next/router";

const SingleCurriculum = ({ curriculum, active }: { curriculum: Icurriculum; active: string }) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [modalOpen, setModalOpen] = useState<boolean>(false);

   const topics = curriculum?.title;
   return (
      <div
         style={{
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
         }}
         className="relative mt-14 flex flex-[0.5] justify-between rounded-xl bg-white"
      >
         {modalOpen && active === "current" && (
            <aside
               onClick={async () => {
                  await dispatch(updateCurriculumToPast({ id: curriculum.id, curriculum }));
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
                  await dispatch(updateCurriculumToCurrent({ id: curriculum.id, curriculum }));
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
         <div className="flex items-center justify-center rounded-l-xl p-8" style={{ background: curriculum.level }}></div>
         <div className="flex-1 rounded-r-xl bg-white p-8">
            <div
               onClick={() => {
                  setModalOpen((prev) => !prev);
               }}
            >
               <HiDotsHorizontal className="text-[ border-mainColor ml-auto mt-[-1rem] text-3xl" />
            </div>
            <h1 className="mt-5 mb-5 font-bold">{curriculum.title}</h1>
            <p>{curriculum.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-[1.6rem] pb-[1rem] md:flex-row">
               <p>{curriculum.start_date}</p>
               <Link href={`curriculum/unit/${topics}`}>
                  <p
                     className="w-fit cursor-pointer whitespace-nowrap rounded-full border-2 border-black px-5 py-[5px] font-semibold"
                     onClick={() => {
                        dispatch(
                           updateUnitInView({
                              id: curriculum.id as string,
                              start_date: curriculum.start_date,
                              is_current: curriculum.is_current,
                              is_finished: curriculum.is_finished,
                           })
                        );
                     }}
                  >
                     view unit
                  </p>
               </Link>
            </div>
         </div>
      </div>
   );
};

const styles = {
   aside: "absolute top-[15px] right-[70px] px-2 py-2 rounded-md shadow-md flex flex-row gap-x-4 font-bold items-center min-w-fit bg-mainColor text-white cursor-pointer",
};

export default SingleCurriculum;
