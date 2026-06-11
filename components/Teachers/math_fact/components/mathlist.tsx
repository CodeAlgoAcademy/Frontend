import React, { useEffect, useState, useCallback } from "react";
import mathFactsService from "services/mathfact";
import studentService from "services/studentService";
import {
  MathFactAssignmentDetail,
  MathFactAssignmentStudentRecord,
} from "types/interfaces/mathfact";

interface MathFactsListProps {
  classId: string | number;
  students: Array<{ id: number; name: string; username: string }>;
  onEdit: (
    student_id: number,
    student_name: string,
    assignments: MathFactAssignmentDetail[]
  ) => void;
  onRefresh?: () => void;
}

interface StudentRow {
  student_id: number;
  student_name: string;
  student_username: string;
  assignment: MathFactAssignmentDetail | null;
  record: MathFactAssignmentStudentRecord | null;
  status: string;
}

export default function MathFactsList({
  classId,
  students: initialStudents,
  onEdit,
  onRefresh,
}: MathFactsListProps) {
  const [studentRows, setStudentRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let currentStudents = initialStudents;
      if (!currentStudents || currentStudents.length === 0) {
        const response = await studentService.getStudents(String(classId));
        const rawList = response.students || response;
        currentStudents = rawList.map((s: any) => ({
          id: s.student_id ?? s.id,
          name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
          username: s.username || "",
        }));
      }

      const assignmentsList = await mathFactsService.getAssignments(classId);

      const detailedAssignments: MathFactAssignmentDetail[] = [];
      for (const summary of assignmentsList) {
        try {
            const detail = await mathFactsService.getAssignment(classId, summary.id);
            detailedAssignments.push(detail);
        } catch (e) {
            console.error(`Failed to fetch detail for assignment ${summary.id}`, e);
        }
      }

      const rows: StudentRow[] = currentStudents.map((student) => {
        let matchedAssignment: MathFactAssignmentDetail | null = null;
        let matchedRecord: MathFactAssignmentStudentRecord | null = null;

        for (const detail of detailedAssignments) {
          const record = detail.student_records?.find(
            (r) => r.student_id === student.id
          );
          if (record) {
            matchedAssignment = detail;
            matchedRecord = record;
            break; 
          }
        }

        let status = "Off";
        if (matchedRecord) {
          if (matchedRecord.is_mastered) status = "Mastered";
          else if (matchedRecord.status === "in_progress") status = "In Progress";
          else status = "Active";
        }

        return {
          student_id: student.id,
          student_name: student.name,
          student_username: student.username,
          assignment: matchedAssignment,
          record: matchedRecord,
          status,
        };
      });

      setStudentRows(rows);
    } catch (err) {
      console.error(err);
      setError("Failed to sync student records");
    } finally {
      setLoading(false);
    }
  }, [classId, initialStudents]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  if (loading) return <div className="p-16 text-center text-gray-400 font-medium">Syncing student records...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Student Fluency Overview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(-1, "Multiple Students", [])}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm"
          >
            Edit for multiple students
          </button>
          <button onClick={loadAssignments} className="p-2 border rounded-lg hover:bg-gray-50 bg-white">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {studentRows.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic">No students found in this class.</div>
        ) : (
            <div className="divide-y divide-gray-100">
            {studentRows.map((row) => (
                <div key={row.student_id} className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{row.student_name}</h3>
                    <p className="text-xs text-gray-400">@{row.student_username}</p>
                </div>

                <div className="flex-1 text-center">
                    {row.assignment ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ">
                        <span className="w-2 h-2 rounded-full bg-mainColoranimate-pulse"></span>
                        <span className="text-xs font-bold text-mainColor uppercase tracking-tight">
                        {row.assignment.fact_set.operation_display} {row.status}
                        </span>
                    </div>
                    ) : (
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                        Math logic off
                    </span>
                    )}
                </div>

                <div className="flex-1 hidden md:flex items-center justify-center">
                    {row.assignment?.fact_set.standards?.[0] && (
                        <div className="flex items-center gap-2 px-2 py-1 bg-mainColor/10 rounded border border-mainColor/10">
                            <span className="text-[0.75rem] font-mono font-bold text-black">{row.assignment.fact_set.standards[0].code}</span>
                            <span className="text-[10px] font-mono font-bold ">{row.assignment.fact_set.standards[0].name}</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 text-right">
                    <button
                    onClick={() => onEdit(row.student_id, row.student_name, row.assignment ? [row.assignment] : [])}
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm hover:border-blue-200 transition-all"
                    >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    Edit Settings
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