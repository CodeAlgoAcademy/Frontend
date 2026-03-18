import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "store/hooks";
import ParentLayout from "@/components/layouts/ParentLayout";
import { fetchChildCodingAccess, getChildren } from "store/parentChildSlice";
import LockModal from "@/components/Teachers/gameLock/lockModal";


export default function GameLocksParentPage() {
   const dispatch = useAppDispatch();
   const { children } = useSelector((state: RootState) => state.parentChild);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedChild, setSelectedChild] = useState<any>(null);

   useEffect(() => {
      dispatch(getChildren()).unwrap().then((childrenList: any[]) => {
         childrenList.forEach(child => {
            dispatch(fetchChildCodingAccess(child.id));
         });
      });
   }, [dispatch]);

   return (
      <ParentLayout title={"Game Access Control"}>
         <div className="p-6">
            <header className="mb-8">
               <h1 className="text-2xl font-bold text-slate-800">Child Game Safety</h1>
               <p className="text-slate-500 text-sm">Manage feature access and progression limits for your children.</p>
            </header>

            <div className="grid gap-6">
               {children.map((child) => {
                  const access = child.codingAccess;
                  const isLocked = access?.line_coding_locked || (access?.block_coding_max_level !== "");

                  return (
                     <div key={child.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${isLocked ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500'}`}>
                              {isLocked ? '🔒' : '🔓'}
                           </div>
                           <div>
                              <h3 className="font-bold text-slate-800 text-lg">{child.fullName}</h3>
                              <p className="text-xs text-slate-400 font-medium">@{child.username}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-10">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Line Coding</p>
                              <p className={`text-sm font-bold ${access?.line_coding_locked ? 'text-red-400' : 'text-green-500'}`}>
                                 {access?.line_coding_locked ? 'Disabled' : 'Enabled'}
                              </p>
                           </div>
                           <div className="text-right border-l pl-10">
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Max Level</p>
                              <p className="text-sm font-bold text-slate-600">
                                 {access?.block_coding_max_level ? access.block_coding_max_level.replace('_', ' Level ') : 'No Limit'}
                              </p>
                           </div>
                           <button 
                              onClick={() => {
                                 setSelectedChild(child);
                                 setIsModalOpen(true);
                              }}
                              className="bg-blue-600 text-white px-8 py-2.5 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                           >
                              Edit
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {isModalOpen && (
            <LockModal 
               student={{ ...selectedChild, student_id: selectedChild.id }} 
               onClose={() => setIsModalOpen(false)} 
            />
         )}
      </ParentLayout>
   );
}