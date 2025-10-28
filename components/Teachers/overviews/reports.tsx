import React, { useEffect, useState, useMemo } from "react";
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
   const [selectedRange, setSelectedRange] = useState("all");
   const [sortBy, setSortBy] = useState("name");

   useEffect(() => {
      if (currentClassId) {
         dispatch(getStudentsClassProgresss());
      }
   }, [dispatch, currentClassId]);

   const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedRange(event.target.value);
   };

   const filteredStudents = useMemo(() => {
      if (!progressSummary?.students) return [];

      const students = progressSummary.students;
   
      if (selectedRange === "all") {
         return students;
      }

      const now = new Date();
      let startDate: Date;

      switch (selectedRange) {
         case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
         case "week":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
         case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
         default:
            return students;
      }

      return students.filter(student => {
         if (!student.current_level) return false;

         const activityDate = student.current_level.started_at ? 
            new Date(student.current_level.started_at) : null;

         if (!activityDate) return false;

         return activityDate >= startDate;
      });
   }, [progressSummary?.students, selectedRange]);

   const sortedAndFilteredStudents = useMemo(() => {
      return [...filteredStudents].sort((a, b) => {
         switch (sortBy) {
            case "name":
               return a.student_username.localeCompare(b.student_username);
            
            case "progress":
               return b.overall_progress - a.overall_progress;
            
            case "completed":
               return b.completed_count - a.completed_count;
            
            case "in_progress":
               return b.in_progress_count - a.in_progress_count;
            
            case "recent_activity":
               const dateA = a.current_level?.started_at ? new Date(a.current_level.started_at).getTime() : 0;
               const dateB = b.current_level?.started_at ? new Date(b.current_level.started_at).getTime() : 0;
               return dateB - dateA;
            
            default:
               return a.student_username.localeCompare(b.student_username);
         }
      });
   }, [filteredStudents, sortBy]);

   if (loading) {
      return (
         <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-xl text-gray-600">Loading student data...</div>
         </div>
      );
   }
   const hasStudents = sortedAndFilteredStudents.length > 0;

   return (
      <div className="min-h-screen p-6">
         <div className="mx-auto">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
               <h1 className="text-2xl font-medium text-mainColor sm:text-[30px] lg:mb-0">
                  Classroom Insights: Progress & Skills
               </h1>
               
               <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  {/* Filter by Time Range */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                     <label htmlFor="time-range" className="whitespace-nowrap text-sm font-medium text-gray-700 sm:text-base">
                        Filter By:
                     </label>
                     <div className="relative w-full sm:w-40">
                        <select
                           id="time-range"
                           value={selectedRange}
                           onChange={handleTimeRangeChange}
                           className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
            </div>

            {!hasStudents ? (
               <div className="flex h-64 items-center justify-center bg-gray-50">
                  <div className="text-center">
                     <div className="mb-2 text-xl text-gray-600">No students found</div>
                     <div className="text-gray-500">
                        {selectedRange !== "all" 
                           ? `No students have activity in the selected time range` 
                           : "No students found in this class"}
                     </div>
                  </div>
               </div>
            ) : (
               <StudentProgressCards students={sortedAndFilteredStudents} />
            )}
         </div>
      </div>
   );
}