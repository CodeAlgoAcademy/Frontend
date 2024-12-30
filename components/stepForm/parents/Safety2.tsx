import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScreentime } from "store/parentChildSlice";
import { RootState } from "store/store";
import { days } from "types/interfaces";
import ScreenTimeComponent from "../../parents/UI/screenTimeComponent";

export default function Sasfety2() {
   const child = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();

   const updateTime = (day: days, hour: number | "No Limit") => {
      dispatch(updateScreentime({ day, hour }));
   };

   return (
      <div key={7}>
         <h1 className="text-[30px] font-bold">Would you like to limit {child?.fullName}&apos;s screentime?</h1>
         <p className="mt-3 text-[16px] font-[400]">Set your student&apos;s daily CodeAlgo screen time below.</p>
         <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
            {child?.timeLimits?.map((time, index: number) => {
               return <ScreenTimeComponent updateTime={updateTime} time={time} key={index} index={index} />;
            })}
         </div>
      </div>
   );
}
