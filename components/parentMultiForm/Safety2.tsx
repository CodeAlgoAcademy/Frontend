import React, { useState } from 'react';
import ScreenTimeComponent from './screenTimeComponent';

export default function Sasfety2() {
  const [screenTimes, setScreenTimes] = useState<{ day: string; time: '' | number | 'No Limit' }[]>(
    [
      { day: 'Monday', time: '' },
      { day: 'Tuesday', time: '' },
      { day: 'Wednesday', time: '' },
      { day: 'Thursday', time: '' },
      { day: 'Friday', time: '' },
      { day: 'Saturday', time: '' },
      { day: 'Sunday', time: '' },
    ],
  );

  const updateTime = (day: string, hour: number | 'No Limit') => {
    setScreenTimes((times) => {
      return times.map((time) => {
        if (time.day === day) {
          time.time = hour;
        }
        return time;
      });
    });
  };
  return (
    <div key={7}>
      <h1 className="font-bold text-[30px]">Would you like to limit Conor&apos;s screentime?</h1>
      <p className="text-[16px] font-[400] mt-3">
        Set your student&apos;s daily CodeAlgo screen time below.
      </p>
      <div className="flex gap-4 flex-wrap mt-4">
        {screenTimes.map((time, index: number) => {
          return <ScreenTimeComponent updateTime={updateTime} time={time} key={index} />;
        })}
      </div>
    </div>
  );
}
