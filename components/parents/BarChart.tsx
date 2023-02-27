import React, { useState } from 'react';

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
      <p className="mt-14 text-sm font-light">Daily Average</p>
      <h1 className="text-3xl font-semibold">1h 32m</h1>
      <div className="w-full flex flex-col flex-1 mt-4 h-[170px] pl-6 relative">
        <div className="border-l h-full pt-5">
          <ul className="flex flex-col justify-between h-full relative">
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
                    className={`green-chart-bar absolute rounded-t-[50px] content-[' ']`}
                    style={{ left: space, bottom: 0, height, width: barWidth + '%' }}
                  ></span>
                );
              })}
            </>
          </ul>
        </div>
        <span className="text-sm absolute left-0 top-3">{maxHours}h</span>
        <span className="text-sm absolute left-0 bottom-[-2px]">0h</span>
        <span className="text-xs opacity-90 text-[#BEC1C7] absolute right-0 top-[-2px]">
          Week of 1/8
        </span>
      </div>
    </>
  );
};

export default BarChart;
