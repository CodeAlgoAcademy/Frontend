import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { days, screentimeTypes } from "types/interfaces";

const hours: Array<number | "No Limit"> = ["No Limit", 0, 1, 2, 3, 4, 5, 6, 7, 8];

const TeacherScreenTimeComponent = ({
   time,
   updateScreenTimeForChild,
   index,
}: {
   time: screentimeTypes;
   updateScreenTimeForChild: (id: string | number | undefined, day: days, hour: number | "No Limit") => void;
   index?: number;
}) => {
   const [hoursListOpen, setHoursListOpen] = useState<boolean>(false);

   const toggleHoursList = () => setHoursListOpen((prev) => !prev);

   return (
      <div
         className="relative flex flex-col gap-y-2 text-[14px]"
         data-testid={"screentime-component-" + index}
      >
         <p className="text-center">{time.dayOfTheWeek}</p>

         <div
            className="mx-auto h-[50px] w-[50px] rounded-[50%]"
            style={{
               background:
                  time.timeLimit !== ""
                     ? time.timeLimit !== "No Limit"
                        ? `repeating-conic-gradient(
                            from 0deg,
                            #2073FA 0deg calc(3.6deg * ${((time.timeLimit as number) * 100) / 8}),
                            rgba(145, 151, 238, 0.24) calc(3.6deg * ${((time.timeLimit as number) * 100) / 8}) calc(360deg)
                          )`
                        : `#2073FA`
                     : "rgba(145, 151, 238, 0.24)",
            }}
         ></div>

         <div
            className="flex min-w-[100px] cursor-pointer items-center justify-between rounded-md border border-[royalblue] bg-[#f0f0f0] py-2 px-2 text-[13px] text-[royalblue]"
            data-testid="toggle-container"
            onClick={toggleHoursList}
         >
            {time.timeLimit === ""
               ? "Select"
               : time.timeLimit === "No Limit"
               ? time.timeLimit
               : time.timeLimit + " hr"}
            <span className="text-[20px]">
               <BiChevronDown />
            </span>
         </div>

         {hoursListOpen && (
            <div className="absolute top-[105%] left-0 z-[2] w-full rounded-md bg-white text-gray-800 shadow-md">
               {hours.map((hour, index: number) => (
                  <span
                     key={index}
                     className="block cursor-pointer px-2 py-1"
                     onClick={() => {
                        updateScreenTimeForChild(time.id, time.dayOfTheWeek, hour);
                        setHoursListOpen(false);
                     }}
                     data-testid={`hour-${index}`}
                  >
                     {hour} {typeof hour === "string" ? "" : "hr"}
                  </span>
               ))}
            </div>
         )}
      </div>
   );
};

export default TeacherScreenTimeComponent;
