import React from "react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-2">
      <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-500" />
      <span className="text-sm">Loading answers…</span>
    </div>
  );
}