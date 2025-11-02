import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IClass } from "../../../types/interfaces";
import SingleClass from "./singleClass";
import ClassEmptyState from "./state/classEmptyState";

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
            <>
            <ClassEmptyState activeTab={activeTab}/>
            </>
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
