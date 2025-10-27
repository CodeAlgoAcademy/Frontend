import React from 'react'
import { FaPlus } from 'react-icons/fa'

interface Iprops{
    onClick?:()=>void;
    title:string;
    description:string;
}

export default function EmptyState({onClick, title, description}:Iprops) {
  return (
   <div className="flex flex-col items-center w-full max-w-[600px] m-auto px-2 justify-center py-16 text-center bg-white rounded-2xl shadow-sm">
                          <div className="mb-6 text-gray-300">
                             <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                             </svg>
                          </div>
                          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
                          <p className="text-gray-600 max-w-md mb-8 text-lg">
                             {description}
                          </p>
                          <button
                             onClick={onClick}
                             className="bg-mainColor text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-3 text-lg shadow-lg hover:shadow-xl"
                          >
                             <FaPlus className="text-lg" />
                             Create Your First Class
                          </button>
                       </div>
  )
}
