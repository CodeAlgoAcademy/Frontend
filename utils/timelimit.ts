import { IParentChild } from "types/interfaces";

export const changeTimeLimit = (currentChild: IParentChild) => {
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
