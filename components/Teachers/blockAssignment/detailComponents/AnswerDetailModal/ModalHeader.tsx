import React from "react";

interface ModalHeaderProps {
  assignmentTitle?: string;
  onClose: () => void;
}

export default function ModalHeader({ assignmentTitle, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-0">
      <button
        onClick={onClose}
        className="flex items-center gap-1.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors px-4 py-1.5 rounded-full shadow-sm"
      >
        ← Back to {assignmentTitle ?? "Assignment"}
      </button>
      <button
        onClick={onClose}
        className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 text-lg transition-colors"
      >
        ✕
      </button>
    </div>
  );
}