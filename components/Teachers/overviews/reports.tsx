import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsClassProgresss } from "store/studentSlice";
import { RootState } from "store/store";
import { StudentProgressCards } from "./StudentProgressCards ";

export default function Reports() {
   const dispatch = useDispatch();
   const progressSummary = useSelector((state: RootState) => state.students.progressSummary);
   const loading = useSelector((state: RootState) => state.students.loading);
   const currentClassId = useSelector((state: RootState) => state.currentClass.id);

   useEffect(() => {
      if (currentClassId) {
         dispatch(getStudentsClassProgresss());
      }
   }, [dispatch, currentClassId]);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen bg-gray-50">
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
         <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-[30px] font-medium text-mainColor">Classroom Insights: Progress & Skills</h1>

            <StudentProgressCards students={students} />
         </div>
      </div>
   );
}
