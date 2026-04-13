import { ScoreCell } from "./ScoreCell";
import { StatusBadge } from "./StatusBadge";

type ViewMode = "numeric" | "percentage";

interface TopicColumn {
   topic_id: number;
   topic_name: string;
   standard_code: string;
   total: number;
   correct: number;
}

interface StudentRow {
   id: number;
   student_username: string;
   status: string;
   score: number;
   total_answered: number;
   topic_scores?: Record<string, { correct: number; total: number }>;
}

interface ResultsTableProps {
   columns: TopicColumn[];
   students: StudentRow[];
   viewMode: ViewMode;
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

const COLS_PER_PAGE = 5;

export function ResultsTable({ columns, students, viewMode, currentPage, totalPages, onPageChange }: ResultsTableProps) {
   const visibleCols = columns.slice(currentPage * COLS_PER_PAGE, (currentPage + 1) * COLS_PER_PAGE);

   return (
      <div className="mt-4 overflow-x-auto ">
         <table className="w-full border-separate border-spacing-x-3 border-spacing-y-2">
            <thead>
               <tr>
                  <th></th>
                  {visibleCols.map((col) => (
                     <th key={`${col.topic_id}-${col.standard_code}`} className="min-w-[130px] pb-6 text-center align-bottom">
                        <div className="mb-1 text-xl font-black leading-none text-slate-900">
                           {col.correct}/{col.total}
                        </div>
                        <div className="line-clamp-2 mb-2 h-7 text-[10px] font-bold uppercase tracking-tight text-slate-600">{col.topic_name}</div>
                        <div className="inline-block rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold uppercase text-slate-600">
                           {col.standard_code}
                        </div>
                     </th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {students.map((student) => (
                  <tr key={student.id}>
                     <td className="py-2">
                        <div className="text-[14px] font-bold leading-none text-slate-800 ">{student.student_username}</div>
                        <div className="text-[11px] text-slate-400">({student.student_username})</div>
                     </td>

                     {visibleCols.map((col) => {
                        const topicKey = String(col.topic_id);

                        const studentTopic = student.topic_scores?.[topicKey] || { correct: 0, total: 0 };

                        return (
                           <td key={`${student.id}-${col.topic_id}`} className="py-1">
                              <ScoreCell correct={studentTopic.correct} total={studentTopic.total} viewMode={viewMode} />
                           </td>
                        );
                     })}
                     <td className="py-2 pl-4">
                        <div
                           className={`mb-1 text-xl font-black leading-none ${student.status === "not_started" ? "text-slate-300" : "text-sky-500"}`}
                        >
                           <ScoreCell correct={student.score} total={student.total_answered} viewMode={viewMode} />
                        </div>
                        <StatusBadge status={student.status} />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
