import React, { useState, useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { updateCodingAccess, fetchCodingAccess } from "store/teacherStudentSlice";
import { BLOCK_CURRICULUM } from "constants/blockCurriculum";
import { updateChildCodingAccess } from "store/parentChildSlice";

export default function LockModal({ student, onClose }: { student: any; onClose: () => void }) {
   const dispatch = useAppDispatch();
   const [lineLocked, setLineLocked] = useState(student?.codingAccess?.line_coding_locked || false);
   const [blockLevel, setBlockLevel] = useState(student?.codingAccess?.block_coding_max_level || "");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (student?.student_id) {
         dispatch(fetchCodingAccess(student.student_id));
      }
   }, [student?.student_id, dispatch]);

   const handleSave = async () => {
    setLoading(true);
    const id = student.student_id; 
    
    const isParent = window.location.pathname.includes('parent');
    const action = isParent ? updateChildCodingAccess : updateCodingAccess;

    await dispatch(action({ 
        studentId: id, 
        data: { line_coding_locked: lineLocked, block_coding_max_level: blockLevel } 
    })).unwrap();
    
    setLoading(false);
    onClose();
};

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
         <div className="animate-in zoom-in w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200">
            <div className="flex items-center justify-between p-8 pb-4">
               <h2 className="text-xl font-bold text-slate-800">Edit Settings: {student?.firstName}</h2>
               <button onClick={onClose} className="text-3xl text-slate-300 hover:text-slate-500">
                  &times;
               </button>
            </div>

            <div className="space-y-10 p-10 pt-4">
               <div className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 p-6">
                  <div>
                     <h3 className="text-lg font-bold text-slate-800">Line Coding Mode</h3>
                     <p className="text-sm text-slate-400">Allow student to use the Python editor</p>
                  </div>
                  <button
                     onClick={() => setLineLocked(!lineLocked)}
                     className={`relative h-9 w-16 rounded-full transition-all ${!lineLocked ? "bg-green-500" : "bg-slate-300"}`}
                  >
                     <div
                        className={`absolute top-1.5 h-6 w-6 rounded-full bg-white shadow-sm transition-all ${!lineLocked ? "left-8" : "left-1.5"}`}
                     />
                  </button>
               </div>
               <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Block Game Progress Limit</label>
                  <select value={blockLevel} onChange={(e) => setBlockLevel(e.target.value)} className="...">
                     <option value="">No Limit (Unrestricted)</option>

                     {/* <optgroup label="Kindergarten">
                        {BLOCK_CURRICULUM.filter((l) => l.code.startsWith("K")).map((lvl) => (
                           <option key={lvl.code} value={lvl.code}>
                              {lvl.name}
                           </option>
                        ))}
                     </optgroup> */}

                     <optgroup label="Grade 1">
                        {BLOCK_CURRICULUM.filter((l) => l.code.startsWith("1")).map((lvl) => (
                           <option key={lvl.code} value={lvl.code}>
                              {lvl.name}
                           </option>
                        ))}
                     </optgroup>

                     <optgroup label="Grade 2">
                        {BLOCK_CURRICULUM.filter((l) => l.code.startsWith("2")).map((lvl) => (
                           <option key={lvl.code} value={lvl.code}>
                              {lvl.name}
                           </option>
                        ))}
                     </optgroup>
                  </select>
                  <p className="px-2 text-[11px] font-medium italic leading-relaxed text-slate-400">
                     Students will be padlocked from levels following your selection.
                  </p>
               </div>
            </div>

            <div className="flex gap-4 bg-slate-50/50 p-8">
               <button onClick={onClose} className="flex-1 rounded-2xl py-4 font-bold text-slate-400 transition hover:bg-slate-200">
                  Cancel
               </button>
               <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 disabled:opacity-50"
               >
                  {loading ? "Saving..." : "Save Settings"}
               </button>
            </div>
         </div>
      </div>
   );
}
