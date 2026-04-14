import React from "react";
import { format } from "date-fns";

interface HeaderSectionProps {
  onRefresh: () => void;
  onNewAssignment: () => void;
  lastUpdated: Date | null;
  loading?: boolean;
}

export default function HeaderSection({ 
  onRefresh, 
  onNewAssignment, 
  lastUpdated 
}: HeaderSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <button 
          onClick={onRefresh}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          🔄 Refresh
        </button>
        {lastUpdated && (
          <span className="text-xs text-gray-400">
            Updated {format(lastUpdated, "hh:mm aa")}
          </span>
        )}
      </div>
      <button 
        onClick={onNewAssignment}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all hover:shadow-md active:scale-95"
      >
        <span className="text-lg">+</span>
        New Assignment
      </button>
    </div>
  );
}