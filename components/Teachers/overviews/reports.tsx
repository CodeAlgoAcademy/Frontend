import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsClassProgresss } from "store/studentSlice";
import { RootState } from "store/store";
import { StudentProgressCards } from "./StudentProgressCards ";

const TIME_RANGE_OPTIONS = [
   { value: "today", label: "Today" },
   { value: "week", label: "This Week" },
   { value: "month", label: "This Month" },
   { value: "all", label: "All Time" },
];

export default function Reports() {
   const dispatch = useDispatch();
   const progressSummary = useSelector((state: RootState) => state.students.progressSummary);
   const loading = useSelector((state: RootState) => state.students.loading);
   const currentClassId = useSelector((state: RootState) => state.currentClass.id);
   const [selectedRange, setSelectedRange] = useState("Today");

   useEffect(() => {
      if (currentClassId) {
         dispatch(getStudentsClassProgresss());
      }
   }, [dispatch, currentClassId]);

   if (loading) {
      return (
         <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-xl text-gray-600">Loading student data...</div>
         </div>
      );
   }
   if (!progressSummary || !progressSummary.students) {
      return (
         <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
               <div className="mb-2 text-xl text-gray-600">No data available</div>
               <div className="text-gray-500">{!currentClassId ? "Please select a class first" : "No students found in this class"}</div>
            </div>
         </div>
      );
   }

   const students = progressSummary.students;

   return (
      <div className="min-h-screen  p-6">
         <div className="mx-auto">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
               <h1 className="text-2xl font-medium text-mainColor sm:text-[30px] lg:mb-0">Classroom Insights: Progress & Skills</h1>
               <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <label htmlFor="time-range" className="whitespace-nowrap text-sm font-medium text-gray-700 sm:text-base">
                     Sort By:
                  </label>
                  <div className="relative w-full sm:w-auto">
                     <select
                        id="time-range"
                        value={selectedRange}
                        // onChange={handleTimeRangeChange}
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
                     >
                        {TIME_RANGE_OPTIONS.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>

            <StudentProgressCards students={students} />
         </div>
      </div>
   );
}
