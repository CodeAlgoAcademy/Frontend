import React from "react";

const StudentListSkeleton = () => {
   return (
      <div className="mt-14 space-y-2 md:px-8 px-4 animate-pulse">
         {[...Array(5)].map((_, row) => (
            <div key={row} className="flex items-center justify-between rounded-md bg-white px-2 py-6 shadow-lg sm:px-6 border-b">
               <div className="flex items-center space-x-3 justify-between px-2 border-r min-w-28 sm:min-w-40">
                  <div className="h-4 w-28 rounded bg-gray-200"></div>
                  <div className="h-4 w-4 rounded bg-gray-200"></div>
               </div>
               <div className="ml-4 hidden h-4 w-32 rounded bg-gray-200 md:block"></div>
               <div className="flex items-center space-x-5 px-2">
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default StudentListSkeleton;
