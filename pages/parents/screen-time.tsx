import React, { useEffect, useState } from "react";
import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
// import React from 'react';
import ContentBox from "@/components/parents/ContentBox";
import BarChart from "@/components/parents/BarChart";
import DashboardBox from "@/components/parents/DashboardBox";
import ScreenTimeComponent from "@/components/parentMultiForm/screenTimeComponent";
import { IParentChild, screentimeTypes } from "types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { editChildScreentime, getChildren } from "store/parentChildSlice";

const ScreenTime = () => {
   const dispatch = useDispatch();
   const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([
      { dayOfTheWeek: "Monday", timeLimit: 8 },
      { dayOfTheWeek: "Tuesday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Wednesday", timeLimit: 5 },
      { dayOfTheWeek: "Thursday", timeLimit: 3 },
      { dayOfTheWeek: "Friday", timeLimit: 7 },
      { dayOfTheWeek: "Saturday", timeLimit: 0 },
      { dayOfTheWeek: "Sunday", timeLimit: 2 },
   ]);

   const [timeLimitsToBeUpdated, setTimeLimitsToBeUpdated] = useState<screentimeTypes[]>([
      { dayOfTheWeek: "Monday", timeLimit: 8 },
      { dayOfTheWeek: "Tuesday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Wednesday", timeLimit: 5 },
      { dayOfTheWeek: "Thursday", timeLimit: 3 },
      { dayOfTheWeek: "Friday", timeLimit: 7 },
      { dayOfTheWeek: "Saturday", timeLimit: 0 },
      { dayOfTheWeek: "Sunday", timeLimit: 2 },
   ]);

   const { currentChild } = useSelector((state: RootState) => state.parentChild);

   const updateTime = (day: string, hour: number | "No Limit") => {
      setTimeLimitsToBeUpdated((times) => {
         return times.map((time) => {
            if (time.dayOfTheWeek === day) {
               time.timeLimit = hour;
            }
            return time;
         });
      });
   };

   const changeTimeLimit = (currentChild: IParentChild) => {
      return currentChild?.timeLimits?.map((time) => {
         let currentTime = { ...time };
         if (time.timeLimit === "24") {
            currentTime.timeLimit = "No Limit";
         } else {
            currentTime.timeLimit = parseInt(time.timeLimit as string);
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
                     return <ScreenTimeComponent updateTime={updateTime} time={time} key={index} />;
                  })}
               </div>
               <button
                  onClick={async () => {
                     currentChild && (await dispatch(editChildScreentime({ id: currentChild?.id, data: timeLimitsToBeUpdated })));
                     currentChild && (await dispatch(getChildren()));
                  }}
                  className="mx-auto mt-6 block w-[150px] rounded-md bg-[#2073FA] py-2 px-3 text-white shadow-sm hover:shadow-md md:mx-0"
               >
                  Save Changes
               </button>
            </div>
         </div>
      </ParentLayout>
   );
};

export default ScreenTime;
