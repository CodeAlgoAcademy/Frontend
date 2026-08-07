import React, { useState, PropsWithChildren, useEffect, useCallback, useMemo } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, View, Views, SlotInfo } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// Named imports from the package root. date-fns v4 (which this repo is on) is
// ESM-first and its submodules no longer carry default exports, so the older
// `import format from "date-fns/format"` style fails typechecking with
// "has no call signatures".
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
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
import { BsHandThumbsUp } from "react-icons/bs";
import { motion, useCycle } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { Schedule } from "types/interfaces";
import { useGoogleLogin } from "@react-oauth/google";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import Head from "next/head";
import { CalendarEvent, toApiEvent, toCalendarEvents } from "utils/scheduleAdapter";

// react-big-calendar is MIT. It replaced Syncfusion's ScheduleComponent, which
// was a paid component used on this one page and nowhere else in the app - it
// cost a licence key, a licence banner without one, and a runtime stylesheet
// fetched from cdn.syncfusion.com.
//
// The five views below are the same five the Syncfusion version registered
// (Day, Week, WorkWeek, Month, Agenda), so the UI is a like-for-like swap.
const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 0 }),
   getDay,
   locales: { "en-US": enUS },
});

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(BigCalendar as any);

const PropertyPane = (props: PropsWithChildren) => <div className="mt-5">{props.children}</div>;

/** Local date -> the yyyy-MM-dd an <input type="date"> expects. */
const toInputValue = (d: Date) => format(d, "yyyy-MM-dd");

function CalendarPage() {
   const dispatch = useDispatch<AppDispatch>();
   const scheduleData: Schedule = useSelector((state: RootState) => state.schedule);

   // Replaces Syncfusion's `extend([], data, null, true)` deep clone.
   const events = useMemo(
      () => toCalendarEvents(scheduleData.allSchedule as any),
      [scheduleData.allSchedule]
   );

   // Was scheduleObj.selectedDate + dataBind(). Controlled state instead, which
   // is why the ref to the calendar instance is gone.
   const [date, setDate] = useState<Date>(new Date());
   const [view, setView] = useState<View>(Views.MONTH);

   const [eventNotificationType, setEventNotificationType] = useState(true);
   const [eventNotification, setEventNotification] = useState(false);
   const [, setEventSuccess] = useState(true);
   const [positionX, cycleX] = useCycle(500, 0);

   const triggerNotificationClose = () => {
      setEventNotification((prev) => !prev);
   };

   const showEventNotification = (status: boolean) => {
      setEventNotificationType(status);
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

   // These three still send and receive Syncfusion-shaped records, because that
   // is what the API speaks. See utils/scheduleAdapter.ts.
   const changeSchedule = async (records: any[]) => {
      const data = scheduleData.googleConnect
         ? await dispatch(putGoogleCalendar(records))
         : await dispatch(putSchedule(records));
      const status = "error" in data;
      showEventNotification(!status);
      return !status;
   };

   const addSchedule = async (records: any[]) => {
      const data = scheduleData.googleConnect
         ? await dispatch(postGoogleCalendar(records))
         : await dispatch(postSchedule(records));
      const status = "error" in data;
      setEventSuccess(!status);
      showEventNotification(!status);
      return !status;
   };

   const popSchedule = async (records: any[]) => {
      const data = scheduleData.googleConnect
         ? await dispatch(deleteGoogleCalendar(records))
         : await dispatch(deleteSchedule(records));
      const status = "error" in data;
      setEventSuccess(!status);
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

   /**
    * Drag to a new time, or resize. Both are the same update as far as the API
    * is concerned, so one handler serves both.
    *
    * Typed locally rather than with withDragAndDropProps["onEventDrop"]: the
    * drop callback carries `isAllDay` and the resize callback does not, so the
    * two signatures do not unify. Everything here is optional and read
    * defensively.
    */
   const onEventChange = async (args: {
      event: CalendarEvent;
      start: Date | string;
      end: Date | string;
      isAllDay?: boolean;
   }) => {
      if (!navigator.onLine) return;
      const { event, start, end, isAllDay } = args;
      await changeSchedule([
         toApiEvent({
            ...event,
            start: new Date(start),
            end: new Date(end),
            allDay: isAllDay ?? event.allDay,
         }),
      ]);
      await fetchSchedule();
   };

   /** Drag across empty space to create. */
   const onSelectSlot = async (slot: SlotInfo) => {
      if (!navigator.onLine) return;
      const title = window.prompt("New event");
      if (!title) return;
      await addSchedule([
         toApiEvent({
            title,
            start: new Date(slot.start),
            end: new Date(slot.end),
            allDay: slot.slots?.length === 1,
         }),
      ]);
      await fetchSchedule();
   };

   /** Click an existing event to rename or delete it. */
   const onSelectEvent = async (event: CalendarEvent) => {
      if (!navigator.onLine) return;
      const title = window.prompt("Rename this event, or clear the box to delete it", event.title);
      if (title === null) return;
      if (title.trim() === "") {
         await popSchedule([toApiEvent(event)]);
      } else {
         await changeSchedule([toApiEvent({ ...event, title })]);
      }
      await fetchSchedule();
   };

   return (
      <>
         <Head>
            <title>Calendar | CodeAlgo Academy</title>
         </Head>
         <TeacherLayout className="relative">
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
               <DnDCalendar
                  localizer={localizer}
                  events={events}
                  date={date}
                  onNavigate={(d: Date) => setDate(d)}
                  view={view}
                  onView={(v: View) => setView(v)}
                  views={[Views.DAY, Views.WEEK, Views.WORK_WEEK, Views.MONTH, Views.AGENDA]}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 650 }}
                  selectable
                  resizable
                  popup
                  onEventDrop={onEventChange}
                  onEventResize={onEventChange}
                  onSelectSlot={onSelectSlot}
                  onSelectEvent={onSelectEvent}
               />

               <PropertyPane>
                  <label className="block text-sm font-medium text-zinc-600">
                     Current Date
                     <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        value={toInputValue(date)}
                        onChange={(e) => {
                           if (!e.target.value) return;
                           // Parse as local time. `new Date("2026-08-07")` is
                           // parsed as UTC midnight, which lands on the previous
                           // day for anyone west of Greenwich.
                           setDate(parse(e.target.value, "yyyy-MM-dd", new Date()));
                        }}
                     />
                  </label>
               </PropertyPane>
            </div>
         </TeacherLayout>
      </>
   );
}

export default CalendarPage;
