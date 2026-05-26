import React from "react";

interface StudentInfoProps {
  username?: string;
  correctCount: number;
  totalCount: number;
  pct: number;
  perfColor: string;
}

export default function StudentInfo({ username, correctCount, totalCount, pct, perfColor }: StudentInfoProps) {
  return (
    <div className="px-6 pt-4 pb-3 border-b border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900">{username ?? "Student"}</h2>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-1 mt-3 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-500">Performance</span>
          <span className={`font-bold ${perfColor}`}>
            {correctCount}/{totalCount} ({pct}%)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-500">Completed</span>
          <span className="font-bold text-slate-700">{pct === 100 ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
}