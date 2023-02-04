import React, { useState } from 'react';
import ParentLayout from '@/components/parents/ParentLayout';
import SideNav from '@/components/parents/ParentSideNav';
// import React from 'react';
import ContentBox from '@/components/parents/ContentBox';
import BarChart from '@/components/parents/BarChart';
import DashboardBox from '@/components/parents/DashboardBox';
import ScreenTimeComponent from '@/components/parentMultiForm/screenTimeComponent';

const ScreenTime = () => {
  const [screenTimes, setScreenTimes] = useState<{ day: string; time: '' | number | 'No Limit' }[]>(
    [
      { day: 'Monday', time: 8 },
      { day: 'Tuesday', time: 'No Limit' },
      { day: 'Wednesday', time: 5 },
      { day: 'Thursday', time: 3 },
      { day: 'Friday', time: 7 },
      { day: 'Saturday', time: 0 },
      { day: 'Sunday', time: 2 },
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
      <div className="overflow-x-auto flex flex-col gap-9 mx-4 sm:mx-0">
        <ContentBox size="large" title="Screen Time" padding="large">
          <BarChart
            data={screenTimes.map((time) => {
              return time.time === 'No Limit' ? 8 : (time.time as number);
            })}
            barSpace={9.6}
            barWidth={3.3}
            maxHours={8}
          />
        </ContentBox>
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
          <button className="w-[150px] py-2 px-3 rounded-md text-white bg-[#2073FA] shadow-sm hover:shadow-md mt-6">
            Save Changes
          </button>
        </div>
      </div>
    </ParentLayout>
  );

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
