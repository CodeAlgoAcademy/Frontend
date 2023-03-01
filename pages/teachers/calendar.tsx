import React, { useState, PropsWithChildren, useEffect, useCallback } from "react";
import {
   ScheduleComponent,
   ViewsDirective,
   ViewDirective,
   Day,
   Week,
   WorkWeek,
   Month,
   Agenda,
   ActionEventArgs,
   Inject,
   Resize,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent, ChangeEventArgs } from "@syncfusion/ej2-react-calendars";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { FcGoogle } from "react-icons/fc";
import {
   deleteGoogleCalendar,
   deleteSchedule,
   getGoogleCalendar,
   getSchedule,
   googleCalendar,
   postGoogleCalendar,
   postSchedule,
   putGoogleCalendar,
   putSchedule,
} from "services/scheduleService";
import { extend } from "@syncfusion/ej2-base";
import { BsHandThumbsUp } from "react-icons/bs";
import { motion, useCycle } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { Schedule } from "types/interfaces";
import { useGoogleLogin } from "@react-oauth/google";
import TeacherLayout from "@/components/Teachers/TeacherLayout";
import Head from "next/head";

const PropertyPane = (props: PropsWithChildren) => <div className="mt-5">{props.children}</div>;

function Calendar() {
   let scheduleObj: ScheduleComponent;
   const dispatch = useDispatch<AppDispatch>();
   const scheduleData: Schedule = useSelector((state: RootState) => state.schedule);
   const data: Record<string, any>[] = extend([], scheduleData.allSchedule as Record<string, any>, null!, true) as Record<string, any>[];
   const [eventNotificationType, setEventNotificationType] = useState(true);
   const [eventNotification, setEventNotification] = useState(false);
   const [eventSuccess, setEventSuccess] = useState(true);
   const [positionY, cycleY] = useCycle(-1000, 0);
   const [positionX, cycleX] = useCycle(500, 0);

   const triggerNotificationClose = () => {
      setEventNotification((prev) => !prev);
   };

   const showEventNotification = (status: boolean) => {
      status ? setEventNotificationType((prev) => true) : setEventNotificationType((prev) => false);
      cycleX(1);
      setTimeout(triggerNotificationClose, 5000);
   };
   const fetchSchedule = useCallback(async () => {
      if (scheduleData.googleConnect) {
         await dispatch(getGoogleCalendar());
      } else {
         await dispatch(getSchedule());
      }
   }, [dispatch, scheduleData.googleConnect]);
   const changeSchedule = async (args: any) => {
      let data;
      if (scheduleData.googleConnect) {
         data = await dispatch(putGoogleCalendar(args));
      } else {
         data = await dispatch(putSchedule(args));
      }
      const status = "error" in data;
      showEventNotification(!status);
      return !status;
   };
   const addSchedule = async (args: any) => {
      let data;
      if (scheduleData.googleConnect) {
         data = await dispatch(postGoogleCalendar(args));
      } else {
         data = await dispatch(postSchedule(args));
      }
      const status = "error" in data;
      status ? setEventSuccess((prev) => false) : setEventSuccess((prev) => true);
      showEventNotification(!status);
      return !status;
   };
   const popSchedule = async (args: any) => {
      let data;
      if (scheduleData.googleConnect) {
         data = await dispatch(deleteGoogleCalendar(args));
      } else {
         data = await dispatch(deleteSchedule(args));
      }
      const status = "error" in data;
      status ? setEventSuccess((prev) => false) : setEventSuccess((prev) => true);
      showEventNotification(!status);
      return !status;
   };
   const hideEventNotification = useCallback(() => {
      cycleX(0);
   }, [cycleX]);
   useEffect(() => {
      hideEventNotification();
   }, [eventNotification, hideEventNotification]);
   useEffect(() => {
      fetchSchedule();
   }, [fetchSchedule]);

   const fetchGoogle = useGoogleLogin({
      onSuccess: async (response) => {
         const { access_token } = response;
         await dispatch(googleCalendar(access_token));
      },
      scope: "https://www.googleapis.com/auth/calendar",
   });

   return (
      <>
         <TeacherLayout className="relative">
            {/* <style jsx>
               {`
                  @import url("https://cdn.syncfusion.com/ej2/material.css");
               `}
            </style> */}
            <div className="absolute right-[6px] top-8 flex items-center justify-center overflow-clip pr-[2%]">
               <motion.div
                  animate={{ x: positionX }}
                  transition={{ duration: 0.2 }}
                  className="relative flex flex-row items-center gap-4 overflow-clip rounded-md border border-slate-300 bg-white py-3 pl-6 pr-8 shadow-lg"
               >
                  <section className="flex h-full w-6 flex-col items-center justify-start">
                     <div className="text-xl" style={{ color: eventNotificationType ? "#53a653" : "#ED4337" }}>
                        {eventNotificationType ? <BsHandThumbsUp /> : <FiAlertTriangle />}
                     </div>
                  </section>
                  <section className="flex h-full flex-col items-center justify-end gap-1">
                     <h1 className="text-sm font-semibold text-zinc-800 antialiased">
                        {eventNotificationType ? "Updates saved!" : "Error Saving Updates"}
                     </h1>
                  </section>
                  <div
                     className="content-[ ] absolute top-0 right-0 flex h-full w-1 self-end"
                     style={{ backgroundColor: eventNotificationType ? "#53a653" : "#ED4337" }}
                  ></div>
               </motion.div>
            </div>
            <div className="absolute left-[6px] top-8 flex justify-center space-x-2 pl-[2%]">
               <motion.button className="tooltip border border-gray-400 text-3xl" onClick={() => fetchGoogle()}>
                  <FcGoogle />
                  <span className="tooltiptext text-sm font-semibold">Connect Google Calendar</span>
               </motion.button>
            </div>
            <div className="mx-auto mt-24 max-w-[1200px] rounded-xl bg-white p-4">
               <ScheduleComponent
                  height="650px"
                  selectedDate={new Date()}
                  ref={(schedule) => (scheduleObj = schedule!)}
                  eventSettings={{ dataSource: data }}
                  actionComplete={async (args: ActionEventArgs) => {
                     const { requestType, changedRecords, addedRecords, deletedRecords } = args;
                     let performAction: any = false;
                     let isOnLine = navigator.onLine;
                     if (requestType === "eventCreated") {
                        if (addedRecords?.length) performAction = await addSchedule(addedRecords);
                     } else if (requestType === "eventChanged") {
                        if (addedRecords?.length) performAction = await addSchedule(addedRecords);
                        if (changedRecords?.length) performAction = await changeSchedule(changedRecords);
                        if (deletedRecords?.length) performAction = await popSchedule(deletedRecords);
                     } else if (requestType === "eventRemoved") {
                        if (deletedRecords?.length) performAction = await popSchedule(deletedRecords);
                     }
                     let isEventRequest = requestType === "eventChanged" || requestType === "eventRemoved" || requestType === "eventCreated";
                     if (!performAction && isEventRequest && !isOnLine) args.cancel = true;
                  }}
               >
                  <ViewsDirective>
                     <ViewDirective option="Day" />
                     <ViewDirective option="Week" />
                     <ViewDirective option="WorkWeek" />
                     <ViewDirective option="Month" />
                     <ViewDirective option="Agenda" />
                  </ViewsDirective>
                  <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize]} />
               </ScheduleComponent>
               <PropertyPane>
                  <table style={{ width: "100%", background: "white" }}>
                     <tbody>
                        <tr style={{ height: "50px" }}>
                           <td style={{ width: "100%" }}>
                              <DatePickerComponent
                                 value={new Date()}
                                 showClearButton={false}
                                 placeholder="Current Date"
                                 floatLabelType="Always"
                                 change={(args: ChangeEventArgs) => {
                                    scheduleObj.selectedDate = args.value!;
                                    scheduleObj.dataBind();
                                 }}
                              />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </PropertyPane>
            </div>
         </TeacherLayout>

         {/* <motion.div
        className={`w-full h-full backdrop-blur-sm bg-gray-100/50 fixed left-0 z-50 flex justify-center items-center top-0`}
        animate={{ y: positionY }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white rounded-2xl border shadow-xl p-10 relative max-w-lg">
          <motion.span
            onTap={() => cycleY(0)}
            className="text-[22px] absolute right-8 top-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all ease-out opacity-60"
          >
            <FaTimes />
          </motion.span>
          <div className="flex flex-col items-center space-y-4">
            <span className="w-4/6 text-center">
              <Image
                alt="google-calendar"
                src="/assets/google-calendar.svg"
                width={80}
                height={80}
              />
            </span>
            <p className="text-sm text-gray-500 text-center w-5/6">
              Hello, enter your gmail address to connect your Google Calendar.
            </p>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="border-2 rounded-lg w-full h-12 px-4 outline-none"
            />
            <motion.button
              className="bg-[#f28e2c] text-white rounded-md font-semibold px-4 py-3 w-full"
              onTap={() => cycleY(0)}
            >
              Connect
            </motion.button>
          </div>
        </div>
      </motion.div> */}
      </>
   );
}

export default Calendar;
