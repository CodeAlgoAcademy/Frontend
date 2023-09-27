import React, { useState } from "react";

interface Props {
   data: number[];
   maxHours: number;
   barWidth: number;
   barSpace: number;
}

const BarChart = ({ data, barSpace, barWidth, maxHours }: Props) => {
   const [weekIndex, setWeekIndex] = useState(0);
   return (
      <>
         <div className="relative mt-6 flex h-[200px] w-full flex-1 flex-col pl-6">
            <div className="h-full border-l pt-5">
               <ul className="relative flex h-full flex-col justify-between">
                  <>
                     {[...Array(maxHours + 1)].map((_, i) => (
                        <li key={i} className="border-b"></li>
                     ))}
                     {[...Array(7)].map((_, i) => {
                        const space = `${(i * (barSpace + barWidth) + barSpace).toFixed(1)}%`;
                        const height = `${(data[i] / maxHours) * 100}%`;
                        return (
                           <span
                              key={i}
                              className={`green-chart-bar content-[' '] absolute rounded-t-[50px]`}
                              style={{ left: space, bottom: 0, height, width: barWidth + "%" }}
                           ></span>
                        );
                     })}
                  </>
               </ul>
            </div>
            <span className="absolute left-0 top-3 text-sm">{maxHours}h</span>
            <span className="absolute left-0 bottom-[-2px] text-sm">0h</span>
            {/* <span className="text-xs opacity-90 text-[#BEC1C7] absolute right-0 top-[-2px]">
          
        </span> */}
         </div>
      </>
   );
};

export default BarChart;
