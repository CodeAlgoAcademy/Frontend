import React, { useState, PropsWithChildren } from "react"
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, EventRenderedArgs } from "@syncfusion/ej2-react-schedule"
import { DatePickerComponent, ChangeEventArgs } from "@syncfusion/ej2-react-calendars"
import { Sidebar, GeneralNav } from "../components"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

const PropertyPane = (props: PropsWithChildren) => <div className='mt-5'>{ props.children }</div>

const Calendar = () => {
   let scheduleObj: ScheduleComponent | any
   const scheduleData = useSelector((state: RootState) => state.calendar)
   function change (args: ChangeEventArgs): void {
      scheduleObj.selectedDate = args.value
      scheduleObj.dataBind()
   }

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
            <div className="bg-[#E5E5E5] flex-1 px-[2%] py-8">
               <div className='mt-6 p-4 bg-white rounded-xl max-w-[1200px] mx-auto'>
                  <ScheduleComponent
                     height='650px'
                     selectedDate={ new Date() }
                     ref={ schedule => scheduleObj = schedule }
                     eventSettings={ { dataSource: scheduleData } }>
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
