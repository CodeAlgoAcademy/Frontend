import React, { useEffect, useState } from "react";
import ParentLayout from "@/components/layouts/ParentLayout";
import SideNav from "@/components/parents/UI/ParentSideNav";
// import React from 'react';
import ContentBox from "@/components/parents/UI/ContentBox";
import BarChart from "@/components/parents/UI/BarChart";
import ScreenTimeComponent from "@/components/parents/UI/screenTimeComponent";
import { IParentChild, screentimeTypes } from "types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { editScreentime, getChildren } from "store/parentChildSlice";
import NoChild from "@/components/parents/UI/NoChild";

const ScreenTime = () => {
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

   const [timeLimitsToBeUpdated, setTimeLimitsToBeUpdated] = useState<screentimeTypes[]>([
      { id: 1, dayOfTheWeek: "Monday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Tuesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Wednesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Thursday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Friday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Saturday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Sunday", timeLimit: 0 },
   ]);

   const { currentChild, children } = useSelector((state: RootState) => state.parentChild);

   const updateTime = async (id: string | number, day: string, hour: number | "No Limit") => {
      const data = { dayOfTheWeek: day, timeLimit: hour };
      currentChild && (await dispatch(editScreentime({ id, data })));
      currentChild && (await dispatch(getChildren()));
   };

   const changeTimeLimit = (currentChild: IParentChild) => {
      return currentChild?.timeLimits?.map((time) => {
         let currentTime = { ...time };
         if (time.timeLimit === "12:00:00") {
            currentTime.timeLimit = "No Limit";
         } else {
            currentTime.timeLimit = parseInt((time.timeLimit as string).split(":")[0]);
         }
         return currentTime;
      });
   };

   useEffect(() => {
      if (currentChild) {
         setTimeLimits(changeTimeLimit(currentChild));
         setTimeLimitsToBeUpdated(changeTimeLimit(currentChild));
      }
   }, [currentChild, currentChild?.timeLimits]);

   if (!children || children?.length === 0) {
      return <NoChild />;
   }

   return (
      <ParentLayout>
         <div className="mx-4 flex flex-col gap-9 overflow-x-auto sm:mx-0">
            <ContentBox size="large" title="Screen Time" padding="large">
               <BarChart
                  data={timeLimits.map((time) => {
                     return time.timeLimit === "No Limit" ? 8 : (time.timeLimit as number);
                  })}
                  barSpace={9.6}
                  barWidth={3.3}
                  maxHours={8}
               />
            </ContentBox>
            <div className="relative mx-auto min-h-[340px] max-w-[90vw] rounded-2xl bg-white px-8 py-10 md:w-full md:min-w-[420px]">
               <h1 className="text-[1.3rem] font-semibold text-[#2073FA]">Current screen time restrictions</h1>
               <h2 className="mt-2 mb-10 text-[14px] font-medium">Make edits to screen time restrictions below</h2>
               <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  {timeLimitsToBeUpdated.map((time, index: number) => {
                     return <ScreenTimeComponent updateScreenTimeForChild={updateTime} time={time} key={index} />;
                  })}
               </div>
            </div>
         </div>
      </ParentLayout>
   );
};

export default ScreenTime;
