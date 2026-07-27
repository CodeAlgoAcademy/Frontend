import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps{
    activeTab:string;
}
export default function ClassEmptyState({activeTab}:IProps) {
  const { t } = useTranslation('teacher');
  return (
    <div className="text-center py-12 w-full max-w-[600px] m-auto bg-gray-50 rounded-lg px-2">
                  <div className="mb-6 text-gray-300">
                                <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                             </div>
             <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'organization' ? t("noOrganizationClasses") : t("noPrivateClasses")}
             </h3>
             <p className="text-gray-500 max-w-md mx-auto">
                {activeTab === 'organization' 
                   ? t("orgClassDescription")
                   : t("privateClassDescription")
                }
             </p>
               </div>
  )
}
