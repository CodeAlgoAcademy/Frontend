import React, { useEffect, useState } from "react";
import { days, screentimeTypes } from "types/interfaces";
import ScreenTimeComponent from "@/components/parents/UI/screenTimeComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { changeTimeLimit } from "utils/timelimit";
import { editScreentime, updateScreentime } from "store/parentChildSlice";
import { getStudentScreentime } from "store/studentSlice";

const ScreentimeRestrictions = () => {
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

   const student = useSelector((state: RootState) => state.students?.currentStudent);

   const updateTime = async (id: number | string, day: days, hour: number | "No Limit") => {
      const data: screentimeTypes = { dayOfTheWeek: day, timeLimit: hour };

      student && (await dispatch(editScreentime({ id, data })));
      student && (await dispatch(getStudentScreentime(student?.id)));
   };

   useEffect(() => {
      if (student?.timeLimits) {
         setTimeLimits(changeTimeLimit(student?.timeLimits));
      }
   }, [student?.id, student?.timeLimits]);

   return (
      <div className="relative mt-[3rem] min-h-[340px] max-w-fit rounded-md bg-white px-8 py-10 md:w-full md:min-w-[420px]">
         <h1 className="text-[1.3rem] font-semibold text-mainColor">Current screen time restrictions</h1>
         <h2 className="mt-2 mb-10 text-[14px] font-medium">Make edits to screen time restrictions below</h2>
         <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            {timeLimits?.map((time, index: number) => {
               return <ScreenTimeComponent time={time} updateScreenTimeForChild={updateTime} key={index} />;
            })}
         </div>
      </div>
   );
};

export default ScreentimeRestrictions;
