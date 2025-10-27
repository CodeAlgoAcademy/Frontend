import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IClass } from "../../../types/interfaces";
import SingleClass from "./singleClass";

const Classes = () => {
   const { classes } = useSelector((state: RootState) => state.allClasses);
   const [activeTab, setActiveTab] = useState<'organization' | 'private'>('organization');
   const organizationClasses = classes?.filter((singleClass: IClass) => 
      singleClass.organization !== null
   ) || [];

   const privateClasses = classes?.filter((singleClass: IClass) => 
      singleClass.organization === null
   ) || [];

   const currentClasses = activeTab === 'organization' ? organizationClasses : privateClasses;

   return (
      <div>
         <div className="mb-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 ">
               <button
                  onClick={() => setActiveTab('organization')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                     activeTab === 'organization'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
               >
                  Organization Classes
                  {organizationClasses.length > 0 && (
                     <span className="ml-2 py-0.5 px-2 text-xs bg-blue-100 text-blue-600 rounded-full">
                       {organizationClasses.length}
                     </span>
                  )}
               </button>
               <button
                  onClick={() => setActiveTab('private')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                     activeTab === 'private'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
               >
                  Private Classes
                  {privateClasses.length > 0 && (
                     <span className="ml-2 py-0.5 px-2 text-xs bg-purple-100 text-purple-600 rounded-full">
                        {privateClasses.length}
                     </span>
                  )}
               </button>
            </nav>
         </div>

         {currentClasses.length === 0 && (
            <div className="text-center py-12 w-full max-w-[600px] m-auto bg-gray-50 rounded-lg px-2">
               <div className="mb-6 text-gray-300">
                             <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                             </svg>
                          </div>
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab === 'organization' ? 'Organization' : 'Private'} Classes
               </h3>
               <p className="text-gray-500 max-w-md mx-auto">
                  {activeTab === 'organization' 
                     ? 'Organization classes are created and managed by your school. Contact your administrator to get started.'
                     : 'Create private classes for individual students or small groups outside of your organization.'
                  }
               </p>
            </div>
         )}

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentClasses.map((singleClass: IClass) => {
               return <SingleClass key={singleClass.id} {...singleClass} />;
            })}
         </div>
      </div>
   );
};

export default Classes;
