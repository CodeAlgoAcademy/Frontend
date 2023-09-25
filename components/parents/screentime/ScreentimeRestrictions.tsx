import React, { useEffect, useState } from "react";
import { screentimeTypes } from "types/interfaces";
import ScreenTimeComponent from "../UI/screenTimeComponent";
import { changeTimeLimit } from "utils/timelimit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { editScreentime, getChildren } from "store/parentChildSlice";

const ScreentimeRestrictions = () => {
   const { currentChild } = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();

   const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([
      { id: 1, dayOfTheWeek: "Monday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Tuesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Wednesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Thursday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Friday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Saturday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Sunday", timeLimit: 0 },
   ]);

   const updateTime = async (id: string | number, day: string, hour: number | "No Limit") => {
      const data = { dayOfTheWeek: day, timeLimit: hour };
      currentChild && (await dispatch(editScreentime({ id, data })));
      currentChild && (await dispatch(getChildren()));
   };

   useEffect(() => {
      if (currentChild) {
         setTimeLimits(changeTimeLimit(currentChild));
      }
   }, [currentChild, currentChild?.timeLimits]);

   return (
      <div className="relative min-h-[340px] max-w-fit rounded-2xl bg-white px-8 py-10 md:w-full md:min-w-[420px]">
         <h1 className="text-[1.3rem] font-semibold text-[#2073FA]">Current screen time restrictions</h1>
         <h2 className="mt-2 mb-10 text-[14px] font-medium">Make edits to screen time restrictions below</h2>
         <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            {timeLimits?.map((time, index: number) => {
               return <ScreenTimeComponent updateScreenTimeForChild={updateTime} time={time} key={index} />;
            })}
         </div>
      </div>
   );
};

export default ScreentimeRestrictions;
