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

const PropertyPane = (props: PropsWithChildren) => <div className='mt-5'>{ props.children }</div>

const Calendar = () => {
   let scheduleObj: ScheduleComponent | any
   const dispatch = useDispatch<AppDispatch>()
   const scheduleData = useSelector((state: RootState) => state.schedule)
   const data: Record<string, any>[] = extend([], scheduleData.allSchedule, true) as Record<string, any>[]
   function change (args: ChangeEventArgs): void {
      scheduleObj.selectedDate = args.value
      scheduleObj.dataBind()
   }
   const fetchSchedule = async () => {
      await dispatch(getSchedule())
   }
   const changeSchedule = async () => {
      await dispatch(putSchedule())
   }
   const addSchedule = async () => {
      await dispatch(postSchedule())
   }
   const popSchedule = async () => {
      await dispatch(deleteSchedule())
   }
   useEffect(() => {
      fetchSchedule()
   }, [])
   return (
      <div className="min-h-[100vh]">
         <GeneralNav />
         {/* <Header /> */ }
         <div className="flex mb-auto relative">
            <div className="sidebar bg-white w-[270px] relative">
               <div className="sticky top-0 left-0">
                  <Sidebar />
               </div>
            </div>
            <div className="bg-[#E5E5E5] flex-1 px-[2%] py-8 relative">
               <div className="flex space-x-2 justify-center pl-[2%] absolute left-[6px] top-8">
                  <button className="tooltip text-3xl border border-gray-400">
                     <FcGoogle />
                     <span className="tooltiptext text-sm font-semibold">Connect Google Calendar</span>
                  </button>
               </div>
               <div className='mt-16 p-4 bg-white rounded-xl max-w-[1200px] mx-auto'>
                  <ScheduleComponent
                     height='650px'
                     selectedDate={ new Date() }
                     ref={ schedule => scheduleObj = schedule }
                     eventSettings={ { dataSource: data } }
                     actionComplete={ (args) => {
                        const { requestType, changedRecords, addedRecords, deletedRecords } = args
                        const payload = {
                           allSchedule: scheduleData.allSchedule,
                           changedRecords,
                           addedRecords,
                           deletedRecords
                        }
                        dispatch(updateSchedule(payload))
                        if (requestType === "eventCreated") {
                           addedRecords?.length && addSchedule()
                        } else if (requestType === "eventChanged") {
                           addedRecords?.length && addSchedule()
                           changedRecords?.length && changeSchedule()
                           deletedRecords?.length && popSchedule()
                        } else if (requestType === "eventRemoved") {
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
      </div>
   )
}

export default Calendar
