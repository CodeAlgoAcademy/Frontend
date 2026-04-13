import React, { useState, useEffect } from "react";
import studentService from "services/studentService";

interface Student {
   id: number;
   name: string;
   username: string;
}

interface StudentPickerModalProps {
   classId: string | number;
   selectedIds: Set<number>;
   onConfirm: (selected: Student[]) => void;
   onClose: () => void;
}
export default function StudentPickerModal({ classId, selectedIds, onConfirm, onClose }: StudentPickerModalProps) {
   const [students, setStudents] = useState<Student[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [local, setLocal] = useState<Set<number>>(new Set(selectedIds));

   useEffect(() => {
      const fetchStudents = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await studentService.getStudents(String(classId));
            const rawList = response.students || response;

            if (!Array.isArray(rawList)) {
               throw new Error("Invalid data format received from server");
            }

            const mappedStudents = rawList.map((s: any) => ({
               id: s.student_id,
               name: `${s.firstName} ${s.lastName}`.trim(),
               username: s.username,
            }));

            setStudents(mappedStudents);
         } catch (err) {
            setError("Could not load students. Please try again.");
         } finally {
            setLoading(false);
         }
      };

      if (classId) {
         fetchStudents();
      }
   }, [classId]);

   const allChecked = students.length > 0 && local.size === students.length;

   const toggle = (id: number) =>
      setLocal((prev) => {
         const next = new Set(prev);
         next.has(id) ? next.delete(id) : next.add(id);
         return next;
      });

   return (
      <div className="bg-black/45 fixed inset-0 z-[1000] flex items-center justify-center" onClick={onClose}>
         <div
            className="flex max-h-[80vh] w-[min(580px,95vw)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
               <h2 className="m-0 text-xl font-bold text-slate-900">Select Student(s)</h2>
               <button
                  className="cursor-pointer border-none bg-none p-1 text-lg text-slate-400 transition-colors hover:text-slate-600"
                  onClick={onClose}
               >
                  ✕
               </button>
            </div>

            <div className="flex-1 overflow-y-auto">
               {loading ? (
                  <div className="p-8 text-center text-slate-400">Loading students...</div>
               ) : error ? (
                  <div className="p-8 text-center text-red-500">{error}</div>
               ) : students.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400">No students in this class.</div>
               ) : (
                  <table className="w-full border-collapse">
                     <thead>
                        <tr className="bg-slate-50">
                           <th className="w-12 border-b border-slate-200 px-4 py-3 text-left">
                              <input
                                 type="checkbox"
                                 checked={allChecked}
                                 className="h-4 w-4 cursor-pointer accent-blue-600"
                                 onChange={() => setLocal(allChecked ? new Set() : new Set(students.map((s) => s.id)))}
                              />
                           </th>
                           <th className="border-b border-slate-200 px-4 py-3 text-left text-[13px] font-semibold text-slate-700">Student</th>
                           <th className="border-b border-slate-200 px-4 py-3 text-left text-[13px] font-semibold text-slate-700">Username</th>
                        </tr>
                     </thead>
                     <tbody>
                        {students.map((s) => {
                           const checked = local.has(s.id);
                           return (
                              <tr
                                 key={s.id}
                                 className={`cursor-pointer border-b border-slate-100 transition-colors ${
                                    checked ? "bg-blue-50" : "hover:bg-gray-50"
                                 }`}
                                 onClick={() => toggle(s.id)}
                              >
                                 <td className="px-4 py-3">
                                    <input
                                       type="checkbox"
                                       checked={checked}
                                       className="h-4 w-4 cursor-pointer accent-blue-600"
                                       onChange={() => toggle(s.id)}
                                       onClick={(e) => e.stopPropagation()}
                                    />
                                 </td>
                                 <td className="px-4 py-3 text-sm text-slate-700">{s.name}</td>
                                 <td className="px-4 py-3 text-sm text-slate-700">{s.username}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-7 py-4">
               <button
                  className="cursor-pointer rounded-lg border-[1.5px] border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-gray-50"
                  onClick={onClose}
               >
                  Back
               </button>
               <button
                  className="cursor-pointer rounded-lg border-none bg-blue-600 px-7 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-95"
                  onClick={() => {
                     const selectedObjects = students.filter((s) => local.has(s.id));
                     onConfirm(selectedObjects);
                  }}
                  disabled={loading}
               >
                  Confirm
               </button>
            </div>
         </div>
      </div>
   );
}
