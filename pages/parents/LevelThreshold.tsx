import ParentLayout from "@/components/layouts/ParentLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
// import { editLevelThreshold, getChildren } from "store/parentChildSlice";
import LevelThresholdComponent, { levelThresholdType } from "@/components/parents/threshold/LevelThresholdComponent";
import LevelsThreshold from "@/components/parents/threshold/LevelThreshold";

const LevelThreshold = () => {
   const { currentChild } = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();

   const [thresholds, setThresholds] = useState<levelThresholdType[]>([]);

   useEffect(() => {
      if (currentChild) {
         const generatedLevels = Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            level: i + 1,
            threshold: 10 * (i + 1),
         }));

         setThresholds(generatedLevels);
      }
   }, [currentChild]);

   const updateLevel = async (id: number, level: number, value: number) => {
      const payload = { level, threshold: value };
    //   await dispatch(editLevelThreshold({ id, data: payload }));
    //   await dispatch(getChildren());
   };
   return (
      <ParentLayout title="Levels Threshold">
         <LevelsThreshold size={"base"} />
         <div className="relative min-h-[340px] mt-10 max-w-fit rounded-2xl bg-white px-8 py-10 md:w-full md:min-w-[420px]">
            <h1 className="text-[1.3rem] font-semibold text-mainColor">Level Threshold Settings</h1>
            <h2 className="mt-2 mb-10 text-[14px] font-medium">Set thresholds required to progress through each level.</h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
               {thresholds.map((t, i) => (
                  <LevelThresholdComponent key={i} threshold={t} updateLevelThreshold={updateLevel} />
               ))}
            </div>
         </div>
      </ParentLayout>
   );
};

export default LevelThreshold;
