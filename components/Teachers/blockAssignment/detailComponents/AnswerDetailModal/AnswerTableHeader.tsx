import React from "react";

export default function AnswerTableHeader() {
  return (
    <div className="grid grid-cols-[1fr_120px_150px_140px] gap-x-4 px-6 py-2.5 bg-white border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
      <span>Questions</span>
      <span>Answer</span>
      <span>Time</span>
      <span className="text">Duration</span>
    </div>
  );
}