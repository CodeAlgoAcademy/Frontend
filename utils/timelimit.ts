import { IParentChild, screentimeTypes } from "types/interfaces";

export const changeTimeLimit = (timeLimits: screentimeTypes[]) => {
   return timeLimits?.map((time) => {
      let currentTime = { ...time };
      if (time.timeLimit === "23:00:00") {
         currentTime.timeLimit = "No Limit";
      } else {
         currentTime.timeLimit = parseInt((time.timeLimit as string).split(":")[0]);
      }
      return currentTime;
   });
};
