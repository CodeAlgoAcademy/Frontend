import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsClassProgresss } from 'store/studentSlice';
import { RootState } from 'store/store';
import { StudentProgressCards } from './StudentProgressCards ';
import Loader from '@/components/UI/loader';

export default function Reports() {
  const dispatch = useDispatch();
  
  const progressSummary = useSelector((state: RootState) => state.students.progressSummary);
  const loading = useSelector((state: RootState) => state.students.loading);
  const currentClassId = useSelector((state: RootState) => state.currentClass.id);
  
  console.log('Progress Summary from Redux:', progressSummary);
  
  useEffect(() => {
    if (currentClassId) {
      dispatch(getStudentsClassProgresss());
    }
  }, [dispatch, currentClassId]);

  if (loading) {
    return (
                     <div className="flex h-[150px] flex-col items-center justify-center space-y-2 text-center">
                        <Loader size={50} color="red" />
                        </div>

      // <div className="flex items-center justify-center h-screen bg-gray-50">
      //   <div className="text-xl text-gray-600">Loading student data...</div>
      // </div>
    );
  }
  if (!progressSummary || !progressSummary.students) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-2">No data available</div>
          <div className="text-gray-500">
            {!currentClassId ? 'Please select a class first' : 'No students found in this class'}
          </div>
        </div>
      </div>
    );
  }

  const students = progressSummary.students;

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-medium text-[30px] text-mainColor mb-8">
         Classroom Insights: Progress & Skills
        </h1>
        
        <StudentProgressCards students={students} />
      </div>
    </div>
  );
}