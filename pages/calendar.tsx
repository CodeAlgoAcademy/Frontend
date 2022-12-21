import React, { useState, PropsWithChildren, useEffect } from "react"
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize } from "@syncfusion/ej2-react-schedule"
import { DatePickerComponent, ChangeEventArgs } from "@syncfusion/ej2-react-calendars"
import { Sidebar, GeneralNav } from "../components"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { updateSchedule } from "../store/scheduleSlice"
import { FcGoogle } from "react-icons/fc"
import { deleteSchedule, getSchedule, postSchedule, putSchedule } from "services/scheduleService"
import { extend } from '@syncfusion/ej2-base'
import { BsHandThumbsUp } from "react-icons/bs"
import { motion, useCycle } from "framer-motion"
import { FaTimes } from "react-icons/fa"
import { FiAlertTriangle } from "react-icons/fi"
import { Schedule } from "types/interfaces"
import Image from "next/image"

const PropertyPane = (props: PropsWithChildren) => <div className='mt-5'>{ props.children }</div>

const Calendar = () => {
   let scheduleObj: ScheduleComponent | any
   const dispatch = useDispatch<AppDispatch>()
   const scheduleData: Schedule = useSelector((state: RootState) => state.schedule)
   const data: Record<string, any>[] = extend([], scheduleData.allSchedule, true) as Record<string, any>[]
   const [eventNotificationType, setEventNotificationType] = useState(true)
   const [eventNotification, setEventNotification] = useState(false)
   const [positionY, cycleY] = useCycle(-1000, 0)
   const [positionX, cycleX] = useCycle(500, 0)
   function change (args: ChangeEventArgs): void {
      scheduleObj.selectedDate = args.value
      scheduleObj.dataBind()
   }
   const triggerNotificationClose = () => {
      setEventNotification((prev) => !prev)
   }

   const showEventNotification = (status: boolean) => {
      status ? setEventNotificationType((prev) => true) : setEventNotificationType((prev) => false)
      cycleX(1)
      setTimeout(triggerNotificationClose, 5000)
   }
   const fetchSchedule = async () => {
      await dispatch(getSchedule())
   }
   const changeSchedule = async () => {
      const data = await dispatch(putSchedule())
      const status = 'error' in data
      showEventNotification(!status)
   }
   const addSchedule = async () => {
      const data = await dispatch(postSchedule())
      const status = 'error' in data
      showEventNotification(!status)

   }
   const popSchedule = async () => {
      const data = await dispatch(deleteSchedule())
      const status = 'error' in data
      showEventNotification(!status)
   }
   const hideEventNotification = () => {
      cycleX(0)
   }
   useEffect(() => {
      hideEventNotification()
   }, [eventNotification])
   useEffect(() => {
      fetchSchedule()
   }, [])
   return (
      <div className="min-h-[100vh] relative">
         <GeneralNav />
         {/* <Header /> */ }
         <div className="flex mb-auto relative">
            <div className="sidebar bg-white w-[270px] relative">
               <div className="sticky top-0 left-0">
                  <Sidebar />
               </div>
            </div>
            <div className="bg-[#E5E5E5] flex-1 px-[2%] py-8 relative">
               <div className='flex right-[6px] top-8 items-center justify-center absolute pr-[2%] overflow-clip'>
                  <motion.div
                     animate={ { x: positionX } } transition={ { duration: 0.2 } }
                     className="bg-white border border-slate-300 shadow-lg rounded-md gap-4 px-4 py-3 flex flex-row overflow-clip items-center relative">
                     <section className="w-6 h-full flex flex-col items-center justify-start">
                        <div className="text-xl" style={ { color: eventNotificationType ? "#53a653" : "#ED4337" } }>{
                           eventNotificationType ? <BsHandThumbsUp /> : <FiAlertTriangle /> }
                        </div>
                     </section>
                     <section className="h-full flex flex-col items-start justify-end gap-1">
                        <h1 className="text-base font-semibold text-zinc-800 antialiased">{ eventNotificationType ? "Updates saved!" : "Error Saving Updates" }</h1>
                        <p className="text-sm font-medium text-zinc-400 antialiased"></p>
                     </section>
                     <div className="h-full content-[ ] w-1 flex self-end top-0 right-0 absolute" style={ { backgroundColor: eventNotificationType ? "#53a653" : "#ED4337" } }>
                     </div>
                  </motion.div>
               </div>
               <div className="flex space-x-2 justify-center pl-[2%] absolute left-[6px] top-8">
                  <motion.button className="tooltip text-3xl border border-gray-400" onTap={ () => cycleY() }>
                     <FcGoogle />
                     <span className="tooltiptext text-sm font-semibold">Connect Google Calendar</span>
                  </motion.button>
               </div>
               <div className='mt-24 p-4 bg-white rounded-xl max-w-[1200px] mx-auto'>
                  <ScheduleComponent
                     height='650px'
                     selectedDate={ new Date() }
                     ref={ schedule => scheduleObj = schedule }
                     eventSettings={ { dataSource: data } }
                     actionBegin={ (args) => {
                        const { requestType, changedRecords, addedRecords, deletedRecords } = args
                        const payload = {
                           allSchedule: scheduleData.allSchedule,
                           changedRecords,
                           addedRecords,
                           deletedRecords
                        }
                        dispatch(updateSchedule(payload))
                        if (requestType === "eventCreate") {
                           addedRecords?.length && addSchedule()
                        } else if (requestType === "eventChange") {
                           addedRecords?.length && addSchedule()
                           changedRecords?.length && changeSchedule()
                           deletedRecords?.length && popSchedule()
                        } else if (requestType === "eventRemove") {
                           deletedRecords?.length && popSchedule()
                        }
                     } }
                  >
                     <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                        <ViewDirective option='WorkWeek' />
                        <ViewDirective option='Month' />
                        <ViewDirective option='Agenda' />
                     </ViewsDirective>
                     <Inject services={ [Day, Week, WorkWeek, Month, Agenda, Resize] } />
                  </ScheduleComponent>
                  <PropertyPane>
                     <table style={ { width: "100%", background: "white" } }>
                        <tbody>
                           <tr style={ { height: "50px" } }>
                              <td style={ { width: "100%" } }>
                                 <DatePickerComponent
                                    value={ new Date() }
                                    showClearButton={ false }
                                    placeholder='Current Date'
                                    floatLabelType='Always'
                                    change={ change.bind(this) }
                                 />
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </PropertyPane>
               </div>
            </div>
         </div>
         <motion.div className={ `w-full h-full backdrop-blur-sm bg-gray-100/50 fixed left-0 z-50 flex justify-center items-center top-0` }
            animate={ { y: positionY } } transition={ { duration: 0.2 } }>
            <div className="bg-white rounded-2xl border shadow-xl p-10 relative max-w-lg">
               <motion.span onTap={ () => cycleY(0) }
                  className="text-[22px] absolute right-8 top-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all ease-out opacity-60" >
                  <FaTimes />
               </motion.span>
               <div className="flex flex-col items-center space-y-4">
                  <span className="w-4/6 text-center">
                     <Image alt="google-calendar" src="/assets/google-calendar.svg" width={ 80 } height={ 80 } />
                  </span>
                  <p className="text-sm text-gray-500 text-center w-5/6">
                     Hello, enter your gmail address to connect your Google Calendar.
                  </p>
                  <input
                     type="email"
                     placeholder="example@gmail.com"
                     className="border-2 rounded-lg w-full h-12 px-4 outline-none"
                  />
                  <motion.button className="bg-[#f28e2c] text-white rounded-md font-semibold px-4 py-3 w-full" onTap={ () => cycleY(0) } >
                     Connect
                  </motion.button>
               </div>
            </div>
         </motion.div>
      </div>
   )
}

export default Calendar
