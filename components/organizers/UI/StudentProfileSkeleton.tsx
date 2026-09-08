import React from "react";

const StudentProfileSkeleton = () => {
   return (
      <div className="p-6 animate-pulse">
         <div className="mb-4 flex items-center">
            <div className="mr-2 h-5 w-5 rounded-full bg-gray-200"></div>
            <div className="h-4 w-32 rounded bg-gray-200"></div>
         </div>

         <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 h-7 w-48 rounded bg-gray-200"></div>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
               <div className="h-[150px] w-[150px] rounded-full bg-gray-200"></div>
               <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                     <div className="space-y-3">
                        <div className="h-5 w-40 rounded bg-gray-200"></div>
                        <div className="h-4 w-full max-w-[280px] rounded bg-gray-200"></div>
                        <div className="h-4 w-full max-w-[280px] rounded bg-gray-200"></div>
                        <div className="h-4 w-full max-w-[280px] rounded bg-gray-200"></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8">
               <div className="mb-4 h-6 w-56 rounded bg-gray-200"></div>
               <div className="mb-4 h-8 w-full max-w-[280px] rounded bg-gray-200"></div>
               <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className="h-10 w-full rounded bg-gray-100"></div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default StudentProfileSkeleton;
