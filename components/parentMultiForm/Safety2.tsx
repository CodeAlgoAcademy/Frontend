import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScreentime } from "store/parentSlice";
import { RootState } from "store/store";
import { days } from "types/interfaces";
import ScreenTimeComponent from "./screenTimeComponent";

export default function Sasfety2() {
   const { screentime } = useSelector((state: RootState) => state.parent);
   const dispatch = useDispatch();

   const updateTime = (day: string, hour: number | "No Limit") => {
      dispatch(updateScreentime({ day, hour }));
   };
   return (
      <div key={7}>
         <h1 className="text-[30px] font-bold">Would you like to limit Conor&apos;s screentime?</h1>
         <p className="mt-3 text-[16px] font-[400]">Set your student&apos;s daily CodeAlgo screen time below.</p>
         <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
            {screentime?.map((time, index: number) => {
               return <ScreenTimeComponent updateTime={updateTime} time={time} key={index} />;
            })}
         </div>
      </div>
   );
}
