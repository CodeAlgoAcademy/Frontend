import React, { useEffect, useState, useCallback } from "react";
import mathFactsService from "services/mathfact";

interface MathFactsListProps {
  classId: string | number;
  students: any[];
  onEdit: (student_id: number, student_name: string, assignments: any[]) => void;
  onRefresh?: () => void;
}

export default function MathFactsList({ classId, onEdit }: MathFactsListProps) {
  const [studentRows, setStudentRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAssignments = useCallback(async () => {
    setLoading(true);
    try {
      const studentData = await mathFactsService.getAssignments(classId);
      setStudentRows(studentData);
    } catch (err) {
      console.error("Failed to sync student records", err);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => { loadAssignments(); }, [loadAssignments]);

  if (loading) return <div className="p-16 text-center text-gray-400 font-medium animate-pulse">Syncing student records...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Student Fluency Overview</h2>
        <div className="flex gap-2">
          <button onClick={() => onEdit(-1, "Multiple Students", [])} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm">
            Edit for multiple students
          </button>
          <button onClick={loadAssignments} className="p-2 border rounded-lg hover:bg-gray-50 bg-white">
             <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {studentRows.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic">No students found.</div>
        ) : (
            <div className="divide-y divide-gray-100">
            {studentRows.map((row) => (
                <div key={row.id} className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{row.full_name}</h3>
                    <p className="text-xs text-gray-400">@{row.username}</p>
                  </div>

                  <div className="flex-[2] flex flex-wrap justify-center gap-2">
                    {row.active_assignments && row.active_assignments.length > 0 ? (
                      row.active_assignments.map((asm: any) => (
                        <div key={asm.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/50">
                          <span className={`w-1.5 h-1.5 rounded-full ${asm.is_mastered ? 'bg-green-500' : 'bg-blue-400 animate-pulse'}`}></span>
                          <span className="text-[10px] font-bold text-blue-700 uppercase">
                            {asm.fact_set_name} {asm.is_mastered ? '(Mastered)' : ''}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        Math logic off
                      </span>
                    )}
                  </div>

                  <div className="flex-1 text-right">
                    <button
                      onClick={() => onEdit(row.id, row.full_name, row.active_assignments || [])}
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm hover:border-blue-200 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                      Edit
                    </button>
                  </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}