import React, { useState } from 'react';
import ParentLayout from '@/components/parents/ParentLayout';
import SideNav from '@/components/parents/ParentSideNav';
import DashboardBox from '@/components/parents/DashboardBox';
import ScreenTimeComponent from '@/components/parentMultiForm/screenTimeComponent';

const ScreenTime = () => {
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
    <ParentLayout>
      <section>
        <div className="rounded-2xl max-w-[90vw] mx-auto md:min-w-[420px] relative bg-white min-h-[340px] md:w-full px-8 py-10">
          <h1 className="text-[#2073FA] text-[1.3rem] font-semibold">
            Current screen time restrictions
          </h1>
          <h2 className="text-[14px] font-medium mt-2 mb-10">
            Make edits to screen time restrictions below
          </h2>
          <div className="flex gap-4 justify-center md:justify-start items-center flex-wrap mt-4">
            {screenTimes.map((time) => {
              return <ScreenTimeComponent updateTime={updateTime} time={time} />;
            })}
          </div>
        </div>
      </section>
    </ParentLayout>
  );
};

export default ScreenTime;
