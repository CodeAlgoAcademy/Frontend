import React, { useState, useEffect } from "react";
import ScheduleItem from "./ScheduleItem";
import { getSchedule } from "services/scheduleService";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Schedule } from "types/interfaces";

const ScheduleBox = () => {
   const scheduleData: Schedule = useSelector((state: RootState) => state.schedule);
   const [currentSchedule, setCurrentSchedule] = useState([]);
   const [allSchedule] = useState(scheduleData.allSchedule);
   const dispatch = useDispatch<AppDispatch>();

   function isToday(date: Date): boolean {
      const today = new Date();
      let result: boolean = false;
      try {
         if (today.toDateString() === new Date(date).toDateString()) {
            result = true;
         }
      } catch {
         result = false;
      }
      return result;
   }

   function formatAMPM(date: Date) {
      const changeDate = new Date(date);
      let hours = changeDate.getHours();
      let minutes: any = changeDate.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
   }

   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const fullDate = new Date();
   const date = fullDate.getDate();
   const month = fullDate.getMonth();
   const year = fullDate.getFullYear();

   useEffect(() => {
      dispatch(getSchedule());
   }, [dispatch]);

   useEffect(() => {
      const data = allSchedule.filter((item: any) => isToday(item.StartTime));
      setCurrentSchedule((prev) => data);
   }, [allSchedule]);
   return (
      <div className="max-h-[212px] max-w-[380px] overflow-y-auto rounded-md bg-white p-6 shadow-lg">
         <div className="min-h-[114px]">
            <h3 className="mb-3 text-[20px] font-bold text-[#2073fa]" data-testid="schedule-box-heading">
               Schedule - <span>{`${months[month]} ${date}, ${year}`}</span>
            </h3>
            <div className="grid grid-cols-1 divide-y">
               {currentSchedule.length > 0 &&
                  currentSchedule?.map(({ id, StartTime, Subject }, index) => {
                     return <ScheduleItem key={index} time={formatAMPM(StartTime)} item={Subject} id={id} />;
                  })}
            </div>
         </div>
      </div>
   );
};

export default ScheduleBox;
