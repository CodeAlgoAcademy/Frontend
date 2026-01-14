import React from 'react'

interface IProps{
    activeTab:string;
}
export default function ClassEmptyState({activeTab}:IProps) {
  return (
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
  )
}
