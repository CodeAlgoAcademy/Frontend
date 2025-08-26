import { IParentChild, screentimeTypes } from "types/interfaces";

export const changeTimeLimit = (timeLimits?: screentimeTypes[] | screentimeTypes) => {
  if (!timeLimits) return [];

  const normalized = Array.isArray(timeLimits) ? timeLimits : [timeLimits];

  return normalized.map((time) => {
    let currentTime = { ...time };
    if (time.timeLimit === "23:00:00") {
      currentTime.timeLimit = "No Limit";
    } else {
      currentTime.timeLimit = parseInt((time.timeLimit as string).split(":")[0]);
    }
    return currentTime;
  });
};

