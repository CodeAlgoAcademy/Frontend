import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const hours: Array<number | 'No Limit'> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 'No Limit'];

const ScreenTimeComponent = ({
  time,
  updateTime,
}: {
  time: { day: string; time: '' | number | 'No Limit' };
  updateTime: (day: string, hour: number | 'No Limit') => void;
}) => {
  const [hoursListOpen, setHoursListOpen] = useState<boolean>(false);

  const toggleHoursList = () => {
    setHoursListOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col text-[14px] gap-y-2 relative ">
      <p className="text-center">{time.day}</p>
      <div
        className="w-[50px] mx-auto h-[50px] rounded-[50%]"
        style={{
          background:
            time.time !== ''
              ? `
                ${
                  time.time !== 'No Limit'
                    ? `repeating-conic-gradient(
                        from 0deg,
                      royalblue 0deg calc(3.6deg * ${(time.time * 100) / 8}),
                      rgba(145, 151, 238, 0.24) calc(3.6deg * ${
                        (time.time * 100) / 8
                      }) calc(360deg))`
                    : `royalblue`
                }
        `
              : 'rgba(145, 151, 238, 0.24)',
        }}
      ></div>
      <div
        className="bg-[#f0f0f0]  border border-[royalblue] text-[royalblue] flex justify-between items-center text-[13px] py-2 min-w-[100px] px-2 rounded-md cursor-pointer"
        onClick={() => {
          toggleHoursList();
        }}
      >
        {time.time === '' ? 'Select' : time.time === 'No Limit' ? time.time : time.time + ' hr'}
        <span className="text-[20px]">
          <BiChevronDown />
        </span>
      </div>
      {hoursListOpen && (
        <div className="absolute top-[105%] left-0 w-[100%]  bg-white shadow-md z-[2] rounded-md text-gray-800">
          {hours.map((hour, index: number) => {
            return (
              <span
                key={index}
                className="px-2 py-1 block cursor-pointer"
                onClick={() => {
                  updateTime(time.day, hour);
                  setHoursListOpen(false);
                }}
              >
                {hour} {typeof hour === 'string' ? '' : 'hr'}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScreenTimeComponent;
