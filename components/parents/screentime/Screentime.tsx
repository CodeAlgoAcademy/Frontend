import React, { useEffect, useState } from "react";
import ContentBox from "../UI/ContentBox";
import BarChart from "../UI/BarChart";
import { screentimeTypes } from "types/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { changeTimeLimit } from "utils/timelimit";
import { useRouter } from "next/router";
interface ScreentimeProps {
   size: "large" | "base";
}
const Screentime = ({ size }: ScreentimeProps) => {
   const { currentChild } = useSelector((state: RootState) => state.parentChild);
   const router = useRouter();
   const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([
      { id: 1, dayOfTheWeek: "Monday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Tuesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Wednesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Thursday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Friday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Saturday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Sunday", timeLimit: 0 },
   ]);
   useEffect(() => {
      if (currentChild) {
         setTimeLimits(changeTimeLimit(currentChild?.timeLimits));
      }
   }, [currentChild, currentChild?.timeLimits]);
   return (
      <ContentBox
         size={size}
         title="Screen Time"
         padding="large"
         showSublink={router.pathname === "/parents"}
         link={"/parents/screen-time"}
         style={{ minWidth: "100%", maxWidth: "100%" }}
      >
         <BarChart
            data={timeLimits?.map((time) => {
               return time.timeLimit === "No Limit" ? 8 : (time.timeLimit as number);
            })}
            barSpace={9.6}
            barWidth={3.3}
            maxHours={8}
            unitLabel="h"
         />
      </ContentBox>
   );
};
export default Screentime;