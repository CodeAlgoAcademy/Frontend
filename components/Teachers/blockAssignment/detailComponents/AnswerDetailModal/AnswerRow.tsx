import React from "react";
import { formatTime, formatDate } from "./utils";

interface AnswerRowProps {
  ans: any;
}

export default function AnswerRow({ ans }: AnswerRowProps) {
  const selectedOption = ans.student_answer?.selected_option ?? ans.student_answer?.order?.join(", ");

  return (
    <div className="grid grid-cols-[1fr_120px_150px_140px] gap-x-4 px-6 py-5 items-start hover:bg-slate-50/60 transition-colors">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
              {ans.topic_name}
            </span>
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-extrabold leading-tight">
            {ans.standard_code}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className={`mt-0.5 shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-black shadow-sm ${ans.is_correct ? "bg-green-500 text-white" : "bg-red-400 text-white"}`}>
            {ans.is_correct ? "✔" : "✘"}
          </span>
          <p className="text-sm text-slate-700 leading-snug font-medium">{ans.question_text}</p>
        </div>
      </div>



      <div className="flex flex-col gap-1.5 pt-0.5">
        {selectedOption ? (
          <span className={`self-start px-3 py-1 rounded-full text-xs font-bold shadow-sm ${ans.is_correct ? "bg-green-500 text-white" : "bg-red-100 text-red-700 border border-red-200"}`}>
            {selectedOption}
          </span>
        ) : (
          <span className="text-xs text-slate-400 italic">No answer recorded</span>
        )}
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
          {ans.question_type?.replace(/_/g, " ")}
        </span>
      </div>

      <div className="pt-0.5">
        {ans.answered_at ? (
          <>
            <div className="text-xs font-semibold text-slate-700 leading-tight">{formatTime(ans.answered_at)}</div>
            <div className="text-xs text-slate-400 mt-0.5">{formatDate(ans.answered_at)}</div>
          </>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        )}
      </div>

      <div className="text pt-0.5">
        <span className="text-xs font-semibold text-slate-600">{ans.duration == 0 ? "—" : ans.duration }</span>
      </div>
    </div>
  );
}